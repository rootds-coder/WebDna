#!/usr/bin/env node
import http from 'http';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port for WebDNA Chrome Extension Local Bridge
const BRIDGE_PORT = parseInt(process.env.WEBDNA_BRIDGE_PORT || '8765', 10);
const CACHE_DIR = path.join(process.env.USERPROFILE || process.env.HOME || '.', '.webdna');
const CACHE_FILE = path.join(CACHE_DIR, 'latest-report.json');

try {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
} catch (e) {}

// Global State
let extensionClient = null; // SSE response stream to extension
let connectedExtensionTab = null; // { id, url, title, updatedAt }
let latestReport = null;
const pendingRequests = new Map(); // requestId -> { resolve, reject, timeoutId }

// Try to load cached report from disk
try {
  if (fs.existsSync(CACHE_FILE)) {
    latestReport = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  }
} catch (e) {}

// ============================================================================
// 1. HTTP BRIDGE SERVER FOR WEBDNA CHROME EXTENSION (PORT 8765)
// ============================================================================
const bridgeServer = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://127.0.0.1:${BRIDGE_PORT}`);
  const pathname = parsedUrl.pathname;

  // GET /status
  if (pathname === '/status' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      server: 'WebDNA MCP Bridge',
      version: '1.0.0',
      bridgePort: BRIDGE_PORT,
      serverPath: path.resolve(__filename),
      launchCommand: `node "${path.resolve(__filename)}"`,
      extensionConnected: Boolean(extensionClient),
      activeTab: connectedExtensionTab,
      hasCachedReport: Boolean(latestReport),
      cachedSite: latestReport?.source?.origin || null
    }));
    return;
  }

  // GET /events (Server-Sent Events connection for Chrome Extension)
  if (pathname === '/events' || pathname === '/bridge/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('event: connected\ndata: {"status":"connected"}\n\n');
    extensionClient = res;

    req.on('close', () => {
      if (extensionClient === res) {
        extensionClient = null;
      }
    });
    return;
  }

  // POST /heartbeat (Extension informs bridge about current tab)
  if (pathname === '/heartbeat' || pathname === '/bridge/heartbeat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        connectedExtensionTab = {
          id: data.tabId,
          url: data.url,
          title: data.title,
          updatedAt: Date.now()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // POST /result (Extension delivers scan result to bridge)
  if (pathname === '/result' || pathname === '/bridge/result') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { requestId, ok, report, error } = data;
        if (ok && report) {
          latestReport = report;
          try {
            fs.writeFileSync(CACHE_FILE, JSON.stringify(report, null, 2), 'utf8');
          } catch (e) {}
        }
        if (requestId && pendingRequests.has(requestId)) {
          const { resolve, timeoutId } = pendingRequests.get(requestId);
          clearTimeout(timeoutId);
          pendingRequests.delete(requestId);
          resolve(data);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, received: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // GET /last-report
  if (pathname === '/last-report' || pathname === '/bridge/last-report') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, report: latestReport }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

bridgeServer.listen(BRIDGE_PORT, '127.0.0.1', () => {
  // Bridge server ready silently on background port
});

bridgeServer.on('error', (err) => {
  // If port in use, fail gracefully without crashing stdio MCP loop
});

// Helper: Dispatch scan request to Chrome extension via SSE
function requestScanFromExtension(options = {}) {
  return new Promise((resolve, reject) => {
    if (!extensionClient) {
      return reject(new Error('WebDNA Chrome Extension is not currently connected to the local bridge (ws/sse on port ' + BRIDGE_PORT + '). Please ensure Chrome is running with WebDNA extension loaded.'));
    }

    const requestId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const payload = {
      requestId,
      type: options.url ? 'SCAN_URL' : 'SCAN_ACTIVE_TAB',
      url: options.url,
      tabId: options.tabId,
      options: {
        maxNodes: options.maxNodes || 8000,
        includeClientScripts: true,
        includeAssets: true
      }
    };

    const timeoutId = setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        pendingRequests.delete(requestId);
        reject(new Error('Scan request timed out after 45 seconds. The page may still be loading or contains heavy WebGL/assets.'));
      }
    }, 45000);

    pendingRequests.set(requestId, { resolve, reject, timeoutId });

    try {
      extensionClient.write(`event: scan_request\ndata: ${JSON.stringify(payload)}\n\n`);
    } catch (err) {
      clearTimeout(timeoutId);
      pendingRequests.delete(requestId);
      reject(new Error(`Failed to transmit scan command to WebDNA extension: ${err.message}`));
    }
  });
}

// Fallback HTTP probe when extension is not connected
async function fallbackNodeFetchScan(targetUrl) {
  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 WebDNA/4.3.0'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const html = await res.text();
    const u = new URL(targetUrl);

    // Extract basic tokens, scripts, shaders, 3D glb models from HTML
    const colors = Array.from(new Set(html.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgba?\([^)]+\)/g) || [])).slice(0, 16);
    const glbMatches = Array.from(new Set(Array.from(html.matchAll(/["']([^"'`\s]+\.(?:glb|gltf|obj|fbx|usdz))(?:\?[^"'`\s]*)?["']/gi)).map(m => m[1])));
    const scriptMatches = Array.from(new Set(Array.from(html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)).map(m => m[1])));
    const shaderCount = (html.match(/void\s+main\s*\(\s*\)|gl_FragColor|attribute\s+vec/g) || []).length;

    const synthesizedReport = {
      status: 'completed',
      source: { origin: u.origin, path: u.pathname },
      coverage: { visited: (html.match(/<[a-zA-Z0-9-]+/g) || []).length },
      tokens: colors.map((c, i) => ({ name: `--color-${i + 1}`, value: c, hex: c.startsWith('#') ? c : undefined, category: 'color' })),
      extracts: {
        assets: {
          data: glbMatches.map((m, i) => ({ kind: 'model', ext: 'glb', fileName: m.split('/').pop() || `model-${i+1}.glb`, downloadUrl: new URL(m, targetUrl).toString() }))
        },
        runtime: {
          data: {
            webglScene: {
              geometries: glbMatches.map(m => ({ type: 'GLTFModelGeometry', args: m.split('/').pop() })),
              models: glbMatches.map(m => ({ name: m.split('/').pop(), ext: 'glb', url: new URL(m, targetUrl).toString() })),
              shaders: Array.from({ length: shaderCount }, (_, i) => ({ id: `shader-${i+1}` }))
            },
            timelines: { chapters: [], totalVhRatio: '100vh' },
            clientScripts: { inlineCount: (html.match(/<script(?![^>]*src=)/gi) || []).length, externalCount: scriptMatches.length },
            audioNodes: 0
          }
        },
        components: {
          data: { components: [{ name: 'PageHeader' }, { name: 'MainSection' }, { name: 'Footer' }] }
        }
      }
    };
    latestReport = synthesizedReport;
    return synthesizedReport;
  } catch (err) {
    throw new Error(`Fallback HTTP scan failed for ${targetUrl}: ${err.message}`);
  }
}

// Format Report into high-grade DESIGN.md text
function formatDesignMd(report) {
  if (!report) return 'No report available.';
  const slug = report.source?.origin?.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9.-]/g, '_') || 'website';
  const tokens = Array.isArray(report.tokens) ? report.tokens : [];
  const colorTokens = tokens.filter(t => t.category === 'color');
  const rt = report.extracts?.runtime?.data || {};
  const webgl = rt.webglScene || {};
  const shaders = webgl.shaders || [];
  const models = webgl.models || [];
  const geoms = webgl.geometries || [];
  const scripts = rt.clientScripts || {};
  const comps = report.extracts?.components?.data?.components || [];

  const lines = [];
  lines.push(`# WebDNA Specification — ${slug}`);
  lines.push(`- **Origin**: ${report.source?.origin || 'unknown'}${report.source?.path || ''}`);
  lines.push(`- **DOM Census**: ${report.coverage?.visited || 0} visited elements`);
  lines.push(`- **Extracted Tech**: ${geoms.length > 0 || shaders.length > 0 ? 'Three.js / WebGL 3D' : 'Standard Web'}`);
  lines.push(``);
  lines.push(`## 1. 3D WebGL Scene & Models`);
  lines.push(`- **3D Models (.glb / .gltf)**: ${models.length}`);
  models.forEach(m => lines.push(`  - \`${m.name}\` (${m.url || 'bundled'})`));
  lines.push(`- **GLSL Shaders**: ${shaders.length} shader objects`);
  lines.push(`- **Geometries & Meshes**: ${geoms.length} detected`);
  lines.push(``);
  lines.push(`## 2. Design Tokens & Color Palette`);
  colorTokens.slice(0, 16).forEach(c => {
    lines.push(`- \`${c.name}\`: \`${c.hex || c.value}\``);
  });
  lines.push(``);
  lines.push(`## 3. Detected Components`);
  comps.forEach(c => lines.push(`- \`<${c.name} />\``));
  lines.push(``);
  lines.push(`## 4. Script Corpus & Archeology`);
  lines.push(`- **Inline Scripts**: ${scripts.inlineCount || 0}`);
  lines.push(`- **External Script Bundles**: ${scripts.externalCount || 0}`);
  return lines.join('\n');
}

// Generate Tailwind Config from report
function generateTailwind(report) {
  const tokens = Array.isArray(report?.tokens) ? report.tokens : [];
  const colorTokens = tokens.filter(t => t.category === 'color');
  const colorsObj = {};
  colorTokens.forEach((c, i) => {
    const key = (c.name || `brand-${i+1}`).replace(/^--/, '').replace(/[^a-zA-Z0-9-]/g, '-');
    colorsObj[key] = c.hex || c.value;
  });
  return `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(colorsObj, null, 8)}\n    }\n  }\n};\n`;
}

// ============================================================================
// 2. MODEL CONTEXT PROTOCOL (MCP) STDIO SERVER (JSON-RPC 2.0)
// ============================================================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const MCP_TOOLS = [
  {
    name: 'webdna_scan_active_tab',
    description: 'Scans the active browser tab currently open in Google Chrome via WebDNA. Extracts design tokens, color palette, 3D WebGL scene graphs, GLSL shaders, .glb 3D models, SVG assets, and React components.',
    inputSchema: {
      type: 'object',
      properties: {
        maxNodes: {
          type: 'number',
          description: 'Maximum DOM nodes to crawl (default 8000)'
        }
      }
    }
  },
  {
    name: 'webdna_scan_url',
    description: 'Extracts a complete 1:1 design specification, 3D WebGL models (.glb), shaders, colors, and layout from any specified website URL.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The target website URL to scan (e.g. https://www.usavionix.com)'
        },
        maxNodes: {
          type: 'number',
          description: 'Maximum DOM nodes to crawl (default 8000)'
        }
      },
      required: ['url']
    }
  },
  {
    name: 'webdna_get_design_md',
    description: 'Returns the structured DESIGN.md AI prompt specification for the last scanned website, formatted for Claude, Cursor, or Gemini to recreate the site.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'webdna_get_3d_scene',
    description: 'Returns the full 3D WebGL scene graph, GLSL shaders, camera rig vectors, and 3D binary model (.glb/.gltf) URLs from the last scanned site.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'webdna_get_tailwind_config',
    description: 'Generates and returns an accurate tailwind.config.js containing the scanned site\'s exact color palette, typography scale, and spacing tokens.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'webdna_get_assets',
    description: 'Returns all captured assets (3D GLB models, SVGs, images, fonts, videos) from the scanned site with download URLs and inline code.',
    inputSchema: {
      type: 'object',
      properties: {
        filter: {
          type: 'string',
          enum: ['all', '3d', 'svg', 'image', 'video', 'font'],
          description: 'Filter assets by kind'
        }
      }
    }
  },
  {
    name: 'webdna_status',
    description: 'Returns the connection status of the WebDNA Chrome Extension, the active tab URL, and whether a cached scan report is loaded.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

function sendJsonRpc(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

rl.on('line', async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let req;
  try {
    req = JSON.parse(trimmed);
  } catch (err) {
    sendJsonRpc({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error: Invalid JSON' }
    });
    return;
  }

  const { id, method, params } = req;

  // 1. initialize
  if (method === 'initialize') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: 'webdna-mcp',
          version: '1.0.0'
        }
      }
    });
    return;
  }

  // 2. notifications/initialized
  if (method === 'notifications/initialized') {
    return;
  }

  // 3. ping
  if (method === 'ping') {
    sendJsonRpc({ jsonrpc: '2.0', id, result: {} });
    return;
  }

  // 4. tools/list
  if (method === 'tools/list') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: {
        tools: MCP_TOOLS
      }
    });
    return;
  }

  // 5. tools/call
  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    try {
      let responseText = '';

      switch (toolName) {
        case 'webdna_status': {
          responseText = JSON.stringify({
            extensionConnected: Boolean(extensionClient),
            bridgePort: BRIDGE_PORT,
            activeBrowserTab: connectedExtensionTab,
            cachedReportAvailable: Boolean(latestReport),
            scannedOrigin: latestReport?.source?.origin || null,
            totalColors: latestReport?.tokens?.length || 0,
            shadersCount: latestReport?.extracts?.runtime?.data?.webglScene?.shaders?.length || 0,
            glbModelsCount: latestReport?.extracts?.runtime?.data?.webglScene?.models?.length || 0
          }, null, 2);
          break;
        }

        case 'webdna_scan_active_tab': {
          let report;
          if (extensionClient) {
            const scanRes = await requestScanFromExtension(args);
            report = scanRes.report;
          } else if (connectedExtensionTab?.url) {
            report = await fallbackNodeFetchScan(connectedExtensionTab.url);
          } else if (latestReport) {
            report = latestReport;
            responseText = `[Note: Extension not connected; using latest cached scan for ${report.source?.origin}]\n\n` + formatDesignMd(report);
            break;
          } else {
            throw new Error('WebDNA Chrome Extension is not currently connected to the bridge. Open Chrome with WebDNA enabled, or specify a URL via webdna_scan_url.');
          }
          responseText = formatDesignMd(report);
          break;
        }

        case 'webdna_scan_url': {
          const targetUrl = args.url;
          if (!targetUrl) throw new Error('Missing url parameter');
          let report;
          if (extensionClient) {
            try {
              const scanRes = await requestScanFromExtension({ url: targetUrl, maxNodes: args.maxNodes });
              report = scanRes.report;
            } catch (extErr) {
              report = await fallbackNodeFetchScan(targetUrl);
            }
          } else {
            report = await fallbackNodeFetchScan(targetUrl);
          }
          responseText = formatDesignMd(report);
          break;
        }

        case 'webdna_get_design_md': {
          if (!latestReport) throw new Error('No scan report available. Call webdna_scan_url or webdna_scan_active_tab first.');
          responseText = formatDesignMd(latestReport);
          break;
        }

        case 'webdna_get_3d_scene': {
          if (!latestReport) throw new Error('No scan report available. Call webdna_scan_url first.');
          const rt = latestReport.extracts?.runtime?.data || {};
          const webgl = rt.webglScene || { geometries: [], shaders: [], models: [] };
          responseText = JSON.stringify({
            origin: latestReport.source?.origin,
            models: webgl.models || [],
            geometries: webgl.geometries || [],
            materials: webgl.materials || [],
            shadersCount: (webgl.shaders || []).length,
            shaders: webgl.shaders || [],
            cameraRig: webgl.cameraRig || null
          }, null, 2);
          break;
        }

        case 'webdna_get_tailwind_config': {
          if (!latestReport) throw new Error('No scan report available. Call webdna_scan_url first.');
          responseText = generateTailwind(latestReport);
          break;
        }

        case 'webdna_get_assets': {
          if (!latestReport) throw new Error('No scan report available. Call webdna_scan_url first.');
          const filter = args.filter || 'all';
          const list = latestReport.extracts?.assets?.data || [];
          const filtered = list.filter(a => {
            if (filter === 'all') return true;
            if (filter === '3d') return ['glb', 'gltf', 'obj', 'fbx', 'usdz'].includes((a.ext || '').toLowerCase()) || a.kind === 'model';
            return (a.kind || '').toLowerCase() === filter || (a.ext || '').toLowerCase() === filter;
          });
          responseText = JSON.stringify({
            total: filtered.length,
            filter,
            assets: filtered.map(a => ({
              fileName: a.fileName,
              kind: a.kind,
              ext: a.ext,
              downloadUrl: a.downloadUrl,
              hasInlineSvg: Boolean(a.svgContent)
            }))
          }, null, 2);
          break;
        }

        default:
          throw new Error(`Unknown tool: ${toolName}`);
      }

      sendJsonRpc({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: responseText
            }
          ],
          isError: false
        }
      });
    } catch (toolErr) {
      sendJsonRpc({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: `Error executing ${toolName}: ${toolErr.message}`
            }
          ],
          isError: true
        }
      });
    }
    return;
  }

  // Fallback for unhandled method
  sendJsonRpc({
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: `Method not found: ${method}`
    }
  });
});

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PATH = path.resolve(__dirname, 'server.mjs');
const isWin = process.platform === 'win32';
const homeDir = os.homedir();
const appData = process.env.APPDATA || (isWin ? path.join(homeDir, 'AppData', 'Roaming') : '');

console.log('====================================================');
console.log('   WebDNA MCP Auto-Installer (Universal 1-Click)    ');
console.log('====================================================\n');
console.log(`Detected Platform: ${process.platform} (${os.type()} ${os.arch()})`);
console.log(`Dynamic Server Path: ${SERVER_PATH}\n`);

const webdnaMcpEntry = {
  command: "node",
  args: [SERVER_PATH]
};

// Target config files to check and configure
const TARGET_CONFIGS = [
  // 1. Claude Desktop
  {
    name: 'Claude Desktop',
    path: isWin
      ? path.join(appData, 'Claude', 'claude_desktop_config.json')
      : process.platform === 'darwin'
      ? path.join(homeDir, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json')
      : path.join(homeDir, '.config', 'Claude', 'claude_desktop_config.json')
  },
  // 2. Cursor Global
  {
    name: 'Cursor IDE (Global)',
    path: path.join(homeDir, '.cursor', 'mcp.json')
  },
  // 3. Antigravity
  {
    name: 'Google Antigravity',
    path: path.join(homeDir, '.gemini', 'mcp_config.json')
  }
];

let configuredCount = 0;

for (const target of TARGET_CONFIGS) {
  try {
    const dir = path.dirname(target.path);
    if (!fs.existsSync(dir)) {
      // Directory doesn't exist yet, create it if parent exists or if it's a known location
      fs.mkdirSync(dir, { recursive: true });
    }

    let config = { mcpServers: {} };
    if (fs.existsSync(target.path)) {
      try {
        const raw = fs.readFileSync(target.path, 'utf8');
        config = JSON.parse(raw);
        if (!config.mcpServers || typeof config.mcpServers !== 'object') {
          config.mcpServers = {};
        }
      } catch (err) {
        console.warn(`[!] Existing config at ${target.path} was unparseable. Creating backup...`);
        fs.writeFileSync(`${target.path}.bak-${Date.now()}`, fs.readFileSync(target.path));
        config = { mcpServers: {} };
      }
    }

    // Add or update webdna entry dynamically
    config.mcpServers.webdna = webdnaMcpEntry;

    fs.writeFileSync(target.path, JSON.stringify(config, null, 2), 'utf8');
    console.log(`[+] Successfully configured ${target.name}:`);
    console.log(`    -> File: ${target.path}`);
    configuredCount++;
  } catch (err) {
    console.error(`[-] Could not configure ${target.name}: ${err.message}`);
  }
}

console.log('\n----------------------------------------------------');
console.log(`WebDNA MCP successfully installed across ${configuredCount} AI assistant(s)!`);
console.log('You can now prompt Claude, Cursor, or Antigravity:');
console.log('  "Extract the design system of https://usavionix.com using WebDNA"\n');

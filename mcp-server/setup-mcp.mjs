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
  // 3. Antigravity Global Config
  {
    name: 'Google Antigravity (Global Config)',
    path: path.join(homeDir, '.gemini', 'config', 'mcp_config.json')
  },
  // 4. Antigravity Legacy Fallback
  {
    name: 'Google Antigravity (Legacy)',
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

// 5. Install Antigravity Skill for interactive chat autocomplete & suggestions
try {
  const skillDir = path.join(homeDir, '.gemini', 'config', 'skills', 'webdna');
  fs.mkdirSync(skillDir, { recursive: true });
  const skillPath = path.join(skillDir, 'SKILL.md');
  const skillContent = `---
name: webdna
description: Autonomous frontend reverse engineering, 1:1 design system extraction, Three.js 3D scene capture, and React/Tailwind component reconstruction from any URL using WebDNA Studio.
---

# WebDNA Studio — AI Reverse Engineering & Design System Engine

Use this skill whenever the user mentions **WebDNA**, or asks to **extract, inspect, clone, or reverse-engineer** a website's frontend design system, 3D WebGL scenes, animations, or styling tokens.

## Available Quick Actions
1. **Full 1:1 Site Extraction**: Extract DOM structure, typography, colors, animations, and tech stack.
2. **3D WebGL & Three.js Scene Capture**: Capture Three.js object hierarchies, geometries, materials, and GLSL shaders.
3. **React + Tailwind Component Generation**: Convert inspected sections into production-ready React 18 + Tailwind CSS components.
4. **Live Element Inspection**: Inspect individual DOM elements, dimensions, computed styles, and instant copy snippets.
5. **AI Rebrand & Cloning Prompt**: Generate high-fidelity system prompts for Cursor, Claude, and ChatGPT to recreate the site.
`;
  fs.writeFileSync(skillPath, skillContent, 'utf8');
  console.log('[+] Installed Antigravity Skill for chat autocompletion:');
  console.log(`    -> File: ${skillPath}`);
} catch (err) {}

console.log('\n----------------------------------------------------');
console.log(`WebDNA MCP successfully installed across ${configuredCount} AI assistant(s)!`);
console.log('You can now prompt Claude, Cursor, or Antigravity:');
console.log('  "Extract the design system of https://usavionix.com using WebDNA"\n');

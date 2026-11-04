[![M8ven Score](https://m8ven.ai/badge/mcp/rootds-coder-webdna-vx2ghq?v=27d3cad78a83e5f654c3c3fb054ec49f)](https://m8ven.ai/mcp/rootds-coder-webdna-vx2ghq?s=readme)

# WebDNA Studio 🧬
### The Living 1:1 Web Replicator & Inbuilt MCP AI Engine

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![License: Custom](https://img.shields.io/badge/License-WebDNA_Attribution_%26_Non--Commercial-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-orange.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-Standard_v2024--11--05-purple.svg)](https://modelcontextprotocol.io/)
[![Three.js & WebGL](https://img.shields.io/badge/3D-WebGL_%2F_GLSL_%2F_GLTF-red.svg)](https://threejs.org/)

**WebDNA Studio** is an open-source, dual-layer creative technology suite for frontend architects, creative technologists, and autonomous AI agents:

1. **A Chrome Extension (Sidepanel MV3)** that inspects and extracts live websites with complete dynamic fidelity: 3D WebGL scenes, GLSL shaders, 3D GLB models, scroll-driven timeline choreography, cyber-scramble text effects, procedural Web Audio synth graphs, and complete CSS/Tailwind design tokens.
2. **An Inbuilt Model Context Protocol (MCP) Server** running seamlessly over JSON-RPC 2.0 stdio and a local HTTP bridge (`127.0.0.1:8765`), granting **Claude Desktop, Cursor, and Google Antigravity** the ability to directly scan live browser tabs or inspect target URLs autonomously.

---

## ⚡ Key Capabilities

### 1. 🧬 Living 1:1 Web Replicator
- **Zero-Friction Extraction**: Turn any live website into an executable, self-healing **Vite + React 18 + Tailwind CSS + Three.js** codekit in one click.
- **Dynamic Asset & Shader Preservation**: Extracts raw GLSL vertex and fragment shaders, camera keyframes, meshes, and binary `.glb`/`.gltf` 3D models with true MIME preservation.
- **Scroll & Timeline Choreography**: Maps scroll-driven chapters, pinned layers, and scrubber progress into clean declarative hooks.
- **Procedural Web Audio Graph**: Analyzes active oscillators, filters, gain nodes, and dynamic synthesizer parameters.

### 2. 🤖 Native Model Context Protocol (MCP) Engine
- **Universal 1-Click Auto-Installer**: Automatically discovers your OS (`Windows`, `macOS`, `Linux`) and registers the server with:
  - **Claude Desktop** (`claude_desktop_config.json`)
  - **Cursor IDE** (`~/.cursor/mcp.json`)
  - **Google Antigravity** (`~/.gemini/mcp_config.json`)
- **Zero Hardcoded Paths**: Dynamic path resolution guarantees the server runs on any machine or operating system out of the box.
- **Bidirectional Chrome Bridge**: AI agents can query the active Chrome tab currently open on your screen without needing to launch a headless browser.

---

## 🚀 Quickstart Guide

### Step 1: Install the Chrome Extension
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the [`extension/`](extension/) directory from this repository.
5. Pin the **WebDNA Studio** icon in your Chrome toolbar. Click it to open the sidepanel workbench!

---

### Step 2: Connect MCP to Your AI Agent (1-Click)

#### Windows:
Double-click:
```bat
install-mcp.bat
```
*(or run `node mcp-server\setup-mcp.mjs`)*

#### macOS / Linux:
Run:
```bash
chmod +x install-mcp.sh && ./install-mcp.sh
```

Restart **Claude Desktop**, **Cursor**, or **Antigravity**. The `webdna` tool suite is now immediately available in your assistant!

---

## 🛠️ MCP Tools Reference

When connected via MCP, your AI agent has direct access to 7 production-grade tools:

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `webdna_scan_active_tab` | *none* | Scans the user's active Chrome tab in real time and returns DOM topology, WebGL scenes, fonts, and colors. |
| `webdna_scan_url` | `url` *(string)* | Performs a deep multi-pass probe on any public URL to extract its complete design system and tech stack. |
| `webdna_get_design_md` | `url` *(optional)* | Generates a structured `DESIGN.md` specification ready for LLM prompt context. |
| `webdna_get_3d_scene` | `url` *(optional)* | Returns raw GLSL shaders, 3D `.glb` model assets, camera positions, and WebGL metadata. |
| `webdna_get_tailwind_config` | `url` *(optional)* | Exports a production-ready `tailwind.config.js` with exact colors, typography, shadows, and radii. |
| `webdna_get_assets` | `filter` *(all\|image\|svg\|font\|3d)* | Catalogs and resolves all media and 3D assets with dimensions and download URLs. |
| `webdna_status` | *none* | Reports active Chrome bridge connection, background worker state, and cached scan reports. |

### Example AI Prompts:
- *"Using WebDNA, scan the current active tab and summarize its design system."*
- *"Extract the 3D WebGL scene and GLSL shaders from https://www.usavionix.com using WebDNA."*
- *"Generate a complete Tailwind CSS configuration from https://jio.com with WebDNA."*

---

## 📁 Repository Structure

```text
webdna-core/
├── extension/                     # Chrome Extension (Manifest V3)
│   ├── manifest.json              # Extension manifest (v1.0.0)
│   ├── background.js              # Service worker & local MCP HTTP/SSE bridge
│   ├── probe.js                   # Universal in-page DOM & WebGL spider
│   ├── sidepanel.html             # Workbench sidepanel entry
│   ├── options.html               # Options UI
│   ├── assets/                    # Icons, illustrations, and studio-theme.css
│   └── chunks/                    # UI bundle and runtime client modules
│
├── mcp-server/                    # Model Context Protocol Engine
│   ├── server.mjs                 # Standard MCP stdio & HTTP bridge server
│   ├── setup-mcp.mjs              # Universal dynamic installer script
│   ├── package.json               # MCP package metadata (v1.0.0)
│   ├── README.md                  # Dedicated MCP documentation
│   └── install.bat                # Windows quick launcher
│
├── install-mcp.bat                # 1-Click Windows MCP installer
├── install-mcp.sh                 # 1-Click Unix MCP installer
├── LICENSE                        # MIT License
└── README.md                      # Product documentation
```

---

## 🔒 Security & Privacy

- **100% Local Execution**: The Chrome Extension and MCP server communicate exclusively over loopback IPC (`stdio` and `127.0.0.1:8765`).
- **No External Telemetry**: Zero external tracking, analytics, or remote API endpoints.
- **Store Policy Compliant**: Contains no eval execution, remote code loading, or prohibited obfuscation.

---

## ⚠️ Educational Use & Legal Disclaimer

> **IMPORTANT NOTICE**:
> **WebDNA Studio** is developed and distributed strictly for **educational, academic research, frontend study, and authorized security auditing purposes only**.
>
> - **Zero Author Liability**: The author (**Dhruv Singh Chauhan**) and contributors assume **absolutely zero responsibility or legal liability** for any misuse of this software, damages, system disruptions, or legal actions resulting from end-user activities.
> - **User Responsibility**: End users are solely responsible for ensuring that their use complies with local laws, copyright regulations, intellectual property rights, and the Terms of Service of any target website.
> - **No Endorsement of Infringement**: The author does not condone, encourage, or facilitate the unauthorized ripping, reproduction, or redistribution of copyrighted media, 3D assets, proprietary shaders, or protected data.

---

## 📄 License & Attribution

Distributed under the **WebDNA Source-Available & Non-Commercial License (Version 1.0)**.
Copyright (c) 2026 **Dhruv Singh Chauhan** (`rootds-coder`).

- **Original Repository**: [https://github.com/rootds-coder/WebDna](https://github.com/rootds-coder/WebDna)
- **Permissions**: Free to view, download, run, study, and modify for personal, educational, research, and non-commercial purposes.
- **Attribution Required**: When sharing or distributing, you must give clear credit to *"Dhruv Singh Chauhan — original creator of WebDNA"* and link to the original repository.
- **No Commercial Use**: Commercial sale, paid SaaS hosting, or incorporation into paid products is strictly prohibited without prior explicit written permission.

See [`LICENSE`](LICENSE) for complete terms.

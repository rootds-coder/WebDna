# WebDNA Inbuilt MCP Server (Universal & Dynamic)

Connect WebDNA directly to any AI Agent (**Cursor, Claude Desktop, Antigravity, Windsurf**) using the official Model Context Protocol (MCP).

---

## ⚡ 1-Click Automatic Setup (Recommended for All Users)

WebDNA automatically discovers your operating system and AI client config files. You do not need to manually copy or type any file paths:

### On Windows:
Double-click:
```bat
install-mcp.bat
```
*(or run `node mcp-server\setup-mcp.mjs` in your terminal)*

### On macOS / Linux:
Run:
```bash
chmod +x install-mcp.sh && ./install-mcp.sh
```

The installer automatically detects the exact folder where WebDNA is placed on your PC and configures:
- ✅ **Cursor IDE** (`~/.cursor/mcp.json`)
- ✅ **Claude Desktop** (`claude_desktop_config.json`)
- ✅ **Google Antigravity** (`~/.gemini/mcp_config.json`)

---

## 🛠️ Manual Configuration (If Needed)

If you prefer to configure manually, use your machine's path to `server.mjs`:

```json
{
  "mcpServers": {
    "webdna": {
      "command": "node",
      "args": ["<FULL_PATH_TO_YOUR_WEBDNA_FOLDER>/mcp-server/server.mjs"]
    }
  }
}
```
*(Tip: In WebDNA Chrome sidepanel > **Settings**, click **"📋 Copy Dynamic MCP Config"** to automatically copy the exact path detected for your PC!)*

---

## 🚀 Available MCP Tools

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `webdna_scan_active_tab` | `maxNodes?: number` | Scans whatever tab is currently active in your open Google Chrome browser. |
| `webdna_scan_url` | `url: string`, `maxNodes?: number` | Extracts design tokens, 3D WebGL scenes, `.glb` models, and layout from any specified website URL. |
| `webdna_get_design_md` | *(none)* | Returns structured `DESIGN.md` prompt context for the scanned site. |
| `webdna_get_3d_scene` | *(none)* | Returns 3D WebGL scene graph, GLSL shaders, camera keyframes, and `.glb` model URLs. |
| `webdna_get_tailwind_config` | *(none)* | Generates ready-to-use `tailwind.config.js` with exact colors and spacing. |
| `webdna_get_assets` | `filter?: "all"\|"3d"\|"svg"\|"image"\|"video"\|"font"` | Returns extracted assets with download URLs and inline code. |
| `webdna_status` | *(none)* | Checks connection status of the WebDNA Chrome extension and active browser tab. |

---

## 💡 Example Prompts to give your AI Agent

- *"Extract the design system of the active tab in Chrome using WebDNA and generate the Tailwind theme."*
- *"Scan https://www.usavionix.com with WebDNA, tell me what 3D GLB models and shaders it uses, and rebuild the hero section in React."*
- *"Recreate the color palette and typography from the site open in WebDNA."*

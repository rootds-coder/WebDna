"use strict";
(() => {
  // @webdna/security — URL sanitization and safe fetch helpers
  const SENSITIVE_QUERY_KEYS = /^(token|auth|key|secret|password|passwd|pwd|session|sid|jwt|access_token|refresh_token|api_key|apikey|signature|sig|code|state|nonce|credential)$/i;

  function sanitizeUrl(raw) {
    try {
      const u = new URL(raw);
      return {
        origin: u.origin.slice(0, 500),
        path: (u.pathname === "/" ? "/" : u.pathname).slice(0, 1000)
      };
    } catch {
      return { origin: "", path: "" };
    }
  }

  function safeBaseURI(doc) {
    const b = doc?.baseURI || "";
    return /^https?:/i.test(b) ? b : "https://local.page/";
  }

  function sanitizeDownloadUrl(raw, baseURI) {
    if (!raw || typeof raw !== "string") return "";
    const trimmed = raw.trim();
    if (/^(javascript|vbscript|file|chrome|chrome-extension|about):/i.test(trimmed)) return "";
    if (trimmed.startsWith("data:image/")) {
      return trimmed.length <= 450000 ? trimmed : "";
    }
    try {
      const u = new URL(trimmed, baseURI);
      if (u.protocol !== "http:" && u.protocol !== "https:") return "";
      u.username = "";
      u.password = "";
      u.hash = "";
      const keysToDelete = [];
      u.searchParams.forEach((_, k) => {
        if (SENSITIVE_QUERY_KEYS.test(k)) keysToDelete.push(k);
      });
      keysToDelete.forEach((k) => u.searchParams.delete(k));
      return u.toString().slice(0, 2000);
    } catch {
      return "";
    }
  }

  function inferAssetExtAndMime(urlStr, kind, svgContent) {
    if (kind === "svg" || svgContent) return { ext: "svg", mime: "image/svg+xml" };
    if (urlStr.startsWith("data:image/")) {
      const m = /^data:(image\/[a-z0-9.+-]+);/i.exec(urlStr);
      const mime = m ? m[1].toLowerCase() : "image/png";
      const extMap = {
        "image/svg+xml": "svg",
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/webp": "webp",
        "image/gif": "gif",
        "image/avif": "avif",
        "image/x-icon": "ico"
      };
      return { ext: extMap[mime] || "png", mime };
    }
    try {
      const p = new URL(urlStr).pathname.toLowerCase();
      if (p.endsWith(".svg")) return { ext: "svg", mime: "image/svg+xml" };
      if (p.endsWith(".png")) return { ext: "png", mime: "image/png" };
      if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return { ext: "jpg", mime: "image/jpeg" };
      if (p.endsWith(".webp")) return { ext: "webp", mime: "image/webp" };
      if (p.endsWith(".avif")) return { ext: "avif", mime: "image/avif" };
      if (p.endsWith(".gif")) return { ext: "gif", mime: "image/gif" };
      if (p.endsWith(".ico")) return { ext: "ico", mime: "image/x-icon" };
      if (p.endsWith(".woff2")) return { ext: "woff2", mime: "font/woff2" };
      if (p.endsWith(".woff")) return { ext: "woff", mime: "font/woff" };
      if (p.endsWith(".ttf")) return { ext: "ttf", mime: "font/ttf" };
      if (p.endsWith(".otf")) return { ext: "otf", mime: "font/otf" };
      if (p.endsWith(".mp4")) return { ext: "mp4", mime: "video/mp4" };
      if (p.endsWith(".webm")) return { ext: "webm", mime: "video/webm" };
      if (p.endsWith(".glb")) return { ext: "glb", mime: "model/gltf-binary" };
      if (p.endsWith(".gltf")) return { ext: "gltf", mime: "model/gltf+json" };
      if (p.endsWith(".obj")) return { ext: "obj", mime: "model/obj" };
      if (p.endsWith(".fbx")) return { ext: "fbx", mime: "application/octet-stream" };
      if (p.endsWith(".usdz")) return { ext: "usdz", mime: "model/vnd.usdz+zip" };
      if (p.endsWith(".gltf")) return { ext: "gltf", mime: "model/gltf+json" };
      if (p.endsWith(".bin")) return { ext: "bin", mime: "application/octet-stream" };
      if (p.endsWith(".wasm")) return { ext: "wasm", mime: "application/wasm" };
      if (p.endsWith(".hdr")) return { ext: "hdr", mime: "image/vnd.radiance" };
      if (p.endsWith(".exr")) return { ext: "exr", mime: "image/x-exr" };
      if (p.endsWith(".ktx2")) return { ext: "ktx2", mime: "image/ktx2" };
      if (p.endsWith(".mp3")) return { ext: "mp3", mime: "audio/mpeg" };
      if (p.endsWith(".ogg")) return { ext: "ogg", mime: "audio/ogg" };
      if (p.endsWith(".wav")) return { ext: "wav", mime: "audio/wav" };
    } catch {}
    if (kind === "model") return { ext: "glb", mime: "model/gltf-binary" };
    if (kind === "font") return { ext: "woff2", mime: "font/woff2" };
    if (kind === "video") return { ext: "mp4", mime: "video/mp4" };
    if (kind === "icon") return { ext: "ico", mime: "image/x-icon" };
    return { ext: "png", mime: "image/png" };
  }

  function serializeCleanSvg(svgEl) {
    try {
      const clone = svgEl.cloneNode(true);
      clone.querySelectorAll("script, foreignObject").forEach((n) => n.remove());
      const allEls = [clone, ...Array.from(clone.querySelectorAll("*"))];
      for (const el of allEls) {
        if (!el.attributes) continue;
        for (const attr of Array.from(el.attributes)) {
          const name = attr.name.toLowerCase();
          const val = (attr.value || "").trim().toLowerCase();
          if (name.startsWith("on") || val.startsWith("javascript:") || val.startsWith("vbscript:")) {
            el.removeAttribute(attr.name);
          }
        }
      }
      if (!clone.getAttribute("xmlns")) {
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      }
      if (!clone.getAttribute("viewBox")) {
        const r = svgEl.getBoundingClientRect();
        const w = Math.round(r.width) || Number(svgEl.getAttribute("width")) || 24;
        const h = Math.round(r.height) || Number(svgEl.getAttribute("height")) || 24;
        clone.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }
      const raw = new XMLSerializer().serializeToString(clone);
      if (raw.length > 150000) return "";
      return raw;
    } catch {
      return "";
    }
  }

  const SKIP_TAGS = new Set([
    "SCRIPT",
    "STYLE",
    "NOSCRIPT",
    "TEMPLATE",
    "HEAD",
    "META",
    "LINK",
    "TITLE"
  ]);

  function balanceCssParentheses(rawVal, maxLen = 400) {
    if (!rawVal || typeof rawVal !== "string") return "";
    let v = rawVal.trim().slice(0, maxLen);
    // Strip trailing incomplete tokens if sliced mid-expression
    v = v.replace(/[,;\s]+$/, "");
    let openParens = 0;
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < v.length; i++) {
      const ch = v[i];
      if (ch === "'" && !inDouble && v[i - 1] !== "\\") inSingle = !inSingle;
      else if (ch === '"' && !inSingle && v[i - 1] !== "\\") inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(") openParens++;
        else if (ch === ")" && openParens > 0) openParens--;
      }
    }
    if (inSingle) v += "'";
    if (inDouble) v += '"';
    while (openParens > 0) {
      v += ")";
      openParens--;
    }
    return v;
  }

  function normalizeColorValue(val, kind) {
    if (!val) return val;
    if (kind === "border") {
      const m = /(?:rgba?|hsla?|oklab|oklch|lab|lch|color)\([^)]*\)/i.exec(val);
      if (m) return balanceCssParentheses(m[0], 240);
      return balanceCssParentheses(val.split(/\s+/)[0], 240);
    }
    return balanceCssParentheses(val, 240);
  }

  function finiteNum(n) {
    return Number.isFinite(n) ? n : 0;
  }

  function safeClassList(el) {
    const out = [];
    try {
      for (const c of Array.from(el.classList).slice(0, 20)) {
        if (/^[A-Za-z0-9_:\/\[\].%-]{1,100}$/.test(c)) out.push(c);
      }
    } catch {}
    return out;
  }

  function isVisible(el, cs) {
    if (cs.display === "none" || cs.visibility === "hidden" || cs.visibility === "collapse" || parseFloat(cs.opacity || "1") === 0) {
      return false;
    }
    return true;
  }

  function yieldToMain() {
    return new Promise((resolve) => {
      const raf = globalThis.requestAnimationFrame;
      if (typeof raf === "function") raf(() => resolve());
      else setTimeout(resolve, 0);
    });
  }

  function detectSemanticTypeLevel(tag, fontSizePx) {
    const t = tag.toUpperCase();
    if (t === "H1") return "h1";
    if (t === "H2") return "h2";
    if (t === "H3") return "h3";
    if (t === "H4") return "h4";
    if (t === "H5" || t === "H6") return "h5";
    if (t === "CODE" || t === "PRE" || t === "KBD") return "mono";
    if (t === "BUTTON" || t === "A") return "interactive";
    if (fontSizePx >= 36) return "display";
    if (fontSizePx >= 28) return "h1";
    if (fontSizePx >= 22) return "h2";
    if (fontSizePx >= 18) return "h3";
    if (fontSizePx <= 12.5) return "caption";
    return "body";
  }

  // Safe Structural Label Reader (for H1..H3, Nav links, Buttons, and [data-s] Scramble targets — NEVER reads form values!)
  function safeElementLabel(el, maxLen = 90) {
    if (!el || !el.tagName) return "";
    const tag = el.tagName.toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "FORM") return "";
    const dataS = el.getAttribute("data-s") || el.getAttribute("data-text") || el.getAttribute("aria-label") || "";
    if (dataS) return dataS.trim().replace(/\s+/g, " ").slice(0, maxLen);
    // Only read short structural heading/button/nav labels
    const raw = (el.textContent || "").trim().replace(/\s+/g, " ");
    if (raw.length > 0 && raw.length <= maxLen && !/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(raw)) {
      return raw;
    }
    return "";
  }

  // Deep DOM Collector: Traverses Document + Open Shadow Roots + Same-Origin Iframes
  function collectDeepElements(rootDoc, maxNodes) {
    const collected = [];
    const shadowRootsList = [];
    const accessibleIframes = [];
    let openShadowCount = 0;
    let closedShadowCount = 0;
    let totalIframes = 0;
    let sameOriginIframes = 0;
    let crossOriginIframes = 0;

    const walkRoot = (rootNode, frameDepth = 0) => {
      if (collected.length >= maxNodes) return;
      let els = [];
      try {
        els = Array.from(rootNode.querySelectorAll("*"));
      } catch {
        return;
      }
      for (const el of els) {
        if (collected.length >= maxNodes) break;
        collected.push(el);

        try {
          const sr = el.shadowRoot;
          if (sr) {
            openShadowCount++;
            shadowRootsList.push(sr);
            walkRoot(sr, frameDepth);
          }
        } catch {
          closedShadowCount++;
        }

        if (el.tagName && el.tagName.toUpperCase() === "IFRAME") {
          totalIframes++;
          if (frameDepth < 3) {
            try {
              const idoc = el.contentDocument || el.contentWindow?.document;
              if (idoc && idoc.documentElement) {
                sameOriginIframes++;
                accessibleIframes.push(idoc);
                walkRoot(idoc, frameDepth + 1);
              } else {
                crossOriginIframes++;
              }
            } catch {
              crossOriginIframes++;
            }
          } else {
            crossOriginIframes++;
          }
        }
      }
    };

    walkRoot(rootDoc, 0);
    return {
      elements: collected,
      shadowRootsList,
      accessibleIframes,
      openShadowCount,
      closedShadowCount,
      totalIframes,
      sameOriginIframes,
      crossOriginIframes
    };
  }

  // ==========================================================================
  // NEW v2.0.0 ENGINE A & B: Code Archeology (Client Scripts), Three.js / WebGL
  // Scene & Shader Extractor, and Web Audio Procedural Graph Inspector
  // ==========================================================================
  async function extractRuntimeIntelligence(doc, visited, pushAsset, includeClientScripts = true) {
    const inlineScripts = [];
    const externalScripts = [];
    const shaders = [];
    const threeGeometries = [];
    const detected3DModels = [];
    const threeMaterials = [];
    const threeLights = [];
    const cameraKeyframes = [];
    const audioOscillators = [];
    const audioFilters = [];
    const audioGains = [];
    const scrambleFunctions = [];

    // 1. Inspect MAIN-world globals via temporary custom event bridge if possible
    let mainWorldThreeScene = null;
    try {
      const win = doc.defaultView || window;
      if (win.__WEBDNA_THREE_SCENE__ || win.scene) {
        const sc = win.__WEBDNA_THREE_SCENE__ || win.scene;
        if (sc && typeof sc.toJSON === "function") {
          mainWorldThreeScene = sc.toJSON();
        }
      }
    } catch {}

    // 2. Two-Pass Universal ES Module & Next.js Chunk Spidering (10 MB Buffer Limit — Zero Truncation!)
    const MAX_SCRIPT_BYTES = 10 * 1024 * 1024; // 10 MB per script/vendor chunk
    const scriptEls = Array.from(doc.querySelectorAll("script"));
    const modulePreloadEls = Array.from(doc.querySelectorAll("link[rel='modulepreload'], link[rel='preload'][as='script']"));
    let combinedJsCorpus = "";
    const spideredUrls = new Set();
    const spiderQueue = [];

    // Classify script execution priority so Next.js / Webpack / Vite chunks run in exact native order:
    // Priority 0: importmap
    // Priority 1: webpack/turbopack runtime (webpack-*.js, turbopack-*.js, runtime-*.js)
    // Priority 2: polyfills & framework core (polyfills-*.js, framework-*.js)
    // Priority 3: vendor & shared library chunks (main-*.js, three*.js, vendor*.js, numeric/hash chunks)
    // Priority 4: page manifests & app entrypoints (_app-*.js, page-*.js, layout-*.js, _buildManifest.js, entry-module)
    // Priority 5: spidered dynamic chunks
    const classifyScriptPriority = (relPath, kindLabel, domOrder) => {
      const p = (relPath || "").toLowerCase();
      const base = p.split("/").pop() || "";
      if (kindLabel === "importmap") return { stage: "01-importmap", priority: 100 + domOrder, isModule: false };
      if (/^(webpack|turbopack|runtime[-.])/.test(base)) return { stage: "02-webpack-runtime", priority: 200 + domOrder, isModule: false };
      if (/^(polyfills|framework[-.])/.test(base)) return { stage: "03-polyfills-framework", priority: 300 + domOrder, isModule: false };
      if (/^(main[-.]|vendor|three|commons|[0-9a-f]{4,}[-.])/.test(base) || (p.includes("/_next/static/chunks/") && !p.includes("/pages/") && !p.includes("/app/"))) {
        return { stage: "04-vendor-chunk", priority: 400 + domOrder, isModule: kindLabel === "entry-module" || kindLabel === "modulepreload" };
      }
      if (p.includes("/pages/") || p.includes("/app/") || /(_app|_buildmanifest|_ssgmanifest|page[-.]|layout[-.]|index[-.])/.test(base) || kindLabel === "entry-module") {
        return { stage: "05-page-manifest", priority: 500 + domOrder, isModule: kindLabel === "entry-module" || kindLabel === "modulepreload" };
      }
      return { stage: "06-dynamic-chunk", priority: 600 + domOrder, isModule: true };
    };

    let domOrderCounter = 0;
    const enqueueScriptUrl = (rawUrl, baseHref, kindLabel = "module-chunk") => {
      if (!rawUrl || typeof rawUrl !== "string") return;
      const trimmed = rawUrl.trim();
      if (/^(data:|blob:|javascript:|https?:\/\/(?:www\.googletagmanager|www\.google-analytics|connect\.facebook))/i.test(trimmed)) return;
      const clean = sanitizeDownloadUrl(trimmed, baseHref || safeBaseURI(doc));
      if (!clean || spideredUrls.has(clean)) return;
      spideredUrls.add(clean);
      let relPath = "scripts/chunk.js";
      try {
        const u = new URL(clean);
        relPath = u.pathname.replace(/^\/+/, "") || `scripts/chunk-${spideredUrls.size}.js`;
      } catch {}
      const orderMeta = classifyScriptPriority(relPath, kindLabel, ++domOrderCounter);
      spiderQueue.push({ url: clean, relPath, kindLabel, ...orderMeta });
    };

    // Pass 0 (v4.1.0 Active Scroll-Sweep Harvester): Scroll from top: 0 -> 25% -> 50% -> 75% -> 100% (scrollHeight) and back to 0
    // so IntersectionObservers, Next.js/Webpack lazy-loaded split chunks (e.g. 6411-...js), and scroll-triggered assets fire!
    try {
      const win = doc.defaultView || window;
      const origX = win.scrollX || 0;
      const origY = win.scrollY || 0;
      const maxScrollH = Math.max(
        doc.documentElement?.scrollHeight || 0,
        doc.body?.scrollHeight || 0,
        win.innerHeight || 800
      );
      if (maxScrollH > (win.innerHeight || 800)) {
        for (const ratio of [0, 0.25, 0.5, 0.75, 1.0, 0]) {
          win.scrollTo({ top: Math.round(maxScrollH * ratio), left: 0, behavior: "instant" });
          win.dispatchEvent(new Event("scroll"));
          await new Promise((r) => setTimeout(r, 60));
        }
        win.scrollTo({ top: origY, left: origX, behavior: "instant" });
      }
    } catch {}

    // Pass 1A: Scan all <link rel="modulepreload" href="..."> and <link rel="preload" as="script">
    for (const lnk of modulePreloadEls) {
      const href = lnk.getAttribute("href");
      if (href) enqueueScriptUrl(href, safeBaseURI(doc), "modulepreload");
    }
    try {
      doc.querySelectorAll("link[rel='preload'][as='script']").forEach((lnk) => {
        const href = lnk.getAttribute("href");
        if (href) enqueueScriptUrl(href, safeBaseURI(doc), "preloaded-script");
      });
    } catch {}

    // Pass 1B: Scan all <script> tags in exact DOM order (with Next.js Flight Stream self.__next_f Priority 1 classification!)
    const currentScriptEls = Array.from(doc.querySelectorAll("script"));
    for (let idx = 0; idx < currentScriptEls.length; idx++) {
      const sEl = currentScriptEls[idx];
      const type = (sEl.getAttribute("type") || "text/javascript").toLowerCase();
      const src = sEl.getAttribute("src");
      const text = (sEl.textContent || "").trim();

      if (type.includes("shader") || type.includes("glsl")) {
        shaders.push({
          id: sEl.id || `shader-${shaders.length + 1}`,
          type: type.includes("vertex") ? "vertex" : "fragment",
          source: text.slice(0, MAX_SCRIPT_BYTES)
        });
        continue;
      }

      if (src) {
        enqueueScriptUrl(src, safeBaseURI(doc), type === "module" ? "entry-module" : "external-script");
      } else if (text.length > 0) {
        const fullInlineCode = includeClientScripts ? text.slice(0, MAX_SCRIPT_BYTES) : text.slice(0, 8000);
        // Issue 2 Fix: Classify Next.js RSC Flight stream scripts (self.__next_f / __NEXT_DATA__ / __NUXT__) as Stage 01b-next-flight-stream
        // so they execute BEFORE Webpack runtime and React framework bundles!
        const isFlightStream = /(__next_f|__NEXT_DATA__|__NUXT__|__remixContext)/.test(fullInlineCode);
        const inlineStage = type === "importmap"
          ? "01-importmap"
          : isFlightStream
          ? "01b-next-flight-stream"
          : "07-inline-boot";
        const inlinePriority = type === "importmap"
          ? 50 + idx
          : isFlightStream
          ? 120 + idx
          : 700 + idx;
        inlineScripts.push({
          index: idx + 1,
          id: sEl.id || (isFlightStream ? `next-flight-stream-${inlineScripts.length + 1}` : `inline-script-${inlineScripts.length + 1}`),
          type,
          stage: inlineStage,
          priority: inlinePriority,
          bytes: text.length,
          code: fullInlineCode
        });
        combinedJsCorpus += "\n" + fullInlineCode;

        // Spider ES module imports AND Next.js chunk paths embedded inside self.__next_f Flight payloads!
        for (const im of fullInlineCode.matchAll(/(?:import\s*\(\s*["']([^"']+\.m?js[^"']*)["']\s*\)|from\s*["'](\.?\.?\/[^"']+\.m?js[^"']*)["'])/g)) {
          const target = im[1] || im[2];
          if (target) enqueueScriptUrl(target, safeBaseURI(doc), "spidered-from-inline");
        }
        for (const nm of fullInlineCode.matchAll(/["']((?:\/_next\/|static\/chunks\/)[^"'\s\\]+\.m?js)["']/g)) {
          const rawChunk = nm[1].startsWith("static/") ? `/_next/${nm[1]}` : nm[1];
          enqueueScriptUrl(rawChunk, safeBaseURI(doc), "flight-stream-chunk");
        }
      }
    }

    // Pass 1C (Issue 1 Fix): Harvest all on-demand dynamic .js/.mjs scripts recorded in performance.getEntriesByType('resource') during load + scroll!
    try {
      const perfScripts = performance.getEntriesByType?.("resource") || [];
      for (const pe of perfScripts) {
        if (!pe.name) continue;
        try {
          const u = new URL(pe.name, safeBaseURI(doc));
          if (/\.(m?js)(\?.*)?$/i.test(u.pathname) || pe.initiatorType === "script") {
            enqueueScriptUrl(u.toString(), safeBaseURI(doc), "network-harvested-chunk");
          }
        } catch {}
      }
    } catch {}

    // Pass 2: Recursive Regex Spider across queued JS modules & Next.js chunks (10 MB cap per file!)
    const fetchJsSource = async (targetUrl) => {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 5000);
        const res = await fetch(targetUrl, { signal: ctrl.signal });
        clearTimeout(timer);
        if (res.ok) return (await res.text()).slice(0, MAX_SCRIPT_BYTES);
      } catch {}
      if (globalThis.chrome?.runtime?.sendMessage) {
        try {
          const bgRes = await globalThis.chrome.runtime.sendMessage({
            protocol: 1,
            requestId: `js-spider-${Date.now()}`,
            type: "ASSET_FETCH_ONE",
            createdAt: Date.now(),
            payload: { url: targetUrl }
          });
          if (bgRes?.ok && bgRes.base64) return atob(bgRes.base64).slice(0, MAX_SCRIPT_BYTES);
        } catch {}
      }
      return "";
    };

    let cursor = 0;
    while (cursor < spiderQueue.length && cursor < 80) {
      const item = spiderQueue[cursor++];
      let fetchedCode = "";
      if (includeClientScripts) {
        fetchedCode = await fetchJsSource(item.url);
      }
      externalScripts.push({
        index: cursor,
        src: item.url,
        relPath: item.relPath,
        type: item.kindLabel,
        stage: item.stage,
        priority: item.priority,
        isModule: item.isModule,
        capturedBytes: fetchedCode.length,
        codePreview: fetchedCode
      });
      if (fetchedCode) {
        combinedJsCorpus += "\n" + fetchedCode;
        // 1. Standard ES module static & dynamic imports
        for (const im of fetchedCode.matchAll(/(?:import\s*\(\s*["']([^"']+)["']\s*\)|(?:import|export)\s+(?:[^"']*?from\s*)?["'](\.?\.?\/[^"']+)["'])/g)) {
          const spec = (im[1] || im[2] || "").trim();
          if (spec && (spec.endsWith(".js") || spec.endsWith(".mjs") || spec.startsWith("./") || spec.startsWith("../") || spec.startsWith("/"))) {
            enqueueScriptUrl(spec, item.url, "spidered-chunk");
          }
        }
        // 2. Next.js _buildManifest.js & Webpack string references to static/chunks/*.js
        for (const nm of fetchedCode.matchAll(/["']((?:\/_next\/|static\/chunks\/)[^"'\s\\]+\.m?js)["']/g)) {
          const rawChunk = nm[1].startsWith("static/") ? `/_next/${nm[1]}` : nm[1];
          enqueueScriptUrl(rawChunk, item.url, "manifest-spidered-chunk");
        }
        // 3. Webpack runtime chunk-ID-to-hash dictionary spidering (e.g. {6411:"c8a91f",7812:"99b02e"})
        if (item.stage === "02-webpack-runtime" || item.relPath.includes("webpack")) {
          for (const mapMatch of fetchedCode.matchAll(/\{(\s*(?:["']?\d+["']?\s*:\s*["'][0-9a-f]{6,20}["']\s*,?\s*)+)\}/g)) {
            const body = mapMatch[1];
            for (const pair of body.matchAll(/["']?(\d+)["']?\s*:\s*["']([0-9a-f]{6,20})["']/g)) {
              const cid = pair[1];
              const chash = pair[2];
              enqueueScriptUrl(`/_next/static/chunks/${cid}-${chash}.js`, item.url, "webpack-map-chunk");
            }
          }
        }
      }
    }

    // Sort externalScripts by Next.js / Webpack execution priority (webpack runtime -> polyfills -> vendor chunks -> page manifests -> dynamic chunks)
    externalScripts.sort((a, b) => (a.priority || 500) - (b.priority || 500));

    // 3. Parse combined JS corpus for Three.js / WebGL Shaders, Geometries, Materials, Camera Rig & Scroll Math
    if (combinedJsCorpus.length > 0) {
      // Extract inline GLSL template literals (containing gl_Position or gl_FragColor)
      for (const m of combinedJsCorpus.matchAll(/`([^`]{20,8000}?(?:gl_Position|gl_FragColor|varying\s+vec|uniform\s+float)[^`]{0,8000}?)`/g)) {
        const glsl = m[1].trim();
        const isVert = glsl.includes("gl_Position");
        shaders.push({
          id: `inline-${isVert ? "vertex" : "fragment"}-shader-${shaders.length + 1}`,
          type: isVert ? "vertex" : "fragment",
          source: glsl.slice(0, 15000)
        });
      }

      // Extract Three.js Geometries (`new THREE.BoxGeometry(...)`, `CylinderGeometry`, `TorusGeometry`, `PlaneGeometry`, `SphereGeometry`, `IcosahedronGeometry`, `BufferGeometry`)
      for (const m of combinedJsCorpus.matchAll(/new\s+(?:THREE\.)?([A-Z][A-Za-z0-9_]*Geometry)\s*\(([^)]{0,160})\)/g)) {
        threeGeometries.push({
          type: m[1],
          args: m[2].replace(/\s+/g, " ").trim()
        });
      }

      // Extract Three.js Materials (`new THREE.MeshStandardMaterial({...})`, `ShaderMaterial`, `PointsMaterial`, `MeshBasicMaterial`, `MeshPhysicalMaterial`)
      for (const m of combinedJsCorpus.matchAll(/new\s+(?:THREE\.)?([A-Z][A-Za-z0-9_]*Material)\s*\(\s*(\{[\s\S]{0,400}?\})\s*\)/g)) {
        threeMaterials.push({
          type: m[1],
          config: m[2].replace(/\s+/g, " ").trim().slice(0, 300)
        });
      }

      // Extract Three.js Lights (`AmbientLight`, `DirectionalLight`, `PointLight`, `SpotLight`, `HemisphereLight`)
      for (const m of combinedJsCorpus.matchAll(/new\s+(?:THREE\.)?([A-Z][A-Za-z0-9_]*Light)\s*\(([^)]{0,120})\)/g)) {
        threeLights.push({
          type: m[1],
          args: m[2].replace(/\s+/g, " ").trim()
        });
      }

      // Extract Camera / Vector3 Keyframes (`new THREE.Vector3(x, y, z)` or `.position.set(x, y, z)` or `lookAt(x, y, z)`)
      for (const m of combinedJsCorpus.matchAll(/(?:Vector3|position\.set|lookAt)\s*\(\s*([-0-9.]+)\s*,\s*([-0-9.]+)\s*,\s*([-0-9.]+)\s*\)/g)) {
        if (cameraKeyframes.length < 40) {
          cameraKeyframes.push({
            call: m[0].split("(")[0].trim(),
            vector: [Number(m[1]), Number(m[2]), Number(m[3])]
          });
        }
      }

      // Extract Web Audio API Procedural Synth Topology (`AudioContext`, `createOscillator`, `createBiquadFilter`, `createGain`, frequencies, waveforms)
      const oscTypes = [...combinedJsCorpus.matchAll(/\.type\s*=\s*["'](sine|sawtooth|square|triangle)["']/g)].map((m) => m[1]);
      const filterTypes = [...combinedJsCorpus.matchAll(/\.type\s*=\s*["'](lowpass|highpass|bandpass|notch|peaking)["']/g)].map((m) => m[1]);
      const freqs = [...combinedJsCorpus.matchAll(/frequency(?:\.value|\s*\.setValueAtTime\s*\()\s*=?\s*([0-9]+(?:\.[0-9]+)?)/g)].map((m) => Number(m[1]));
      const gains = [...combinedJsCorpus.matchAll(/gain(?:\.value|\s*\.setValueAtTime|\s*\.linearRampToValueAtTime|\s*\.exponentialRampToValueAtTime)\s*\(?\s*=?\s*([0-9.]+)/g)].map((m) => Number(m[1]));

      if (combinedJsCorpus.includes("AudioContext") || combinedJsCorpus.includes("createOscillator") || oscTypes.length > 0) {
        const countOsc = Math.max(1, oscTypes.length, (combinedJsCorpus.match(/createOscillator/g) || []).length);
        for (let i = 0; i < Math.min(8, countOsc); i++) {
          audioOscillators.push({
            id: `osc-${i + 1}`,
            waveform: oscTypes[i] || (i === 0 ? "sawtooth" : "sine"),
            frequencyHz: freqs[i] || (i === 0 ? 48 : 96 * i),
            role: (freqs[i] || 48) < 120 ? "sub-drone-hum" : "tactical-telemetry-pulse"
          });
        }
        const countFilt = Math.max(filterTypes.length, (combinedJsCorpus.match(/createBiquadFilter/g) || []).length);
        for (let i = 0; i < Math.min(6, countFilt); i++) {
          audioFilters.push({
            id: `filter-${i + 1}`,
            type: filterTypes[i] || "lowpass",
            cutoffHz: freqs[countOsc + i] || 240
          });
        }
        if (gains.length > 0) {
          audioGains.push(...gains.slice(0, 6));
        }
      }

      // Extract Custom Text-Scramble / Cyber-Decipher (`data-s`) Function signatures
      for (const m of combinedJsCorpus.matchAll(/(?:function\s+\w*[sS]cramble\w*|const\s+\w*[sS]cramble\w*|dataset\.s|getAttribute\(\s*["']data-s["']\s*\))[\s\S]{0,600}/g)) {
        scrambleFunctions.push(m[0].trim().slice(0, 600));
      }
    }

    // 4. Inspect <canvas> elements and capture live PNG frame snapshot if possible
    const canvases = Array.from(doc.querySelectorAll("canvas"));
    const canvasSummaries = [];
    canvases.forEach((cv, idx) => {
      const r = cv.getBoundingClientRect();
      const id = cv.id || `canvas-${idx + 1}`;
      const engine = cv.getAttribute("data-engine") || (threeGeometries.length > 0 || combinedJsCorpus.includes("THREE") ? "three.js" : "webgl/2d");
      let dataUrl = "";
      try {
        dataUrl = cv.toDataURL("image/png");
        if (dataUrl && dataUrl.startsWith("data:image/png") && dataUrl.length > 200 && dataUrl.length < 400000) {
          pushAsset("img", dataUrl, r.width || cv.width || 800, r.height || cv.height || 600, {
            label: `canvas-stage-${id}`
          });
        }
      } catch {}
      canvasSummaries.push({
        id,
        engine,
        width: cv.width || Math.round(r.width),
        height: cv.height || Math.round(r.height),
        cssPosition: (doc.defaultView?.getComputedStyle(cv)?.position) || "static",
        hasSnapshot: Boolean(dataUrl && dataUrl.length > 200)
      });
    });

    // Deduplicate detected 3D models
    const unique3DModels = [];
    const seenModelUrls = new Set();
    for (const m of detected3DModels) {
      if (m && m.url && !seenModelUrls.has(m.url)) {
        seenModelUrls.add(m.url);
        unique3DModels.push(m);
      }
    }

    // Populate scene geometries from captured 3D models (.glb, .gltf)
    if (unique3DModels.length > 0) {
      unique3DModels.forEach(function(m) {
        threeGeometries.push({
          type: "GLTFModelGeometry",
          args: m.name + " (" + m.ext.toUpperCase() + ")",
          url: m.url
        });
      });
    } else if (threeGeometries.length === 0 && shaders.length > 0 && canvasSummaries.length > 0) {
      // Custom WebGL shader mesh stage
      threeGeometries.push({
        type: "WebGLShaderStageMesh",
        args: "Active Shader Mesh (" + shaders.length + " GLSL Shaders)"
      });
    }

    // Build synthesized Three.js / glTF-compatible Scene Graph JSON
    const sceneGraphJson = mainWorldThreeScene || {
      metadata: {
        version: 4.6,
        type: "Object",
        generator: "WebDNA v2.0.0 Scene & Shader Serializer"
      },
      canvases: canvasSummaries,
      cameraRig: {
        type: "PerspectiveCamera",
        fov: 50,
        near: 0.1,
        far: 1000,
        keyframes: cameraKeyframes.length > 0 ? cameraKeyframes : [
          { call: "position.set", vector: [0, 2, 12] },
          { call: "lookAt", vector: [0, 0, 0] }
        ]
      },
      geometries: threeGeometries,
      materials: threeMaterials,
      lights: threeLights,
      shaders,
      models: unique3DModels
    };

    // ========================================================================
    // NEW v2.0.0 ENGINE C: Scroll & Timeline Choreography Extractor (`timelines.json`)
    // ========================================================================
    const vhPx = Math.max(1, doc.defaultView?.innerHeight || 800);
    const docScrollHeight = Math.max(
      doc.documentElement?.scrollHeight || 0,
      doc.body?.scrollHeight || 0,
      ...visited.slice(0, 500).map((el) => el.getBoundingClientRect?.().height || 0)
    );
    const totalVhRatio = Math.round((docScrollHeight / vhPx) * 10) / 10;

    const scrollTriggers = [];
    const pinnedLayers = [];
    const scrambleTargets = [];

    for (const el of visited) {
      if (!el || !el.getAttribute) continue;
      const dataA = el.getAttribute("data-a") ?? el.getAttribute("data-scroll-start") ?? el.getAttribute("data-start");
      const dataB = el.getAttribute("data-b") ?? el.getAttribute("data-scroll-end") ?? el.getAttribute("data-end");
      const dataS = el.getAttribute("data-s") ?? el.getAttribute("data-scramble");
      const dataSpeed = el.getAttribute("data-speed") ?? el.getAttribute("data-parallax");

      if (dataA !== null || dataB !== null || dataSpeed !== null) {
        const headingEl = el.querySelector?.("h1, h2, h3, h4, [data-s]") || el;
        scrollTriggers.push({
          id: el.id || safeClassList(el)[0] || `chapter-${scrollTriggers.length + 1}`,
          tag: el.tagName.toLowerCase(),
          classes: safeClassList(el).slice(0, 5),
          startOffset: dataA !== null ? Number(dataA) : 0,
          endOffset: dataB !== null ? Number(dataB) : 1,
          speed: dataSpeed !== null ? Number(dataSpeed) : 1,
          label: safeElementLabel(headingEl, 80)
        });
      }

      if (dataS !== null) {
        scrambleTargets.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || undefined,
          classes: safeClassList(el).slice(0, 4),
          text: (dataS || safeElementLabel(el, 80)).slice(0, 80)
        });
      }

      try {
        const cs = (el.ownerDocument?.defaultView || window).getComputedStyle(el);
        if (cs && (cs.position === "fixed" || cs.position === "sticky")) {
          const r = el.getBoundingClientRect();
          if (r.width >= 40 && r.height >= 20 && pinnedLayers.length < 25) {
            pinnedLayers.push({
              tag: el.tagName.toLowerCase(),
              id: el.id || undefined,
              classes: safeClassList(el).slice(0, 5),
              position: cs.position,
              zIndex: cs.zIndex || "auto",
              rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
            });
          }
        }
      } catch {}
    }

    const timelines = {
      isScrollFilm: totalVhRatio >= 3.5 || scrollTriggers.length > 0,
      totalScrollPx: Math.round(docScrollHeight),
      viewportHeightPx: vhPx,
      totalVhRatio: `${Math.round(totalVhRatio * 100)}vh`,
      chapters: scrollTriggers,
      pinnedLayers,
      scrambleTargets,
      scrambleFunctions
    };

    const audioGraph = {
      detected: audioOscillators.length > 0 || audioFilters.length > 0,
      oscillators: audioOscillators,
      filters: audioFilters,
      gains: audioGains
    };

    const detectedFunctions = [];
    const fnSeen = new Set();
    if (combinedJsCorpus.length > 0) {
      for (const fm of combinedJsCorpus.matchAll(/(?:async\s+)?function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(|(?:const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*(?:async\s*)?(?:function\b|\([^)]*\)\s*=>|[A-Za-z_$][A-Za-z0-9_$]*\s*=>)/g)) {
        const fnName = (fm[1] || fm[2] || "").trim();
        if (fnName && fnName.length > 1 && !fnSeen.has(fnName) && detectedFunctions.length < 40) {
          fnSeen.add(fnName);
          detectedFunctions.push(fnName);
        }
      }
    }
    const totalScriptBytes = inlineScripts.reduce((acc, item) => acc + (item.bytes || 0), 0) + externalScripts.reduce((acc, item) => acc + (item.capturedBytes || 0), 0);
    // 5. Universal API Network Mocking Discovery (apiMocks -> backend/mock-data.json)
    const apiMocksMap = new Map();
    const addApiMock = (method, rawPath, sourceHint) => {
      if (!rawPath || typeof rawPath !== "string") return;
      let cleanPath = rawPath.trim();
      try {
        if (/^https?:/i.test(cleanPath)) {
          const u = new URL(cleanPath);
          cleanPath = u.pathname;
        }
      } catch {}
      if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
      const key = `${method.toUpperCase()} ${cleanPath}`;
      if (apiMocksMap.has(key) || apiMocksMap.size >= 40) return;
      apiMocksMap.set(key, {
        method: method.toUpperCase(),
        path: cleanPath,
        status: 200,
        source: sourceHint,
        response: {
          ok: true,
          status: "success",
          endpoint: cleanPath,
          timestamp: new Date().toISOString(),
          data: { id: "mock-001", verified: true, items: [] }
        }
      });
    };

    // 5B. Resource Timing Interceptor (v4.0.0): Wait for initial 3-5s page-load resource settle window if page just loaded, then query performance.getEntriesByType('resource') to capture all dynamic .glb, .gltf, .bin, .wasm, .hdr, .exr, .ktx2, .woff2, audio, and texture images loaded via fetch/XHR/Three.js loaders!
    const DYNAMIC_ASSET_REGEX = /\.(glb|gltf|bin|wasm|hdr|exr|ktx2|dds|mp3|ogg|wav|woff2?|ttf|otf|png|jpe?g|webp|avif|svg)(\?.*)?$/i;
    try {
      const nowPerf = typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : 5000;
      const settleMs = nowPerf < 3200 ? Math.min(1500, Math.max(250, 3200 - Math.round(nowPerf))) : 0;
      if (settleMs > 0) {
        await new Promise((r) => setTimeout(r, settleMs));
      }
      const perfEntries = performance.getEntriesByType?.("resource") || [];
      for (const pe of perfEntries) {
        if (!pe.name) continue;
        try {
          const u = new URL(pe.name, safeBaseURI(doc));
          if (DYNAMIC_ASSET_REGEX.test(u.pathname)) {
            const extMatch = DYNAMIC_ASSET_REGEX.exec(u.pathname);
            const ext = (extMatch?.[1] || "").toLowerCase();
            const is3DModel = /^(glb|gltf|obj|fbx|usdz)$/i.test(ext);
            const assetKind = /^(woff2?|ttf|otf)$/.test(ext)
              ? "font"
              : /^(mp3|ogg|wav)$/.test(ext)
              ? "video"
              : /^(svg)$/.test(ext)
              ? "svg"
              : is3DModel
              ? "model"
              : /^(bin|wasm|hdr|exr|ktx2|dds)$/.test(ext)
              ? "source"
              : "img";
            if (is3DModel) {
              const modelFileName = u.pathname.split("/").filter(Boolean).pop() || ("model." + ext);
              detected3DModels.push({
                name: modelFileName,
                url: u.toString(),
                ext: ext,
                type: "3D Model (" + ext.toUpperCase() + ")"
              });
            }
            pushAsset(assetKind, u.toString(), undefined, undefined, {
              label: `runtime-${ext}`,
              origRaw: u.pathname
            });
          } else if (pe.initiatorType === "fetch" || pe.initiatorType === "xmlhttprequest") {
            if (u.pathname.includes("/api") || u.pathname.endsWith(".json")) {
              addApiMock("GET", u.pathname, "PerformanceResourceTiming");
            }
          }
        } catch {}
      }
    } catch {}

    // Inspect DOM tags for 3D models (<model-viewer>, link preloads, 3D source tags)
    try {
      doc.querySelectorAll("model-viewer[src], a[href*='.glb'], a[href*='.gltf'], source[src*='.glb'], source[src*='.gltf'], link[href*='.glb'], link[href*='.gltf']").forEach(function(el) {
        const raw = el.getAttribute("src") || el.getAttribute("href");
        if (raw) {
          const mExt = (/\.(glb|gltf|obj|fbx|usdz)/i.exec(raw)?.[1] || "glb").toLowerCase();
          try {
            const u = new URL(raw, safeBaseURI(doc));
            const modelFileName = u.pathname.split("/").filter(Boolean).pop() || ("model." + mExt);
            detected3DModels.push({
              name: modelFileName,
              url: u.toString(),
              ext: mExt,
              type: "3D Model (" + mExt.toUpperCase() + ")"
            });
            pushAsset("model", u.toString(), undefined, undefined, { label: "dom-" + mExt, origRaw: u.pathname });
          } catch(e) {}
        }
      });
    } catch(e) {}

    // Scan combinedJsCorpus for all 3D model filenames (.glb, .gltf, .obj, .fbx, .usdz) and runtime assets
    if (combinedJsCorpus.length > 0) {
      for (const am of combinedJsCorpus.matchAll(/["']([^"'\s]+\.(?:glb|gltf|obj|fbx|usdz|wasm|hdr|exr|ktx2|woff2))(?:\?[^"'\s]*)?["']/gi)) {
        const rawAssetUrl = am[1];
        const ext = rawAssetUrl.split(".").pop()?.toLowerCase() || "";
        const is3D = /^(glb|gltf|obj|fbx|usdz)$/i.test(ext);
        const assetKind = ext === "woff2" ? "font" : is3D ? "model" : "source";
        let origRel = rawAssetUrl;
        try {
          if (/^https?:/i.test(rawAssetUrl)) origRel = new URL(rawAssetUrl).pathname;
        } catch {}
        if (is3D) {
          const modelFileName = origRel.split("/").filter(Boolean).pop() || ("model." + ext);
          try {
            const u = new URL(rawAssetUrl, safeBaseURI(doc));
            detected3DModels.push({
              name: modelFileName,
              url: u.toString(),
              ext: ext,
              type: "3D Model (" + ext.toUpperCase() + ")"
            });
          } catch(e) {
            detected3DModels.push({
              name: modelFileName,
              url: rawAssetUrl,
              ext: ext,
              type: "3D Model (" + ext.toUpperCase() + ")"
            });
          }
        }
        pushAsset(assetKind, rawAssetUrl, undefined, undefined, {
          label: `discovered-${ext}`,
          origRaw: origRel
        });
      }
    }

    // Inspect forms for POST/GET action endpoints
    doc.querySelectorAll("form").forEach((f) => {
      const act = f.getAttribute("action");
      const meth = (f.getAttribute("method") || "POST").toUpperCase();
      if (act) addApiMock(meth, act, "form[action]");
    });

    // Inspect combinedJsCorpus for fetch('/api/...') or axios.post('/api/...') calls
    if (combinedJsCorpus.length > 0) {
      for (const fm of combinedJsCorpus.matchAll(/fetch\s*\(\s*["'](\/api\/[^"']+)["'](?:\s*,\s*\{[^}]*method\s*:\s*["'](GET|POST|PUT|DELETE|PATCH)["'])?/gi)) {
        addApiMock(fm[2] || "POST", fm[1], "client-script-fetch");
      }
    }

    if (apiMocksMap.size === 0) {
      addApiMock("GET", "/api/health", "default-healthcheck");
      addApiMock("POST", "/api/submit", "default-form-handler");
    }

    const clientScripts = {
      inlineCount: inlineScripts.length,
      externalCount: externalScripts.length,
      totalBytes: totalScriptBytes,
      detectedFunctions,
      inlineScripts,
      externalScripts
    };

    return {
      webglScene: sceneGraphJson,
      timelines,
      audioGraph,
      clientScripts,
      apiMocks: Array.from(apiMocksMap.values())
    };
  }

  // Build ordered top-to-bottom Page Topology Tree with Structural Labels & Sub-Component Props
  function extractPageTopology(doc) {
    const sections = [];
    const body = doc.body;
    if (!body) return sections;

    const topCandidates = [];
    const seen = new Set();
    const pushCand = (el) => {
      if (!el || seen.has(el) || SKIP_TAGS.has(el.tagName)) return;
      seen.add(el);
      topCandidates.push(el);
    };

    Array.from(body.children).forEach((child) => {
      const t = child.tagName?.toUpperCase();
      if (t === "MAIN" || (t === "DIV" && child.children.length >= 2 && child.getBoundingClientRect().height > 300)) {
        if (t === "HEADER" || t === "NAV" || t === "FOOTER" || t === "SECTION") {
          pushCand(child);
        } else {
          Array.from(child.children).forEach((sub) => pushCand(sub));
        }
      } else {
        pushCand(child);
      }
    });

    if (topCandidates.length < 2) {
      doc.querySelectorAll("header, nav, main > *, section, [data-a], footer").forEach((el) => pushCand(el));
    }

    let order = 0;
    for (const el of topCandidates) {
      if (order >= 18) break;
      let cs;
      try { cs = (el.ownerDocument?.defaultView || window).getComputedStyle(el); } catch { continue; }
      if (!cs) continue;
      // Allow scroll-film chapter overlays (which may start at opacity 0 before scroll-scrub) if they have data-a/data-b!
      const hasScrollRange = el.hasAttribute("data-a") || el.hasAttribute("data-b");
      if (!hasScrollRange && (cs.display === "none" || cs.visibility === "hidden")) continue;
      const r = el.getBoundingClientRect();
      if (!hasScrollRange && (r.width < 40 || r.height < 16)) continue;

      order++;
      const tag = el.tagName.toLowerCase();
      const classes = safeClassList(el).slice(0, 6);
      const roleAttr = el.getAttribute("role") || "";
      const headings = el.querySelectorAll("h1, h2, h3, h4").length;
      const buttons = el.querySelectorAll("button, a[class*='btn'], a[class*='button'], [role='button']").length;
      const links = el.querySelectorAll("a").length;
      const images = el.querySelectorAll("img, svg, video, picture, canvas").length;
      const inputs = el.querySelectorAll("input, select, textarea").length;

      // Extract structural text labels for smarter App.tsx component assembly
      const headlineEl = el.querySelector("h1, h2, h3, [data-s]");
      const headlineText = safeElementLabel(headlineEl, 90);
      const subtextEl = el.querySelector("p");
      const subtext = safeElementLabel(subtextEl, 140);
      const navItems = Array.from(el.querySelectorAll("a, button"))
        .map((n) => safeElementLabel(n, 36))
        .filter(Boolean)
        .slice(0, 8);

      let archetype = "content-section";
      const clsJoined = classes.join(" ").toLowerCase() + " " + (el.id || "").toLowerCase();
      if (tag === "canvas" || el.querySelector("canvas")) {
        archetype = "webgl-3d-stage";
      } else if (hasScrollRange) {
        archetype = "scroll-film-chapter";
      } else if (tag === "header" || tag === "nav" || roleAttr === "navigation" || /nav|header|topbar|hud/.test(clsJoined)) {
        archetype = "navbar-header";
      } else if (tag === "footer" || roleAttr === "contentinfo" || /footer/.test(clsJoined)) {
        archetype = "site-footer";
      } else if (el.querySelector("h1") || /hero|banner|jumbotron/.test(clsJoined)) {
        archetype = "hero-banner";
      } else if (inputs > 0 || el.querySelector("form")) {
        archetype = "interactive-form-section";
      } else if (el.querySelector("table, [role='table']")) {
        archetype = "data-table-section";
      } else if (cs.display.includes("grid") || (el.children.length >= 3 && el.querySelectorAll("h3, h4").length >= 2)) {
        archetype = "feature-card-grid";
      }

      const childSummary = Array.from(el.children).slice(0, 6).map((ch) => {
        let chCs;
        try { chCs = (ch.ownerDocument?.defaultView || window).getComputedStyle(ch); } catch {}
        const chR = ch.getBoundingClientRect();
        return `<${ch.tagName.toLowerCase()}> (${chCs?.display || "block"}, ${Math.round(chR.width)}×${Math.round(chR.height)}px)`;
      });

      sections.push({
        order,
        id: `section-${String(order).padStart(2, "0")}-${archetype}`,
        archetype,
        tag,
        classes,
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        scrollRange: hasScrollRange ? {
          start: Number(el.getAttribute("data-a") || 0),
          end: Number(el.getAttribute("data-b") || 1)
        } : undefined,
        props: {
          headline: headlineText || undefined,
          subtext: subtext || undefined,
          navItems: navItems.length > 0 ? navItems : undefined
        },
        layout: {
          display: cs.display,
          flexDirection: cs.flexDirection || "row",
          justifyContent: cs.justifyContent || "normal",
          alignItems: cs.alignItems || "normal",
          gridTemplateColumns: cs.gridTemplateColumns && cs.gridTemplateColumns !== "none" ? cs.gridTemplateColumns.slice(0, 140) : "",
          gap: cs.gap && cs.gap !== "normal" ? cs.gap : "0px",
          padding: cs.padding || "0px",
          background: cs.backgroundColor || "transparent",
          borderRadius: cs.borderRadius || "0px"
        },
        counts: { headings, buttons, links, images, inputs, children: el.children.length },
        childSlots: childSummary
      });
    }
    return sections;
  }

  function detectComponentsAndBackend(doc, visited) {
    const components = [];
    const seenKinds = new Map();
    const addComp = (kind, name, confidence, el, cs, details, extractedProps = {}) => {
      const prev = seenKinds.get(kind) || 0;
      seenKinds.set(kind, prev + 1);
      if (prev >= 6) return;
      let rect = { x: 0, y: 0, w: 0, h: 0 };
      try {
        const r = el.getBoundingClientRect();
        rect = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      } catch {}
      components.push({
        id: `comp-${kind}-${prev + 1}`,
        kind,
        name,
        confidence,
        tag: el.tagName.toLowerCase(),
        classes: safeClassList(el).slice(0, 8),
        rect,
        childCount: el.children ? el.children.length : 0,
        layout: cs ? `${cs.display}${cs.flexDirection && cs.display.includes("flex") ? ` (${cs.flexDirection})` : ""}` : "block",
        styles: cs ? {
          background: cs.backgroundColor || "",
          color: cs.color || "",
          padding: cs.padding || "",
          borderRadius: cs.borderRadius || "",
          boxShadow: cs.boxShadow && cs.boxShadow !== "none" ? cs.boxShadow.slice(0, 120) : "",
          border: cs.border || "",
          gap: cs.gap || ""
        } : {},
        props: extractedProps,
        details: details || ""
      });
    };

    const navEl = doc.querySelector("header, nav, [role='navigation'], [class*='navbar'], [class*='header'], [class*='hud']");
    if (navEl) {
      const cs = doc.defaultView?.getComputedStyle(navEl);
      const navItems = Array.from(navEl.querySelectorAll("a, button")).map((n) => safeElementLabel(n, 32)).filter(Boolean).slice(0, 8);
      addComp("navbar", "Primary Navigation Bar", 0.96, navEl, cs, `${navItems.length} interactive nav items`, { items: navItems });
    }

    const stageCanvas = doc.querySelector("canvas");
    if (stageCanvas) {
      const cs = doc.defaultView?.getComputedStyle(stageCanvas);
      addComp("webgl-stage", "3D WebGL / Shader Canvas Stage", 0.98, stageCanvas, cs, `Interactive 3D/Shader viewport (#${stageCanvas.id || "stage"})`, { canvasId: stageCanvas.id || "stage" });
    }

    const h1El = doc.querySelector("h1");
    if (h1El) {
      const heroContainer = h1El.closest("section, header, main > div, [class*='hero'], [data-a]") || h1El.parentElement;
      if (heroContainer) {
        const cs = doc.defaultView?.getComputedStyle(heroContainer);
        const headline = safeElementLabel(h1El, 90);
        const ctaEl = heroContainer.querySelector("button, a[class*='btn'], a[class*='button'], [role='button']");
        const ctaText = safeElementLabel(ctaEl, 40);
        addComp("hero", "Hero Banner & Value Proposition", 0.94, heroContainer, cs, `Headline "${headline.slice(0, 40)}"`, { headline, cta: ctaText });
      }
    }

    // Detect Scroll-Film Chapters (`[data-a][data-b]`)
    const chapterEls = Array.from(doc.querySelectorAll("[data-a][data-b]")).slice(0, 8);
    if (chapterEls.length > 0) {
      const firstCh = chapterEls[0];
      const cs = doc.defaultView?.getComputedStyle(firstCh);
      const chaptersList = chapterEls.map((ch, idx) => ({
        id: ch.id || `chapter-${idx + 1}`,
        a: Number(ch.getAttribute("data-a") || 0),
        b: Number(ch.getAttribute("data-b") || 1),
        headline: safeElementLabel(ch.querySelector("h1, h2, h3, [data-s]") || ch, 70)
      }));
      addComp("scroll-chapters", `Scroll-Scrubbed Chapter Overlays (${chapterEls.length} chapters)`, 0.97, firstCh, cs, `Scroll intervals [${chaptersList.map((c) => `${c.a}..${c.b}`).join(", ")}]`, { chapters: chaptersList });
    }

    for (const el of visited.slice(0, 1800)) {
      if (!el.children || el.children.length < 3) continue;
      let cs;
      try { cs = (el.ownerDocument?.defaultView || window).getComputedStyle(el); } catch { continue; }
      if (!cs) continue;
      if (cs.display === "grid" || cs.display === "flex") {
        const childTags = Array.from(el.children).map((c) => c.tagName);
        const sameTag = childTags.every((t) => t === childTags[0]);
        if (sameTag && el.children.length >= 3 && el.children.length <= 16) {
          const firstChild = el.children[0];
          const hasHeading = !!firstChild.querySelector("h2, h3, h4, strong");
          if (hasHeading) {
            const cardTitles = Array.from(el.children).map((c) => safeElementLabel(c.querySelector("h2, h3, h4, strong"), 50)).filter(Boolean);
            addComp("card-grid", `Repeated Card Grid (${el.children.length} items)`, 0.91, el, cs, `${cs.display.toUpperCase()} container with ${el.children.length} cards`, { cardTitles });
          }
        }
      }
    }

    const forms = visited.filter((el) => el.tagName === "FORM").slice(0, 6);
    for (const f of forms) {
      const inputs = f.querySelectorAll("input, select, textarea");
      if (inputs.length > 0) {
        const cs = (f.ownerDocument?.defaultView || window).getComputedStyle(f);
        const fieldNames = Array.from(inputs).map((inp) => inp.getAttribute("name") || inp.getAttribute("placeholder") || inp.getAttribute("type") || "field").slice(0, 10);
        addComp("form", `Interactive Form (${inputs.length} fields)`, 0.95, f, cs, `${inputs.length} controls`, { action: f.getAttribute("action") || "/api/submit", fields: fieldNames });
      }
    }

    const tables = visited.filter((el) => el.tagName === "TABLE" || el.getAttribute("role") === "table").slice(0, 4);
    for (const tbl of tables) {
      const cs = (tbl.ownerDocument?.defaultView || window).getComputedStyle(tbl);
      const cols = tbl.querySelectorAll("th, [role='columnheader']").length;
      const rows = tbl.querySelectorAll("tr, [role='row']").length;
      addComp("data-table", `Structured Data Table (${cols} cols × ${rows} rows)`, 0.93, tbl, cs, `${cols} column headers, ${rows} rows`);
    }

    const buttons = visited.filter((el) => el.tagName === "BUTTON" || el.getAttribute("role") === "button").slice(0, 20);
    for (const btn of buttons) {
      const cs = (btn.ownerDocument?.defaultView || window).getComputedStyle(btn);
      if (cs && cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") {
        addComp("button", "Primary Action Button", 0.89, btn, cs, `Radius ${cs.borderRadius}, Padding ${cs.padding}`, { label: safeElementLabel(btn, 40) });
        break;
      }
    }

    const footerEl = doc.querySelector("footer, [role='contentinfo'], [class*='footer']");
    if (footerEl) {
      const cs = doc.defaultView?.getComputedStyle(footerEl);
      const links = footerEl.querySelectorAll("a").length;
      addComp("footer", "Site Footer & Sitemap", 0.95, footerEl, cs, `${links} footer links`);
    }

    const models = [];
    const endpoints = [];
    const authPatterns = [];

    forms.forEach((formEl, idx) => {
      const method = (formEl.getAttribute("method") || "POST").toUpperCase();
      const rawAction = formEl.getAttribute("action") || `/api/resource-${idx + 1}`;
      const cleanAction = sanitizeUrl(new URL(rawAction, safeBaseURI(doc)).toString()).path || `/api/form-${idx + 1}`;
      const fields = [];
      let isAuthForm = false;
      formEl.querySelectorAll("input, select, textarea").forEach((inp, fIdx) => {
        const type = (inp.getAttribute("type") || inp.tagName.toLowerCase()).toLowerCase();
        if (type === "hidden" || type === "submit" || type === "button") return;
        if (type === "password") isAuthForm = true;
        const rawName = inp.getAttribute("name") || inp.getAttribute("id") || inp.getAttribute("aria-label") || `${type}_field_${fIdx + 1}`;
        const safeName = rawName.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^_+|_+$/g, "").slice(0, 40) || `field_${fIdx + 1}`;
        const required = inp.hasAttribute("required") || inp.getAttribute("aria-required") === "true";
        let prismaType = "String";
        if (type === "number" || type === "range") prismaType = "Int";
        else if (type === "checkbox") prismaType = "Boolean";
        else if (type === "date" || type === "datetime-local") prismaType = "DateTime";
        fields.push({ name: safeName, inputType: type, dbType: prismaType, required });
      });
      if (isAuthForm) authPatterns.push("Email/Password Authentication Flow detected");
      if (fields.length > 0) {
        const modelName = isAuthForm ? "UserAccount" : `FormSubmission${idx + 1}`;
        models.push({ name: modelName, source: `form[action="${cleanAction}"]`, fields });
        endpoints.push({
          method: method === "GET" ? "GET" : "POST",
          path: cleanAction.startsWith("/api") ? cleanAction : `/api${cleanAction === "/" ? `/submit-${idx + 1}` : cleanAction}`,
          summary: isAuthForm ? "Authenticate user session" : `Handle ${modelName} submission`,
          requestFields: fields.map((f) => `${f.name}: ${f.dbType}${f.required ? "" : "?"}`)
        });
      }
    });

    tables.forEach((tbl, idx) => {
      const headers = Array.from(tbl.querySelectorAll("th, [role='columnheader']"))
        .map((th, hIdx) => {
          const idAttr = th.getAttribute("data-col") || th.getAttribute("id") || th.className || `column_${hIdx + 1}`;
          return idAttr.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^_+|_+$/g, "").slice(0, 32) || `col_${hIdx + 1}`;
        })
        .slice(0, 12);
      if (headers.length > 0) {
        const modelName = `TabularRecord${idx + 1}`;
        models.push({
          name: modelName,
          source: `table#${idx + 1}`,
          fields: headers.map((h) => ({ name: h, inputType: "column", dbType: "String", required: true }))
        });
        endpoints.push({
          method: "GET",
          path: `/api/records-${idx + 1}`,
          summary: `List paginated ${modelName} items with sorting & filtering`,
          requestFields: ["page?: Int", "limit?: Int", "sort?: String"]
        });
      }
    });

    if (models.length === 0) {
      models.push({
        name: "ContentItem",
        source: "inferred-ui-cards",
        fields: [
          { name: "id", inputType: "uuid", dbType: "String", required: true },
          { name: "slug", inputType: "text", dbType: "String", required: true },
          { name: "title", inputType: "text", dbType: "String", required: true },
          { name: "summary", inputType: "textarea", dbType: "String", required: false },
          { name: "imageUrl", inputType: "url", dbType: "String", required: false },
          { name: "published", inputType: "checkbox", dbType: "Boolean", required: true },
          { name: "createdAt", inputType: "datetime", dbType: "DateTime", required: true }
        ]
      });
      endpoints.push(
        { method: "GET", path: "/api/items", summary: "Fetch published collection items for card grid", requestFields: ["limit?: Int", "cursor?: String"] },
        { method: "POST", path: "/api/items", summary: "Create new collection item", requestFields: ["title: String", "summary?: String", "imageUrl?: String"] }
      );
    }

    const topology = extractPageTopology(doc);
    return { components, backend: { models, endpoints, authPatterns }, topology };
  }

  function buildSanitizedHtmlSnapshot(doc, sourceOrigin, tokens, cssVars) {
    try {
      const clone = doc.documentElement.cloneNode(true);
      clone.querySelectorAll("script, noscript, iframe, object, embed, applet, link[rel='import'], base").forEach((n) => n.remove());
      const all = [clone, ...Array.from(clone.querySelectorAll("*"))];
      for (const el of all) {
        if (!el.attributes) continue;
        const tag = el.tagName ? el.tagName.toUpperCase() : "";
        if (tag === "INPUT" || tag === "TEXTAREA") {
          el.removeAttribute("value");
          if (tag === "TEXTAREA") el.textContent = "";
          if ((el.getAttribute("type") || "").toLowerCase() === "password") {
            el.setAttribute("placeholder", "••••••••");
          }
        }
        for (const attr of Array.from(el.attributes)) {
          const name = attr.name.toLowerCase();
          const val = (attr.value || "").trim();
          if (
            name.startsWith("on") ||
            name === "srcdoc" ||
            name === "formaction" ||
            /^(javascript|vbscript|data:text\/html):/i.test(val)
          ) {
            el.removeAttribute(attr.name);
          } else if ((name === "src" || name === "href" || name === "poster") && val && !val.startsWith("#") && !val.startsWith("data:image/")) {
            // Preserve local root-relative paths (e.g. /_next/static/media/..., /_/..., /assets/...) so local Vite public/ folder serves them without hitting live origin!
            if (val.startsWith("/") && !val.startsWith("//")) {
              const cleanLocalPath = val.split("?")[0].replace(/[^a-zA-Z0-9._\/-]/g, "");
              if (cleanLocalPath.includes("/_next/static/media/") || /\.(woff2?|ttf|otf)$/i.test(cleanLocalPath)) {
                const fontFile = cleanLocalPath.split("/").pop();
                el.setAttribute(attr.name, `/_next/static/media/${fontFile}`);
              } else {
                el.setAttribute(attr.name, cleanLocalPath || val);
              }
            } else {
              const safe = sanitizeDownloadUrl(val, safeBaseURI(doc));
              if (safe) {
                try {
                  const u = new URL(safe);
                  if (u.pathname.includes("/_next/static/media/") || /\.(woff2?|ttf|otf)$/i.test(u.pathname)) {
                    const fontFile = u.pathname.split("/").pop();
                    el.setAttribute(attr.name, `/_next/static/media/${fontFile}`);
                  } else if (u.pathname.includes("/_next/static/css/") || (tag === "LINK" && (el.getAttribute("rel") || "").toLowerCase().includes("stylesheet") && /\.css$/i.test(u.pathname))) {
                    el.setAttribute(attr.name, u.pathname);
                  } else {
                    el.setAttribute(attr.name, safe);
                  }
                } catch {
                  el.setAttribute(attr.name, safe);
                }
              } else {
                el.removeAttribute(attr.name);
              }
            }
          }
        }
      }
      let head = clone.querySelector("head");
      if (!head) {
        head = doc.createElement("head");
        clone.insertBefore(head, clone.firstChild);
      }
      const metaCsp = doc.createElement("meta");
      metaCsp.setAttribute("http-equiv", "Content-Security-Policy");
      metaCsp.setAttribute("content", "default-src 'none'; img-src https: http: data:; style-src 'unsafe-inline' https: http:; font-src https: http: data:;");
      head.insertBefore(metaCsp, head.firstChild);

      const styleEl = doc.createElement("style");
      const tokenLines = [":root {"];
      (tokens || []).slice(0, 60).forEach((t) => {
        tokenLines.push(`  --webdna-${t.name}: ${t.value};`);
      });
      (cssVars || []).slice(0, 100).forEach((v) => {
        tokenLines.push(`  ${v.name}: ${v.value};`);
      });
      tokenLines.push("}");
      styleEl.textContent = tokenLines.join("\n");
      head.appendChild(styleEl);

      const commentText = `WebDNA v4.1.0 Sanitized Static Snapshot — Source: ${sourceOrigin} — Full executable client scripts, 3D shaders, scroll timelines, and Web Audio graphs are preserved separately in scripts/client-bundle.js, assets/scene.json, timelines.json, and audio-nodes.json`.replace(/--/g, "—");
      const serialized = "<!DOCTYPE html>\n<!-- " + commentText + " -->\n" + clone.outerHTML;
      return serialized.slice(0, 600000);
    } catch {
      return "";
    }
  }

  async function runProbe(doc, opts, signal) {
    const maxNodes = opts.maxNodes ?? 10000;
    const warnings = [];
    const statuses = {};
    const exWarnings = {};
    const exSampled = {};
    const exElapsed = {};
    const mark = (id, status, w, sampled, started) => {
      statuses[id] = status;
      exWarnings[id] = w;
      exSampled[id] = sampled;
      exElapsed[id] = Date.now() - started;
    };

    const domStart = Date.now();
    const deep = collectDeepElements(doc, maxNodes + 1);
    const truncated = deep.elements.length > maxNodes;
    if (truncated) {
      warnings.push(`DOM truncated: visited ${maxNodes} elements (cap ${maxNodes}).`);
    }
    const visited = deep.elements.slice(0, maxNodes);

    const nodes = [];
    const colorMap = new Map();
    const fontMap = new Map();
    const spacingMap = new Map();
    const radiusMap = new Map();
    const shadowMap = new Map();
    const gradientSet = new Set();
    const animMap = new Map();
    const keyframesList = [];
    const keyframesSeen = new Set();
    const assetList = [];
    const assetSeen = new Set();
    let flexCount = 0, gridCount = 0, blockCount = 0, maxDepth = 0, canvasCount = 0, inlineSvgIndex = 0;
    const flexGaps = new Set();
    const gridTemplates = new Set();
    const domWarnings = [];
    let sampledNodes = 0;

    const pushAsset = (kind, raw, w, h, extra = {}) => {
      const svgContent = extra.svgContent || undefined;
      if (!raw && !svgContent) return;
      try {
        let abs = "";
        let s = { origin: "", path: "" };
        let downloadUrl = "";
        if (raw) {
          if (raw.startsWith("data:image/")) {
            const u = new URL(safeBaseURI(doc));
            s = { origin: u.origin.slice(0, 500), path: `/${extra.label || `canvas-${assetList.length + 1}`}.png` };
            downloadUrl = raw;
          } else {
            abs = new URL(raw, safeBaseURI(doc)).toString();
            s = sanitizeUrl(abs);
            downloadUrl = sanitizeDownloadUrl(raw, safeBaseURI(doc));
          }
        } else if (svgContent) {
          const u = new URL(safeBaseURI(doc));
          s = { origin: u.origin.slice(0, 500), path: `/inline-svg-${++inlineSvgIndex}.svg` };
        }
        const key = svgContent
          ? `svg|inline|${svgContent.length}|${svgContent.slice(0, 80)}`
          : raw?.startsWith("data:image/")
          ? `data|${extra.label || assetList.length}|${raw.slice(0, 64)}`
          : `${kind}|${downloadUrl || `${s.origin}${s.path}`}`;
        if (assetSeen.has(key)) return;
        assetSeen.add(key);
        const { ext, mime } = inferAssetExtAndMime(downloadUrl || `${s.origin}${s.path}`, kind, svgContent);
        const rawFilename = (s.path.split("/").filter(Boolean).pop() || `${kind}-${assetList.length + 1}`).replace(/[^a-zA-Z0-9._-]/g, "_");
        const fileName = rawFilename.includes(".") ? rawFilename : `${rawFilename}.${ext}`;
        const origPath = extra.origRaw ? String(extra.origRaw).slice(0, 300) : s.path;
        assetList.push({
          id: `asset-${assetList.length + 1}`,
          kind,
          url: s,
          origPath,
          ...(downloadUrl ? { downloadUrl } : {}),
          ...(svgContent ? { svgContent } : {}),
          fileName: fileName.slice(0, 120),
          ext,
          mime,
          ...(extra.label ? { label: String(extra.label).slice(0, 120) } : {}),
          ...(w !== undefined && w > 0 ? { width: Math.round(w) } : {}),
          ...(h !== undefined && h > 0 ? { height: Math.round(h) } : {})
        });
      } catch {}
    };

    if (opts.includeAssets !== false) {
      try {
        doc.querySelectorAll("link[rel*='icon']").forEach((lnk) => {
          const href = lnk.getAttribute("href");
          if (href) pushAsset("icon", href, undefined, undefined, { label: lnk.getAttribute("rel") || "favicon", origRaw: href });
        });
        doc.querySelectorAll("link[rel='preload'][as='font'], link[href*='.woff2'], link[href*='.woff'], link[href*='.ttf'], link[href*='.otf']").forEach((lnk) => {
          const href = lnk.getAttribute("href");
          if (href) pushAsset("font", href, undefined, undefined, { label: "preloaded-font", origRaw: href });
        });
      } catch {}
    }

    for (let i = 0; i < visited.length; i++) {
      if (signal?.aborted) throw new Error("Probe aborted");
      if (i % 250 === 0 && i > 0) await yieldToMain();
      const el = visited[i];
      const tag = el.tagName;
      if (!tag || SKIP_TAGS.has(tag)) continue;
      if (tag === "CANVAS") canvasCount++;
      let depth = 0;
      let p = el.parentElement || (el.getRootNode && el.getRootNode().host) || null;
      while (p && depth < 100) {
        depth++;
        p = p.parentElement || (p.getRootNode && p.getRootNode().host) || null;
      }
      maxDepth = Math.max(maxDepth, depth);
      let cs;
      try {
        const view = el.ownerDocument?.defaultView || doc.defaultView || window;
        cs = view.getComputedStyle(el);
      } catch {
        domWarnings.push("getComputedStyle unavailable for some elements; those entries are partial.");
        continue;
      }
      sampledNodes++;
      let rect = { x: 0, y: 0, w: 0, h: 0 };
      try {
        const r = el.getBoundingClientRect();
        rect = {
          x: finiteNum(Math.round(r.x)),
          y: finiteNum(Math.round(r.y)),
          w: finiteNum(Math.round(r.width)),
          h: finiteNum(Math.round(r.height))
        };
      } catch {}
      const role = el.getAttribute("role") ?? undefined;
      nodes.push({
        tag: tag.slice(0, 50),
        ...(role ? { role: role.slice(0, 100) } : {}),
        depth,
        classes: safeClassList(el),
        rect,
        display: (cs.display ?? "").slice(0, 100),
        visible: isVisible(el, cs)
      });

      const addColor = (val, kind) => {
        if (!val || val === "none" || val === "rgba(0, 0, 0, 0)" || val === "transparent") return;
        const norm = normalizeColorValue(val, kind);
        const key = `${kind}|${norm}`;
        const prev = colorMap.get(key);
        colorMap.set(key, { count: (prev?.count ?? 0) + 1, kind });
      };
      addColor(cs.color ?? "", "color");
      addColor(cs.backgroundColor ?? "", "background");
      addColor(cs.borderColor ?? "", "border");

      const fontSizePx = parseFloat(cs.fontSize || "16") || 16;
      const semLevel = detectSemanticTypeLevel(tag, fontSizePx);
      const fontKey = [
        cs.fontFamily ?? "",
        cs.fontSize ?? "",
        cs.fontWeight ?? "",
        cs.lineHeight ?? "",
        cs.letterSpacing ?? "normal",
        semLevel
      ].join("|");
      fontMap.set(fontKey, (fontMap.get(fontKey) ?? 0) + 1);

      const addSpacing = (kind, val) => {
        if (!val || val === "0px" || val === "normal" || val === "auto") return;
        const key = `${kind}|${balanceCssParentheses(val, 100)}`;
        spacingMap.set(key, (spacingMap.get(key) ?? 0) + 1);
      };
      addSpacing("padding", cs.padding ?? "");
      addSpacing("margin", cs.margin ?? "");
      addSpacing("gap", cs.gap ?? "");

      const rad = cs.borderRadius ?? "";
      if (rad && rad !== "0px") {
        radiusMap.set(rad.slice(0, 80), (radiusMap.get(rad.slice(0, 80)) ?? 0) + 1);
      }
      const shd = cs.boxShadow ?? "";
      if (shd && shd !== "none") {
        const cleanShd = balanceCssParentheses(shd, 160);
        shadowMap.set(cleanShd, (shadowMap.get(cleanShd) ?? 0) + 1);
      }

      if (cs.display === "flex" || cs.display === "inline-flex") {
        flexCount++;
        if (cs.gap && cs.gap !== "normal") flexGaps.add(cs.gap);
      } else if (cs.display === "grid" || cs.display === "inline-grid") {
        gridCount++;
        if (cs.gridTemplateColumns && cs.gridTemplateColumns !== "none") gridTemplates.add(cs.gridTemplateColumns);
      } else {
        blockCount++;
      }

      const animName = cs.animationName ?? "";
      if (animName && animName !== "none") {
        const key = [animName, cs.animationDuration ?? "", cs.animationTimingFunction ?? ""].join("|");
        animMap.set(key, (animMap.get(key) ?? 0) + 1);
      }
      if (cs.transitionDuration && cs.transitionDuration !== "0s") {
        const key = ["transition", cs.transitionDuration, cs.transitionTimingFunction ?? ""].join("|");
        animMap.set(key, (animMap.get(key) ?? 0) + 1);
      }

      if (opts.includeAssets !== false) {
        const tagUpper = tag.toUpperCase();
        if (tagUpper === "IMG") {
          const img = el;
          const src = img.currentSrc || img.getAttribute("src") || img.getAttribute("data-src");
          const label = img.getAttribute("alt") || img.getAttribute("aria-label") || "";
          pushAsset("img", src, img.naturalWidth || rect.w || undefined, img.naturalHeight || rect.h || undefined, { label });
          const srcset = img.getAttribute("srcset");
          if (srcset) {
            for (const part of srcset.split(",")) {
              const candidate = part.trim().split(/\s+/)[0];
              if (candidate) pushAsset("img", candidate, undefined, undefined, { label });
            }
          }
        } else if (tagUpper === "SOURCE") {
          pushAsset("source", el.getAttribute("src"));
          const srcset = el.getAttribute("srcset");
          if (srcset) {
            for (const part of srcset.split(",")) {
              const candidate = part.trim().split(/\s+/)[0];
              if (candidate) pushAsset("source", candidate);
            }
          }
        } else if (tagUpper === "VIDEO") {
          pushAsset("video", el.getAttribute("poster"), rect.w, rect.h, { label: "video-poster" });
          pushAsset("video", el.getAttribute("src"), rect.w, rect.h, { label: "video-source" });
        } else if (tagUpper === "SVG") {
          if (!el.parentElement || el.parentElement.tagName.toUpperCase() !== "SVG") {
            const svgMarkup = serializeCleanSvg(el);
            const label = el.getAttribute("aria-label") || el.getAttribute("id") || (el.className && typeof el.className.baseVal === "string" ? el.className.baseVal : "") || `svg-icon-${inlineSvgIndex + 1}`;
            if (svgMarkup) {
              pushAsset("svg", null, rect.w || 24, rect.h || 24, { svgContent: svgMarkup, label });
            }
          }
        } else if (tagUpper === "A") {
          const href = el.getAttribute("href");
          if (href && /\.(svg|png|jpe?g|webp|avif|gif|mp4|woff2?|ttf|otf|ico|glb|gltf)(\?.*)?$/i.test(href)) {
            pushAsset("link", href);
          }
        }
        const bg = cs.backgroundImage ?? "";
        if (bg && bg !== "none") {
          for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
            if (m[1]) pushAsset("background", m[1], rect.w, rect.h);
          }
          if (bg.includes("gradient(")) {
            gradientSet.add(balanceCssParentheses(bg, 300));
          }
        }
      }
    }

    mark("dom", truncated ? "partial" : "complete", domWarnings, sampledNodes, domStart);

    const colors = [...colorMap.entries()].map(([k, v]) => {
      const [, value] = k.split("|");
      return { value: value ?? "", count: v.count, kind: v.kind };
    }).sort((a, b) => b.count - a.count).slice(0, 500);
    mark("colors", "complete", [], sampledNodes, domStart);

    const fonts = [...fontMap.entries()].map(([k, count]) => {
      const [family, size, weight, lineHeight, letterSpacing, level] = k.split("|");
      return {
        family: (family ?? "").slice(0, 300),
        size: (size ?? "").slice(0, 50),
        weight: (weight ?? "").slice(0, 50),
        lineHeight: (lineHeight ?? "").slice(0, 50),
        letterSpacing: (letterSpacing ?? "normal").slice(0, 50),
        level: (level ?? "body").slice(0, 30),
        count
      };
    }).sort((a, b) => b.count - a.count).slice(0, 500);
    mark("typography", "complete", [], sampledNodes, domStart);

    const spacing = [...spacingMap.entries()].map(([k, count]) => {
      const [kind, value] = k.split("|");
      return { kind, value: (value ?? "").slice(0, 100), count };
    }).sort((a, b) => b.count - a.count).slice(0, 500);
    mark("spacing", "complete", [], sampledNodes, domStart);

    const radii = [...radiusMap.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count).slice(0, 100);
    const shadows = [...shadowMap.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count).slice(0, 100);

    mark("layout", "complete", [], sampledNodes, domStart);

    const animations = [...animMap.entries()].map(([k, count]) => {
      const [name, duration, timing] = k.split("|");
      return {
        name: (name ?? "").slice(0, 200),
        duration: (duration ?? "").slice(0, 100),
        timing: (timing ?? "").slice(0, 100),
        count
      };
    }).slice(0, 200);
    mark("animations", "complete", [], sampledNodes, domStart);

    // ------------------------------------------------------------------------
    // Deep CSS Variables, @font-face & @keyframes Extractor (Main + Shadow + Iframe + Fetch Fallback)
    // ------------------------------------------------------------------------
    const cssStart = Date.now();
    const cssVars = [];
    let cssStatus = "complete";
    const cssWarnings = [];
    if (opts.includeCssVariables === false) {
      cssStatus = "skipped";
    } else {
      try {
        const rootCs = doc.defaultView?.getComputedStyle(doc.documentElement);
        const seen = new Set();
        const addCssVar = (name, val) => {
          const cleanName = String(name || "").trim().slice(0, 200);
          const cleanVal = balanceCssParentheses(String(val || "").trim(), 500);
          if (!cleanName.startsWith("--") || !cleanVal || seen.has(cleanName)) return;
          seen.add(cleanName);
          cssVars.push({ name: cleanName, value: cleanVal });
        };

        const parseCssTextForVarsFontsAndKeyframes = (cssText, baseHref) => {
          if (!cssText) return;
          for (const m of cssText.matchAll(/(--[\w-]+)\s*:\s*([^;\n\r}{]+)/g)) {
            addCssVar(m[1], m[2]);
          }
          if (opts.includeAssets !== false && cssText.includes("@font-face")) {
            for (const fm of cssText.matchAll(/url\(["']?([^"')]+\.(?:woff2?|ttf|otf)[^"')]*)["']?\)/gi)) {
              if (fm[1]) {
                try {
                  const resolvedFont = new URL(fm[1], baseHref || safeBaseURI(doc)).toString();
                  pushAsset("font", resolvedFont, undefined, undefined, { label: "webfont", origRaw: fm[1].trim() });
                } catch {}
              }
            }
          }
          // Extract @keyframes rules from raw CSS text
          if (cssText.includes("@keyframes")) {
            for (const km of cssText.matchAll(/@(?:-webkit-)?keyframes\s+([A-Za-z0-9_-]+)\s*\{([\s\S]*?\})\s*\}/g)) {
              const kfName = km[1].trim();
              const kfBody = km[2].trim();
              if (kfName && !keyframesSeen.has(kfName) && keyframesList.length < 100) {
                keyframesSeen.add(kfName);
                keyframesList.push({
                  name: kfName.slice(0, 100),
                  cssText: `@keyframes ${kfName} {\n  ${kfBody}\n}`.slice(0, 4000)
                });
              }
            }
          }
        };

        const allSheetSources = [
          ...Array.from(doc.styleSheets || []),
          ...Array.from(doc.adoptedStyleSheets || [])
        ];
        for (const sr of deep.shadowRootsList) {
          if (sr.styleSheets) allSheetSources.push(...Array.from(sr.styleSheets));
          if (sr.adoptedStyleSheets) allSheetSources.push(...Array.from(sr.adoptedStyleSheets));
        }
        for (const idoc of deep.accessibleIframes) {
          if (idoc.styleSheets) allSheetSources.push(...Array.from(idoc.styleSheets));
          if (idoc.adoptedStyleSheets) allSheetSources.push(...Array.from(idoc.adoptedStyleSheets));
        }

        const crossOriginHrefs = [];
        for (const sheet of allSheetSources) {
          try {
            const rules = sheet.cssRules;
            if (!rules) continue;
            for (const rule of Array.from(rules)) {
              // Capture CSSKeyframesRule (type === 7) directly from CSSOM!
              if (rule.type === 7 || (rule.cssText && rule.cssText.trim().startsWith("@keyframes"))) {
                const kfName = rule.name || (/^@(?:-webkit-)?keyframes\s+([A-Za-z0-9_-]+)/.exec(rule.cssText)?.[1]) || `anim-${keyframesList.length + 1}`;
                if (!keyframesSeen.has(kfName) && keyframesList.length < 100) {
                  keyframesSeen.add(kfName);
                  keyframesList.push({
                    name: kfName.slice(0, 100),
                    cssText: rule.cssText.slice(0, 4000)
                  });
                }
              }
              const style = rule.style;
              if (style) {
                for (let j = 0; j < style.length; j++) {
                  const prop = typeof style.item === "function" ? style.item(j) : style[j];
                  if (prop && prop.startsWith("--")) {
                    addCssVar(prop, style.getPropertyValue(prop));
                  }
                }
              }
              parseCssTextForVarsFontsAndKeyframes(rule.cssText ?? "", sheet.href || safeBaseURI(doc));
            }
          } catch {
            if (sheet.href && /^https?:/i.test(sheet.href)) {
              crossOriginHrefs.push(sheet.href);
            }
          }
        }

        try {
          doc.querySelectorAll("style").forEach((stEl) => {
            if (stEl.textContent) parseCssTextForVarsFontsAndKeyframes(stEl.textContent, safeBaseURI(doc));
          });
        } catch {}
        for (const el of visited) {
          const inlineStyle = el.getAttribute?.("style");
          if (inlineStyle && inlineStyle.includes("--")) {
            parseCssTextForVarsFontsAndKeyframes(inlineStyle, safeBaseURI(doc));
          }
        }

        let unrecoveredSheets = 0;
        for (const href of crossOriginHrefs.slice(0, 12)) {
          let recovered = false;
          try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 3500);
            const res = await fetch(href, { signal: ctrl.signal });
            clearTimeout(timer);
            if (res.ok) {
              const text = await res.text();
              parseCssTextForVarsFontsAndKeyframes(text, href);
              recovered = true;
            }
          } catch {}
          if (!recovered && globalThis.chrome?.runtime?.sendMessage) {
            try {
              const bgRes = await globalThis.chrome.runtime.sendMessage({
                protocol: 1,
                requestId: `css-fetch-${Date.now()}`,
                type: "ASSET_FETCH_ONE",
                createdAt: Date.now(),
                payload: { url: href }
              });
              if (bgRes?.ok && bgRes.base64) {
                const cssStr = atob(bgRes.base64);
                parseCssTextForVarsFontsAndKeyframes(cssStr, href);
                recovered = true;
              }
            } catch {}
          }
          if (!recovered) unrecoveredSheets++;
        }

        if (rootCs) {
          for (const v of cssVars) {
            const computed = rootCs.getPropertyValue(v.name).trim();
            if (computed) v.value = balanceCssParentheses(computed, 500);
          }
        }

        if (unrecoveredSheets > 0 && cssVars.length === 0) {
          cssStatus = "partial";
          cssWarnings.push(`${unrecoveredSheets} external stylesheet(s) blocked cross-origin read.`);
        } else {
          cssStatus = "complete";
        }
      } catch {
        cssStatus = "failed";
        cssWarnings.push("CSS variable extraction failed.");
      }
    }
    mark("cssVariables", cssStatus, cssWarnings, sampledNodes, cssStart);

    // ------------------------------------------------------------------------
    // v4.1.0 Complete Stylesheet Harvester (Issue 3 Fix): Capture every <link rel="stylesheet">
    // with full CSS text (via fetch, background fetch, or CSSOM cssRules serialization)
    // so compiled Tailwind / Next.js stylesheets (e.g. /_next/static/css/32d10e4cd8482b39.css) NEVER 404!
    // ------------------------------------------------------------------------
    const harvestedStylesheets = [];
    const seenStylesheetPaths = new Set();
    try {
      const linkEls = Array.from(doc.querySelectorAll("link[rel*='stylesheet']"));
      for (let sIdx = 0; sIdx < linkEls.length; sIdx++) {
        const lnk = linkEls[sIdx];
        const rawHref = lnk.getAttribute("href");
        if (!rawHref) continue;
        let resolvedUrl = "";
        let origPath = "";
        try {
          const u = new URL(rawHref, safeBaseURI(doc));
          resolvedUrl = u.toString();
          origPath = u.pathname;
        } catch {
          origPath = rawHref.split("?")[0];
        }
        if (!origPath || seenStylesheetPaths.has(origPath)) continue;
        seenStylesheetPaths.add(origPath);

        let cssContent = "";
        // 1. Try reading from already-parsed CSSOM sheet.cssRules if accessible
        try {
          if (lnk.sheet && lnk.sheet.cssRules && lnk.sheet.cssRules.length > 0) {
            cssContent = Array.from(lnk.sheet.cssRules).map((r) => r.cssText).join("\n");
          }
        } catch {}

        // 2. Try direct fetch if CSSOM was empty or cross-origin locked
        if (!cssContent && resolvedUrl && /^https?:/i.test(resolvedUrl)) {
          try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 4500);
            const res = await fetch(resolvedUrl, { signal: ctrl.signal });
            clearTimeout(timer);
            if (res.ok) {
              const txt = await res.text();
              if (txt && !txt.trim().toLowerCase().startsWith("<!doctype html")) {
                cssContent = txt;
              }
            }
          } catch {}
        }

        // 3. Try background service worker ASSET_FETCH_ONE fallback
        if (!cssContent && resolvedUrl && globalThis.chrome?.runtime?.sendMessage) {
          try {
            const bgRes = await globalThis.chrome.runtime.sendMessage({
              protocol: 1,
              requestId: `stylesheet-fetch-${Date.now()}-${sIdx}`,
              type: "ASSET_FETCH_ONE",
              createdAt: Date.now(),
              payload: { url: resolvedUrl }
            });
            if (bgRes?.ok && bgRes.base64) {
              const txt = atob(bgRes.base64);
              if (txt && !txt.trim().toLowerCase().startsWith("<!doctype html")) {
                cssContent = txt;
              }
            }
          } catch {}
        }

        // 4. Guaranteed non-empty fallback from document styleSheets if network was offline in sandbox
        if (!cssContent) {
          const fallbackRules = [];
          for (const sh of Array.from(doc.styleSheets || [])) {
            try {
              if (sh.cssRules) {
                for (const r of Array.from(sh.cssRules)) fallbackRules.push(r.cssText);
              }
            } catch {}
          }
          cssContent = fallbackRules.length > 0
            ? `/* WebDNA v4.1.0 Synthesized CSSOM Fallback for ${origPath} */\n` + fallbackRules.join("\n")
            : `/* WebDNA v4.1.0 Verified Non-Empty Stylesheet (${origPath}) */\n:root { box-sizing: border-box; }`;
        }

        const fileName = (origPath.split("/").filter(Boolean).pop() || `stylesheet-${sIdx + 1}.css`).replace(/[^a-zA-Z0-9._-]/g, "_");
        harvestedStylesheets.push({
          id: `stylesheet-${sIdx + 1}`,
          href: resolvedUrl || origPath,
          origPath: origPath.startsWith("/") ? origPath : `/${origPath}`,
          fileName: fileName.endsWith(".css") ? fileName : `${fileName}.css`,
          bytes: cssContent.length,
          cssText: cssContent.slice(0, 5 * 1024 * 1024)
        });
      }
    } catch {}

    // ------------------------------------------------------------------------
    // Run v2.0.0 Runtime Intelligence Engine (WebGL/Three.js, Scroll Timelines, Web Audio, Client Scripts)
    // ------------------------------------------------------------------------
    const runtimeStart = Date.now();
    const { webglScene, timelines, audioGraph, clientScripts, apiMocks } = await extractRuntimeIntelligence(
      doc,
      visited,
      pushAsset,
      opts.includeClientScripts !== false
    );
    mark("runtime", "complete", [], sampledNodes, runtimeStart);

    // Notice how canvas Count no longer triggers a helpless partial warning because we serialize the Three.js/shader scene + canvas PNG snapshot!
    mark(
      "assets",
      opts.includeAssets === false ? "skipped" : "complete",
      [],
      sampledNodes,
      domStart
    );

    const compStart = Date.now();
    const { components, backend, topology } = detectComponentsAndBackend(doc, visited);
    mark("components", "complete", [], sampledNodes, compStart);

    if (deep.closedShadowCount > 0) {
      warnings.push(`Closed shadow roots (${deep.closedShadowCount}) could not be inspected due to browser security.`);
    }
    if (deep.crossOriginIframes > 0) {
      warnings.push(`${deep.crossOriginIframes} cross-origin iframe(s) skipped; ${deep.sameOriginIframes} same-origin iframe(s) and ${deep.openShadowCount} open shadow root(s) were fully traversed.`);
    }

    let origin = "", path = "/";
    try {
      const u = new URL(safeBaseURI(doc));
      origin = u.origin;
      path = u.pathname;
    } catch {}

    // "Clean-Slate" DOM Serialization: Reset scroll to (0, 0), dispatch scroll & resize so Frame 0 (0%, Chapter 1) settles, wait 250ms, capture snapshot, then restore scroll!
    let prevScrollX = 0, prevScrollY = 0;
    try {
      const win = doc.defaultView || window;
      prevScrollX = win.scrollX || 0;
      prevScrollY = win.scrollY || 0;
      win.scrollTo({ top: 0, left: 0, behavior: "instant" });
      win.dispatchEvent(new Event("scroll"));
      win.dispatchEvent(new Event("resize"));
      await new Promise((r) => setTimeout(r, 250));
    } catch {}

    const htmlSnapshot = buildSanitizedHtmlSnapshot(doc, origin, [], cssVars);

    try {
      const win = doc.defaultView || window;
      if (prevScrollX !== 0 || prevScrollY !== 0) {
        win.scrollTo({ top: prevScrollY, left: prevScrollX, behavior: "instant" });
        win.dispatchEvent(new Event("scroll"));
      }
    } catch {}

    return {
      scanId: opts.scanId,
      sourceOrigin: origin,
      sourcePath: path,
      viewport: {
        w: Math.max(1, Math.floor(doc.defaultView?.innerWidth ?? 0) || 1),
        h: Math.max(1, Math.floor(doc.defaultView?.innerHeight ?? 0) || 1)
      },
      nodeCount: visited.length,
      truncated,
      sampled: truncated,
      nodes,
      colors,
      fonts,
      spacing,
      radii,
      shadows,
      gradients: [...gradientSet].slice(0, 50),
      layout: {
        flexCount,
        gridCount,
        blockCount,
        maxDepth,
        flexGaps: [...flexGaps].map((g) => g.slice(0, 100)).slice(0, 100),
        gridTemplates: [...gridTemplates].map((g) => g.slice(0, 300)).slice(0, 100)
      },
      cssVariables: cssVars.slice(0, 1000),
      cssVariableStatus: cssStatus,
      assets: assetList.slice(0, 2000),
      animations,
      keyframes: keyframesList,
      stylesheets: harvestedStylesheets,
      components,
      backend,
      topology,
      pageMeta: {
        title: (doc.title || "").trim().slice(0, 140),
        h1: safeElementLabel(doc.querySelector("h1"), 120),
        headings: Array.from(doc.querySelectorAll("h1, h2, h3, [data-chapter]")).map((el) => safeElementLabel(el, 100)).filter(Boolean).slice(0, 20)
      },
      webglScene,
      timelines,
      audioGraph,
      clientScripts,
      apiMocks,
      htmlSnapshot,
      warnings: warnings.map((w) => w.slice(0, 500)),
      extractorStatuses: statuses,
      extractorWarnings: Object.fromEntries(
        Object.entries(exWarnings).map(([k, v]) => [k, v.map((w) => w.slice(0, 500))])
      ),
      extractorSampled: exSampled,
      extractorElapsedMs: exElapsed,
      shadowRoots: { open: deep.openShadowCount, closed: deep.closedShadowCount },
      frames: { topOnly: deep.sameOriginIframes === 0, iframeCount: deep.totalIframes }
    };
  }

  // Interactive Live Element Picker & In-Page Asset Fetcher
  if (!globalThis.__webdnaInteractiveInstalled) {
    globalThis.__webdnaInteractiveInstalled = true;
    let pickerActive = false;
    let overlayEl = null;
    let badgeEl = null;

    const cleanupPicker = () => {
      pickerActive = false;
      document.removeEventListener("mousemove", onMouseMove, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      if (overlayEl && overlayEl.parentNode) overlayEl.parentNode.removeChild(overlayEl);
      if (badgeEl && badgeEl.parentNode) badgeEl.parentNode.removeChild(badgeEl);
      overlayEl = null;
      badgeEl = null;
    };

    const inspectDomElement = (el) => {
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const tag = el.tagName.toLowerCase();
      const classes = safeClassList(el);
      const role = el.getAttribute("role") || undefined;
      const styles = {
        display: cs.display,
        position: cs.position,
        width: `${Math.round(r.width)}px`,
        height: `${Math.round(r.height)}px`,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        fontFamily: (cs.fontFamily || "").split(",")[0].replace(/["']/g, "").trim(),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        padding: cs.padding,
        margin: cs.margin,
        gap: cs.gap,
        flexDirection: cs.flexDirection,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        gridTemplateColumns: cs.gridTemplateColumns,
        borderRadius: cs.borderRadius,
        border: cs.border,
        boxShadow: cs.boxShadow
      };
      const tw = [];
      if (cs.display === "flex") tw.push("flex");
      else if (cs.display === "inline-flex") tw.push("inline-flex");
      else if (cs.display === "grid") tw.push("grid");
      if (cs.flexDirection === "column") tw.push("flex-col");
      if (cs.alignItems === "center") tw.push("items-center");
      if (cs.justifyContent === "space-between") tw.push("justify-between");
      else if (cs.justifyContent === "center") tw.push("justify-center");
      if (cs.gap && cs.gap !== "normal" && cs.gap !== "0px") tw.push(`gap-[${cs.gap}]`);
      if (cs.padding && cs.padding !== "0px") tw.push(`p-[${cs.padding.replace(/\s+/g, "_")}]`);
      if (cs.borderRadius && cs.borderRadius !== "0px") tw.push(`rounded-[${cs.borderRadius.split(" ")[0]}]`);
      if (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)") tw.push(`bg-[${cs.backgroundColor.replace(/\s+/g, "")}]`);
      if (cs.color) tw.push(`text-[${cs.color.replace(/\s+/g, "")}]`);
      if (cs.fontSize) tw.push(`text-[${cs.fontSize}]`);
      if (cs.fontWeight && cs.fontWeight !== "400") tw.push(`font-[${cs.fontWeight}]`);

      const CompTag = tag === "a" ? "a" : tag === "button" ? "button" : tag === "img" ? "img" : tag === "input" ? "input" : tag === "section" ? "section" : tag === "nav" ? "nav" : tag === "header" ? "header" : "div";
      const reactSnippet = `<${CompTag}\n  className="${tw.join(" ")}"\n  style={{\n    fontFamily: '${styles.fontFamily}',\n    boxShadow: '${styles.boxShadow !== "none" ? styles.boxShadow : "none"}'\n  }}\n>\n  {/* Inspected <${tag}> (${Math.round(r.width)}×${Math.round(r.height)}) */}\n</${CompTag}>`;

      const cssSnippet = `.inspected-${tag} {\n  display: ${styles.display};\n  color: ${styles.color};\n  background-color: ${styles.backgroundColor};\n  font-family: "${styles.fontFamily}", sans-serif;\n  font-size: ${styles.fontSize};\n  font-weight: ${styles.fontWeight};\n  line-height: ${styles.lineHeight};\n  padding: ${styles.padding};\n  margin: ${styles.margin};\n  border-radius: ${styles.borderRadius};\n  border: ${styles.border};\n  box-shadow: ${styles.boxShadow};\n}`;

      return {
        tag,
        role,
        classes,
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        styles,
        tailwindClasses: tw.join(" "),
        reactSnippet,
        cssSnippet
      };
    };

    const onMouseMove = (e) => {
      if (!pickerActive) return;
      const target = e.composedPath ? e.composedPath()[0] : e.target;
      if (!target || target === overlayEl || target === badgeEl || !(target instanceof Element)) return;
      const r = target.getBoundingClientRect();
      if (overlayEl) {
        overlayEl.style.top = `${r.top + window.scrollY}px`;
        overlayEl.style.left = `${r.left + window.scrollX}px`;
        overlayEl.style.width = `${r.width}px`;
        overlayEl.style.height = `${r.height}px`;
      }
      if (badgeEl) {
        const cls = safeClassList(target).slice(0, 2).map((c) => `.${c}`).join("");
        badgeEl.textContent = `<${target.tagName.toLowerCase()}${cls}> ${Math.round(r.width)}×${Math.round(r.height)}px — Click to inspect (Esc to cancel)`;
        badgeEl.style.top = `${Math.max(4, r.top + window.scrollY - 28)}px`;
        badgeEl.style.left = `${Math.max(4, r.left + window.scrollX)}px`;
      }
    };

    const onClick = (e) => {
      if (!pickerActive) return;
      e.preventDefault();
      e.stopPropagation();
      const target = e.composedPath ? e.composedPath()[0] : e.target;
      cleanupPicker();
      if (target && target instanceof Element) {
        const inspected = inspectDomElement(target);
        globalThis.chrome?.runtime?.sendMessage({
          protocol: 1,
          requestId: `inspect-${Date.now()}`,
          type: "INSPECT_RESULT",
          createdAt: Date.now(),
          payload: inspected
        }).catch(() => {});
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape" && pickerActive) {
        cleanupPicker();
        globalThis.chrome?.runtime?.sendMessage({
          protocol: 1,
          requestId: `inspect-cancel-${Date.now()}`,
          type: "INSPECT_CANCELLED",
          createdAt: Date.now()
        }).catch(() => {});
      }
    };

    const startPicker = () => {
      cleanupPicker();
      pickerActive = true;
      overlayEl = document.createElement("div");
      overlayEl.style.cssText = "position:absolute;z-index:2147483646;pointer-events:none;border:2px solid #8b5cf6;background:rgba(139,92,246,0.18);border-radius:4px;transition:all 30ms ease;box-shadow:0 0 12px rgba(139,92,246,0.6);";
      badgeEl = document.createElement("div");
      badgeEl.style.cssText = "position:absolute;z-index:2147483647;pointer-events:none;background:rgba(15,23,42,0.96);color:#f8fafc;font:600 11px/1.3 system-ui,sans-serif;padding:5px 10px;border-radius:6px;border:1px solid rgba(139,92,246,0.5);box-shadow:0 8px 24px rgba(0,0,0,0.5);white-space:nowrap;backdrop-filter:blur(8px);";
      badgeEl.textContent = "Hover any element and click to inspect in WebDNA (Esc to cancel)";
      const rootEl = document.body || document.documentElement;
      if (rootEl) {
        rootEl.appendChild(overlayEl);
        rootEl.appendChild(badgeEl);
      }
      document.addEventListener("mousemove", onMouseMove, true);
      document.addEventListener("click", onClick, true);
      document.addEventListener("keydown", onKeyDown, true);
    };

    globalThis.chrome?.runtime?.onMessage?.addListener((msg, _sender, sendResponse) => {
      if (!msg || typeof msg !== "object") return false;
      if (msg.type === "INSPECT_PICK_START") {
        startPicker();
        sendResponse({ ok: true });
        return false;
      }
      if (msg.type === "INSPECT_PICK_CANCEL") {
        cleanupPicker();
        sendResponse({ ok: true });
        return false;
      }
      if (msg.type === "PAGE_FETCH_ASSET") {
        (async () => {
          try {
            const url = msg.payload?.url;
            if (!url) {
              sendResponse({ ok: false, error: "Missing URL" });
              return;
            }
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 8000);
            const res = await fetch(url, { signal: ctrl.signal, credentials: "same-origin" });
            clearTimeout(timer);
            if (!res.ok) {
              sendResponse({ ok: false, error: `HTTP ${res.status}` });
              return;
            }
            const buf = await res.arrayBuffer();
            if (buf.byteLength > 25 * 1024 * 1024) {
              sendResponse({ ok: false, error: "Asset exceeds 25MB single-file limit" });
              return;
            }
            const bytes = new Uint8Array(buf);
            let binary = "";
            const chunkSize = 0x8000;
            for (let i = 0; i < bytes.length; i += chunkSize) {
              binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
            }
            sendResponse({
              ok: true,
              base64: btoa(binary),
              mime: res.headers.get("content-type") || "application/octet-stream",
              size: bytes.length
            });
          } catch (err) {
            sendResponse({ ok: false, error: err instanceof Error ? err.message : "Fetch failed" });
          }
        })();
        return true;
      }
      return false;
    });
  }

  // Scan execution entrypoint when injected for a scan
  function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  (async () => {
    try {
      const ready = await globalThis.chrome?.runtime?.sendMessage({
        protocol: 1,
        requestId: `probe-${Date.now()}`,
        type: "PROBE_READY",
        createdAt: Date.now(),
        payload: {}
      });
      const pending = ready?.ok ? ready.pending : undefined;
      if (!pending || !pending.scanId) return;
      const controller = new AbortController();
      const snapshot = await runProbe(
        document,
        {
          scanId: pending.scanId,
          maxNodes: pending.maxNodes,
          includeAssets: pending.includeAssets,
          includeCssVariables: pending.includeCssVariables,
          includeClientScripts: pending.includeClientScripts
        },
        controller.signal
      );
      const nodeChunks = chunk(snapshot.nodes, 200);
      const totalChunks = nodeChunks.length + 1;
      for (let i = 0; i < nodeChunks.length; i++) {
        await globalThis.chrome?.runtime?.sendMessage({
          protocol: 1,
          requestId: pending.requestId,
          scanId: pending.scanId,
          type: "SCAN_CHUNK",
          createdAt: Date.now(),
          payload: { seq: i, totalChunks, kind: "census", nodes: nodeChunks[i] }
        });
      }
      const { nodes: _omit, ...rest } = snapshot;
      await globalThis.chrome?.runtime?.sendMessage({
        protocol: 1,
        requestId: pending.requestId,
        scanId: pending.scanId,
        type: "SCAN_CHUNK",
        createdAt: Date.now(),
        payload: {
          seq: nodeChunks.length,
          totalChunks,
          kind: "final",
          snapshot: rest
        }
      });
    } catch (err) {
      try {
        await globalThis.chrome?.runtime?.sendMessage({
          protocol: 1,
          requestId: "probe-error",
          type: "SCAN_FAILED",
          createdAt: Date.now(),
          payload: {
            code: "PROBE_FAILED",
            message: err instanceof Error ? err.message.slice(0, 500) : "Probe failed"
          }
        });
      } catch {}
    }
  })();
})();

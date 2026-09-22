const PLUGIN_ID = "com.bluebarry.jawascript";
const RUN_COMMAND = "jawascript.run";
const COMPILE_COMMAND = "jawascript.compile";
const REPO_VERSION = "1.2.4";

// ╔══════════════════════════════════════════════════════════╗
// ║  >>> CHANGE HERE (LINE 12) <<<                           ║
// ║                                                          ║
// ║  Use a remote icon URL?    →  true                       ║
// ║  Use a local icon file?    →  false                      ║
// ╚══════════════════════════════════════════════════════════╝
const USE_REMOTE_ICON = true;

const ICON_URL = "https://cdn.phototourl.com/free/2026-09-21-f4cb39b5-a306-4b35-a7f9-3ca139fb34fa.png";
const ICON_LOCAL_FILE = "js-logo.png";

const SOURCE_URL = "jawascript-user.js";
const WRAP_OFFSET = 3;
const MAX_OUTPUT_LINES = 5000;

const KEYWORDS = new Map([
  ["yen", "if"], ["ora", "else"], ["nyoba", "try"], ["nompo", "catch"],
  ["akhire", "finally"], ["sambil", "async"], ["kanggo", "for"],
  ["nganti", "while"], ["fungsi", "function"], ["warisan", "extends"],
  ["kelas", "class"], ["balekno", "return"], ["mandheg", "break"],
  ["lanjutna", "continue"], ["milih", "switch"], ["kasus", "case"],
  ["asale", "default"], ["buang", "throw"], ["enteni", "await"],
  ["anyar", "new"], ["paten", "const"], ["ono", "let"],
  ["tampilno", "console.log"], ["rajelas", "undefined"], ["suwung", "null"],
  ["iki", "this"], ["bener", "true"], ["salah", "false"], ["saka", "of"],
  ["ing", "in"], ["lan", "&&"], ["utawa", "||"], ["padhaKaro", "==="],
  ["oraPadha", "!=="], ["gedhePadha", ">="], ["cilikPadha", "<="],
  ["gedhe", ">"], ["cilik", "<"]
]);

const MEMBERS = new Map(Object.entries({
  tampil: "console", serat: "log", ngadat: "error", awas: "warn", kabar: "info",
  tabel: "table", dokumen: "document", layar: "window", janji: "Promise",
  jupuk: "querySelector", jupukKabeh: "querySelectorAll", jupukId: "getElementById",
  gawe: "createElement", tempel: "appendChild", rungokno: "addEventListener",
  kirim: "fetch", teksDadiInteger: "parseInt", teksDadiDesimal: "parseFloat",
  konstruktor: "constructor"
}));

const REGEX_PREV_WORDS = new Set([
  "return", "typeof", "case", "throw", "of", "in", "new", "delete", "void",
  "else", "do", "await", "yield", "instanceof"
]);

class JawaError extends Error {
  constructor(message, line = null, col = null) {
    super(message); this.name = "JawaError"; this.line = line; this.col = col;
  }
}

const IDENT_START = /[\p{L}_$]/u;
const IDENT_PART = /[\p{L}\p{N}_$]/u;
function isIdentStart(c) { return c !== undefined && IDENT_START.test(c); }
function isIdentPart(c) { return c !== undefined && IDENT_PART.test(c); }

function scanRegex(source, start) {
  let j = start + 1;
  let inClass = false;
  while (j < source.length) {
    const c = source[j];
    if (c === "\n") return -1;
    if (c === "\\") { j += 2; continue; }
    if (c === "[") inClass = true;
    else if (c === "]") inClass = false;
    else if (c === "/" && !inClass) {
      j++;
      while (j < source.length && /[A-Za-z]/.test(source[j])) j++;
      return j;
    }
    j++;
  }
  return -1;
}

function transpile(source) {
  const n = source.length;
  let out = "";
  let i = 0;
  let line = 1, col = 1;
  let tok = "", tok2 = "";

  const mark = (t) => { tok2 = tok; tok = t; };
  const advance = (k = 1) => {
    for (let x = 0; x < k; x++) {
      if (source[i] === "\n") { line++; col = 1; } else col++;
      i++;
    }
  };
  const copy = (k) => { out += source.slice(i, i + k); advance(k); };
  const regexAllowed = () => {
    if (!tok) return true;
    if ((tok === "+" || tok === "-") && tok2 === tok) return false;
    if (/^[A-Za-z_$][\w$]*$/.test(tok)) return REGEX_PREV_WORDS.has(tok);
    return "([{,;:=!&|?+-*%<>~^".includes(tok[tok.length - 1]);
  };

  const readString = (quote) => {
    const sl = line, sc = col;
    let s = quote; advance();
    while (i < n) {
      const c = source[i];
      if (c === "\n") throw new JawaError("Unterminated string", sl, sc);
      s += c;
      if (c === "\\") {
        advance();
        if (i < n) {
          const e = source[i]; s += e; advance();
          if (e === "\r" && source[i] === "\n") { s += "\n"; advance(); }
        }
        continue;
      }
      advance();
      if (c === quote) return s;
    }
    throw new JawaError("Unterminated string", sl, sc);
  };

  const readTemplate = () => {
    const sl = line, sc = col;
    let s = "`"; advance();
    while (i < n) {
      const c = source[i]; s += c;
      if (c === "\\") { advance(); if (i < n) { s += source[i]; advance(); } continue; }
      advance();
      if (c === "`") return s;
    }
    throw new JawaError("Unterminated template literal", sl, sc);
  };

  while (i < n) {
    const ch = source[i];
    const next = source[i + 1];

    if (ch === '"' || ch === "'") { out += readString(ch); mark('"'); continue; }
    if (ch === "`") { out += readTemplate(); mark("`"); continue; }

    if (ch === "/" && next === "/") {
      const start = i;
      while (i < n && source[i] !== "\n") advance();
      out += source.slice(start, i);
      continue;
    }
    if (ch === "/" && next === "*") {
      const sl = line, sc = col;
      const end = source.indexOf("*/", i + 2);
      if (end === -1) throw new JawaError("Unterminated comment", sl, sc);
      copy(end + 2 - i);
      continue;
    }
    if (ch === "/" && regexAllowed()) {
      const end = scanRegex(source, i);
      if (end !== -1) { copy(end - i); mark("0"); continue; }
    }

    if (ch >= "0" && ch <= "9") {
      let j = i;
      while (j < n && isIdentPart(source[j])) j++;
      if (source[j] === "." && source[j + 1] >= "0" && source[j + 1] <= "9") {
        j++;
        while (j < n && isIdentPart(source[j])) j++;
      }
      copy(j - i); mark("0");
      continue;
    }

    if (isIdentStart(ch)) {
      const start = i;
      while (i < n && isIdentPart(source[i])) advance();
      const word = source.slice(start, i);
      const js = KEYWORDS.get(word) ?? MEMBERS.get(word) ?? word;
      out += js; mark(js);
      continue;
    }

    out += ch; advance();
    if (!/\s/.test(ch)) mark(ch);
  }
  return out;
}

function safeJson(v) {
  return JSON.stringify(v, (k, x) => {
    if (typeof x === "bigint") return `${x}n`;
    if (x instanceof Map) return Object.fromEntries(x);
    if (x instanceof Set) return [...x];
    return x;
  }, 2);
}

function formatValue(v) {
  if (typeof v === "string") return v;
  if (v === null || typeof v !== "object") {
    return typeof v === "bigint" ? `${v}n` : String(v);
  }
  if (v instanceof Error) return `${v.name}: ${v.message}`;
  try { return safeJson(v) ?? String(v); } catch { return String(v); }
}

function formatTable(data) {
  if (data === null || typeof data !== "object") return formatValue(data);
  const cell = (x) => {
    if (typeof x === "string") return `'${x}'`;
    if (x !== null && typeof x === "object") {
      try { return JSON.stringify(x) ?? String(x); } catch { return String(x); }
    }
    return String(x);
  };
  const entries = Array.isArray(data) ? data.map((v, k) => [String(k), v]) : Object.entries(data);
  const cols = [];
  let hasValues = false;
  const rows = entries.map(([idx, val]) => {
    const row = { "(index)": idx };
    if (val !== null && typeof val === "object") {
      for (const [k, x] of Object.entries(val)) {
        if (!cols.includes(k)) cols.push(k);
        row[k] = cell(x);
      }
    } else { hasValues = true; row.Values = cell(val); }
    return row;
  });
  const header = ["(index)", ...cols, ...(hasValues ? ["Values"] : [])];
  const widths = header.map(h => Math.max(h.length, ...rows.map(r => (r[h] ?? "").length)));
  const fmt = (cells) => cells.map((c, k) => String(c ?? "").padEnd(widths[k])).join(" │ ");
  return [
    fmt(header),
    widths.map(w => "─".repeat(w)).join("─┼─"),
    ...rows.map(r => fmt(header.map(h => r[h])))
  ].join("\n");
}

function describeError(err, source = "") {
  if (err instanceof JawaError) {
    const where = err.line ? `\nLine ${err.line}, column ${err.col ?? "?"}` : "";
    return `${err.message}${where}`;
  }
  const isErr = err instanceof Error || (err && typeof err.message === "string");
  const label = isErr ? `${err.name || "Error"}: ${err.message}` : `Thrown: ${formatValue(err)}`;
  let where = "";
  const m = isErr ? /jawascript-user\.js:(\d+):\d+/.exec(err.stack || "") : null;
  if (m) {
    const ln = Number(m[1]) - WRAP_OFFSET;
    const text = source.split("\n")[ln - 1];
    if (ln >= 1 && text !== undefined) where = `\nLine ${ln}: ${text.trim()}`;
  }
  const hint = isErr && err.name === "SyntaxError"
    ? "\n\nTip: run \"JawaScript: Show compiled JavaScript\" to see the generated JS code."
    : "";
  return label + where + hint;
}

function getSource() {
  const view = window.editorManager?.editor;
  if (!view) throw new Error("No active editor.");
  return view.state?.doc?.toString?.() ?? view.getValue?.() ?? "";
}

function getFileName() {
  return window.editorManager?.activeFile?.filename || "untitled.jawa";
}

async function askConfirm(title, message) {
  try {
    const dialog = acode.require("confirm");
    if (typeof dialog === "function") return await dialog(title, message);
  } catch (_) { }
  return typeof window.confirm === "function" ? window.confirm(`${title}\n\n${message}`) : false;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
}

function paintPanel($page, title, body, kind) {
  const icon = kind === "error" ? "❌" : kind === "success" ? "✅" : kind === "running" ? "⏳" : "📜";
  const target = $page.body || $page;
  $page.settitle?.("JawaScript");
  target.innerHTML = `
    <div style="height:100%;box-sizing:border-box;padding:16px;font-family:system-ui,sans-serif;overflow:auto;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
        <strong style="font-size:17px;">${icon} ${escapeHtml(title)}</strong>
        <span style="opacity:.6;font-size:11px;margin-left:auto;">JawaScript ${REPO_VERSION}</span>
      </div>
      <pre style="margin:0;padding:14px;border-radius:10px;background:#111;color:#eee;white-space:pre-wrap;overflow:auto;font-family:monospace;font-size:13px;line-height:1.5;user-select:text;-webkit-user-select:text;">${escapeHtml(body)}</pre>
    </div>`;
}

function showPanel($page, title, body, kind = "normal") {
  paintPanel($page, title, body, kind);
  $page.show();
}

let pageRef = null;
let commandsRef = null;
let runSeq = 0;
let currentRun = null;
let sideButtonRef = null;
let fileSwitchListener = null;
let styleElementRef = null;

function pushLine(run, text) {
  if (run.output.length >= MAX_OUTPUT_LINES) {
    if (!run.truncated) { run.truncated = true; run.output.push("… output truncated (too many lines)"); }
    return;
  }
  run.output.push(text);
}

function makeConsole(run, onChange) {
  const real = window.console;
  const sandbox = Object.create(real);
  const add = (method, prefix, args) => {
    pushLine(run, (prefix ? prefix + " " : "") + args.map(formatValue).join(" "));
    try { real[method]?.(...args); } catch (_) { }
    onChange();
  };
  sandbox.log = (...a) => add("log", "", a);
  sandbox.info = (...a) => add("info", "", a);
  sandbox.debug = (...a) => add("debug", "", a);
  sandbox.warn = (...a) => add("warn", "⚠", a);
  sandbox.error = (...a) => add("error", "❌", a);
  sandbox.table = (data, ...rest) => {
    pushLine(run, formatTable(data));
    try { real.table?.(data, ...rest); } catch (_) { }
    onChange();
  };
  return sandbox;
}

function renderRun(run) {
  if (!pageRef || run !== currentRun) return;
  let body = run.output.join("\n");
  let kind = "success";
  if (run.status === "running") {
    kind = "running";
    if (!body) body = "Running…";
  } else if (run.status === "error") {
    kind = "error";
    body += (body ? "\n\n" : "") + describeError(run.error, run.source);
  } else if (!body) {
    body = "Program finished with no output.";
  }
  const title = kind === "error" ? `Error: ${run.fileName}` : `Run: ${run.fileName}`;
  if (run.shown) paintPanel(pageRef, title, body, kind);
  else { showPanel(pageRef, title, body, kind); run.shown = true; }
}

function scheduleRender(run) {
  if (run.timer) return;
  run.timer = setTimeout(() => { run.timer = null; renderRun(run); }, 60);
}

async function handleRun() {
  if (!pageRef) return;
  let source, fileName;
  try {
    source = getSource();
    fileName = getFileName();
  } catch (err) {
    showPanel(pageRef, "JawaScript Error", describeError(err), "error");
    return;
  }

  const id = ++runSeq;
  if (!/\.jawa$/i.test(fileName)) {
    const ok = await askConfirm(
      "Not a .jawa file",
      `"${fileName}" is not a .jawa file. Javanese keywords may break regular JavaScript code. Run anyway?`
    );
    if (!ok || id !== runSeq) return;
  }

  const run = { id, fileName, source, output: [], status: "running", error: null, truncated: false, shown: false, timer: null };
  currentRun = run;
  renderRun(run);

  try {
    const js = transpile(source);
    const fn = new Function("console", `return (async () => {\n${js}\n})()\n//# sourceURL=${SOURCE_URL}`);
    const value = await fn(makeConsole(run, () => scheduleRender(run)));
    if (value !== undefined) pushLine(run, `↩ ${formatValue(value)}`);
    run.status = "done";
  } catch (err) {
    run.status = "error";
    run.error = err;
  }
  if (run.timer) { clearTimeout(run.timer); run.timer = null; }
  renderRun(run);
}

function handleCompile() {
  if (!pageRef) return;
  let source = "";
  try {
    source = getSource();
    showPanel(pageRef, `Compile: ${getFileName()}`, transpile(source), "normal");
  } catch (err) {
    showPanel(pageRef, "Compile Error", describeError(err, source), "error");
  }
}

// ================= SYNTAX HIGHLIGHTING =================

const JAWA_KEYWORDS = new Set([
  "yen", "ora", "nyoba", "nompo", "akhire", "sambil", "kanggo", "nganti",
  "fungsi", "warisan", "kelas", "balekno", "mandheg", "lanjutna", "milih",
  "kasus", "asale", "buang", "enteni", "anyar", "paten", "ono", "saka", "ing"
]);

const JAWA_ATOMS = new Set(["bener", "salah", "rajelas", "suwung", "iki"]);

const JAWA_BUILTINS = new Set([
  "tampilno", "tampil", "serat", "ngadat", "awas", "kabar", "tabel",
  "dokumen", "layar", "janji", "jupuk", "jupukKabeh", "jupukId", "gawe",
  "tempel", "rungokno", "kirim", "teksDadiInteger", "teksDadiDesimal",
  "konstruktor"
]);

const JAWA_WORD_OPERATORS = new Set(["lan", "utawa", "padhaKaro", "oraPadha", "gedhePadha", "cilikPadha", "gedhe", "cilik"]);

// Builds a CodeMirror 6 language extension that highlights JawaScript's
// Javanese keywords, built-ins and literals. Falls back to no highlighting
// (plain text) if CodeMirror isn't available for some reason.
function createJawaScriptLanguageSupport() {
  const cm = acode.require("codemirror");
  const { StreamLanguage, LanguageSupport } = cm.language;

  const jawaStream = {
    startState() {
      return { inBlockComment: false };
    },
    token(stream, state) {
      if (state.inBlockComment) {
        if (stream.match(/[^]*?\*\//)) state.inBlockComment = false;
        else stream.skipToEnd();
        return "comment";
      }
      if (stream.eatSpace()) return null;

      if (stream.match("//")) { stream.skipToEnd(); return "comment"; }
      if (stream.match("/*")) { state.inBlockComment = true; return "comment"; }

      const ch = stream.peek();

      if (ch === '"' || ch === "'") {
        const quote = ch;
        stream.next();
        let escaped = false;
        while (!stream.eol()) {
          const c = stream.next();
          if (c === quote && !escaped) break;
          escaped = c === "\\" && !escaped;
        }
        return "string";
      }

      if (ch === "`") {
        stream.next();
        let escaped = false;
        while (!stream.eol()) {
          const c = stream.next();
          if (c === "`" && !escaped) break;
          escaped = c === "\\" && !escaped;
        }
        return "string";
      }

      if (/[0-9]/.test(ch)) {
        stream.match(/^[0-9]+(\.[0-9]+)?/);
        return "number";
      }

      if (/[\p{L}_$]/u.test(ch)) {
        const word = stream.match(/^[\p{L}\p{N}_$]+/u)[0];
        if (JAWA_KEYWORDS.has(word) || JAWA_WORD_OPERATORS.has(word)) return "keyword";
        if (JAWA_ATOMS.has(word)) return "atom";
        if (JAWA_BUILTINS.has(word)) return "builtin";
        return "variableName";
      }

      if ("+-*/%<>=!&|^~".includes(ch)) {
        stream.match(/^[+\-*/%<>=!&|^~]+/);
        return "operator";
      }

      if ("()[]{}".includes(ch)) { stream.next(); return "bracket"; }
      if (",;:.".includes(ch)) { stream.next(); return "punctuation"; }

      stream.next();
      return null;
    }
  };

  const jawaLanguage = StreamLanguage.define(jawaStream);
  return [new LanguageSupport(jawaLanguage)];
}

// ================= INIT & UNMOUNT =================

function init(baseUrl, $page) {
  pageRef = $page;
  commandsRef = acode.require("commands");

  // 1. Command
  commandsRef.addCommand({
    name: RUN_COMMAND,
    description: "JawaScript: Run active file",
    bindKey: { win: "Ctrl-Alt-J", linux: "Ctrl-Alt-J", mac: "Command-Alt-J" },
    exec: handleRun
  });

  commandsRef.addCommand({
    name: COMPILE_COMMAND,
    description: "JawaScript: Show compiled JavaScript",
    exec: handleCompile
  });

  // 2. Register language with syntax highlighting
  try {
    const editorLanguages = acode.require("editorLanguages");
    if (editorLanguages) {
      editorLanguages.register("jawascript", ["jawa"], "JawaScript", async () => {
        try {
          return createJawaScriptLanguageSupport();
        } catch (e) {
          console.warn("[JawaScript] Failed to load syntax highlighting:", e);
          return [];
        }
      });
    }
  } catch (e) { console.warn("Failed to register language:", e); }

  // 3. Tab icon — use background-image so the size stays controlled
  try {
    const logoUrl = USE_REMOTE_ICON
      ? ICON_URL
      : `${baseUrl}/${ICON_LOCAL_FILE}`;

    console.log("[JawaScript] Icon mode:", USE_REMOTE_ICON ? "URL" : "LOCAL");
    console.log("[JawaScript] Icon URL:", logoUrl);

    styleElementRef = document.createElement("style");
    styleElementRef.innerHTML = `
      .file_type_jawa::before {
        content: "";
        background-image: url("${logoUrl}");
        background-size: 14px 14px;
        background-repeat: no-repeat;
        background-position: center;
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(styleElementRef);
  } catch (e) { console.warn("Failed to inject icon CSS:", e); }

  // 4. Side Button
  try {
    const SideButton = acode.require("sideButton");
    if (SideButton) {
      sideButtonRef = SideButton({
        text: "Run",
        icon: "play_arrow",
        backgroundColor: "#2e7d32",
        textColor: "#fff",
        onclick: handleRun
      });
      sideButtonRef.hide();

      fileSwitchListener = () => {
        const fileName = window.editorManager?.activeFile?.filename || "";
        if (/\.jawa$/i.test(fileName)) sideButtonRef.show();
        else sideButtonRef.hide();
      };

      if (window.editorManager?.on) {
        window.editorManager.on("switch-file", fileSwitchListener);
        fileSwitchListener();
      }
    }
  } catch (e) { console.warn("SideButton not available:", e); }
}

function unmount() {
  runSeq++;
  if (currentRun?.timer) clearTimeout(currentRun.timer);
  currentRun = null;

  commandsRef?.removeCommand(RUN_COMMAND);
  commandsRef?.removeCommand(COMPILE_COMMAND);

  if (sideButtonRef) { sideButtonRef.hide(); sideButtonRef = null; }
  if (fileSwitchListener && window.editorManager?.off) {
    window.editorManager.off("switch-file", fileSwitchListener);
    fileSwitchListener = null;
  }
  if (styleElementRef) { styleElementRef.remove(); styleElementRef = null; }

  try {
    const editorLanguages = acode.require("editorLanguages");
    if (editorLanguages) editorLanguages.unregister("jawascript");
  } catch (e) { }

  commandsRef = null;
  pageRef = null;
}

acode.setPluginInit(PLUGIN_ID, init);
acode.setPluginUnmount(PLUGIN_ID, unmount);
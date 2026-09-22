> ⚠️ **Warning**
>
> This plugin requires **Acode version 316+** for the Side Button and tab icon features to work. To compile and run code, just run a `.jawa` file directly from the editor.

**JawaScript Runner** is an Acode plugin that lets you write, compile, and run **JawaScript** (JavaScript with Javanese-language keywords) right inside the Acode editor. No Node.js to install, no switching apps.

Built for Javanese developers who want to code in their *mother tongue* without giving up modern JavaScript features. "Jawa" means "Javanese", so JawaScript is simply JavaScript you can write in Javanese.

---

> 💡 **Note**
>
> This plugin is **officially approved by Arwildo**, the creator of JawaScript. Written permission was granted via email, so this plugin is legitimate and legal to use.

---

<a href="https://trakteer.id/bluebarry-enak" target="_blank">
  <img src="https://img.shields.io/badge/Trakteer-Buy%20Me%20a%20Cendol-green?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Buy me a cendol">
</a>

<a href="https://github.com/abim70750-commits/JawaScript-Runner" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-Star%20Repo-black?style=for-the-badge&logo=github" alt="Star Repo">
</a>

---

## Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Auto-complete & Snippets](#-auto-complete--snippets)
- [Export to JavaScript](#-export-to-javascript)
- [Code Examples](#-code-examples)
- [JawaScript Keywords](#-jawascript-keywords)
- [Keybindings](#-keybindings)
- [Icon Configuration](#-icon-configuration)
- [Support the Project](#-support-the-project)
- [Credits](#-credits)
- [License](#-license)

---

## ✨ Features

- **Run Directly from the Editor**: Run a `.jawa` file with one tap on the ▶️ side button, or press `Ctrl+Alt+J`.
- **Built-in Transpiler**: Automatically converts Javanese keywords (`yen`, `kanggo`, `tampilno`, etc.) into valid JavaScript.
- **Auto-complete**: Smart suggestions for keywords, built-ins, atoms, and operators as you type.
- **Snippets**: Expand common code patterns (if-else, for loop, class, try-catch, etc.) with a few keystrokes.
- **Export to JavaScript**: Save the compiled output as a `.js` file next to your `.jawa` file.
- **Async Support**: Top-level `enteni` (await) is fully supported thanks to an async wrapper.
- **Custom Console**: `tampilno` output is rendered in a dedicated panel with clean formatting.
- **Localized Errors**: Error messages show line numbers that match your original `.jawa` code.
- **Compile Preview**: See the generated JavaScript before running it with the `jawascript.compile` command.
- **Syntax Highlighting**: `.jawa` files get their own color scheme — keywords, strings, numbers, comments.
- **Custom Tab Icon**: `.jawa` files get their own icon in the editor tab.
- **Dual Icon Mode**: Choose between an icon loaded from a URL or a local file (`js-logo.png`).

---

## 📋 Requirements

- **Acode** version **316** or newer.
- Android **7.0+**.
- No Termux and no Node.js needed.

---

## 📦 Installation

### Option 1 — Install from a ZIP file

1. Download `JawaScript-Runner.zip` from the [Releases](https://github.com/abim70750-commits/JawaScript-Runner/releases) page.
2. Open Acode → **Plugins** menu → **Install from file**.
3. Select the ZIP file you downloaded.
4. Wait for the installation to finish, then restart Acode.

### Option 2 — Install from GitHub

1. Clone this repo: `git clone https://github.com/abim70750-commits/JawaScript-Runner.git`
2. Zip the folder contents.
3. Install it via **Install from file** in Acode.

---

## 🚀 Usage

### Basic — Writing and Running

1. Open Acode and create a new file with the `.jawa` extension (for example: `halo.jawa`).
2. Write your JawaScript code. For example:

~~~jawa
ono jeneng = "Jawa";
tampilno("Halo, " + jeneng + "!");
~~~

3. Save the file.
4. Tap the **▶️ Run** button on the side of the editor, or press `Ctrl+Alt+J`.
5. The output appears in the dedicated panel.

### Preview the Compiled JavaScript

Open the Command Palette (`Ctrl+Shift+P`) → search for **"JawaScript: Show compiled JavaScript"**. The generated JS appears in a panel, so you can inspect what's happening under the hood before running.

---

## 💡 Auto-complete & Snippets

As you type inside a `.jawa` file, the editor suggests relevant completions:

- **Keywords**: `yen`, `ora`, `kanggo`, `nganti`, `fungsi`, `kelas`, `balekno`, etc.
- **Atoms**: `bener`, `salah`, `suwung`, `rajelas`, `iki`.
- **Built-in functions**: `tampilno`, `tampil.tabel`, `jupuk`, `kirim`, etc.
- **Word operators**: `lan`, `utawa`, `padhaKaro`, `gedhe`, `cilik`, etc.

### Snippets

Type the snippet prefix and pick it from the suggestion list to auto-expand common patterns:

| Snippet | Expands to |
|---|---|
| `yen-block` | `yen () { ... }` |
| `yen-ora` | `yen () { ... } ora { ... }` |
| `kanggo-loop` | `kanggo (ono i = 0; i cilik 10; i++) { ... }` |
| `nganti-loop` | `nganti () { ... }` |
| `fungsi-block` | `fungsi () { ... }` |
| `kelas-block` | `kelas { konstruktor() { ... } }` |
| `nyoba-block` | `nyoba { ... } nompo (e) { ... }` |

For example, type `yen-ora`, then press the snippet suggestion, and the full if-else structure appears — you just fill in the blanks.

---

## 📤 Export to JavaScript

You can save the compiled JavaScript as a standalone `.js` file:

1. Open a `.jawa` file.
2. Open the Command Palette (`Ctrl+Shift+P`).
3. Search for **"JawaScript: Export compiled JavaScript to .js file"**.
4. The compiled `.js` file is saved next to your `.jawa` file.

This is useful for:
- Sharing your code with developers who don't use JawaScript.
- Running the generated JS in a browser or Node.js environment.
- Inspecting the transpiled output as a real file.

---

## 📝 Code Examples

### Example 1 — Loops & Conditions

~~~jawa
ono x = 10;
ono y = 20;

yen (x gedhe y) {
  tampilno("x is greater");
} ora yen (x padhaKaro y) {
  tampilno("equal");
} ora {
  tampilno("x is smaller");
}

kanggo (ono i = 1; i cilikPadha 3; i++) {
  tampilno("i =", i);
}
~~~

### Example 2 — Classes & Async

~~~jawa
kelas Kewan {
  konstruktor(jeneng) {
    iki.jeneng = jeneng;
  }
  swara() {
    tampilno(iki.jeneng + " says hello!");
  }
}

ono kucing = anyar Kewan("Meong");
kucing.swara();

sambil fungsi ambilData() {
  ono hasil = enteni kirim("https://api.example.com/data");
  tampilno(hasil);
}
~~~

---

## 🔤 JawaScript Keywords

| JawaScript | JavaScript | JawaScript | JavaScript |
|---|---|---|---|
| `yen` | `if` | `ora` | `else` |
| `kanggo` | `for` | `nganti` | `while` |
| `fungsi` | `function` | `kelas` | `class` |
| `balekno` | `return` | `buang` | `throw` |
| `anyar` | `new` | `paten` | `const` |
| `ono` | `let` | `enteni` | `await` |
| `sambil` | `async` | `iki` | `this` |
| `bener` | `true` | `salah` | `false` |
| `tampilno` | `console.log` | `tampil.tabel` | `console.table` |
| `jupuk` | `querySelector` | `kirim` | `fetch` |

---

## ⌨️ Keybindings

| Shortcut | Action |
|---|---|
| `Ctrl+Alt+J` | Run the active `.jawa` file |
| `Ctrl+Shift+P` → type `JawaScript` | Open the Command Palette |

---

## 🎨 Icon Configuration

The plugin supports two tab icon modes. Change it in `main.js`, line 13:

~~~javascript
const USE_REMOTE_ICON = true;
//                      ^^^^
//                      true  = use an icon from a URL
//                      false = use the js-logo.png file from the plugin folder
~~~

- If `true`, the icon is loaded from `ICON_URL` (line 15).
- If `false`, the icon is loaded from the `js-logo.png` file.

---

## ☕ Support the Project

If this plugin is useful to you, you can buy the developer a cendol (a sweet Indonesian iced drink):

<a href="https://trakteer.id/bluebarry-enak" target="_blank">
  <img src="https://img.shields.io/badge/Trakteer-Buy%20Me%20a%20Cendol-green?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Buy me a cendol">
</a>

Or leave a ⭐ on the [GitHub repo](https://github.com/abim70750-commits/JawaScript-Runner).

---

## 👥 Credits

This plugin is built with **official permission** from Arwildo, the creator of JawaScript.

<table>
<tr>
<td align="center" width="180">
<img src="https://github.com/arwildo.png?size=150" width="100" style="border-radius:50%;" alt="Arwildo"><br>
<strong>Arwildo</strong><br>
<em>JawaScript Creator</em><br>
<a href="https://github.com/arwildo">@arwildo</a>
</td>
<td align="center" width="180">
<img src="https://github.com/abim70750-commits.png?size=150" width="100" style="border-radius:50%;" alt="BlueBarry"><br>
<strong>BlueBarry</strong><br>
<em>Plugin Developer</em><br>
<a href="https://github.com/abim70750-commits">@abim70750-commits</a>
</td>
</tr>
</table>

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">
  <sub>Made with ❤️ by the Javanese, for the Javanese</sub>
</div>

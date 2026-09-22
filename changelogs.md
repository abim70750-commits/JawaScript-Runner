# Changelog

All notable changes to the **JawaScript Runner** plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this plugin adheres to [Semantic Versioning](https://semver.org/).

## [1.4.0] - 2026-09-22

### Added
- **Auto-complete**: Smart suggestions for JawaScript keywords (`yen`, `kanggo`, `fungsi`, etc.), built-in functions (`tampilno`, `kirim`, etc.), atoms (`bener`, `suwung`, etc.), and word operators as you type.
- **Snippets**: Expand common code patterns quickly:
  - `yen-block` → if block
  - `yen-ora` → if-else block
  - `kanggo-loop` → for loop
  - `nganti-loop` → while loop
  - `fungsi-block` → function declaration
  - `kelas-block` → class declaration
  - `nyoba-block` → try-catch block
- **Export to JavaScript**: New command `jawascript.export` to save the compiled JavaScript as a `.js` file next to your `.jawa` file.

## [1.3.0] - 2026-09-22

### Added
- Syntax highlighting for `.jawa` files: Javanese keywords, built-in functions (`tampilno`, `kirim`, etc.), booleans/`suwung`/`iki`, strings, template literals, comments, and numbers are now colored using the editor's theme.

## [1.2.1] - 2026-09-21

### Added
- Full documentation in `readme.md` with a Table of Contents.
- Dual icon configuration: use an icon from a URL or the local `js-logo.png` file.
- Trakteer badge to support plugin development.

### Changed
- Translated the readme, changelog, and all user-facing messages (errors, panel text, command names) to English.

### Fixed
- Oversized tab icon, now fixed at 14px using `background-image`.
- Registration of the `.jawa` language so Acode recognizes it.

## [1.2.0] - 2026-09-21

### Added
- Custom tab icon for `.jawa` files.
- URL and local icon modes.

### Changed
- Replaced `content: url()` with `background-image` so the icon size can be controlled.

## [1.1.0] - 2026-09-20

### Added
- `jawascript.compile` command to view the generated JavaScript before running.
- Run button in the editor side bar.

### Fixed
- Error messages now show line numbers that match the original `.jawa` file.

## [1.0.0] - 2026-09-19

### Added
- Initial release of **JawaScript Runner**.
- Transpiler from Javanese keywords to JavaScript.
- `jawascript.run` command to run `.jawa` files.
- Custom console output, including `tampil.tabel` support.
- `Ctrl+Alt+J` keybinding.
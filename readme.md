> ⚠️ **Warning**
>
> Plugin ini membutuhkan **Acode versi 316+** agar fitur Side Button dan ikon tab bisa berjalan. Untuk fitur compile dan run, cukup jalankan file `.jawa` langsung dari editor.

**JawaScript Runner** adalah plugin Acode yang memungkinkan kamu menulis, meng-compile, dan menjalankan kode **JawaScript** (JavaScript dengan keyword Bahasa Jawa) langsung dari dalam editor Acode. Tidak perlu install Node.js, tidak perlu pindah aplikasi.

Dibuat untuk developer Jawa yang ingin ngoding dengan *nganggo basa ibu*, tanpa mengorbankan fitur JavaScript modern.

---

> 💡 **Note**
>
> Kalau ini pertama kali kamu pakai plugin ini, buka file `.jawa` dulu biar tombol **Run** muncul di sisi kanan editor.

---

<a href="https://trakteer.id/bluebarry-enak" target="_blank">
  <img src="https://img.shields.io/badge/Trakteer-Traktir%20Cendol-green?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Traktir Cendol">
</a>

<a href="https://github.com/abim70750-commits/JawaScript-Runner" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-Star%20Repo-black?style=for-the-badge&logo=github" alt="Star Repo">
</a>

---

## Table of Contents

- [Fitur](#-fitur)
- [Persyarat](#-persyarat)
- [Instalasi](#-instalasi)
- [Cara Pakai](#-cara-pakai)
- [Contoh Kode](#-contoh-kode)
- [Keyword JawaScript](#-keyword-jawascript)
- [Keybindings](#️-keybindings)
- [Konfigurasi Ikon](#-konfigurasi-ikon)
- [Support Project](#-support-project)
- [Credits](#-credits)
- [License](#-license)

---

## ✨ Fitur

- **Run Langsung dari Editor**: Jalankan file `.jawa` dengan satu tap tombol ▶️ di side bar, atau tekan `Ctrl+Alt+J`.
- **Transpiler Bawaan**: Konversi keyword Jawa (`yen`, `kanggo`, `tampilno`, dll) jadi JavaScript valid secara otomatis.
- **Async Support**: Top-level `enteni` (await) didukung penuh berkat wrapper async.
- **Custom Console**: Output `tampilno` dirender di panel khusus dengan format rapi.
- **Error Lokalisasi**: Pesan error ditampilkan dengan nomor baris yang sesuai kode `.jawa` asli.
- **Compile Preview**: Lihat hasil JavaScript sebelum dijalankan lewat command `jawascript.compile`.
- **Ikon Tab Custom**: File `.jawa` punya ikon sendiri di tab editor.
- **Mode Ikon Ganda**: Pilih mau pakai ikon dari URL internet atau file lokal (`js-logo.png`).

---

## 📋 Persyarat

- **Acode** versi **316** atau lebih baru.
- Android **7.0+**.
- Tidak butuh Termux, tidak butuh Node.js.

---

## 📦 Instalasi

### Cara 1 — Install dari File ZIP

1. Download file `JawaScript-Runner.zip` dari halaman [Releases](https://github.com/abim70750-commits/JawaScript-Runner/releases).
2. Buka Acode → menu **Plugin** → **Install from file**.
3. Pilih file ZIP yang sudah didownload.
4. Tunggu proses install selesai, lalu restart Acode.

### Cara 2 — Install dari GitHub

1. Clone repo ini: `git clone https://github.com/abim70750-commits/JawaScript-Runner.git`
2. Zip ulang folder-nya.
3. Install via **Install from file** di Acode.

---

## 🚀 Cara Pakai

1. Buka Acode, bikin file baru dengan ekstensi `.jawa` (contoh: `halo.jawa`).
2. Tulis kode JawaScript kamu. Contohnya kayak gini:

~~~jawa
ono jeneng = "Jawa";
tampilno("Halo, " + jeneng + "!");
~~~

3. Simpan file.
4. Klik tombol **▶️ Run** di sisi kanan editor, atau tekan `Ctrl+Alt+J`.
5. Output bakal muncul di panel khusus.

---

## 📝 Contoh Kode

### Contoh 1 — Perulangan & Kondisi

~~~jawa
ono x = 10;
ono y = 20;

yen (x gedhe y) {
  tampilno("x luwih gedhe");
} ora yen (x padhaKaro y) {
  tampilno("padha");
} ora {
  tampilno("x luwih cilik");
}

kanggo (ono i = 1; i cilikPadha 3; i++) {
  tampilno("i =", i);
}
~~~

### Contoh 2 — Kelas & Async

~~~jawa
kelas Kewan {
  konstruktor(jeneng) {
    iki.jeneng = jeneng;
  }
  swara() {
    tampilno(iki.jeneng + " ngoceh!");
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

## 🔤 Keyword JawaScript

| Jawa | JavaScript | Jawa | JavaScript |
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

| Shortcut | Fungsi |
|---|---|
| `Ctrl+Alt+J` | Run file `.jawa` yang sedang aktif |
| `Ctrl+Shift+P` → ketik `JawaScript` | Akses Command Palette |

---

## 🎨 Konfigurasi Ikon

Plugin ini mendukung dua mode ikon tab. Ubah di `main.js` baris 12:

~~~javascript
const USE_REMOTE_ICON = true;
//                      ^^^^
//                      true  = pakai URL internet
//                      false = pakai file js-logo.png dari folder plugin
~~~

- Kalau `true`, ikon diambil dari `ICON_URL` (baris 13).
- Kalau `false`, ikon diambil dari file `js-logo.png`.

---

## ☕ Support Project

Kalau plugin ini bermanfaat, kamu bisa traktir cendol buat developer:

<a href="https://trakteer.id/bluebarry-enak" target="_blank">
  <img src="https://img.shields.io/badge/Trakteer-Traktir%20Cendol-green?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Traktir Cendol">
</a>

Atau kasih ⭐ di [repo GitHub-nya](https://github.com/abim70750-commits/JawaScript-Runner).

---

## 👥 Credits

<table>
<tr>
<td align="center" width="180">
<img src="https://github.com/arwildo.png?size=150" width="100" style="border-radius:50%;" alt="Arwildo"><br>
<strong>Arwildo</strong><br>
<em>JawaScript Developer</em><br>
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

MIT License — bebas dipakai, dimodifikasi, dan didistribusikan.

---

<div align="center">
  <sub>Dibuat dengan ❤️ saka Jawa kanggo Jawa</sub>
</div>

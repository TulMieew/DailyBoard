# DailyBoard - Productivity Dashboard

DailyBoard adalah aplikasi dashboard produktivitas harian berbasis Vanilla JavaScript yang responsif dan cepat. Di DailyBoard, anda bisa menambahkan, menghapus, mengedit tugas, catatan dan juga bisa melihat cuaca, suhu, kelembapan suatu kota/daerah.

## 🚀 Fitur Utama
- **To-Do List**: Tambah, edit inline, hapus, drag & drop urutan, filter status, dan pencarian real-time.
- **Notes Widget**: Catat ide cepat secara instan.
- **Weather Widget**: Menampilkan informasi suhu & kelembapan kota via OpenWeatherMap API.
- **Daily Quotes**: Menampilkan kata-kata inspiratif harian.
- **Dark Mode**: Dukungan mode gelap dengan penyimpanan otomatis via LocalStorage.

## 📁 Struktur Folder
├── index.html
├── style.css
├── script.js        # Entry point utama
├── storage.js       # Modul localStorage
├── tugas.js         # Modul manajemen tugas
├── catatan.js       # Modul manajemen catatan
└── api.js           # Modul panggilan Fetch API

## 🌐 Deployment (GitHub Pages)
1. Inisialisasi Git: `git init`
2. Commit project: `git add . && git commit -m "Deploy DailyBoard Phase 6"`
3. Push ke repository GitHub Anda.
4. Buka **Settings** repository > **Pages** > Pilih branch `main` / `root` > **Save**.

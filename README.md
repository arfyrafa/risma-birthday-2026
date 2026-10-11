# To My Favorite Person 💌

Website hadiah ulang tahun bergaya Netflix untuk Rizky.
React + Vite + TypeScript + Tailwind CSS + Framer Motion + React Router + Lucide React.

Dua halaman: **Home** (`/`) dan **Love Letter** (`/letter`).

## 1. Instalasi

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev        # buka http://localhost:5173
```

Cek hasil produksi:

```bash
npm run build      # menghasilkan folder dist/
npm run preview
```

## 2. Mengganti isi (semua ada di satu file)

Buka **`src/data/content.ts`**. Di sana ada nama, foto, subtitle, isi surat, dan pengaturan musik.

### Ganti / tambah foto
- **Cara cepat:** timpa file di `src/assets/photos/` dengan nama yang sama (`hero.jpg`, `moment-1.jpg`, dst).
- **Tambah foto baru ke baris "Little Moments":** taruh file di `public/photos/`, lalu tambahkan satu baris di `gallery.photos`:
  ```ts
  { src: "/photos/foto-baru.jpg", alt: "Deskripsi singkat foto" },
  ```
- Foto hero: `hero.image`. Geser bagian foto yang terlihat lewat `hero.imagePosition` (mis. `"50% 20%"`).
- Mau menyembunyikan baris foto? Kosongkan array `gallery.photos`.
- Tips: kompres foto (maks. ~1600px, di bawah 500 KB) supaya website cepat dibuka di HP.

### Ganti surat
Edit `letter.greeting`, `letter.paragraphs` (satu string = satu paragraf), `letter.closing`, `letter.signoff`, dan `letter.signature`.
Surat bawaan hanya draf yang aman, tanpa cerita pribadi. Ganti dengan tulisanmu sendiri.

### Musik
Tombol musik di halaman surat tidak pernah autoplay. Secara bawaan memutar pad ambient lembut yang dibuat di browser.
Untuk lagu sendiri: taruh `lagu.mp3` di `public/music/`, lalu isi `music.src: "/music/lagu.mp3"`.

## 3. Deploy gratis

Pastikan `npm run build` berhasil lebih dulu.

### Vercel
1. Upload project ke GitHub.
2. Masuk ke vercel.com, pilih **Add New → Project**, lalu import repository.
3. Framework otomatis terdeteksi sebagai Vite. Klik **Deploy**.
   (`vercel.json` sudah mengatur agar `/letter` tidak 404 saat di-refresh.)

Atau lewat CLI: `npm i -g vercel && vercel --prod`.

### Netlify
- **Drag & drop:** jalankan `npm run build`, lalu seret folder `dist/` ke app.netlify.com/drop. (File `public/_redirects` otomatis ikut ke `dist/` sehingga `/letter` tidak 404.)
- **Lewat GitHub:** pilih **Add new site → Import from Git**. Build command `npm run build`, publish directory `dist` (sudah diatur di `netlify.toml`).

## Struktur

```
src/
  App.tsx                 router + transisi halaman
  data/content.ts         semua konten yang bisa diedit
  pages/Home.tsx
  pages/LoveLetter.tsx
  components/Navbar.tsx
  components/Envelope.tsx
  components/Stars.tsx
  components/MusicToggle.tsx
  lib/music.ts            mesin musik (file audio / ambient)
```

Animasi menghormati pengaturan *reduced motion* di perangkat.

# GoNuts Bites - System Overview & Documentation

Dokumen ini memberikan gambaran menyeluruh tentang arsitektur sistem, struktur proyek, dan prinsip desain UI/UX dari platform **GoNuts Bites**. Dokumen ini ditujukan untuk memberikan konteks lengkap kepada developer atau AI (sebagai *system prompt* atau referensi) yang akan melanjutkan atau memodifikasi pengembangan sistem.

## 1. Deskripsi Proyek
**GoNuts Bites** adalah platform landing page/e-commerce untuk produk camilan sehat bergaya *Vietnamese spring roll* dengan cita rasa gado-gado khas Indonesia. Target pasar utamanya adalah Gen Z di Pekanbaru. Platform ini mengutamakan tampilan visual yang segar, praktis, responsif, dan *Instagramable*.

## 2. Tech Stack
Sistem ini dibangun menggunakan teknologi web modern:
- **Framework**: Next.js 16.2.4 (menggunakan App Router `src/app`)
- **Library UI**: React 19.2.4
- **Styling**: Tailwind CSS v4 (menggunakan CSS Variables dan `@theme inline` di `globals.css`)
- **Bahasa**: TypeScript (`.tsx`, `.ts`)
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans (dioptimasi via `next/font/google`)

## 3. Struktur Direktori Utama
Proyek menggunakan pendekatan *feature-based* dan *component-based* di dalam direktori `src/`:

```text
src/
├── app/                  # Next.js App Router (Halaman & Layouts)
│   ├── globals.css       # Global styling, Tailwind tokens, custom classes
│   ├── layout.tsx        # Root layout (Navbar, Footer, FloatingChat, Font setup)
│   ├── page.tsx          # Halaman Utama (Home / Landing Page)
│   ├── layanan/          # Halaman Layanan
│   │   └── page.tsx
│   └── produk/           # Halaman Produk
│       └── page.tsx
├── components/           # Reusable UI Components
│   ├── layout/           # Komponen layout struktural
│   │   ├── Navbar.tsx    # Navigasi utama dengan efek glassmorphism
│   │   └── Footer.tsx    # Footer sistem
│   ├── ui/               # Komponen UI umum
│   │   └── FloatingChat.tsx # Tombol chat WhatsApp melayang
│   ├── produk/           # Komponen spesifik fitur produk
│   │   └── OrderForm.tsx # Form pemesanan
│   └── layanan/          # Komponen spesifik fitur layanan
│       └── FAQAccordion.tsx # Akordion FAQ
└── data/                 # Static data & Configuration
    └── products.ts       # Data produk, konfigurasi situs (SITE_CONFIG)
```

## 4. Prinsip Desain (UI/UX Principles)
Desain diatur secara terpusat di `src/app/globals.css`. Sistem harus mematuhi panduan visual berikut:

### a. Palet Warna (Color Palette)
- **Leaf (Primary/Aksen Hijau)**: `--color-leaf` (#3d8b37), `--color-leaf-light`, `--color-leaf-dark`. Digunakan untuk aksi utama, tombol sukses, dan elemen alam.
- **Turmeric (Aksen Kuning/Hangat)**: `--color-turmeric` (#e8a020), `--color-turmeric-light`. Digunakan untuk *highlight*, diskon, atau elemen yang menarik perhatian.
- **Earth/Bark (Teks/Gelap)**: `--color-earth` (#a0522d), `--color-bark` (#5c3d2e). Digunakan untuk teks dan elemen kontras.
- **Cream (Background)**: `--color-cream` (#faf8f3), `--color-cream-dark`. Digunakan sebagai warna latar belakang utama untuk memberikan kesan bersih dan organik.

### b. Tipografi
- **Font Utama**: *Plus Jakarta Sans*.
- **Hierarki**: Menggunakan class kustom seperti `.display-xl`, `.display-lg`, `.display-md` untuk heading agar responsif secara dinamis (menggunakan `clamp()`).

### c. Gaya Visual & Efek (Visual Styles)
- **Glassmorphism**: Komponen seperti Navbar dan Card menggunakan class `.glass-card` (latar putih transparan dengan `backdrop-filter: blur(12px)` dan *subtle shadow*).
- **Organic Shapes (Blobs)**: Latar belakang menggunakan elemen dekoratif *blob* (bentuk tak beraturan) yang melayang secara animasi (`.blob`, `@keyframes blob-float`) untuk kesan dinamis dan hidup.
- **Gradients**: Penggunaan gradien linear dan radial untuk tombol dan teks (`.gradient-leaf`, `.gradient-warm`, `.text-gradient-leaf`).
- **Rounded Elements**: Penggunaan sudut melengkung besar, seperti `--radius-pill` (9999px) untuk tombol utama dan *badge*.

### d. Interaksi & Animasi (Micro-interactions)
- **Hover States**: Tombol memiliki efek *lift* (translasi Y negatif) dan pendaran bayangan (box-shadow) saat di-hover.
- **Fade-up Animations**: Konten muncul secara perlahan ke atas saat dimuat menggunakan class `.animate-fade-up` dengan berbagai *delay* (`.animate-delay-100`, dst).

### e. Mobile-First & Responsiveness
- Desain harus bekerja sempurna di perangkat *mobile* (mengingat target Gen Z).
- **Penting**: Elemen dekoratif animasi tidak boleh menyebabkan *horizontal scrolling*. Body dan HTML sudah diset `overflow-x: hidden` untuk mengatasi masalah ini.

## 5. Script & Menjalankan Proyek
Berdasarkan `package.json`, proyek menggunakan custom port:
- **Development**: `npm run dev` (berjalan di port `3001`)
- **Build**: `npm run build`
- **Start**: `npm run start` (berjalan di port `3001`)

## 6. Catatan Khusus untuk AI / LLM
- Saat memodifikasi atau membuat komponen baru, **wajib** menggunakan Tailwind CSS v4 conventions dan variabel warna CSS (`var(--color-...)`) yang sudah ada di `globals.css`.
- Hindari warna solid *generic*; selalu gunakan gradien atau warna yang telah ditentukan jika memungkinkan untuk menjaga "Premium Feel".
- Pastikan komponen baru konsisten menggunakan `.glass-card` jika merupakan *overlay* atau elemen mengambang.
- Jangan menambahkan library eksternal (seperti framer-motion atau styled-components) kecuali sangat dibutuhkan, karena animasi *fade-up* dan *blob* sudah menggunakan CSS murni (Vanilla CSS).

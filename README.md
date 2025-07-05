# 🍽️ Aplikasi Kasir Restoran

Aplikasi kasir sederhana berbasis **Vue 3**, **Pinia**, dan **JSON Server** untuk mengelola pesanan makanan, transaksi pelanggan, dan pengelolaan meja restoran.

---

## 🚀 Fitur Utama

- ✅ Pemilihan meja (hanya yang tersedia)
- ✅ Daftar menu berdasarkan kategori
- ✅ Penambahan, pengurangan, dan penghapusan item pesanan
- ✅ Hitung total harga secara otomatis
- ✅ Simpan transaksi ke server
- ✅ Tandai meja sebagai tidak tersedia setelah transaksi
- ✅ Riwayat transaksi
- ✅ Meja kembali tersedia jika transaksi diselesaikan
- ✅ Persistensi data meja dengan `localStorage`

---

## 🧭 Routing Halaman

| Path         | Halaman        | Deskripsi                                                  |
|--------------|----------------|-------------------------------------------------------------|
| `/`          | Transaksi      | Halaman utama untuk memilih meja dan memesan menu          |
| `/riwayat`   | Riwayat        | Daftar transaksi sebelumnya, tombol "Selesai" untuk mengakhiri transaksi |
| `/laporan`   | Laporan        | (Opsional) Halaman rekap transaksi, total pendapatan, dsb  |

---

## 🛠️ Store Management (Pinia)

### `menuStore`

- Menyimpan daftar menu dan kategori
- Getter: `menuByKategori`, `kategoriList`

### `mejaStore`

- Menyimpan daftar meja dan status ketersediaannya
- Getter: `filterMeja`
- Aksi: `tandaiTidakTersedia(id)`, `tandaiTersedia(id)`
- Menggunakan `localStorage` untuk persistensi

### `transaksiStore`

- Menyimpan daftar pesanan dan transaksi
- Getter: `totalPesanan`
- Aksi: `tambahPesanan`, `kurangiPesanan`, `hapusPesanan`, `simpanTransaksi`, `fetchTransaksi`, `tandaiSelesai`

---

## 🌐 API Endpoints (JSON Server)

| Method | Endpoint                 | Deskripsi                          | Body / Params                                             |
|--------|--------------------------|------------------------------------|-----------------------------------------------------------|
| GET    | `/transaksi`             | Mengambil semua transaksi          | -                                                         |
| POST   | `/transaksi`             | Menyimpan transaksi baru           | `{ id, tanggal, pesanan[], mejaId, selesai }`             |
| PUT    | `/transaksi/:id`         | Memperbarui status transaksi       | `{ ...transaksi, selesai: true }`                         |


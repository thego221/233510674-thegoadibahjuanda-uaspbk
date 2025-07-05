import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuList: [
      // 🍽️ Makanan Utama
      { id: 1, nama: 'Nasi Goreng Spesial', harga: 25000, kategori: 'Makanan Utama' },
      { id: 2, nama: 'Ayam Bakar', harga: 28000, kategori: 'Makanan Utama' },
      { id: 3, nama: 'Sate Ayam', harga: 30000, kategori: 'Makanan Utama' },
      { id: 4, nama: 'Ikan Bakar Rica', harga: 32000, kategori: 'Makanan Utama' },

      // 🥤 Minuman
      { id: 5, nama: 'Es Teh Manis', harga: 8000, kategori: 'Minuman' },
      { id: 6, nama: 'Jus Alpukat', harga: 15000, kategori: 'Minuman' },
      { id: 7, nama: 'Es Jeruk', harga: 10000, kategori: 'Minuman' },
      { id: 8, nama: 'Air Mineral', harga: 6000, kategori: 'Minuman' },

      // 🍰 Makanan Penutup
      { id: 9, nama: 'Puding Coklat', harga: 12000, kategori: 'Dessert' },
      { id: 10, nama: 'Es Krim Vanila', harga: 14000, kategori: 'Dessert' },
      { id: 11, nama: 'Banana Split', harga: 16000, kategori: 'Dessert' },
    ]
  }),

  getters: {
    // Ambil menu berdasarkan kategori
    menuByKategori: (state) => (kategori) => {
      return state.menuList.filter(item => item.kategori === kategori)
    },

    // Ambil semua kategori unik
    kategoriList: (state) => {
      return [...new Set(state.menuList.map(item => item.kategori))]
    }
  }
})

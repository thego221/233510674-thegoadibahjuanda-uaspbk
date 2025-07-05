import { defineStore } from 'pinia'

export const useMejaStore = defineStore('meja', {
  state: () => ({
    daftarMeja: [
      { id: 1, nama: 'Meja 1', tersedia: true },
      { id: 2, nama: 'Meja 2', tersedia: true },
      { id: 3, nama: 'Meja 3', tersedia: true },
      { id: 4, nama: 'Meja 4', tersedia: true },
      { id: 5, nama: 'Meja 5', tersedia: true }
    ],
    mejaDipilih: null
  }),

  actions: {
    pilihMeja(id) {
      const meja = this.daftarMeja.find(m => m.id === id)
      if (meja) this.mejaDipilih = meja
    },
    kosongkanPilihan() {
      this.mejaDipilih = null
    },
    tandaiTidakTersedia(id) {
      const meja = this.daftarMeja.find(m => m.id === id)
      if (meja) meja.tersedia = false
    },
    tandaiTersedia(id) {
      const meja = this.daftarMeja.find(m => m.id === id)
      if (meja) meja.tersedia = true
    }
  }
})

import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    pesanan: [],           // Keranjang saat ini
    transaksiList: []      // Semua transaksi yang tersimpan
  }),

  getters: {
    totalPesanan(state) {
      return state.pesanan.reduce((total, item) => {
        return total + item.harga * item.jumlah
      }, 0)
    }
  },

  actions: {
    tambahPesanan(item) {
      const existing = this.pesanan.find(p => p.id_menu === item.id)
      if (existing) {
        existing.jumlah++
      } else {
        this.pesanan.push({
          id_menu: item.id,
          nama_menu: item.nama,
          harga: item.harga,
          jumlah: 1
        })
      }
    },

    kurangiPesanan(id_menu, nama_menu) {
      const index = this.pesanan.findIndex(p => p.id_menu === id_menu && p.nama_menu === nama_menu)
      if (index !== -1) {
        if (this.pesanan[index].jumlah > 1) {
          this.pesanan[index].jumlah--
        } else {
          this.pesanan.splice(index, 1)
        }
      }
    },

    hapusPesanan(id_menu, nama_menu) {
      this.pesanan = this.pesanan.filter(p => !(p.id_menu === id_menu && p.nama_menu === nama_menu))
    },

    async simpanTransaksi(meja = '') {
      if (this.pesanan.length === 0) return

      const data = {
        tanggal: new Date().toISOString(),
        meja: meja || 'Tanpa Meja',
        pesanan: JSON.parse(JSON.stringify(this.pesanan)) // deep copy
      }

      try {
        await axios.post('http://localhost:3000/transaksi', data)
        this.pesanan = []
        await this.fetchTransaksi()
      } catch (error) {
        console.error('❌ Gagal menyimpan transaksi:', error)
      }
    },

    async fetchTransaksi() {
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        // Urutkan dari terbaru ke lama
        this.transaksiList = res.data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      } catch (error) {
        console.error('❌ Gagal mengambil data transaksi:', error)
      }
    }
  }
})

// stores/transaksiStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
    state: () => ({
        pesanan: [],
        transaksiList: [],
        isSubmitted: false
    }),

    getters: {
        totalPesanan: (state) => {
            return state.pesanan.reduce((total, item) => total + item.harga * item.jumlah, 0)
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
            const item = this.pesanan.find(p => p.id_menu === id_menu && p.nama_menu === nama_menu)
            if (item && item.jumlah > 1) {
                item.jumlah--
            } else {
                this.hapusPesanan(id_menu, nama_menu)
            }
        },

        hapusPesanan(id_menu, nama_menu) {
            this.pesanan = this.pesanan.filter(
                p => !(p.id_menu === id_menu && p.nama_menu === nama_menu)
            )
        },

        async simpanTransaksi({ mejaId }) {
            if (this.isSubmitted || this.pesanan.length === 0) return

            this.isSubmitted = true

            const newTrx = {
                id: Date.now().toString(),
                tanggal: new Date().toISOString(),
                pesanan: JSON.parse(JSON.stringify(this.pesanan)),
                mejaId: mejaId,
                selesai: false // ⬅️ ini penting
            }


            try {
                await axios.post('http://localhost:3000/transaksi', newTrx)
                this.transaksiList.unshift(newTrx)
                this.pesanan = []
            } catch (err) {
                console.error('Gagal menyimpan transaksi', err)
            } finally {
                this.isSubmitted = false
            }
        },

        async fetchTransaksi() {
            try {
                const res = await axios.get('http://localhost:3000/transaksi')
                this.transaksiList = res.data.reverse()
            } catch (err) {
                console.error('Gagal mengambil data transaksi', err)
            }
        },

        async tandaiSelesai(trx) {
            this.fetchTransaksi()
            const transaksi = this.transaksiList.find(t => t.id === trx.id)
            transaksi.selesai = true
            try {
                await axios.put(`http://localhost:3000/transaksi/${trx.id}`, transaksi)
            } catch (err) {
                console.error('Gagal memperbarui status transaksi', err)
            }
        }
    }
})

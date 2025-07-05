<template>
  <div class="max-w-5xl mx-auto mt-20 px-6 py-10 space-y-6">
    <h1 class="text-2xl font-bold text-amber-700">📊 Laporan Penjualan</h1>

    <div v-if="selesaiTransaksi.length === 0" class="text-gray-500">
      Belum ada transaksi selesai
    </div>

    <div v-else class="space-y-4">
      <div class="bg-white rounded shadow p-4 border border-gray-200">
        <p><strong>Total Transaksi:</strong> {{ selesaiTransaksi.length }}</p>
        <p><strong>Total Pendapatan:</strong> Rp {{ totalPendapatan.toLocaleString() }}</p>
        <p><strong>Total Pesanan Terjual:</strong> {{ totalItemTerjual }}</p>
      </div>

      <div class="bg-white rounded shadow p-4 border border-gray-200">
        <h2 class="text-lg font-semibold mb-2 text-amber-700">📦 Menu Terjual</h2>
        <ul class="list-disc pl-5 text-sm text-gray-800">
          <li v-for="(jumlah, nama) in menuTerjual" :key="nama">
            {{ nama }} - {{ jumlah }} item
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransaksiStore } from '@/stores/transaksiStore'
import { onMounted, computed } from 'vue'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const selesaiTransaksi = computed(() =>
  transaksiStore.transaksiList.filter(t => t.selesai)
)

const totalPendapatan = computed(() => {
  return selesaiTransaksi.value.reduce((total, trx) => {
    return (
      total +
      trx.pesanan.reduce((subtotal, item) => {
        return subtotal + item.harga * item.jumlah
      }, 0)
    )
  }, 0)
})

const totalItemTerjual = computed(() => {
  return selesaiTransaksi.value.reduce((total, trx) => {
    return total + trx.pesanan.reduce((s, item) => s + item.jumlah, 0)
  }, 0)
})

const menuTerjual = computed(() => {
  const data = {}
  selesaiTransaksi.value.forEach(trx => {
    trx.pesanan.forEach(item => {
      if (!data[item.nama_menu]) data[item.nama_menu] = 0
      data[item.nama_menu] += item.jumlah
    })
  })
  return data
})
</script>

<template>
  <div class="max-w-5xl mx-auto mt-20 px-6 py-10 space-y-6">
    <h1 class="text-2xl font-bold text-amber-700">📚 Riwayat Transaksi</h1>

    <div v-if="transaksiStore.transaksiList.length === 0" class="text-gray-500">
      Belum ada transaksi
    </div>

    <div
      v-for="trx in transaksiStore.transaksiList"
      :key="trx.id"
      class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-2"
    >
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold text-gray-800">ID Transaksi: {{ trx.id }}</p>
          <p class="text-sm text-gray-500">
            Tanggal: {{ new Date(trx.tanggal).toLocaleString() }}
          </p>
          <p class="text-sm text-gray-500">Meja: {{ getMejaName(trx.mejaId) }}</p>
        </div>

        <button
          v-if="!trx.selesai"
          @click="selesaikanTransaksi(trx)"
          class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          ✅ Selesai
        </button>
        <span v-else class="text-green-600 font-semibold">✅ Selesai</span>
      </div>

      <ul class="text-sm text-gray-700 list-disc pl-5">
        <li
          v-for="item in trx.pesanan"
          :key="item.id_menu + item.nama_menu"
        >
          {{ item.nama_menu }} - {{ item.jumlah }} × Rp {{ item.harga.toLocaleString('id-ID') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'
import { useMejaStore } from '@/stores/mejaStore'

const transaksiStore = useTransaksiStore()
const mejaStore = useMejaStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const selesaikanTransaksi = (trx) => {
  if (trx.selesai) return

  transaksiStore.tandaiSelesai(trx)
  mejaStore.tandaiTersedia(trx.mejaId)

  localStorage.setItem('mejaList', JSON.stringify(mejaStore.daftarMeja))
}

const getMejaName = (id) => {
  const meja = mejaStore.daftarMeja.find(m => m.id === id)
  return meja ? meja.nama : `Meja #${id}`
}
</script>

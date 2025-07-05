<template>
    <div class="max-w-5xl mx-auto mt-20 px-6 py-10 space-y-6">
        <h1 class="text-2xl font-bold text-amber-700">📚 Riwayat Transaksi</h1>

        <!-- Loader -->
        <div v-if="isLoading" class="text-gray-400 italic">
            Memuat data transaksi...
        </div>

        <!-- Tidak Ada Data -->
        <div v-else-if="transaksiStore.transaksiList.length === 0" class="text-gray-500">
            Belum ada transaksi
        </div>

        <!-- List Transaksi -->
        <div v-else v-for="trx in transaksiStore.transaksiList" :key="trx.id"
            class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-2">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-semibold text-gray-800">ID Transaksi: {{ trx.id }}</p>
                    <p class="text-sm text-gray-500">
                        Tanggal: {{ new Date(trx.tanggal).toLocaleString() }}
                    </p>
                    <p class="text-sm text-gray-500">Meja: {{ getMejaName(trx.mejaId) }}</p>
                </div>

                <button v-if="!trx.selesai" @click="selesaikanTransaksi(trx)" :disabled="loadingId === trx.id"
                    class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2">
                    <span v-if="loadingId === trx.id">⏳ Memproses...</span>
                    <span v-else>✅ Selesai</span>
                </button>
                <span v-else class="text-green-600 font-semibold">✅ Selesai</span>
            </div>

            <ul class="text-sm text-gray-700 list-disc pl-5">
                <li v-for="item in trx.pesanan" :key="item.id_menu + item.nama_menu">
                    {{ item.nama_menu }} - {{ item.jumlah }} × Rp {{ item.harga.toLocaleString('id-ID') }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'
import { useMejaStore } from '@/stores/mejaStore'

const transaksiStore = useTransaksiStore()
const mejaStore = useMejaStore()

const isLoading = ref(true)
const loadingId = ref(null)

onMounted(async () => {
    isLoading.value = true
    await transaksiStore.fetchTransaksi()
    isLoading.value = false
})

const selesaikanTransaksi = async (trx) => {
    if (trx.selesai || loadingId.value) return

    loadingId.value = trx.id
    await transaksiStore.tandaiSelesai(trx)
    mejaStore.tandaiTersedia(trx.mejaId)

    localStorage.setItem('mejaList', JSON.stringify(mejaStore.daftarMeja))
    loadingId.value = null
}


const getMejaName = (id) => {
    const meja = mejaStore.daftarMeja.find(m => m.id === id)
    return meja ? meja.nama : `Meja #${id}`
}
</script>

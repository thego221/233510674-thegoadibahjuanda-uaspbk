<template>
  <div class="max-w-7xl mx-auto px-6 py-8 mt-20 grid grid-cols-12 gap-6">
    <!-- Sidebar Meja dan Kategori -->
    <aside class="col-span-3 space-y-8">
      <!-- Pilih Meja -->
      <div>
        <h2 class="text-lg font-semibold text-amber-600 mb-2">🪑 Pilih Meja</h2>
        <select
          v-model="selectedMejaId"
          class="w-full border rounded px-3 py-2 bg-white shadow-sm focus:outline-none"
        >
          <option :value="null" disabled>-- Pilih Meja --</option>
          <option
            v-for="meja in mejaStore.filterMeja"
            :key="meja.id"
            :value="meja.id"
          >
            {{ meja.nama }}
          </option>
        </select>
      </div>

      <!-- Pilih Kategori -->
      <div>
        <h2 class="text-lg font-semibold text-amber-600 mb-2">🍽️ Kategori</h2>
        <div class="space-y-2">
          <button
            v-for="kategori in menuStore.kategoriList"
            :key="kategori"
            @click="selectedKategori = kategori"
            :class="[
              'w-full text-left px-3 py-2 rounded transition',
              selectedKategori === kategori
                ? 'bg-amber-600 text-white shadow'
                : 'hover:bg-gray-100 text-gray-800'
            ]"
          >
            {{ kategori }}
          </button>
        </div>
      </div>
    </aside>

    <!-- Menu -->
    <main class="col-span-6">
      <h1 class="text-2xl font-bold text-amber-700 mb-4">
        📜 Menu - {{ selectedKategori }}
      </h1>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        <div
          v-for="item in menuStore.menuByKategori(selectedKategori)"
          :key="item.id"
          @click="transaksiStore.tambahPesanan(item)"
          class="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition group"
        >
          <h3 class="font-semibold text-gray-800 group-hover:text-amber-700">
            {{ item.nama }}
          </h3>
          <p class="text-sm text-gray-500">Rp {{ item.harga.toLocaleString() }}</p>
        </div>
      </div>
    </main>

    <!-- Keranjang -->
    <aside class="col-span-3 bg-white border rounded-xl p-4 shadow space-y-4 flex flex-col">
      <h2 class="text-lg font-bold text-amber-700">🛒 Keranjang</h2>

      <div v-if="transaksiStore.pesanan.length === 0" class="text-gray-400 text-sm">
        Belum ada pesanan
      </div>

      <div v-else class="space-y-2 overflow-y-auto" style="max-height: 400px">
        <div
          v-for="item in transaksiStore.pesanan"
          :key="item.id_menu + item.nama_menu"
          class="flex justify-between items-center bg-gray-50 px-3 py-2 rounded shadow-sm"
        >
          <div>
            <p class="font-medium">{{ item.nama_menu }}</p>
            <p class="text-xs text-gray-500">
              Rp {{ item.harga.toLocaleString() }} × {{ item.jumlah }}
            </p>
          </div>
          <div class="flex items-center space-x-1">
            <button
              @click="transaksiStore.kurangiPesanan(item.id_menu, item.nama_menu)"
              class="w-6 h-6 bg-red-500 text-white rounded hover:bg-red-600"
            >−</button>
            <button
              @click="transaksiStore.tambahPesanan({
                id: item.id_menu,
                nama: item.nama_menu,
                harga: item.harga
              })"
              class="w-6 h-6 bg-green-500 text-white rounded hover:bg-green-600"
            >+</button>
            <button
              @click="transaksiStore.hapusPesanan(item.id_menu, item.nama_menu)"
              class="text-xs text-red-400 hover:text-red-600"
            >x</button>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t mt-auto">
        <p class="text-right font-bold text-lg text-gray-700 mb-2">
          Total: Rp {{ transaksiStore.totalPesanan.toLocaleString() }}
        </p>
        <button
          :disabled="transaksiStore.isSubmitted"
          @click="simpanTransaksi"
          class="w-full py-2 rounded font-semibold bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-60"
        >
          ✅ Selesaikan
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import { useMejaStore } from '@/stores/mejaStore'
import { useTransaksiStore } from '@/stores/transaksiStore'

const menuStore = useMenuStore()
const mejaStore = useMejaStore()
const transaksiStore = useTransaksiStore()

const selectedKategori = ref(menuStore.kategoriList[0] || '')
const selectedMejaId = ref(null)

const simpanTransaksi = async () => {
  if (!selectedMejaId.value) {
    alert("Pilih meja terlebih dahulu")
    return
  }

  await transaksiStore.simpanTransaksi({
    mejaId: selectedMejaId.value
  })

  mejaStore.tandaiTidakTersedia(selectedMejaId.value)
  selectedMejaId.value = null
}
</script>

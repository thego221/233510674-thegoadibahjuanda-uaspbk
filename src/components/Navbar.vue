<template>
  <nav class="fixed top-0 left-0 right-0 h-20 bg-[#FFF8F3] shadow-md z-50 px-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-full">
      
      <!-- Judul / Logo -->
      <h1 class="text-2xl font-bold text-[#3F1F0F]">🍽️ Kasir Restoran</h1>

      <!-- Navigasi -->
      <ul class="flex gap-8 text-sm font-semibold text-[#B2533E]">
        <li>
          <router-link
            to="/"
            class="hover:text-[#D9775A] transition"
            :class="{
              'text-[#B2533E] border-b-2 border-[#B2533E] pb-1':
                $route.path === '/'
            }"
          >
            Transaksi
          </router-link>
        </li>
        <li>
          <router-link
            to="/riwayat"
            class="hover:text-[#D9775A] transition"
            :class="{
              'text-[#B2533E] border-b-2 border-[#B2533E] pb-1':
                $route.path === '/riwayat'
            }"
          >
            Riwayat
          </router-link>
        </li>
        <li>
          <router-link
            to="/laporan"
            class="hover:text-[#D9775A] transition"
            :class="{
              'text-[#B2533E] border-b-2 border-[#B2533E] pb-1':
                $route.path === '/laporan'
            }"
          >
            Laporan
          </router-link>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>

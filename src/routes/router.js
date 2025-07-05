import { createRouter, createWebHistory } from "vue-router";
import Transaksi from "@/views/Transaksi.vue";
import Laporan from "@/views/Laporan.vue";
import Riwayat from "@/views/Riwayat.vue";

const routes = [
    {path: '/', name: 'transaksi', component: Transaksi},
    {path: '/laporan', name:'laporan', component: Laporan},
    {path: '/riwayat', name:'profile', component: Riwayat}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
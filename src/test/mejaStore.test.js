import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMejaStore } from '@/stores/mejaStore'

// Mock localStorage untuk lingkungan test
beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    clear: vi.fn()
  })
})

describe('mejaStore', () => {
  let mejaStore

  beforeEach(() => {
    setActivePinia(createPinia())
    mejaStore = useMejaStore()
  })

  it('harus memiliki 5 meja default jika localStorage kosong', () => {
    expect(mejaStore.daftarMeja).toHaveLength(5)
    expect(mejaStore.daftarMeja[0].nama).toBe('Meja 1')
  })

  it('dapat menandai meja sebagai tidak tersedia dan menyimpannya ke localStorage', () => {
    mejaStore.tandaiTidakTersedia(2)
    const meja = mejaStore.daftarMeja.find(m => m.id === 2)
    expect(meja.tersedia).toBe(false)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('dapat menandai meja sebagai tersedia kembali dan menyimpannya ke localStorage', () => {
    mejaStore.tandaiTidakTersedia(3)
    mejaStore.tandaiTersedia(3)
    const meja = mejaStore.daftarMeja.find(m => m.id === 3)
    expect(meja.tersedia).toBe(true)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('getter filterMeja hanya mengembalikan meja yang tersedia', () => {
    mejaStore.tandaiTidakTersedia(1)
    mejaStore.tandaiTidakTersedia(2)
    const tersedia = mejaStore.filterMeja
    expect(tersedia.length).toBe(3)
    expect(tersedia.find(m => m.id === 1)).toBeUndefined()
  })
})

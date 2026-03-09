import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  // Load from localStorage on init
  if (import.meta.client) {
    const saved = localStorage.getItem('cart')
    if (saved) items.value = JSON.parse(saved)
  }

  // Save to localStorage on change
  watch(items, (newItems) => {
    if (import.meta.client) {
      localStorage.setItem('cart', JSON.stringify(newItems))
    }
  }, { deep: true })

  // ... rest of your store (itemCount, subtotal, addItem, etc.)
})
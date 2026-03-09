<template>
  <div class="max-w-7xl mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center text-pink-800 mb-12">
      Onze parfums
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-xl shadow hover:shadow-xl transition">
        <div class="aspect-square bg-pink-100 rounded-t-xl"></div>
        <div class="p-5">
          <h3 class="font-semibold text-lg mb-2">{{ product.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">
            Vanaf € {{ product.variants?.[0]?.prices?.[0]?.amount / 100 || '?.??' }}
          </p>
          <button @click="cartStore.addItem(product)"
                  class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
            In winkelwagen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()

// Later: fetch from Medusa
const products = ref([]) // placeholder
</script>
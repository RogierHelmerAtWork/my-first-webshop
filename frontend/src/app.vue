<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-pink-700">
            Parfum Proberen.nl
          </NuxtLink>

          <div class="flex space-x-8 items-center">
            <NuxtLink to="/" class="text-gray-700 hover:text-pink-600 transition">
              Home
            </NuxtLink>
            <NuxtLink to="/products" class="text-gray-700 hover:text-pink-600 transition">
              Alle geuren
            </NuxtLink>
            <button class="text-gray-700 hover:text-pink-600 transition relative">
              Winkelwagen
              <span v-if="cartStore.itemCount > 0"
                    class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ cartStore.itemCount }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content: Nuxt injects the current page here -->
    <main class="flex-grow">
      <NuxtPage />
    </main>

    <!-- Optional footer -->
    <footer class="bg-pink-100 py-8 text-center text-gray-700 mt-auto">
      <p>© {{ new Date().getFullYear() }} Parfum Proberen.nl – Proef de luxe</p>
    </footer>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()
</script>
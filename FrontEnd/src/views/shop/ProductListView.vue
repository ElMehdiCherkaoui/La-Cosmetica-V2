<template>
  <main class="pt-28 pb-24 min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 class="text-4xl md:text-5xl font-serif text-gray-900 mb-4">The Collection</h1>
          <p class="text-gray-500 text-lg">Curated essentials for your daily ritual. ({{ mockProducts.length }} items)</p>
        </div>
        
        <div class="flex items-center gap-4">
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Filter:</span>
          <select class="border-b border-gray-300 py-2 pr-6 bg-transparent text-sm font-medium text-gray-900 focus:outline-none focus:border-black transition-colors cursor-pointer">
            <option>All Products</option>
            <option>Face Care</option>
            <option>Serums</option>
            <option>Cleansers</option>
            <option>Masks</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        
        <div v-for="product in mockProducts" :key="product.slug" class="group flex flex-col h-full">
          <router-link :to="`/products/${product.slug}`" class="block aspect-[4/5] bg-[#F5F5F5] mb-6 relative overflow-hidden">
            
            <div class="absolute inset-0 flex items-center justify-center text-gray-400 text-xs tracking-widest uppercase">
              [ {{ product.images[0] }} ]
            </div>
            
            <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div class="bg-white/95 backdrop-blur-sm text-center py-3 text-xs font-bold uppercase tracking-widest text-gray-900 shadow-sm">
                View Details
              </div>
            </div>
            
          </router-link>

          <div class="flex flex-col flex-grow text-center">
            <span class="text-[10px] text-rose-500 font-bold uppercase tracking-[0.2em] mb-2">
              {{ product.category }}
            </span>
            
            <router-link :to="`/products/${product.slug}`" class="text-xl font-serif text-gray-900 group-hover:text-rose-600 transition-colors mb-2">
              {{ product.name }}
            </router-link>
            
            <p class="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow px-2">
              {{ product.description }}
            </p>
            
            <span class="text-lg text-gray-900 font-light mt-auto">
              {{ product.price.toFixed(2) }} €
            </span>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock Data based exactly on your User Stories (Name, description, price, images, category, slug)
const mockProducts = ref([
  {
    name: 'Crème Hydratante Bio',
    slug: 'creme-hydratante-bio',
    description: 'Une crème riche et onctueuse pour une hydratation profonde sur 24 heures. Convient à tous les types de peau.',
    price: 35.00,
    category: 'Face Care',
    images: ['Image 1', 'Image 2']
  },
  {
    name: 'Sérum Éclat Vitamine C',
    slug: 'serum-eclat-vitamine-c',
    description: 'Ravive le teint et réduit les signes de fatigue dès la première application. Formule légère et pénétrante.',
    price: 45.50,
    category: 'Serums',
    images: ['Image 1']
  },
  {
    name: 'Huile Démaquillante Pure',
    slug: 'huile-demaquillante-pure',
    description: 'Élimine le maquillage waterproof tout en douceur sans fini gras. Laisse la peau nourrie et apaisée.',
    price: 28.00,
    category: 'Cleansers',
    images: ['Image 1', 'Image 2', 'Image 3']
  },
  {
    name: 'Masque Argile Rose',
    slug: 'masque-argile-rose',
    description: 'Purifie et resserre les pores pour une peau nette et lumineuse. Idéal pour une routine hebdomadaire.',
    price: 32.00,
    category: 'Masks',
    images: ['Image 1', 'Image 2', 'Image 3', 'Image 4'] // Max 4 images rule applied
  }
]);
</script>
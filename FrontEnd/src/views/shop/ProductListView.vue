<template>
  <main class="pt-28 pb-24 min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6">

      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 class="text-4xl md:text-5xl font-serif text-gray-900 mb-4">The Collection</h1>
          <p class="text-gray-500 text-lg">Curated essentials for your daily ritual. ({{ filteredProducts.length }}
            items)</p>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Filter:</span>
          <select v-model="selectedCategory"
            class="border-b border-gray-300 py-2 pr-6 bg-transparent text-sm font-medium text-gray-900 focus:outline-none focus:border-black transition-colors cursor-pointer">
            <option value="">All Products</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center py-20">
        <p class="text-gray-400 tracking-widest uppercase text-sm animate-pulse">Loading Collection...</p>
      </div>

      <div v-else-if="error" class="bg-rose-50 text-rose-500 p-6 text-center">
        {{ error }}
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-20 text-gray-500">
        No products found in this category.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">

        <div v-for="product in filteredProducts" :key="product.slug" class="group flex flex-col h-full">

          <router-link :to="`/products/${product.slug}`"
            class="block aspect-[4/5] bg-[#F5F5F5] mb-6 relative overflow-hidden">

            <img v-if="product.images && product.images.length > 0" :src="product.images[0].image_url"
              :alt="product.name"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

            <div v-else
              class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs tracking-widest uppercase">
              No Image
            </div>

            <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <router-link :to="`/products/${product.slug}`"
              class="block bg-white/95 backdrop-blur-sm text-center py-3 text-xs font-bold uppercase tracking-widest text-gray-900 shadow-sm hover:bg-black hover:text-white transition-colors">
              View Details
            </router-link>

          </router-link>

          <div class="flex flex-col flex-grow text-center">
            <span class="text-[10px] text-rose-500 font-bold uppercase tracking-[0.2em] mb-2">
              {{ product.category?.name }}
            </span>

            <router-link :to="`/products/${product.slug}`"
              class="text-xl font-serif text-gray-900 group-hover:text-rose-600 transition-colors mb-2">
              {{ product.name }}
            </router-link>

            <p class="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow px-2">
              {{ product.description }}
            </p>

            <span class="text-lg text-gray-900 font-light mt-auto">
              {{ Number(product.price).toFixed(2) }} €
            </span>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';
import axios from 'axios';

const products = ref<any[]>([]);
const categories = ref<any[]>([]);
const selectedCategory = ref('');
const isLoading = ref(true);
const error = ref('');




const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products');
    products.value = response.data.data || response.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    error.value = "Unable to load the collection at this time. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/categories');
    categories.value = response.data.data || response.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }
};

const filteredProducts = computed(() => {

  if (!selectedCategory.value) {
    return products.value;
  }
  return products.value.filter(product => product.category_id == selectedCategory.value);
});


  fetchProducts();
  fetchCategories();

</script>
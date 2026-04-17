<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">

      <div class="mb-12">
        <span class="text-xs text-rose-600 font-bold uppercase tracking-widest mb-2 block">Admin Portal</span>
        <h1 class="text-3xl font-serif text-gray-900">Store Analytics</h1>
        <p class="text-gray-500 mt-2 text-sm">Overview of sales, popular products, and category performance.</p>
      </div>

      <div v-if="isLoading" class="text-center py-20 text-gray-400 uppercase tracking-widest text-sm animate-pulse">
        Loading analytics...
      </div>
      <div v-else-if="error" class="bg-rose-50 text-rose-500 p-6 text-center mb-8">
        {{ error }}
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div class="bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Total Sales</span>
            <span class="text-4xl font-serif text-gray-900">{{ stats.sales.total_sales || 0 }}</span>
            <span class="text-xs font-medium text-emerald-500 mt-2">All time revenue</span>
          </div>

          <div class="bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Orders Completed</span>
            <span class="text-4xl font-serif text-gray-900">{{ stats.sales.total_orders || 0 }}</span>
            <span class="text-xs font-medium text-emerald-500 mt-2">Prepared & Delivered</span>
          </div>

          <div class="bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Active Customers</span>
            <span class="text-4xl font-serif text-gray-900">--</span>
            <span class="text-xs font-medium text-gray-400 mt-2">Feature coming soon</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div class="lg:col-span-2 bg-white border border-gray-100 shadow-sm p-8">
            <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 class="text-sm font-bold uppercase tracking-widest text-gray-900">Most Popular Products</h2>
              <router-link to="/admin/products"
                class="text-xs text-rose-600 font-semibold hover:text-rose-800 transition-colors">Manage Products
                &rarr;</router-link>
            </div>

            <div class="space-y-6">
              <div v-for="(product, index) in stats.popular_products" :key="index" class="flex items-center gap-4">
                <div class="w-8 text-center text-gray-400 font-serif text-lg">{{ (Number(index) + 1) }}</div>
                <div class="flex-grow">
                  <p class="text-sm font-semibold text-gray-900">{{ product.name }}</p>
                  <p class="text-xs text-gray-500">{{ product.total_quantity }} units sold</p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const stats = ref<any>(null);
const isLoading = ref(true);
const error = ref('');

const fetchStats = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/stats', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    stats.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load store analytics. Please check your connection.";
  } finally {
    isLoading.value = false;
  }
};


fetchStats();





</script>
<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="mb-12">
        <span class="text-xs text-rose-600 font-bold uppercase tracking-widest mb-2 block">Admin Portal</span>
        <h1 class="text-3xl font-serif text-gray-900">Store Analytics</h1>
        <p class="text-gray-500 mt-2 text-sm">Overview of sales, popular products, and category performance.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Total Sales (30 Days)</span>
          <span class="text-4xl font-serif text-gray-900">12,450 €</span>
          <span class="text-xs font-medium text-emerald-500 mt-2">&uarr; +14% vs last month</span>
        </div>
        <div class="bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Orders Completed</span>
          <span class="text-4xl font-serif text-gray-900">342</span>
          <span class="text-xs font-medium text-emerald-500 mt-2">&uarr; +5% vs last month</span>
        </div>
        <div class="bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Active Customers</span>
          <span class="text-4xl font-serif text-gray-900">1,204</span>
          <span class="text-xs font-medium text-gray-400 mt-2">Consistent growth</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 bg-white border border-gray-100 shadow-sm p-8">
          <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 class="text-sm font-bold uppercase tracking-widest text-gray-900">Most Popular Products</h2>
            <router-link to="/admin/products" class="text-xs text-rose-600 font-semibold hover:text-rose-800 transition-colors">Manage Products &rarr;</router-link>
          </div>
          
          <div class="space-y-6">
            <div v-for="(product, index) in mockPopularProducts" :key="index" class="flex items-center gap-4">
              <div class="w-8 text-center text-gray-400 font-serif text-lg">{{ index + 1 }}</div>
              <div class="w-12 h-12 bg-[#F5F5F5] flex-shrink-0"></div>
              <div class="flex-grow">
                <p class="text-sm font-semibold text-gray-900">{{ product.name }}</p>
                <p class="text-xs text-gray-500">{{ product.sales }} units sold</p>
              </div>
              <div class="text-sm font-medium text-gray-900">{{ product.revenue }} €</div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 shadow-sm p-8">
          <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 class="text-sm font-bold uppercase tracking-widest text-gray-900">Sales by Category</h2>
          </div>
          
          <div class="space-y-6">
            <div v-for="category in mockCategoryStats" :key="category.name">
              <div class="flex justify-between items-end mb-2">
                <span class="text-sm font-medium text-gray-900">{{ category.name }}</span>
                <span class="text-xs text-gray-500">{{ category.percentage }}%</span>
              </div>
              <div class="w-full bg-gray-100 h-1.5 overflow-hidden">
                <div class="bg-black h-full" :style="`width: ${category.percentage}%`"></div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-gray-100 text-center">
             <router-link to="/admin/categories" class="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
               Manage Categories
             </router-link>
          </div>
        </div>

      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data representing the output of Laravel Query Builder
const mockPopularProducts = ref([
  { name: 'Crème Hydratante Bio', sales: 145, revenue: '5,075.00' },
  { name: 'Sérum Éclat Vitamine C', sales: 98, revenue: '4,459.00' },
  { name: 'Huile Démaquillante Pure', sales: 76, revenue: '2,128.00' },
  { name: 'Masque Argile Rose', sales: 54, revenue: '1,728.00' }
]);

const mockCategoryStats = ref([
  { name: 'Face Care', percentage: 45 },
  { name: 'Serums', percentage: 30 },
  { name: 'Cleansers', percentage: 15 },
  { name: 'Masks', percentage: 10 }
]);
</script>
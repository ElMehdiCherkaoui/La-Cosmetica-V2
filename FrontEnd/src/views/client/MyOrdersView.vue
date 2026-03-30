<template>
  <main class="pt-28 pb-20 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-4xl mx-auto px-6">
      
      <div class="mb-12">
        <h1 class="text-3xl font-serif text-gray-900 mb-2">My Rituals (Orders)</h1>
        <p class="text-gray-500 text-sm">Track the status of your La Cosmetica purchases.</p>
      </div>

      <div class="space-y-6">
        <div 
          v-for="order in mockOrders" 
          :key="order.id"
          class="bg-white p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          
          <div class="space-y-3 flex-grow">
            <div class="flex items-center gap-4">
              <span class="font-bold text-gray-900 tracking-wider">#{{ order.reference }}</span>
              <span class="text-xs text-gray-400">{{ order.date }}</span>
            </div>
            
            <p class="text-sm text-gray-600">
              {{ order.itemsCount }} items &bull; <span class="font-medium text-gray-900">{{ order.total.toFixed(2) }} €</span>
            </p>

            <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                 :class="getStatusClasses(order.status)">
              <span class="w-1.5 h-1.5 rounded-full mr-2" :class="getDotClasses(order.status)"></span>
              {{ order.status }}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end md:min-w-[140px]">
            <button class="text-sm font-medium text-gray-900 hover:text-rose-600 transition-colors border-b border-transparent hover:border-rose-600 pb-0.5">
              View Details
            </button>
            
            <button 
              v-if="order.status === 'En attente'"
              class="text-sm font-medium text-red-500 hover:text-red-700 transition-colors border-b border-transparent hover:border-red-700 pb-0.5"
            >
              Cancel Order
            </button>
          </div>

        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock Order Data based on User Stories
const mockOrders = ref([
  {
    id: 1,
    reference: 'ORD-8A9C2F',
    date: 'March 27, 2026',
    itemsCount: 2,
    total: 70.00,
    status: 'En attente' // Pending - Can be cancelled
  },
  {
    id: 2,
    reference: 'ORD-3B1D4E',
    date: 'March 20, 2026',
    itemsCount: 1,
    total: 45.50,
    status: 'En préparation' // In Prep - Cannot be cancelled
  },
  {
    id: 3,
    reference: 'ORD-9F4A1C',
    date: 'March 05, 2026',
    itemsCount: 4,
    total: 125.00,
    status: 'Livrée' // Delivered
  }
]);

// Styling helpers for the elegant badges
const getStatusClasses = (status: string) => {
  switch (status) {
    case 'En attente': return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'En préparation': return 'bg-blue-50 text-blue-700 border border-blue-100';
    case 'Livrée': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    default: return 'bg-gray-50 text-gray-700 border border-gray-100';
  }
};

const getDotClasses = (status: string) => {
  switch (status) {
    case 'En attente': return 'bg-amber-500';
    case 'En préparation': return 'bg-blue-500';
    case 'Livrée': return 'bg-emerald-500';
    default: return 'bg-gray-500';
  }
};
</script>
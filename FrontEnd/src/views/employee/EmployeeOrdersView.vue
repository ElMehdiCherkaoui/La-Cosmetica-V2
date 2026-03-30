<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
        <div>
          <span class="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-2 block">Staff Portal</span>
          <h1 class="text-3xl font-serif text-gray-900">Order Fulfillment</h1>
          <p class="text-gray-500 mt-2 text-sm">Manage and update customer order statuses.</p>
        </div>
        
        <div class="flex gap-4">
          <button class="text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1">All Orders</button>
          <button class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors pb-1">Pending</button>
          <button class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors pb-1">Prepared</button>
        </div>
      </div>

      <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th class="px-6 py-4 font-semibold">Order Ref</th>
                <th class="px-6 py-4 font-semibold">Customer</th>
                <th class="px-6 py-4 font-semibold">Date</th>
                <th class="px-6 py-4 font-semibold">Status</th>
                <th class="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              
              <tr v-for="order in mockEmployeeOrders" :key="order.reference" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5 font-medium text-gray-900">#{{ order.reference }}</td>
                <td class="px-6 py-5">
                  <p class="text-gray-900">{{ order.customer }}</p>
                  <p class="text-xs text-gray-400">{{ order.items }} items</p>
                </td>
                <td class="px-6 py-5 text-gray-500">{{ order.date }}</td>
                <td class="px-6 py-5">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        :class="getStatusClasses(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  <button 
                    v-if="order.status === 'En attente'" 
                    @click="order.status = 'En préparation'"
                    class="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    Mark as Prepared
                  </button>
                  
                  <button 
                    v-else-if="order.status === 'En préparation'" 
                    @click="order.status = 'Livrée'"
                    class="bg-emerald-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors"
                  >
                    Mark as Delivered
                  </button>
                  
                  <span v-else class="text-xs text-gray-400 font-medium uppercase tracking-widest">
                    Completed
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mockEmployeeOrders = ref([
  { reference: 'ORD-8A9C2F', customer: 'Jane Doe', items: 2, date: 'Mar 27, 2026', status: 'En attente' },
  { reference: 'ORD-5T2H9P', customer: 'Sarah Smith', items: 1, date: 'Mar 27, 2026', status: 'En attente' },
  { reference: 'ORD-3B1D4E', customer: 'Emma Johnson', items: 4, date: 'Mar 26, 2026', status: 'En préparation' },
  { reference: 'ORD-9F4A1C', customer: 'Alice Brown', items: 2, date: 'Mar 25, 2026', status: 'Livrée' }
]);

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'En attente': return 'bg-amber-100 text-amber-800';
    case 'En préparation': return 'bg-blue-100 text-blue-800';
    case 'Livrée': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>
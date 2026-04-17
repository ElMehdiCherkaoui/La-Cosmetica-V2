<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
        <div>
          <span class="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-2 block">Staff Portal</span>
          <h1 class="text-3xl font-serif text-gray-900">Order Fulfillment</h1>
          <p class="text-gray-500 mt-2 text-sm">Manage and update customer order statuses.</p>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-20 text-gray-400 uppercase tracking-widest text-sm animate-pulse">
        Loading queue...
      </div>
      <div v-else-if="error" class="bg-rose-50 text-rose-500 p-6 text-center">{{ error }}</div>

      <div v-else class="bg-white border border-gray-100 shadow-sm overflow-hidden">
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
              
              <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5 font-medium text-gray-900">#ORD-00{{ order.id }}</td>
                <td class="px-6 py-5">
                  <p class="text-gray-900 font-medium">{{ order.user?.name || 'Customer' }}</p>
                  <p class="text-xs text-gray-400">{{ Number(order.total_amount).toFixed(2) }} €</p>
                </td>
                <td class="px-6 py-5 text-gray-500">{{ new Date(order.created_at) }}</td>
                <td class="px-6 py-5">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        :class="order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                 order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                 order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                                 order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  
                  <button 
                    v-if="order.status === 'pending'" 
                    @click="markAsPrepared(order.id)"
                    class="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    Mark as Prepared
                  </button>
                  
                  <button 
                    v-else-if="order.status === 'preparing'" 
                    @click="markAsDelivered(order.id)"
                    class="bg-emerald-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors"
                  >
                    Mark as Delivered
                  </button>
                  
                  <span v-else class="text-xs text-gray-400 font-medium uppercase tracking-widest">
                    {{ order.status === 'cancelled' ? 'Cancelled' : 'Completed' }}
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
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const orders = ref<any[]>([]);
const isLoading = ref(true);
const error = ref('');

const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/employee/orders', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    orders.value = response.data.reverse();
  } catch (err) {
    console.error(err);
    error.value = "Failed to load the order queue.";
  } finally {
    isLoading.value = false;
  }
};

const markAsPrepared = async (id: number) => {
  try {
    await axios.put(`http://localhost:8000/api/employee/orders/${id}/prepare`, {}, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    fetchOrders();
  } catch (err) {
    alert("Failed to update status.");
  }
};

const markAsDelivered = async (id: number) => {
  try {
    await axios.put(`http://localhost:8000/api/employee/orders/${id}/deliver`, {}, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    fetchOrders(); 
  } catch (err) {
    alert("Failed to update status.");
  }
};


  fetchOrders();



</script>
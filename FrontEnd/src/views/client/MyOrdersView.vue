<template>
  <main class="pt-28 pb-20 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-4xl mx-auto px-6">

      <div class="mb-12">
        <h1 class="text-3xl font-serif text-gray-900 mb-2">My Rituals (Orders)</h1>
        <p class="text-gray-500 text-sm">Track the status of your La Cosmetica purchases.</p>
      </div>

      <div v-if="isLoading" class="text-center py-20 text-gray-400 uppercase tracking-widest text-sm animate-pulse">
        Loading your orders...
      </div>

      <div v-else-if="error" class="bg-rose-50 text-rose-500 p-6 text-center">
        {{ error }}
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-20 bg-white border border-gray-100">
        <p class="text-gray-500 mb-4">You haven't placed any orders yet.</p>
        <router-link to="/products"
          class="text-black font-bold border-b border-black pb-1 hover:text-rose-600 hover:border-rose-600 transition-colors">
          Start Shopping
        </router-link>
      </div>

      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order.id"
          class="bg-white p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div class="space-y-3 flex-grow">
            <div class="flex items-center gap-4">
              <span class="font-bold text-gray-900 tracking-wider">#ORD-00{{ order.id }}</span>
              <span class="text-xs text-gray-400">{{ new Date(order.created_at).toLocaleDateString() }}</span>
            </div>

            <p class="text-sm text-gray-600">
              Total: <span class="font-medium text-gray-900">{{ Number(order.total_amount).toFixed(2) }} €</span>
            </p>

            <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
              :class="getStatusClasses(order.status)">

              {{ translateStatus(order.status) }}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end md:min-w-[140px]">
            <button v-if="order.status === 'pending'" @click="cancelOrder(order.id)"
              class="text-sm font-medium text-red-500 hover:text-red-700 transition-colors border-b border-transparent hover:border-red-700 pb-0.5">
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
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const orders = ref<any[]>([]);
const isLoading = ref(true);
const error = ref('');


const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/orders', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });

    orders.value = response.data.reverse();
  } catch (err) {
    console.error(err);
    error.value = "Failed to load your orders. Please try again.";
  } finally {
    isLoading.value = false;
  }
};


const cancelOrder = async (orderId: number) => {
  if (!confirm("Are you sure you want to cancel this order?")) return;

  try {
    await axios.post(`http://localhost:8000/api/orders/cancel/${orderId}`, {}, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });

    alert("Order successfully cancelled.");
    fetchOrders();

  } catch (err) {
    console.error("Cancel failed:", err);
    alert("Could not cancel the order. It might already be prepared.");
  }
};

  fetchOrders();



const translateStatus = (status: string) => {
  const map: Record<string, string> = {
    'pending': 'En attente',
    'prepared': 'En préparation',
    'delivered': 'Livrée',
    'cancelled': 'Annulée'
  };
  return map[status] || status;
};

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'prepared': return 'bg-blue-50 text-blue-700 border border-blue-100';
    case 'delivered': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'cancelled': return 'bg-red-50 text-red-700 border border-red-100';
    default: return 'bg-gray-50 text-gray-700 border border-gray-100';
  }
};


</script>
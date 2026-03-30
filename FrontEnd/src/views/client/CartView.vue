<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">
      
      <h1 class="text-4xl font-serif text-gray-900 mb-10">Your Bag</h1>

      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        <div class="w-full lg:w-2/3 flex flex-col gap-8">
          
          <div v-if="cartItems.length === 0" class="text-gray-500 py-10 border-t border-gray-200">
            Your bag is currently empty.
            <router-link to="/products" class="text-black font-semibold hover:text-rose-600 block mt-4 transition-colors">
              Continue Shopping &rarr;
            </router-link>
          </div>

          <div 
            v-else
            v-for="(item, index) in cartItems" 
            :key="item.slug" 
            class="flex items-center gap-6 border-b border-gray-200 pb-8"
          >
            <div class="w-24 h-32 bg-[#F5F5F5] flex-shrink-0 flex items-center justify-center text-xs text-gray-400 tracking-widest uppercase">
              [Img]
            </div>

            <div class="flex-grow">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-serif text-gray-900">{{ item.name }}</h3>
                  <p class="text-xs text-rose-500 font-semibold uppercase tracking-widest mt-1">{{ item.category }}</p>
                </div>
                <button @click="removeItem(index)" class="text-gray-400 hover:text-red-500 transition-colors text-xl leading-none" title="Remove item">
                  &times;
                </button>
              </div>

              <div class="flex justify-between items-end mt-6">
                <div class="flex items-center border border-gray-300 px-3 py-1.5 w-24 justify-between bg-white">
                  <button @click="item.quantity > 1 ? item.quantity-- : null" class="text-gray-500 hover:text-black transition-colors">&minus;</button>
                  <span class="text-sm font-medium">{{ item.quantity }}</span>
                  <button @click="item.quantity++" class="text-gray-500 hover:text-black transition-colors">&plus;</button>
                </div>

                <span class="text-lg font-medium text-gray-900">{{ (item.price * item.quantity).toFixed(2) }} €</span>
              </div>
            </div>
          </div>

        </div>

        <div class="w-full lg:w-1/3">
          <div class="bg-white p-8 border border-gray-100 shadow-sm sticky top-32">
            <h2 class="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
            
            <div class="space-y-4 mb-6 text-sm text-gray-600">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ subtotal.toFixed(2) }} €</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span class="text-gray-900 font-medium">Free</span>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4 mb-8">
              <div class="flex justify-between items-center text-lg font-medium text-gray-900">
                <span>Total</span>
                <span>{{ subtotal.toFixed(2) }} €</span>
              </div>
              <p class="text-xs text-gray-400 mt-2">Taxes included. Proceeding will confirm your order.</p>
            </div>

            <button 
              :disabled="cartItems.length === 0"
              class="w-full bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
            
            <div class="mt-4 text-center">
              <router-link to="/products" class="text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-widest">
                Or Continue Shopping
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Mock Cart Data based on your User Stories
const cartItems = ref([
  {
    name: 'Crème Hydratante Bio',
    slug: 'creme-hydratante-bio',
    category: 'Face Care',
    price: 35.00,
    quantity: 1,
  },
  {
    name: 'Sérum Éclat Vitamine C',
    slug: 'serum-eclat-vitamine-c',
    category: 'Serums',
    price: 45.50,
    quantity: 2,
  }
]);

// Automatically calculate the total
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Remove item logic
const removeItem = (index: number) => {
  cartItems.value.splice(index, 1);
};
</script>
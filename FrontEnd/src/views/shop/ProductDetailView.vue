<template>
  <main class="pt-28 pb-24 min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6">

      <router-link to="/products" class="inline-block mb-8 text-sm text-gray-400 hover:text-black transition-colors">
        &larr; Back to Collection
      </router-link>

      <div v-if="isLoading" class="flex justify-center py-32">
        <p class="text-gray-400 tracking-widest uppercase text-sm animate-pulse">Loading Product Details...</p>
      </div>

      <div v-else-if="error" class="bg-rose-50 text-rose-500 p-6 text-center">
        {{ error }}
      </div>

      <div v-else-if="product" class="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        <div class="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">

          <div class="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 shrink-0">
            <button v-for="(img, index) in product.images" :key="img.id" @click="activeImage = Number(index)"
              class="aspect-square bg-[#F5F5F5] w-20 md:w-full flex-shrink-0 border-2 transition-colors duration-200 overflow-hidden"
              :class="activeImage === Number(index) ? 'border-black' : 'border-transparent hover:border-gray-300'" 
              >
              <img :src="img.image_url" :alt="product.name" class="w-full h-full object-cover"  />
            </button>
          </div>

          <div class="aspect-[4/5] bg-[#F5F5F5] w-full flex items-center justify-center relative overflow-hidden">
            <img v-if="product.images && product.images.length > 0" :src="product.images[activeImage].image_url"
              :alt="product.name" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
            <span v-else class="text-gray-400 uppercase tracking-widest text-sm">
              No Image Available
            </span>
          </div>
        </div>

        <div class="w-full lg:w-1/2 top-32 pt-8">
          <div class="mb-8">
            <span class="text-xs text-rose-500 font-semibold uppercase tracking-[0.15em] mb-4 block">
              {{ product.category?.name }}
            </span>
            <h1 class="text-4xl md:text-5xl font-serif text-gray-900 leading-tight mb-4">
              {{ product.name }}
            </h1>
            <p class="text-2xl text-gray-900 font-light">{{ Number(product.price).toFixed(2) }} €</p>
          </div>

          <div class="prose prose-sm text-gray-500 mb-10 leading-relaxed">
            <p>{{ product.description }}</p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <div
              class="flex items-center justify-between border border-gray-200 rounded-full p-1 sm:w-1/3 bg-white shadow-sm">

              <button @click="quantity > 1 ? quantity-- : null" :disabled="quantity <= 1"
                class="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-colors active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed">
                <span class="text-xl leading-none pb-0.5">&minus;</span>
              </button>

              <span class="w-12 text-center text-sm font-bold text-gray-900 select-none">
                {{ quantity }}
              </span>

              <button @click="quantity++"
                class="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-colors active:scale-95">
                <span class="text-xl leading-none pb-0.5">&plus;</span>
              </button>

            </div>

<button 
  @click="addToBag"
  class="bg-black text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors sm:w-2/3"
>
  Add to Bag
</button>
          </div>

          

        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore';

const route = useRoute(); 
const router = useRouter(); 

const product = ref<any>(null); 
const isLoading = ref(true);
const error = ref('');

const activeImage = ref(0);
const quantity = ref(1);

const cartStore = useCartStore();

const fetchProduct = async () => {
  try {
    const slug = route.params.slug;
    const response = await axios.get(`http://localhost:8000/api/products/${slug}`);

    product.value = response.data.data || response.data;

  } catch (err) {
    console.error("Failed to fetch product:", err);
    error.value = "Product not found or currently unavailable.";
  } finally {
    isLoading.value = false;
  }
};

const addToBag = async () => {
  if (product.value) {
    try {

      cartStore.addToCart(product.value, quantity.value);

      await cartStore.checkout(); 
      
      alert("Order placed successfully! 🌿"); 

      router.push('/orders');

    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please make sure you are logged in!");
      router.push('/login');
    }
  }
};


  fetchProduct();

</script>
<template>
  <main class="pt-28 pb-24 min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6">
      
      <router-link to="/products" class="inline-block mb-8 text-sm text-gray-400 hover:text-black transition-colors">
        &larr; Back to Collection
      </router-link>

      <div class="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        <div class="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          <div class="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 shrink-0">
            <button 
              v-for="(img, index) in mockProduct.images" 
              :key="index"
              class="aspect-square bg-[#F5F5F5] w-20 md:w-full flex-shrink-0 border-2 transition-colors duration-200"
              :class="activeImage === index ? 'border-black' : 'border-transparent hover:border-gray-300'"
              @click="activeImage = index"
            >
              <span class="flex items-center justify-center h-full text-xs text-gray-400">[{{ index + 1 }}]</span>
            </button>
          </div>

          <div class="aspect-[4/5] bg-[#F5F5F5] w-full flex items-center justify-center relative overflow-hidden">
            <span class="text-gray-400 uppercase tracking-widest text-sm">
              [ {{ mockProduct.images[activeImage] }} ]
            </span>
          </div>
        </div>

        <div class="w-full lg:w-1/2 sticky top-32 pt-8">
          <div class="mb-8">
            <span class="text-xs text-rose-500 font-semibold uppercase tracking-[0.15em] mb-4 block">
              {{ mockProduct.category }}
            </span>
            <h1 class="text-4xl md:text-5xl font-serif text-gray-900 leading-tight mb-4">
              {{ mockProduct.name }}
            </h1>
            <p class="text-2xl text-gray-900 font-light">{{ mockProduct.price.toFixed(2) }} €</p>
          </div>

          <div class="prose prose-sm text-gray-500 mb-10 leading-relaxed">
            <p>{{ mockProduct.description }}</p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <div class="flex items-center border border-gray-300 px-4 py-3 sm:w-1/3 justify-between">
  <button @click="quantity > 1 ? quantity-- : null" class="text-gray-500 hover:text-black">&minus;</button>
  <span class="text-sm font-medium">{{ quantity }}</span>
  <button @click="quantity++" class="text-gray-500 hover:text-black">&plus;</button>
</div>
            
            <button class="bg-black text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors sm:w-2/3">
              Add to Bag
            </button>
          </div>

          <div class="border-t border-gray-200">
            <div class="border-b border-gray-200">
              <div @click="toggleAccordion('usage')" class="py-4 flex justify-between items-center cursor-pointer hover:text-rose-600 transition-colors">
                <span class="text-sm font-medium uppercase tracking-wider">How to use</span>
                <span class="text-lg font-light">{{ activeAccordion === 'usage' ? '&minus;' : '&plus;' }}</span>
              </div>
              <div v-show="activeAccordion === 'usage'" class="pb-4 text-sm text-gray-500 leading-relaxed">
                Apply a small amount to clean, dry skin every morning and evening. Massage gently in upward circular motions until fully absorbed.
              </div>
            </div>

            <div class="border-b border-gray-200">
              <div @click="toggleAccordion('ingredients')" class="py-4 flex justify-between items-center cursor-pointer hover:text-rose-600 transition-colors">
                <span class="text-sm font-medium uppercase tracking-wider">Ingredients</span>
                <span class="text-lg font-light">{{ activeAccordion === 'ingredients' ? '&minus;' : '&plus;' }}</span>
              </div>
              <div v-show="activeAccordion === 'ingredients'" class="pb-4 text-sm text-gray-500 leading-relaxed">
                Aqua, Aloe Barbadensis Leaf Juice, Glycerin, Rosa Canina Fruit Oil, Cetearyl Alcohol, Tocopherol (Vitamin E), Natural Fragrance.
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

const mockProduct = ref({
  name: 'Crème Hydratante Bio',
  slug: 'creme-hydratante-bio',
  description: 'Une crème riche et onctueuse pour une hydratation profonde sur 24 heures. Enriched with natural oils and botanical extracts to soothe and restore the skin barrier.',
  price: 35.00,
  category: 'Face Care',
  images: ['Front View', 'Texture Close-up', 'Packaging', 'Lifestyle']
});

const activeImage = ref(0);
const quantity = ref(1);

const activeAccordion = ref<string | null>(null);
const toggleAccordion = (section: string) => {
  activeAccordion.value = activeAccordion.value === section ? null : section;
};
</script>
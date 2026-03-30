<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
        <div>
          <span class="text-xs text-rose-600 font-bold uppercase tracking-widest mb-2 block">Admin Portal</span>
          <h1 class="text-3xl font-serif text-gray-900">Manage Products</h1>
          <p class="text-gray-500 mt-2 text-sm">Create, edit, and curate your catalog.</p>
        </div>
        <button @click="toggleForm" class="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">
          {{ showForm ? 'Close Form' : '+ Add New Product' }}
        </button>
      </div>

      <div v-if="showForm" class="bg-white border border-gray-100 shadow-sm p-8 mb-12 transition-all">
        <h2 class="text-xl font-serif text-gray-900 mb-6 border-b border-gray-100 pb-4">Product Details</h2>
        
        <form @submit.prevent="saveProduct" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="space-y-5">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
              <input type="text" v-model="formData.name" required class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors" placeholder="e.g., Crème de Nuit">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price (€)</label>
                <input type="number" step="0.01" v-model="formData.price" required class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors" placeholder="0.00">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                <select v-model="formData.category" required class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors">
                  <option value="Face Care">Face Care</option>
                  <option value="Serums">Serums</option>
                  <option value="Cleansers">Cleansers</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
              <textarea v-model="formData.description" required rows="3" class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors resize-none" placeholder="Product description..."></textarea>
            </div>
          </div>

          <div class="bg-gray-50 p-6 border border-gray-100">
            <label class="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 flex justify-between">
              <span>Product Images</span>
              <span class="text-gray-400 font-normal">{{ formData.images.length }} / 4 Max</span>
            </label>

            <div class="grid grid-cols-4 gap-2 mb-4">
              <div v-for="(img, index) in formData.images" :key="index" class="aspect-square bg-gray-200 relative group flex items-center justify-center">
                <span class="text-[10px] text-gray-500">Img {{ index + 1 }}</span>
                <button @click.prevent="removeImage(index)" class="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs uppercase font-bold">
                  Remove
                </button>
              </div>
            </div>

            <p v-if="imageError" class="text-xs text-red-600 font-bold bg-red-50 p-3 border border-red-100 mb-4">
              ⚠️ Limite de 4 images par produit dépassée
            </p>

            <div class="flex gap-2">
              <input type="text" v-model="newImageUrl" placeholder="Image URL..." class="flex-grow border-b border-gray-300 py-2 bg-white px-3 text-sm focus:outline-none focus:border-black transition-colors">
              <button @click.prevent="addImage" class="bg-gray-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">
                Add
              </button>
            </div>
          </div>

          <div class="md:col-span-2 flex justify-end gap-4 mt-4 border-t border-gray-100 pt-6">
            <button type="button" @click="toggleForm" class="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">Cancel</button>
            <button type="submit" class="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">Save Product</button>
          </div>
        </form>
      </div>

      <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th class="px-6 py-4 font-semibold">Product</th>
                <th class="px-6 py-4 font-semibold">Category</th>
                <th class="px-6 py-4 font-semibold">Price</th>
                <th class="px-6 py-4 font-semibold">Images</th>
                <th class="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              
              <tr v-for="product in mockProducts" :key="product.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5">
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-xs text-gray-400 font-mono">{{ product.slug }}</p>
                </td>
                <td class="px-6 py-5 text-gray-600">{{ product.category }}</td>
                <td class="px-6 py-5 font-medium text-gray-900">{{ product.price.toFixed(2) }} €</td>
                <td class="px-6 py-5 text-gray-500">{{ product.images.length }} / 4</td>
                <td class="px-6 py-5 text-right space-x-4">
                  <button class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Edit</button>
                  <button class="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Delete</button>
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

const showForm = ref(false);
const toggleForm = () => { showForm.value = !showForm.value; };

// Form State
const formData = ref({
  name: '',
  price: 0,
  category: 'Face Care',
  description: '',
  images: [] as string[]
});

// Image Logic
const newImageUrl = ref('');
const imageError = ref(false);

const addImage = () => {
  if (formData.value.images.length >= 4) {
    imageError.value = true;
    return;
  }
  if (newImageUrl.value) {
    formData.value.images.push(newImageUrl.value);
    newImageUrl.value = '';
    imageError.value = false;
  }
};

const removeImage = (index: number) => {
  formData.value.images.splice(index, 1);
  if (formData.value.images.length < 4) {
    imageError.value = false;
  }
};

const saveProduct = () => {
  console.log('Saving product...', formData.value);
  toggleForm();
};

// Mock Catalog
const mockProducts = ref([
  { id: 1, name: 'Crème Hydratante Bio', slug: 'creme-hydratante-bio', category: 'Face Care', price: 35.00, images: ['img1', 'img2'] },
  { id: 2, name: 'Sérum Éclat Vitamine C', slug: 'serum-eclat-vitamine-c', category: 'Serums', price: 45.50, images: ['img1'] }
]);
</script>
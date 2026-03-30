<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-4xl mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
        <div>
          <span class="text-xs text-rose-600 font-bold uppercase tracking-widest mb-2 block">Admin Portal</span>
          <h1 class="text-3xl font-serif text-gray-900">Manage Categories</h1>
          <p class="text-gray-500 mt-2 text-sm">Organize your collections.</p>
        </div>
        <button @click="toggleForm" class="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">
          {{ showForm ? 'Close Form' : '+ Add Category' }}
        </button>
      </div>

      <div v-if="showForm" class="bg-white border border-gray-100 shadow-sm p-8 mb-12 transition-all">
        <form @submit.prevent="saveCategory" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category Name</label>
            <input type="text" v-model="formData.name" required class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors" placeholder="e.g., Body Care">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Slug (Auto-generated)</label>
            <input type="text" :value="generateSlug(formData.name)" disabled class="w-full border-b border-gray-200 py-2 bg-transparent text-gray-400 cursor-not-allowed">
          </div>
          <div class="md:col-span-2 flex justify-end gap-4 mt-2">
            <button type="submit" class="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">Save Category</button>
          </div>
        </form>
      </div>

      <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
            <tr>
              <th class="px-6 py-4 font-semibold">Category Name</th>
              <th class="px-6 py-4 font-semibold">Products Linked</th>
              <th class="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <tr v-for="category in mockCategories" :key="category.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-5">
                <p class="font-medium text-gray-900">{{ category.name }}</p>
                <p class="text-xs text-gray-400 font-mono">{{ category.slug }}</p>
              </td>
              <td class="px-6 py-5 text-gray-600">{{ category.productsCount }} Items</td>
              <td class="px-6 py-5 text-right space-x-4">
                <button class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Edit</button>
                <button 
                  class="text-xs font-bold uppercase tracking-widest transition-colors"
                  :class="category.productsCount > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-red-400 hover:text-red-600'"
                  :disabled="category.productsCount > 0"
                  :title="category.productsCount > 0 ? 'Cannot delete category with active products' : 'Delete Category'"
                >
                  Delete
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showForm = ref(false);
const toggleForm = () => { showForm.value = !showForm.value; };

const formData = ref({
  name: ''
});

// Simple mock slug generator
const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const saveCategory = () => {
  console.log('Saving category...', formData.value);
  toggleForm();
};

const mockCategories = ref([
  { id: 1, name: 'Face Care', slug: 'face-care', productsCount: 14 },
  { id: 2, name: 'Serums', slug: 'serums', productsCount: 8 },
  { id: 3, name: 'Cleansers', slug: 'cleansers', productsCount: 5 },
  { id: 4, name: 'New Empty Category', slug: 'new-empty-category', productsCount: 0 } // This one can be deleted
]);
</script>
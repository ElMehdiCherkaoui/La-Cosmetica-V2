<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
        <div>
          <span class="text-xs text-rose-600 font-bold uppercase tracking-widest mb-2 block">Admin Portal</span>
          <h1 class="text-3xl font-serif text-gray-900">Manage Categories</h1>
          <p class="text-gray-500 mt-2 text-sm">Organize your collections.</p>
        </div>
        <button @click="openCreateForm" class="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">
          + Add Category
        </button>
      </div>

      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div class="bg-white w-full max-w-2xl shadow-2xl relative p-8 md:p-10">
          
          <button @click="closeForm" class="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors text-xl leading-none">
            &times;
          </button>

          <h2 class="text-2xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-4">
            {{ isEditing ? 'Edit Category' : 'Add New Category' }}
          </h2>

          <form @submit.prevent="saveCategory" class="gap-8 items-end">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category Name</label>
              <input type="text" v-model="formData.name" required class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors" placeholder="e.g., Body Care">
            </div>
          
            <div class="md:col-span-2 flex justify-end gap-4 mt-2 border-t border-gray-100 pt-6">
              <button type="button" @click="closeForm" class="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">Cancel</button>
              <button type="submit" class="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">
                {{ isEditing ? 'Update Category' : 'Save Category' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-20 text-gray-400 uppercase tracking-widest text-sm animate-pulse">
        Loading categories...
      </div>

      <div v-else-if="error" class="bg-rose-50 text-rose-500 p-6 text-center mb-8">
        {{ error }}
      </div>

      <div v-else class="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
            <tr>
              <th class="px-6 py-4 font-semibold">Category Name</th>
              <th class="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-5">
                <p class="font-medium text-gray-900">{{ category.name }}</p>
                <p class="text-xs text-gray-400 font-mono">{{ category.slug }}</p>
              </td>
              <td class="px-6 py-5 text-right space-x-4">
                
                <button @click="openEditForm(category)" class="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors">
                  Edit
                </button>
                
                <button @click="deleteCategory(category.id)" class="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">
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
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const showForm = ref(false);
const isLoading = ref(true);
const error = ref('');

const isEditing = ref(false); 

const categories = ref<any[]>([]);

const formData = ref({
  id: null as number | null,
  name: ''
});


const openCreateForm = () => {
  isEditing.value = false; 
  formData.value = { id: null, name: '' };
  showForm.value = true;
};


const openEditForm = (category: any) => {
  isEditing.value = true; 
  formData.value = { 
    id: category.id, 
    name: category.name 
  };
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/categories');
    categories.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Failed.";
  } finally {
    isLoading.value = false;
  }
};


  fetchCategories();


const saveCategory = async () => {
  try {
    const payload = {
      name: formData.value.name,
    };

    if (isEditing.value === true) {
      await axios.put(`http://localhost:8000/api/admin/categories/${formData.value.id}`, payload, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert("Category updated successfully!");
    } else {
      await axios.post('http://localhost:8000/api/admin/categories', payload, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert("Category created successfully!");
    }
    
    closeForm();
    fetchCategories(); 

  } catch (err) {
    console.error(err);
    alert("Failed.");
  }
};

const deleteCategory = async (id: number) => {
  if (!confirm("Are you sure you want to delete this category? Make sure no products are using it!")) return;

  try {
    await axios.delete(`http://localhost:8000/api/admin/categories/${id}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    
    fetchCategories(); 
  } catch (err) {
    console.error(err);
    alert("Faileds.");
  }
};
</script>
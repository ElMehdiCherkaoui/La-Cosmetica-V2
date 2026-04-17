<template>
  <main class="pt-28 pb-24 min-h-screen bg-[#FAFAFA]">
    <div class="max-w-7xl mx-auto px-6">

      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
        <div>
          <span class="text-xs text-rose-600 font-bold uppercase tracking-widest mb-2 block">Admin Portal</span>
          <h1 class="text-3xl font-serif text-gray-900">Manage Products</h1>
          <p class="text-gray-500 mt-2 text-sm">Create, edit, and curate your catalog.</p>
        </div>
        <button @click="openAddForm"
          class="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">
          + Add New Product
        </button>
      </div>

      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">

        <div class="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">

          <button @click="closeForm"
            class="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors text-xl leading-none">
            &times;
          </button>

          <div class="p-8 md:p-10">
            <h2 class="text-2xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-4">
              <span v-if="isEditing">Edit Product</span>
              <span v-else>Add New Product</span>
            </h2>

            <form @submit.prevent="saveProduct" class="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div class="space-y-5">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product
                    Name</label>
                  <input type="text" v-model="formData.name" required
                    class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors"
                    placeholder="e.g., Crème de Nuit">
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price
                      (€)</label>
                    <input type="number" step="0.01" v-model="formData.price" required
                      class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors"
                      placeholder="0.00">
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Stock</label>
                    <input type="number" v-model="formData.stock" required
                      class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors"
                      placeholder="0">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                  <select v-model="formData.category_id" required
                    class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors">
                    <option value="" disabled>Select a category</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                  <textarea v-model="formData.description" required rows="3"
                    class="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Product description..."></textarea>
                </div>
              </div>

              <div class="bg-gray-50 p-6 border border-gray-100">
                <label
                  class="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 flex justify-between">
                  <span>Product Images (URLs)</span>
                  <span class="text-gray-400 font-normal">{{ formData.images.length }} / 4 Max</span>
                </label>

                <div class="grid grid-cols-4 gap-2 mb-4">
                  <div v-for="(img, index) in formData.images" :key="index"
                    class="aspect-square bg-gray-200 relative group flex items-center justify-center overflow-hidden">
                    <img :src="img" class="w-full h-full object-cover" />
                    <button @click.prevent="removeImage(index)"
                      class="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs uppercase font-bold">
                      Remove
                    </button>
                  </div>
                </div>

                <p v-if="imageError" class="text-xs text-red-600 font-bold bg-red-50 p-3 border border-red-100 mb-4">
                  ⚠️ Limite de 4 images par produit dépassée
                </p>

                <div class="flex gap-2">
                  <input type="text" v-model="newImageUrl" placeholder="https://picsum.photos/..."
                    class="flex-grow border-b border-gray-300 py-2 bg-white px-3 text-sm focus:outline-none focus:border-black transition-colors">
                  <button @click.prevent="addImage"
                    class="bg-gray-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">
                    Add
                  </button>
                </div>
              </div>

              <div class="md:col-span-2 flex justify-end gap-4 mt-6 pt-6 border-t border-gray-100">
                <button type="button" @click="closeForm"
                  class="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">Cancel</button>
                <button type="submit"
                  class="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm">
                  <span v-if="isEditing">Update Product</span>
                  <span v-else>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="text-center py-20 text-gray-400 uppercase tracking-widest text-sm animate-pulse">
        Loading catalog...
      </div>

      <div v-else class="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th class="px-6 py-4 font-semibold">Product</th>
                <th class="px-6 py-4 font-semibold">Category</th>
                <th class="px-6 py-4 font-semibold">Stock</th>
                <th class="px-6 py-4 font-semibold">Price</th>
                <th class="px-6 py-4 font-semibold">Images</th>
                <th class="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">

              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-5">
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-xs text-gray-400 font-mono">{{ product.slug }}</p>
                </td>
                <td class="px-6 py-5 text-gray-600">{{ product.category.name || 'Uncategorized' }}</td>
                <td class="px-6 py-5 text-gray-600">
                  <span :class="product.stock < 10 ? 'text-rose-500 font-bold' : ''">{{ product.stock }}</span>
                </td>
                <td class="px-6 py-5 font-medium text-gray-900">{{ Number(product.price).toFixed(2) }} €</td>
                <td class="px-6 py-5 text-gray-500">{{ product.images.length || 0 }} / 4</td>
                <td class="px-6 py-5 text-right space-x-4">
                  <button @click="openEditForm(product)"
                    class="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-600 transition-colors">
                    Edit
                  </button>
                  <button @click="deleteProduct(product.id)"
                    class="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">
                    Delete
                  </button>
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

const showForm = ref(false);
const isLoading = ref(true);

const isEditing = ref(false);

const editProductId = ref(0);

const products = ref<any[]>([]);
const categories = ref<any[]>([]);

const formData = ref({
  name: '',
  price: 0,
  stock: 0,
  category_id: '',
  description: '',
  images: [] as string[]
});

const openAddForm = () => {
  isEditing.value = false;
  formData.value = { name: '', price: 0, stock: 0, category_id: '', description: '', images: [] };
  showForm.value = true;
};

const openEditForm = (product: any) => {
  isEditing.value = true;
  editProductId.value = product.id;


  formData.value.name = product.name;
  formData.value.price = product.price;
  formData.value.stock = product.stock;


  if (product.category_id) {
    formData.value.category_id = product.category_id;
  } else if (product.category && product.category.id) {
    formData.value.category_id = product.category.id;
  } else {
    formData.value.category_id = '';
  }

  formData.value.description = product.description;

  if (product.images && product.images.length > 0) {

    formData.value.images = product.images.map((img: { image_url: string }) => img.image_url);
  } else {
    formData.value.images = [];
  }

  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  imageError.value = false;
};

const fetchProductsAndCategories = async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      axios.get('http://localhost:8000/api/admin/products', { headers: { Authorization: `Bearer ${authStore.token}` } }),
      axios.get('http://localhost:8000/api/categories')
    ]);

    products.value = productsRes.data.reverse();
    categories.value = categoriesRes.data;
  } catch (err) {
    console.error("Failed to load data", err);
    alert("Error");
  } finally {
    isLoading.value = false;
  }
};

fetchProductsAndCategories();

const saveProduct = async () => {
  try {

    if (isEditing.value === true) {
      await axios.put(`http://localhost:8000/api/admin/products/${editProductId.value}`, formData.value, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert("Product updated successfully!");

    } else {
      await axios.post('http://localhost:8000/api/admin/products', formData.value, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert("Product created successfully!");
    }

    closeForm();
    fetchProductsAndCategories();

  } catch (err: any) {
    console.error(err);
    alert("Failed to save product.");
  }
};

const deleteProduct = async (id: number) => {
  if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;

  try {
    await axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    fetchProductsAndCategories();
  } catch (err) {
    console.error(err);
    alert("Failed to delete product.");
  }
};

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
</script>
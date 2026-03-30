<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <nav class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      
      <router-link to="/" class="text-xl font-bold text-gray-900">
        LA COSMETICA
      </router-link>

      <div class="flex gap-6 text-sm font-medium text-gray-600">
        
        <router-link to="/products" class="hover:text-black">Shop</router-link>

        <template v-if="authStore.role === 'client'">
          <router-link to="/orders" class="hover:text-black">My Orders</router-link>
        </template>

        <template v-else-if="authStore.role === 'employee'">
          <router-link to="/employee/orders" class="hover:text-amber-600">Manage Orders</router-link>
        </template>

        <template v-else-if="authStore.role === 'admin'">
          <router-link to="/admin" class="hover:text-rose-600">Dashboard</router-link>
          <router-link to="/admin/products" class="hover:text-black">Products</router-link>
          <router-link to="/admin/categories" class="hover:text-black">Categories</router-link>
        </template>

      </div>

      <div class="flex items-center gap-4">
        
        <template v-if="authStore.isAuthenticated">
          <span class="text-xs bg-gray-100 px-2 py-1 rounded uppercase">
            {{ authStore.role }}
          </span>
          <button @click="handleLogout" class="text-sm font-bold text-red-500 hover:text-red-700">
            Logout
          </button>
        </template>

        <template v-else>
          <router-link to="/login" class="text-sm font-bold hover:text-rose-500">
            Login
          </router-link>
        </template>

      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' 

const router = useRouter()
const authStore = useAuthStore() 

const handleLogout = () => {
  authStore.logout()   
  router.push('/login') 
}
</script>

<style scoped>
/* Makes the link of the page you are currently on bold and black */
.router-link-active {
  color: black;
  font-weight: 800;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('client'); 
const error = ref('');

const handleRegister = async () => {
  error.value = ''; 

  try {

    const response = await axios.post('http://localhost:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value, 
    });

    if (response.status === 201 || response.status === 200) {
      router.push('/login');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed. Check your data.';
    console.error("API Error:", err.response?.data);
  }
};
</script>

<template>
  <div class="min-h-screen pt-20 flex items-center justify-center bg-[#FAFAFA] px-6 py-12">
    <div class="max-w-md w-full bg-white p-10 md:p-12 shadow-sm border border-gray-100">

      <div class="text-center mb-10">
        <h2 class="text-3xl font-serif text-gray-900 mb-2">Create Account</h2>
        <p class="text-gray-500 text-sm">Join La Cosmetica to manage your beauty rituals.</p>
        
        <div v-if="error" class="mt-4 p-3 bg-rose-50 text-rose-600 text-xs rounded border border-rose-100">
          {{ error }}
        </div>
      </div>

      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Full Name</label>
          <input type="text" v-model="name" required
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="ElMehdi Cherkaoui" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Email Address</label>
          <input type="email" v-model="email" required
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="you@example.com" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">I am a...</label>
          <select 
            v-model="role"
            class="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors cursor-pointer text-gray-600"
          >
            <option value="client">Client (Customer)</option>
            <option value="employee">Employee (Staff)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Password</label>
          <input type="password" v-model="password" required
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="••••••••" />
        </div>

        <button type="submit"
          class="w-full bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-900 transition mt-8">
          Register
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500">
          Already a member?
          <router-link to="/login" class="text-black font-semibold hover:text-rose-600 transition">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<template>
  <div class="min-h-screen pt-20 flex items-center justify-center bg-[#FAFAFA] px-6">
    <div class="max-w-md w-full bg-white p-10 md:p-12 shadow-sm border border-gray-100">
      
      <div class="text-center mb-10">
        <h2 class="text-3xl font-serif text-gray-900 mb-2">Welcome Back</h2>
        <p class="text-gray-500 text-sm">Enter your credentials to access your account.</p>
      </div>

      <form class="space-y-6" @submit.prevent>
        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Email Address</label>
          <input 
            type="email" 
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider">Password</label>
            <a href="#" class="text-xs text-rose-500 hover:text-rose-700">Forgot?</a>
          </div>
          <input 
            type="password" 
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button class="w-full bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-900 transition mt-8">
          Sign In
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500">
          Don't have an account? 
          <router-link to="/register" class="text-black font-semibold hover:text-rose-600 transition">Register</router-link>
        </p>
      </div>

    </div>
  </div>
</template>
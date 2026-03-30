<template>
  <div class="min-h-screen pt-20 flex items-center justify-center bg-[#FAFAFA] px-6 py-12">
    <div class="max-w-md w-full bg-white p-10 md:p-12 shadow-sm border border-gray-100">
      
      <div class="text-center mb-10">
        <h2 class="text-3xl font-serif text-gray-900 mb-2">Create Account</h2>
        <p class="text-gray-500 text-sm">Join La Cosmetica to manage your beauty rituals.</p>
      </div>

      <form class="space-y-6" @submit.prevent>
        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Full Name</label>
          <input 
            type="text" 
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Email Address</label>
          <input 
            type="email" 
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Password</label>
          <input 
            type="password" 
            class="w-full border-b border-gray-300 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button class="w-full bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-900 transition mt-8">
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
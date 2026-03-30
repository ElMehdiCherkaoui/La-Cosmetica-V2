<template>
  <footer class="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div class="space-y-4">
        <h3 class="font-serif text-lg">La Cosmetica</h3>
        <p class="text-gray-400 text-sm italic">Purity in every drop.</p>
      </div>
      <div class="text-sm text-gray-500 space-y-2">
        <h4 class="text-black font-bold uppercase text-[10px] tracking-widest mb-4">Quick Links</h4>
        <p><router-link to="/products">All Products</router-link></p>
        <p><router-link to="/login">Account</router-link></p>
      </div>
      <div class="text-sm text-gray-400 uppercase tracking-widest text-[10px]">
        <p>© 2026 La Cosmetica V2 - Premium Organic Skincare</p>
      </div>
    </div>
  </footer>
</template>
<template>
  <main class="pt-20 bg-[#FAFAFA] min-h-screen">
    <section class="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-16">
      <div class="w-full md:w-1/2 space-y-8">
        <p class="text-rose-500 font-medium tracking-[0.2em] uppercase text-sm">The New Standard</p>
        <h1 class="text-5xl md:text-7xl font-serif text-gray-900 leading-[1.1]">
          Purity in <br /> every drop.
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed max-w-md">
          Discover our curated collection of organic, cruelty-free cosmetics designed to nourish your skin and elevate your daily ritual.
        </p>
        <div class="pt-4">
          <router-link to="/products" class="inline-block bg-black text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-rose-600 transition-colors duration-300">
            Shop Collection
          </router-link>
        </div>
      </div>

      <div class="w-full md:w-1/2 relative">
        <div class="aspect-[4/5] bg-gray-200 rounded-t-full overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-tr from-rose-100 to-amber-50 flex items-center justify-center">
            <span class="text-gray-400 uppercase tracking-widest text-sm">[ Editorial Image ]</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
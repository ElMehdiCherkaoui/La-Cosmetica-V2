<template>
  <div class="min-h-screen flex flex-col">
    <Header v-if="!$route.meta.hideLayout" />

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <Footer v-if="!$route.meta.hideLayout" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/Layout/Nav.vue'
import Footer from '@/views/Layout/Footer.vue'
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
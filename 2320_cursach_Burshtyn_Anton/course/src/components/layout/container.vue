<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
    <div class="flex flex-col gap-10">
        <Header />
        <div class="">
            <slot />
        </div>
        <Footer />
    </div>
</template>
<template>
    <header class="bg-purple-700 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Йога Студия</h1>
      <nav class="space-x-4">
        <RouterLink to="/" class="hover:underline">Главная</RouterLink>
        <RouterLink to="/schedule" class="hover:underline">Расписание</RouterLink>
        <RouterLink to="/clients" class="hover:underline">Клиенты</RouterLink>
        <RouterLink to="/instructors" class="hover:underline">Инструкторы</RouterLink>
        <RouterLink to="/settings" class="hover:underline">Настройки</RouterLink>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  </script>
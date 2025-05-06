<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

const API_BASE = 'http://localhost:3001/api'

const instructors = ref<any[]>([])

// Загрузка данных об инструкторах с сервера
const fetchInstructors = async () => {
  try {
    const res = await axios.get(`${API_BASE}/instructors`)
    instructors.value = res.data
  } catch (error) {
    console.error('Ошибка при загрузке данных об инструкторах:', error)
  }
}

onMounted(fetchInstructors)
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-8 text-center">Наши Инструкторы</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div 
        v-for="(instructor, index) in instructors" 
        :key="index"
        class="p-4 bg-white rounded-xl shadow-xl transform transition duration-700 opacity-0 translate-y-10 animate-fade-in"
        :style="{ animationDelay: `${index * 0.2}s` }"
      >
        <img 
          :src="instructor.photo" 
          :alt="instructor.name" 
          class="w-32 h-32 mx-auto rounded-full mb-4 object-cover shadow-lg"
        />
        <h3 class="text-xl font-semibold text-center mb-1">{{ instructor.name }}</h3>
        <p class="text-center text-gray-600 mb-2">{{ instructor.specialty }}</p>
        <p class="text-sm text-center text-gray-500 mb-2">Стаж: {{ instructor.experience }} лет</p>
        <p class="text-center text-gray-500">{{ instructor.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.8s forwards;
}
</style>

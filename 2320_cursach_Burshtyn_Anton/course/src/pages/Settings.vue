<script setup lang="ts">
import axios from 'axios'

const API_BASE = 'http://localhost:3001/api'

import { ref, computed } from 'vue'

// Этап: регистрация, вход или профиль
const step = ref<'register' | 'login' | 'profile'>('register')

// Регистрационная форма
const registerForm = ref({
  name: '',
  email: '',
  password: '',
})

// Форма входа
const loginForm = ref({
  email: '',
  password: '',
})

// Пользовательские данные
const user = ref({
  name: '',
  email: '',
  birthDate: '',
  phone: '',
})

// Для редактирования профиля
const editMode = ref(false)
const editForm = ref({ ...user.value })

const currentStepTitle = computed(() => {
  switch (step.value) {
    case 'register': return 'Регистрация'
    case 'login': return 'Вход в аккаунт'
    case 'profile': return 'Профиль пользователя'
    default: return ''
  }
})

async function handleRegister() {
  const { name, email, password } = registerForm.value
  if (!name || !email || !password) {
    alert('Заполните все поля')
    return
  }

  try {
    await axios.post(`${API_BASE}/register`, { name, email, password })
    alert('Регистрация успешна! Теперь войдите в аккаунт.')
    step.value = 'login'
  } catch (err) {
    alert('Ошибка при регистрации: ' + err.response?.data?.message || err.message)
  }
}


async function handleLogin() {
  const { email, password } = loginForm.value
  if (!email || !password) {
    alert('Введите Email и Пароль')
    return
  }

  try {
    const res = await axios.post(`${API_BASE}/login`, { email, password })
    user.value = res.data
    editForm.value = { ...res.data }
    step.value = 'profile'
  } catch (err) {
    alert('Ошибка при входе: ' + err.response?.data?.message || err.message)
  }
}


function handleLogout() {
  user.value = { name: '', email: '', birthDate: '', phone: '' }
  loginForm.value = { email: '', password: '' }
  registerForm.value = { name: '', email: '', password: '' }
  step.value = 'login'
}

async function saveProfile() {
  try {
    const res = await axios.put(`${API_BASE}/profile`, editForm.value)
    user.value = res.data
    editMode.value = false
  } catch (err) {
    alert('Ошибка при сохранении: ' + err.response?.data?.message || err.message)
  }
}


function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function toggleTheme() {
  const html = document.documentElement
  if (html.classList.contains('dark')) {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    console.log('Тема установлена: светлая')
  } else {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    console.log('Тема установлена: тёмная')
  }
}

// При загрузке страницы - проверка темы
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark')
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-8 text-center">{{ currentStepTitle }}</h2>

    <!-- Регистрация -->
    <div v-if="step === 'register'" class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div class="mb-4">
        <label class="block mb-1 text-gray-700 dark:text-gray-300">Имя</label>
        <input 
          v-model="registerForm.name" 
          type="text" 
          class="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
        <input 
          v-model="registerForm.email" 
          type="email" 
          class="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1 text-gray-700 dark:text-gray-300">Пароль</label>
        <input 
          v-model="registerForm.password" 
          type="password" 
          class="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <button 
        @click="handleRegister"
        class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Зарегистрироваться
      </button>

      <p class="text-center text-gray-500 mt-4">
        Уже есть аккаунт? 
        <button @click="step = 'login'" class="text-blue-500 underline">Войти</button>
      </p>
    </div>

    <!-- Вход -->
    <div v-else-if="step === 'login'" class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div class="mb-4">
        <label class="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
        <input 
          v-model="loginForm.email" 
          type="email" 
          class="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1 text-gray-700 dark:text-gray-300">Пароль</label>
        <input 
          v-model="loginForm.password" 
          type="password" 
          class="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <button 
        @click="handleLogin"
        class="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Войти
      </button>

      <p class="text-center text-gray-500 mt-4">
        Нет аккаунта? 
        <button @click="step = 'register'" class="text-blue-500 underline">Регистрация</button>
      </p>
    </div>

    <!-- Профиль -->
    <div v-else-if="step === 'profile'" class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div class="flex flex-col items-center space-y-4">
        <!-- Аватар -->
        <div class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-4xl text-white font-bold">
          {{ getInitials(user.name) }}
        </div>

        <!-- Данные профиля -->
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ user.name }}</h3>
          <p class="text-gray-500 dark:text-gray-300">{{ user.email }}</p>
          <p class="text-gray-500 dark:text-gray-300">Дата рождения: {{ user.birthDate || 'не указана' }}</p>
          <p class="text-gray-500 dark:text-gray-300">Телефон: {{ user.phone || 'не указан' }}</p>
        </div>

        <!-- Кнопки -->
        <div class="flex space-x-4 mt-4">
          <button 
            @click="editMode = true"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Редактировать
          </button>

          <button 
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Выйти
          </button>
        </div>
      </div>

      <!-- Форма редактирования -->
      <div v-if="editMode" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
          <h3 class="text-xl font-bold mb-4 text-center">Редактировать профиль</h3>

          <div class="space-y-4">
            <input v-model="editForm.name" type="text" placeholder="Имя" class="w-full border p-2 rounded-md dark:bg-gray-700 dark:text-white" />
            <input v-model="editForm.email" type="email" placeholder="Email" class="w-full border p-2 rounded-md dark:bg-gray-700 dark:text-white" />
            <input v-model="editForm.birthDate" type="date" class="w-full border p-2 rounded-md dark:bg-gray-700 dark:text-white" />
            <input v-model="editForm.phone" type="tel" placeholder="Номер телефона" class="w-full border p-2 rounded-md dark:bg-gray-700 dark:text-white" />
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button @click="saveProfile" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Сохранить</button>
            <button @click="editMode = false" class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Отмена</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Переключатель темы -->
    <div class="text-center mt-8">
      <button 
        @click="toggleTheme"
        class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md"
      >
        Переключить тему
      </button>
    </div>
  </div>
</template>



<style scoped>
html {
  transition: background-color 0.5s, color 0.5s;
}
</style>

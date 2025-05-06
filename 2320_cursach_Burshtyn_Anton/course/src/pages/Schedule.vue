<script setup lang="ts">
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import ScheduleItem from '@/components/ScheduleItem.vue'
import { Weekday } from '@/types'
import type { ScheduleItem as Item } from '@/types'

const API_BASE = 'http://localhost:3001/api'
const user = useUserStore()

const schedule = ref<Item[]>([])
const newItem = ref<Omit<Item, 'id' | 'bookedSeats'>>({
  title: '',
  time: '',
  instructor: '',
  day: Weekday.Monday
})
const editingItem = ref<Item | null>(null)
const isEditModalOpen = ref(false)
const dayFilter = ref<Weekday | ''>('')

const weekdays = [
  { label: 'Понедельник', value: Weekday.Monday },
  { label: 'Вторник', value: Weekday.Tuesday },
  { label: 'Среда', value: Weekday.Wednesday },
  { label: 'Четверг', value: Weekday.Thursday },
  { label: 'Пятница', value: Weekday.Friday },
  { label: 'Суббота', value: Weekday.Saturday },
  { label: 'Воскресенье', value: Weekday.Sunday },
]

const fetchSchedule = async () => {
  try {
    const res = await axios.get(`${API_BASE}/schedule`)
    schedule.value = res.data
  } catch (err) {
    alert('Ошибка загрузки расписания')
  }
}

onMounted(fetchSchedule)

const handleAdd = async () => {
  if (!newItem.value.title || !newItem.value.time || !newItem.value.instructor) {
    return alert('Пожалуйста, заполните все поля')
  }

  try {
    await axios.post(`${API_BASE}/schedule`, newItem.value)
    await fetchSchedule()
    newItem.value = { title: '', time: '', instructor: '', day: Weekday.Monday }
  } catch (err) {
    alert('Ошибка добавления занятия')
  }
}

const startEdit = (item: Item) => {
  editingItem.value = { ...item }
  isEditModalOpen.value = true
}

const saveEdit = async () => {
  if (!editingItem.value) return
  try {
    const { id, ...rest } = editingItem.value
    await axios.put(`${API_BASE}/schedule/${id}`, rest)
    await fetchSchedule()
    isEditModalOpen.value = false
    editingItem.value = null
  } catch (err) {
    alert('Ошибка сохранения')
  }
}

const deleteItem = async (id: number) => {
  try {
    if (editingItem.value?.id === id) {
      editingItem.value = null
      isEditModalOpen.value = false
    }
    await axios.delete(`${API_BASE}/schedule/${id}`)
    await fetchSchedule()
  } catch (err) {
    alert('Ошибка удаления')
  }
}

const bookSeat = async (id: number) => {
  try {
    await axios.post(`${API_BASE}/schedule/${id}/book`)
    await fetchSchedule()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Ошибка бронирования')
  }
}

const cancelBooking = async (id: number) => {
  try {
    await axios.post(`${API_BASE}/schedule/${id}/cancel`)
    await fetchSchedule()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Ошибка отмены брони')
  }
}

const toggleRole = () => {
  user.role = user.role === 'admin' ? 'user' : 'admin'
}

const showAllWeek = () => {
  dayFilter.value = ''
}

const filteredSchedule = computed(() => {
  const list = dayFilter.value ? schedule.value.filter(item => item.day === dayFilter.value) : schedule.value
  return list.sort((a, b) => a.time.localeCompare(b.time))
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Расписание</h2>

    <div class="mb-4">
      <button @click="toggleRole" class="bg-yellow-400 px-4 py-2 rounded text-white">
        Переключить роль (сейчас: {{ user.role }})
      </button>
    </div>

    <form v-if="user.role === 'admin'" @submit.prevent="handleAdd" class="flex gap-2 mb-6 flex-wrap">
      <input v-model="newItem.title" placeholder="Название" class="border px-2 py-1 rounded" required />
      <input v-model="newItem.time" placeholder="Время" class="border px-2 py-1 rounded" required />
      <input v-model="newItem.instructor" placeholder="Инструктор" class="border px-2 py-1 rounded" required />
      <select v-model="newItem.day" class="border px-2 py-1 rounded" required>
        <option disabled value="">Выберите день недели</option>
        <option v-for="d in weekdays" :key="d.value" :value="d.value">{{ d.label }}</option>
      </select>
      <button type="submit" class="bg-green-500 text-white px-4 py-1 rounded">Добавить</button>
    </form>

    <div class="mb-4 flex items-center gap-2">
      <select v-model="dayFilter" class="border px-2 py-1 rounded">
        <option disabled value="">Фильтровать по дню недели</option>
        <option v-for="d in weekdays" :key="d.value" :value="d.value">{{ d.label }}</option>
      </select>
      <button v-if="dayFilter" @click="showAllWeek" class="bg-gray-300 px-4 py-1 rounded">
        Сбросить фильтр
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ScheduleItem
        v-for="item in filteredSchedule"
        :key="item.id"
        :item="item"
        @book="bookSeat"
        @cancel="cancelBooking"
        @edit="startEdit"
        @delete="deleteItem"
        :canEdit="user.role === 'admin'"
      />
    </div>

    <transition name="fade">
      <div
        v-if="isEditModalOpen && editingItem"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative animate-fade-in">
          <button
            @click="isEditModalOpen = false"
            class="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
          >
            &times;
          </button>

          <h3 class="text-2xl font-bold mb-6 text-center">Редактировать занятие</h3>

          <form @submit.prevent="saveEdit" class="space-y-4">
            <input
              v-model="editingItem.title"
              placeholder="Название"
              class="w-full border border-gray-300 p-2 rounded-md dark:bg-gray-700"
              required
            />
            <input
              v-model="editingItem.time"
              placeholder="Время"
              class="w-full border border-gray-300 p-2 rounded-md dark:bg-gray-700"
              required
            />
            <input
              v-model="editingItem.instructor"
              placeholder="Инструктор"
              class="w-full border border-gray-300 p-2 rounded-md dark:bg-gray-700"
              required
            />
            <select
              v-model="editingItem.day"
              class="w-full border border-gray-300 p-2 rounded-md dark:bg-gray-700"
              required
            >
              <option disabled value="">Выберите день недели</option>
              <option v-for="d in weekdays" :key="d.value" :value="d.value">{{ d.label }}</option>
            </select>

            <div class="flex justify-end gap-3 mt-6">
              <button
                type="button"
                @click="isEditModalOpen = false"
                class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Отмена
              </button>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

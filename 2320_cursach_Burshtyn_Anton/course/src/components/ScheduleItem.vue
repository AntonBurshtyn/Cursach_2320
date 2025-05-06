<script setup lang="ts">
import type { ScheduleItem as Item } from '@/types'

defineProps<{
  item: Item
  canEdit: boolean
}>()

defineEmits(['edit', 'delete', 'book', 'cancel'])
</script>

<template>
  <div class="p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-all">
    <h3 class="text-lg font-bold mb-2 text-gray-800">{{ item.title }}</h3>
    <p class="text-gray-600"><strong>Время:</strong> {{ item.time }}</p>
    <p class="text-gray-600"><strong>Инструктор:</strong> {{ item.instructor }}</p>
    <p class="text-gray-600"><strong>День недели:</strong> {{ item.day }}</p>
    <p class="text-gray-600">
      <strong>Доступные места:</strong> {{ item.maxSeats - item.bookedSeats }} из {{ item.maxSeats }}
    </p>

    <div class="flex flex-wrap gap-2 mt-4">
      <button
        @click="$emit('book', item.id)"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        :disabled="item.bookedSeats >= item.maxSeats"
      >
        Забронировать место
      </button>

      <button
        @click="$emit('cancel', item.id)"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        :disabled="item.bookedSeats <= 0"
      >
        Отменить бронирование
      </button>

      <button
        v-if="canEdit"
        @click="$emit('edit', item)"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        ✏️ Редактировать
      </button>

      <button
        v-if="canEdit"
        @click="$emit('delete', item.id)"
        class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
      >
        🗑️ Удалить
      </button>
    </div>
  </div>
</template>


<style scoped>
/* Твои стили */
.schedule-item {
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

.schedule-item:hover {
  background-color: #f9f9f9;
}
</style>

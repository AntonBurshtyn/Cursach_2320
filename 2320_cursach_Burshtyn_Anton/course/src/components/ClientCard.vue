<script setup lang="ts">
import type { Client } from '@/types'

defineProps<{ client: Client }>()
defineEmits(['edit', 'delete'])
</script>

<template>
    <div class="border p-4 rounded shadow flex flex-col gap-2">
      <h3 class="font-bold text-lg">{{ client.name }}</h3>
      <p><strong>Телефон:</strong> {{ client.phone }}</p>
      <p><strong>Email:</strong> {{ client.email }}</p>
      <div class="flex gap-2 mt-2">
        <button @click="$emit('edit', client)" class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
          Редактировать
        </button>
        <button @click="$emit('delete', client.id)" class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
          Удалить
        </button>
      </div>
    </div>
  </template>
  
 
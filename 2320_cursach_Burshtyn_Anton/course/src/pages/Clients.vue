<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'
import { useAuthStore } from '@/stores/authStore' // 👈 добавляем
import ClientCard from '@/components/ClientCard.vue'
import type { Client } from '@/types'

const store = useClientsStore()
const authStore = useAuthStore() // 👈

const clients = computed(() => store.clients)

onMounted(() => {
  store.fetchClients()
})

// Проверка: текущий пользователь уже клиент?
const isCurrentUserClient = computed(() => {
  if (!authStore.user) return false
  return store.clients.some(c => c.email === authStore.user!.email)
})

// Зарегистрировать авторизованного пользователя как клиента
const registerAsClient = () => {
  if (authStore.user) {
    const newClient = {
      name: authStore.user.name,
      email: authStore.user.email,
      phone: '' // можно будет добавить поле ввода
    }
    store.addClient(newClient)
  }
}

const newClient = ref<Omit<Client, 'id'>>({ name: '', phone: '', email: '' })

const handleAdd = () => {
  store.addClient({ ...newClient.value })
  newClient.value = { name: '', phone: '', email: '' }
}

const editingClient = ref<Client | null>(null)

const startEdit = (client: Client) => {
  editingClient.value = { ...client }
}

const saveEdit = () => {
  if (editingClient.value) {
    store.updateClient(editingClient.value.id, editingClient.value)
    editingClient.value = null
  }
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Клиенты</h2>

    <!-- Если пользователь авторизован, но не клиент -->
    <div v-if="authStore.user && !isCurrentUserClient" class="mb-4">
      <p class="mb-2">Вы ещё не зарегистрированы как клиент.</p>
      <button @click="registerAsClient" class="bg-blue-500 text-white px-4 py-2 rounded">
        Стать клиентом
      </button>
    </div>

    <form @submit.prevent="handleAdd" class="flex gap-2 mb-4 flex-wrap">
      <input v-model="newClient.name" placeholder="Имя" class="border px-2 py-1 rounded" required />
      <input v-model="newClient.phone" placeholder="Телефон" class="border px-2 py-1 rounded" required />
      <input v-model="newClient.email" placeholder="Email" class="border px-2 py-1 rounded" required />
      <button type="submit" class="bg-green-500 text-white px-4 py-1 rounded">Добавить</button>
    </form>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ClientCard
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @edit="startEdit"
        @delete="store.deleteClient"
      />
    </div>

    <div v-if="editingClient" class="mt-6 border-t pt-4">
      <h3 class="text-xl font-semibold mb-2">Редактировать клиента</h3>
      <form @submit.prevent="saveEdit" class="flex gap-2 flex-wrap">
        <input v-model="editingClient.name" class="border px-2 py-1 rounded" required />
        <input v-model="editingClient.phone" class="border px-2 py-1 rounded" required />
        <input v-model="editingClient.email" class="border px-2 py-1 rounded" required />
        <button class="bg-blue-600 text-white px-4 py-1 rounded">Сохранить</button>
      </form>
    </div>
  </div>
</template>


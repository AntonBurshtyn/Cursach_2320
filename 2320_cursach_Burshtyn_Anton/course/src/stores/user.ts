// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const role = ref<'admin' | 'user'>('user') 

  const setRole = (newRole: 'admin' | 'user') => {
    role.value = newRole
  }

  return { role, setRole }
})

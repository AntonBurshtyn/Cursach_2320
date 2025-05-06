// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { name: string; email: string } | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error('Ошибка входа');
      this.user = await res.json();
    },
    logout() {
      this.user = null;
    }
  }
});

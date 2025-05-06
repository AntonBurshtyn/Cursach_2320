// stores/clients.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [] as Client[],
  }),

  actions: {
    async fetchClients() {
      try {
        const response = await axios.get('http://localhost:3001/api/clients')
        this.clients = response.data
      } catch (error) {
        console.error('Ошибка при получении клиентов:', error)
      }
    },

    async addClient(client: Omit<Client, 'id'>) {
      try {
        const response = await axios.post('http://localhost:3001/api/clients', client)
        this.clients.push(response.data)
      } catch (error) {
        console.error('Ошибка при добавлении клиента:', error)
      }
    },

    async updateClient(id: number, client: Client) {
      try {
        const response = await axios.put(`http://localhost:3001/api/clients/${id}`, client)
        const index = this.clients.findIndex((c) => c.id === id)
        if (index !== -1) {
          this.clients[index] = response.data
        }
      } catch (error) {
        console.error('Ошибка при обновлении клиента:', error)
      }
    },

    async deleteClient(id: number) {
      try {
        await axios.delete(`http://localhost:3001/api/clients/${id}`)
        this.clients = this.clients.filter((client) => client.id !== id)
      } catch (error) {
        console.error('Ошибка при удалении клиента:', error)
      }
    }
  }
})

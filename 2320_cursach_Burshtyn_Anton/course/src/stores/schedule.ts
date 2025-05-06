// stores/schedule.ts

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Weekday } from '@/types'
import type { ScheduleItem } from '@/types'

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = reactive<ScheduleItem[]>([
    { id: 1, title: 'Йога для начинающих', time: '10:00 - 11:00', instructor: 'Анна Петрова', day: Weekday.Monday, maxSeats: 10, bookedSeats: 0 },
    { id: 2, title: 'Пилатес', time: '12:00 - 13:00', instructor: 'Мария Смирнова', day: Weekday.Tuesday, maxSeats: 10, bookedSeats: 0 },
    { id: 3, title: 'Растяжка', time: '14:00 - 15:00', instructor: 'Иван Иванов', day: Weekday.Wednesday, maxSeats: 10, bookedSeats: 0 },
    { id: 4, title: 'Фитнес HIIT', time: '16:00 - 17:00', instructor: 'Ольга Кузнецова', day: Weekday.Thursday, maxSeats: 10, bookedSeats: 0 },
  ])

  const addScheduleItem = (item: Omit<ScheduleItem, 'id'>) => {
    const newId = schedule.length ? Math.max(...schedule.map(i => i.id)) + 1 : 1
    schedule.push({ id: newId, ...item, bookedSeats: 0 })
  }

  const updateScheduleItem = (id: number, updatedItem: Partial<ScheduleItem>) => {
    const item = schedule.find(item => item.id === id)
    if (item) {
      Object.assign(item, updatedItem)
    }
  }

  const deleteScheduleItem = (id: number) => {
    const index = schedule.findIndex(item => item.id === id)
    if (index !== -1) {
      schedule.splice(index, 1)
    }
  }

  const bookSeat = (id: number) => {
    const item = schedule.find(i => i.id === id)
    if (item && item.bookedSeats < item.maxSeats) {
      item.bookedSeats++
    }
  }

  const cancelBooking = (id: number) => {
    const item = schedule.find(i => i.id === id)
    if (item && item.bookedSeats > 0) {
      item.bookedSeats--
    }
  }

  return { schedule, addScheduleItem, updateScheduleItem, deleteScheduleItem, bookSeat, cancelBooking }
})

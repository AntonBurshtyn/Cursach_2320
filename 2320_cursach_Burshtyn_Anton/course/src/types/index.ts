// types.ts
export enum Weekday {
  Monday = 'Понедельник',
  Tuesday = 'Вторник',
  Wednesday = 'Среда',
  Thursday = 'Четверг',
  Friday = 'Пятница',
  Saturday = 'Суббота',
  Sunday = 'Воскресенье',
}

export interface ScheduleItem {
  id: number;
  title: string;
  time: string;
  instructor: string;
  day: Weekday;
  maxSeats: number;      
  bookedSeats: number;   
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  subscriptionType: 'free' | 'premium'; 
  bookedClasses: number[];  
}

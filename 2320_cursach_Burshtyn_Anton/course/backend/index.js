const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;


const users = [];
const clients = [];
let schedule = [
  {
    id: 1,
    title: 'Йога для начинающих',
    time: '10:00 - 11:00',
    instructor: 'Анна Петрова',
    day: 'Monday',
    bookedSeats: 0,
    availableSeats: 10
  },
  {
    id: 2,
    title: 'Пилатес',
    time: '12:00 - 13:00',
    instructor: 'Мария Смирнова',
    day: 'Tuesday',
    bookedSeats: 0,
    availableSeats: 10
  },
  {
    id: 3,
    title: 'Растяжка',
    time: '14:00 - 15:00',
    instructor: 'Иван Иванов',
    day: 'Wednesday',
    bookedSeats: 0,
    availableSeats: 10
  },
  {
    id: 4,
    title: 'Фитнес HIIT',
    time: '16:00 - 17:00',
    instructor: 'Ольга Кузнецова',
    day: 'Thursday',
    bookedSeats: 0,
    availableSeats: 10
  }
];

app.use(cors());
app.use(bodyParser.json());

// Инструкторы
app.get('/api/instructors', (req, res) => {
  const instructors = [
    {
      name: 'Анна Петрова',
      specialty: 'Йога для начинающих, Пилатес',
      photo: 'https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=600',
      experience: 5,
      description: 'Помогаю найти гармонию тела и души. Персональный подход к каждому ученику.',
    },
    {
      name: 'Мария Смирнова',
      specialty: 'Растяжка',
      photo: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=600',
      experience: 3,
      description: 'Мягкая и эффективная растяжка для всех уровней подготовки.',
    },
    {
      name: 'Иван Иванов',
      specialty: 'Фитнес, HIIT',
      photo: 'https://images.pexels.com/photos/999309/pexels-photo-999309.jpeg?auto=compress&cs=tinysrgb&w=600',
      experience: 7,
      description: 'Максимальная результативность тренировок! Силовые и интервальные программы.',
    },
    {
      name: 'Ольга Кузнецова',
      specialty: 'Йога',
      photo: 'https://images.pexels.com/photos/6246653/pexels-photo-6246653.jpeg?auto=compress&cs=tinysrgb&w=600',
      experience: 4,
      description: 'Веду занятия для начинающих и продолжающих. Внимание к технике и дыханию.',
    },
  ];

  res.json(instructors);
});

// Обновление профиля пользователя
app.put('/api/profile', (req, res) => {
  const { email, name } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }

  user.name = name || user.name;
  res.json({ message: 'Профиль обновлен', user });
});

// Регистрация
app.post('/api/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  const newUser = { name, email, password };
  users.push(newUser);

  const newClient = {
    id: Date.now(),
    name,
    email,
    phone: phone || ''
  };
  clients.push(newClient);

  res.json({ message: 'Регистрация успешна' });
});

// Вход
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Неверный логин или пароль' });
  }

  res.json({ name: user.name, email: user.email });
});

// Получить всех клиентов
app.get('/api/clients', (req, res) => {
  res.json(clients);
});

// Добавление клиента
app.post('/api/clients', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Имя и email обязательны' });
  }

  const existingClient = clients.find(client => client.email === email);
  if (existingClient) {
    return res.status(400).json({ message: 'Клиент уже существует' });
  }

  const newClient = {
    id: Date.now(),
    name,
    email,
    phone: phone || ''
  };

  clients.push(newClient);
  res.status(201).json(newClient);
});

// Обновление клиента
app.put('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const client = clients.find(c => c.id == id);

  if (!client) {
    return res.status(404).json({ message: 'Клиент не найден' });
  }

  client.name = name || client.name;
  client.email = email || client.email;
  client.phone = phone || client.phone;

  res.json(client);
});

// Удаление клиента
app.delete('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const index = clients.findIndex(c => c.id == id);
  if (index === -1) {
    return res.status(404).json({ message: 'Клиент не найден' });
  }

  clients.splice(index, 1);
  res.status(204).send();
});

// Получение расписания
app.get('/api/schedule', (req, res) => {
  res.json(schedule);
});

// Добавление занятия
app.post('/api/schedule', (req, res) => {
  const { title, time, instructor, day } = req.body;
  if (!title || !time || !instructor || !day) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  const newItem = {
    id: schedule.length + 1,
    title,
    time,
    instructor,
    day,
    bookedSeats: 0,
    availableSeats: 10
  };

  schedule.push(newItem);
  res.status(201).json(newItem);
});

// Обновление занятия
app.put('/api/schedule/:id', (req, res) => {
  const { id } = req.params;
  const { title, time, instructor, day } = req.body;

  const item = schedule.find(s => s.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: 'Занятие не найдено' });
  }

  item.title = title || item.title;
  item.time = time || item.time;
  item.instructor = instructor || item.instructor;
  item.day = day || item.day;

  res.json(item);
});

// Удаление занятия
app.delete('/api/schedule/:id', (req, res) => {
  const { id } = req.params;
  const index = schedule.findIndex(s => s.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Занятие не найдено' });
  }

  schedule.splice(index, 1);
  res.status(204).send();
});

// Бронирование места
app.post('/api/schedule/:id/book', (req, res) => {
  const { id } = req.params;
  const item = schedule.find(s => s.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: 'Занятие не найдено' });
  }

  if (item.bookedSeats >= item.availableSeats) {
    return res.status(400).json({ message: 'Мест нет' });
  }

  item.bookedSeats++;
  res.json(item);
});

// Отмена бронирования
app.post('/api/schedule/:id/cancel', (req, res) => {
  const { id } = req.params;
  const item = schedule.find(s => s.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: 'Занятие не найдено' });
  }

  if (item.bookedSeats > 0) {
    item.bookedSeats--;
  }

  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

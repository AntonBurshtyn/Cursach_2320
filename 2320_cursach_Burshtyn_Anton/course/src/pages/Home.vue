<script>
export default {
  mounted() {
    // Добавляем анимацию через классы Tailwind
    const elements = document.querySelectorAll('.animate-fade-up');
    elements.forEach(element => {
      element.classList.add('transition-opacity', 'duration-700', 'ease-out', 'opacity-100');
    });
  }
}
</script>
<template>
  
  <div class="p-6 md:p-12 max-w-7xl mx-auto">
    <!-- Заголовок -->
    <section class="text-center mb-12 animate-fade-up transition-all duration-700">
      <h2 class="text-4xl md:text-5xl font-bold text-purple-700 mb-4">Добро пожаловать в Йога Студию</h2>
      <p class="text-lg md:text-xl text-gray-600">Гармония тела и ума начинается здесь</p>
    </section>

    <!-- Логотип -->
    <section class="text-center mb-8">
      <img 
        src="@/assets/yoga-logo.jpeg" 
        alt="Йога Студия" 
        class="mx-auto w-32 h-32 mb-4 rounded-full shadow-lg"
      />
    </section>
    <section class="text-center mb-12">
  <div class="flex justify-center gap-6 flex-wrap">
    <router-link
      to="/schedule"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
    >
      Перейти к расписанию
    </router-link>

    <router-link
      to="/Settings"
      class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
    >
      Регистрация
    </router-link>

    <router-link
      to="/instructors"
      class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
    >
      Инструкторы
    </router-link>
  </div>
</section>
 
    <!-- Преимущества -->
    <section class="grid md:grid-cols-3 gap-8 mt-10 text-left">
    <!-- Преимущество 1 -->
    <div class="p-6 bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl ease-in-out animate-fade-up">
      <img src="@/assets/flexible-schedule.jpg" alt="Гибкий график" class="w-16 h-16 mb-4 mx-auto rounded-full shadow-lg"/>
      <h3 class="font-bold text-xl mb-2 text-center">Гибкий график</h3>
      <p class="text-center text-gray-600">Выбирайте занятия в удобное для вас время.</p>
    </div>
    
    <!-- Преимущество 2 -->
    <div class="p-6 bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl ease-in-out animate-fade-up">
      <img src="@/assets/experienced-instructors.jpg" alt="Опытные инструкторы" class="w-16 h-16 mb-4 mx-auto rounded-full shadow-lg"/>
      <h3 class="font-bold text-xl mb-2 text-center">Опытные инструкторы</h3>
      <p class="text-center text-gray-600">Профессиональные йоги с большим стажем.</p>
    </div>
    
    <!-- Преимущество 3 -->
    <div class="p-6 bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl ease-in-out animate-fade-up">
      <img src="@/assets/cozy-atmosphere.jpg" alt="Уютная атмосфера" class="w-16 h-16 mb-4 mx-auto rounded-full shadow-lg"/>
      <h3 class="font-bold text-xl mb-2 text-center">Уютная атмосфера</h3>
      <p class="text-center text-gray-600">Пространство, созданное для вашего комфорта и роста.</p>
    </div>
  </section>

    <!-- Видео -->
    <section class="mt-12 text-center">
      <h3 class="text-2xl font-semibold mb-4">Посмотри наш мини-тур:</h3>
      <div class="relative overflow-hidden w-full h-0 pb-[56.25%] rounded-xl shadow-xl">
        <iframe
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/v7AYKMP6rOE"
          title="Йога для начинающих"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  </div>
</template>


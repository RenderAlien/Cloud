<script>
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from '../store/store';

export default {
  setup() {
    const store = useCounterStore();
    return { store };
  }
}

</script>

<template>
  <div v-if="store.my_status == null" class="auth-container">

    <div>
      <div class="mb-3">
        <label for="email_input" class="form-label">Адрес эл. почты</label>
        <input class="form-control" id="email_input" placeholder="name@example.com" v-model="store.my_email">
      </div>
      <div class="mb-3">
        <label for="password_input" class="form-label">Пароль</label>
        <input class="form-control" id="password_input" v-model="store.my_password">
      </div>
      <button class="btn btn-primary" @click="store.authentificate()">Войти</button>
    </div>

  </div>
  <div v-else-if="store.my_status == 'worker'" class="row general">

    <div class="sidebar">
      <RouterLink class="logo" to="/">Облако</RouterLink>
      <RouterLink class="sidebar-button" to="/">Главная</RouterLink>
      <RouterLink class="sidebar-button" to="/dep">Мой отдел</RouterLink>
      <RouterLink class="sidebar-button" to="/deps">Отделы</RouterLink>
      <div class="sidebar-button-add">Добавить</div>
    </div>

    <div class="content">

      <div class="header m-0">
        <input type="text" class="search" placeholder="Поиск..." >
        <RouterLink class="header-profile-button" to="/profile">{{ store.my_first_name + " " + store.my_second_name[0] + "." }}</RouterLink>
      </div>

      <div v-if="store.current_search == null" class="page">
        <RouterView />
      </div>
      
    </div>

  </div>
  <div v-else-if="store.my_status == 'admin'">
    <div class="sidebar">
      <RouterLink class="logo" to="/">Облако</RouterLink>
      <RouterLink class="sidebar-button" to="/" style="font-size: 2vw;">Пользователи</RouterLink>
      <RouterLink class="sidebar-button" to="/dep" style="font-size: 1.8vw;">Запросы на удаление</RouterLink>
      <RouterLink class="sidebar-button" to="/deps" style="font-size: 2vw;">Документы</RouterLink>
    </div>
  </div>
</template>
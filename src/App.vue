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
      <div class="logo">Облако</div>
      <div class="sidebar-button">Главная</div>
      <div class="sidebar-button">Мой отдел</div>
      <div class="sidebar-button">Отделы</div>
    </div>

    <div class="content">

      <div class="row header m-0">
        <input type="text" class="search" placeholder="Поиск..." >
      </div>

      <div class="page">

      </div>
      
    </div>

  </div>
</template>
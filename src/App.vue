<script>
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from '../store/store';
import AddFileModal from './components/AddFileModal.vue';
import ChangeUserModal from './components/ChangeUserModal.vue';
import AddUserModal from './components/AddUserModal.vue';

export default {
  components: {
    AddFileModal,
    ChangeUserModal,
    AddUserModal
  },
  setup() {
    const store = useCounterStore();
    return { store };
  }
}

</script>

<template>
  <AddFileModal :show="store.show_add_file_modal" @close="store.show_add_file_modal = false"/>
  <ChangeUserModal :show="store.show_change_user_modal" @close="store.show_change_user_modal = false"/>
  <AddUserModal :show="store.show_add_user_modal" @close="store.show_add_user_modal = false"/>

  <div v-if="store.my_status == null" class="auth-container">

    <div>
      <div class="mb-3">
        <label for="email_input" class="form-label">Адрес эл. почты</label>
        <input class="form-control" id="email_input" placeholder="name@example.com" v-model="store.my_email">
      </div>
      <div class="mb-3">
        <label for="password_input" class="form-label">Пароль</label>
        <input class="form-control" id="password_input" type="password" v-model="store.my_password">
      </div>
      <button class="btn btn-primary" @click="store.authentificate(store.my_email, store.my_password)">Войти</button>
    </div>

  </div>
  <div v-else-if="store.my_status == 'worker'" class="general">

    <div class="sidebar">
      <RouterLink class="logo" to="/">Облако</RouterLink>
      <RouterLink class="sidebar-button" to="/">Главная</RouterLink>
      <RouterLink class="sidebar-button" to="/dep" @click="store.current_department_id = store.my_department_id;store.dep_docs(store.current_department_id)">Мой отдел</RouterLink>
      <RouterLink class="sidebar-button" to="/deps">Отделы</RouterLink>
      <div class="sidebar-button-add" @click="store.show_add_file_modal=true">Добавить</div>
    </div>

    <div class="content">

      <div class="header m-0">
        <input type="text" class="search" placeholder="Поиск..." v-model="store.current_search" v-on:input="store.doc_search(store.current_search)">
        <RouterLink class="header-profile-button" to="/profile">{{ store.my_first_name + " " + store.my_second_name[0] + "." }}</RouterLink>
      </div>

      <div v-if="store.current_search == ''" class="page">
        <RouterView />
      </div>
      <div v-else class="page">
        <div class="content-text">Результат поиска:</div>
        <div class="item-container">
          <div v-for="doc in store.search" class="item">
            <div class="item-text">{{ doc.name }}</div>
            <a class="item-blue-button" @click="store.download_by_doc_id(doc.doc_id, doc.filename)" download>Скачать</a>
            <div class="item-red-button" @click="store.request_deletion(doc.doc_id, store.my_user_id)">Удалить</div>
          </div>
        </div>
      </div>
      
    </div>

  </div>
  <div v-else-if="store.my_status == 'admin'">
    
    <div class="sidebar">
      <RouterLink class="logo" to="/admin_users">Облако</RouterLink>
      <RouterLink class="sidebar-button" to="/admin_users" style="font-size: 2vw;" @click="store.admin_current_search_placeholder='Поиск по пользователям...'">
        Пользователи
      </RouterLink>
      <RouterLink class="sidebar-button" to="/admin_del_requests" style="font-size: 1.8vw; line-height: 1;" @click="store.admin_current_search_placeholder='Поиск по запросам...'">
        Запросы на удаление
      </RouterLink>
      <RouterLink class="sidebar-button" to="/admin_docs" style="font-size: 2vw;" @click="store.admin_current_search_placeholder='Поиск по документам...'">
        Документы
      </RouterLink>
    </div>

    <div class="content">

      <RouterView />

    </div>
  </div>
</template>
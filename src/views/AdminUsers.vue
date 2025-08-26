<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
</script>

<template>
    <div class="header m-0">
        <input type="text" class="search" placeholder="Поиск по пользователям..." v-model="store.current_search">
        <RouterLink class="header-profile-button" to="/profile">{{ store.my_first_name + " " + store.my_second_name[0] + "." }}</RouterLink>
    </div>
      
    <div v-if="store.current_search == ''" class="page">
        <div class="item-container">
            <div class="content-button" @click="store.show_add_user_modal=true">
                <div class="content-button-text">
                    Добавить нового пользователя...
                </div>
            </div>
            <div v-for="user in store.User" class="item">
                <div class="item-text">
                    {{ user.first_name + ' ' + user.second_name[0] + '. ' + user.third_name[0] + '.' }}
                </div>
                <div class="item-text" style="position: absolute; left: 44.6875vw;">
                    {{ store.department_by_id(user.department_id) }}
                </div>
                <div class="item-blue-button" @click="store.current_user_id_to_change=user.user_id; store.show_change_user_modal=true">
                    Изменить
                </div>
                <div class="item-red-button" @click="store.delete_by_user_id(user.user_id)">
                    Удалить
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="content-text">Результат поиска:</div>
        <div class="item-container">
            <div v-for="user in store.user_search(store.current_search)" class="item">
                <div class="item-text">
                    {{ user.first_name + ' ' + user.second_name[0] + '. ' + user.third_name[0] + '.' }}
                </div>
                <div class="item-text" style="position: absolute; left: 44.6875vw;">
                    {{ store.department_by_id(user.department_id) }}
                </div>
                <div class="item-blue-button" @click="store.current_user_id_to_change=user.user_id; store.show_change_user_modal=true">
                    Изменить
                </div>
                <div class="item-red-button" @click="store.delete_by_user_id(user.user_id)">
                    Удалить
                </div>
            </div>
        </div>
    </div>
</template>
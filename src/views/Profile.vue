<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
</script>

<template>
    <div class="container" style="width: 100%; height: 100%">
        <div class="profile-text">{{ store.my_first_name + ' ' + store.my_second_name + ' ' + store.my_third_name }}</div>
        <div v-if="store.my_status=='worker'" class="profile-text" style="margin-top: 5vw;">{{ 'Отдел: ' + store.department_by_id(store.my_department_id) }}</div>
        <div v-else class="profile-text" style="margin-top: 5vw;">Администратор</div>
        <div class="profile-button-exit" @click="store.exit()">Выйти</div>
    </div>
</template>
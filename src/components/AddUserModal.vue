<script>
import { useCounterStore } from '../../store/store';

export default{
    name: 'AddUserModal',
    setup() {
        const store = useCounterStore();
        return {store}
    }
}
</script>

<template>
    <div v-if="store.show_add_user_modal" class="modal">
        <div class="modal-window">
            <input type="text" placeholder="Фамилия" v-model="store.new_user_first_name" class="modal-input" style="margin-top: 3.05556vh">
            <input type="text" placeholder="Имя" v-model="store.new_user_second_name" class="modal-input">
            <input type="text" placeholder="Отчество" v-model="store.new_user_third_name" class="modal-input">
            <input type="text" placeholder="Почта" class="modal-input" v-model="store.new_user_email">
            <input type="text" placeholder="Пароль" v-model="store.new_user_password" class="modal-input">
            <input type="text" placeholder="Отдел" v-model="store.new_user_department" class="modal-input">

            <div style="display: flex; flex-direction: row; gap: 1.04167vw; margin-top: 3.05556vh;">
                <div class="modal-button" @click="store.show_add_user_modal=false">Отмена</div>
                <div class="modal-button" @click="store.add_new_user()">Добавить</div>
            </div>
        </div>
    </div>
</template>
<script>
import { useCounterStore } from '../../store/store';

export default{
    name: 'ChangeUserModal',
    setup() {
        const store = useCounterStore();
        return {store}
    }
}
</script>

<template>
    <div v-if="store.show_change_user_modal" class="modal">
        <div class="modal-window">
            <input type="text" :placeholder="store.user_by_user_id(store.current_user_id_to_change).email" class="modal-input" v-model="store.new_user_email" style="margin-top: 10.9259vh">
            <input type="text" placeholder="Пароль" v-model="store.new_user_password" class="modal-input">
            <input type="text" :placeholder="store.user_by_user_id(store.current_user_id_to_change).first_name" v-model="store.new_user_first_name" class="modal-input">
            <input type="text" :placeholder="store.user_by_user_id(store.current_user_id_to_change).second_name" v-model="store.new_user_second_name" class="modal-input">

            <div style="display: flex; flex-direction: row; gap: 1.04167vw; margin-top: 10.7407vh;">
                <div class="modal-button" @click="store.show_change_user_modal=false">Отмена</div>
                <div class="modal-button" @click="store.change_user_props()">Изменить</div>
            </div>
        </div>
    </div>
</template>
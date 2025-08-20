import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        my_email: '',
        my_password: '',
        my_status: null, // null - не авторизован, 'worker' - сотрудник, 'admin' - админ
        my_first_name: null,
        my_second_name: null,
        my_department: null, // мой отдел, от него зависит страница моего отдела и 4 карточки на главной
    }),
    getters: {

    },
    actions:{
        authentificate() {
            this.my_first_name = 'fn';
            this.my_second_name = 'sn';
            this.my_department = 'HR'
            this.my_status = 'worker';
            console.log(this.my_email, this.my_password)
        }
    }
});
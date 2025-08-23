import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        // данные пользователя
        my_email: '',
        my_password: '',
        my_status: null, // null - не авторизован, 'worker' - сотрудник, 'admin' - админ
        my_first_name: null, //Ф
        my_second_name: null, //И
        my_third_name: null, //О
        my_department: null, // мой отдел, от него зависит страница моего отдела и 4 карточки на главной

        //данные для работы системы
        current_department: null, // текущий отдел: для страницы конкрентого отдела и страницы Мой отдел
        current_search: null, // текущий запрос в поисковике
    }),
    getters: {
        get_lastn_docs(){
            return
        }
    },
    actions:{
        authentificate() {
            this.my_first_name = 'First';
            this.my_second_name = 'Second';
            this.my_third_name = 'Third'
            this.my_department = 'HR'
            if(this.my_email == 'w'){
                this.my_status = 'worker';
            }
            else{
                this.my_status = 'admin';
            }
            console.log(this.my_email, this.my_password)
        },
        exit() {
            this.my_first_name = null;
            this.my_second_name = null;
            this.my_third_name = null
            this.my_department = null
            this.my_status = null;
        }
    }
});
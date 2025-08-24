import { defineStore } from "pinia";
import { hashSync } from "bcryptjs";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        // данные пользователя
        my_email: '',
        my_password: '',
        my_status: 'worker', // null - не авторизован, 'worker' - сотрудник, 'admin' - админ
        my_first_name: 'worker', //Ф
        my_second_name: 'worker', //И
        my_third_name: 'worker', //О
        my_department_id: 0, // мой отдел

        //данные для работы системы
        current_department_id: null, // текущий отдел: для страницы конкрентого отдела и страницы Мой отдел
        current_search: null, // текущий запрос в поисковике

        // База данных (временно)
        Document: [
            {
                doc_id: 0,
                name: 'График отпусков 2024',
                filename: 'Отпуска2024.docx'
            },
            {
                doc_id: 1,
                name: 'Счет на оплату №567',
                filename: 'Счет567.docx'
            },
            {
                doc_id: 2,
                name: 'Стратегический план',
                filename: 'План.docx'
            },
            {
                doc_id: 3,
                name: 'Годовой бюджет 2024',
                filename: 'Бюджет2024.docx'
            },
            {
                doc_id: 4,
                name: 'Приказ о приеме на работу',
                filename: 'Приказ о приеме на работу.docx'
            },
            {
                doc_id: 5,
                name: 'Акт сверки с контрагентом',
                filename: 'Акт сверки.docx'
            },
            {
                doc_id: 6,
                name: 'Должностная инструкция',
                filename: 'Должност инструкция.docx'
            },
            {
                doc_id: 7,
                name: 'Годовой отчет СовДиру',
                filename: 'ОтчетСовДиру.docx'
            },
            {
                doc_id: 8,
                name: 'Бухгалтерский баланс',
                filename: 'БухБаланс.docx'
            },
            {
                doc_id: 9,
                name: 'Положение об оплате труда',
                filename: 'Оплата труда.docx'
            },
            {
                doc_id: 10,
                name: 'Протокол собрания директоров',
                filename: 'Протокол СовДир.docx'
            },
            {
                doc_id: 11,
                name: 'Отчет о движении денег',
                filename: 'Отчет о движ денег.docx'
            },
            {
                doc_id: 12,
                name: 'Штатное расписание',
                filename: 'ШтатнРаспис.docx'
            },
            {
                doc_id: 13,
                name: 'Политика конфиденциальности',
                filename: 'Политика конфиденциальности.docx'
            },
            {
                doc_id: 14,
                name: 'Налоговая декларация',
                filename: 'НалогДеклар.docx'
            },
            {
                doc_id: 15,
                name: 'Заявление на отпуск',
                filename: 'Заявление на отпуск.docx'
            },
            {
                doc_id: 16,
                name: 'Устав предприятия',
                filename: 'Устав.docx'
            },
            {
                doc_id: 17,
                name: 'Счет-фактура №78-Ф',
                filename: '78Ф.docx'
            },
            {
                doc_id: 18,
                name: 'План развития на 2024-2025',
                filename: 'План20242025.docx'
            },
            {
                doc_id: 19,
                name: 'Акт о нарушении дисциплины',
                filename: 'Акт о наруш дисциплины.docx'
            },
            {
                doc_id: 20,
                name: 'Трудовой договор ИТ-0001',
                filename: 'ИТ0001.docx'
            },
        ],
        Department: [
            {
                department_id: 0,
                name: 'HR'
            },
            {
                department_id: 1,
                name: 'Руководство'
            },
            {
                department_id: 2,
                name: 'Финансы'
            },
            {
                department_id: 3,
                name: 'Admin'
            }
        ],
        DocumentDepartment: [
            {
                doc_id: 0,
                department_id: 0
            },
            {
                doc_id: 1,
                department_id: 1
            },
            {
                doc_id: 1,
                department_id: 2
            },
            {
                doc_id: 2,
                department_id: 1
            },
            {
                doc_id: 3,
                department_id: 2
            },
            {
                doc_id: 4,
                department_id: 0
            },
            {
                doc_id: 5,
                department_id: 1
            },
            {
                doc_id: 5,
                department_id: 1
            },
            {
                doc_id: 6,
                department_id: 0
            },
            {
                doc_id: 7,
                department_id: 0
            },
            {
                doc_id: 7,
                department_id: 2
            },
            {
                doc_id: 8,
                department_id: 2
            },
            {
                doc_id: 9,
                department_id: 0
            },
            {
                doc_id: 10,
                department_id: 1
            },
            {
                doc_id: 11,
                department_id: 2
            },
            {
                doc_id: 12,
                department_id: 0
            },
            {
                doc_id: 13,
                department_id: 0
            },
            {
                doc_id: 13,
                department_id: 1
            },
            {
                doc_id: 13,
                department_id: 2
            },
            {
                doc_id: 14,
                department_id: 2
            },
            {
                doc_id: 15,
                department_id: 0
            },
            {
                doc_id: 16,
                department_id: 0
            },
            {
                doc_id: 16,
                department_id: 1
            },
            {
                doc_id: 16,
                department_id: 2
            },
            {
                doc_id: 17,
                department_id: 2
            },
            {
                doc_id: 18,
                department_id: 1
            },
            {
                doc_id: 19,
                department_id: 0
            },
            {
                doc_id: 20,
                department_id: 0
            },
        ],
        User: [
            {
                user_id: 0,
                first_name: 'Громова',
                second_name: 'Мария',
                third_name: 'Матвеевна',
                email: 'grom@corp.ru',
                pasword: '$2b$10$wrmUUUhh9wBj4Zce8osQOOOYXy8/m53f5iWYBBOhY4jAte41Qqouq', // gromovam
                department_id: 3
            },
            {
                user_id: 1,
                first_name: 'Попов',
                second_name: 'Евгений',
                third_name: 'Андреевич',
                email: 'head@corp.ru',
                pasword: '$2b$10$wrmUUUhh9wBj4Zce8osQOOoWURzJvdBPLC5/axdegSZyJHkdiF/lO', // popove
                department_id: 1
            },
            {
                user_id: 2,
                first_name: 'Ильин',
                second_name: 'Евгений',
                third_name: 'Васильевич',
                email: 'ilev@corp.ru',
                pasword: '$2b$10$wrmUUUhh9wBj4Zce8osQOO0WIJOa2YL.gIHlUyJQUzFgHk8chIbny', // ilinevvas
                department_id: 0
            },
        ]
    }),
    getters: {
        department_by_id: (state) => (id) => {
            for (const dep of state.Department){
                if (dep.department_id == id){
                    return dep.name;
                }
            }
        },
        lastn: (state) => (n) => {
            return state.Document.slice(state.Document.length - n).reverse();
        },
        dep_docs: (state) => (id) => {
            const doc_ids = state.DocumentDepartment.filter((item) => item.department_id == id).map((item) => item.doc_id)
            return state.Document.filter((item) => doc_ids.includes(item.doc_id))
        },
        dep_lastn: (state) => (dep_id, n) => {
            const items = state.DocumentDepartment.filter((item) => item.department_id == dep_id);
            const doc_ids = items.slice(items.length - n).map((item) => item.doc_id);
            return state.Document.filter((item) => doc_ids.includes(item.doc_id)).reverse();
        }
    },
    actions:{
        authentificate() {
            const hashed_password = hashSync(this.my_password, '$2b$10$wrmUUUhh9wBj4Zce8osQOO');
            for (const user of this.User){
                if (user.email == this.my_email && user.pasword == hashed_password){
                    this.my_first_name = user.first_name;
                    this.my_second_name = user.second_name;
                    this.my_third_name = user.third_name;
                    this.my_department_id = user.department_id;
                    if (this.my_department_id == 3){
                        this.my_status = 'admin';
                    }
                    else{
                        this.my_status = 'worker';
                    }
                    break;
                }
            }
        },
        exit() {
            this.my_first_name = null;
            this.my_second_name = null;
            this.my_third_name = null
            this.my_department_id = null
            this.my_status = null;
        }
    }
});
import { defineStore } from "pinia";
import { hashSync } from "bcryptjs";
import axios from 'axios';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        // данные пользователя
        my_email: '',
        my_password: '',
        my_status: null, // null - не авторизован, 'worker' - сотрудник, 'admin' - админ
        my_first_name: null, //Ф
        my_second_name: null, //И
        my_third_name: null, //О
        my_department_id: null, // мой отдел
        my_user_id: 0,

        // данные для работы системы
        current_department_id: null, // текущий отдел: для страницы конкрентого отдела и страницы Мой отдел
        current_search: '', // текущий запрос в поисковике

        // данные для изменения данных пользователя и добавления нового пользователя
        show_change_user_modal: false, //показ модального окна для изменения данных пользователя
        show_add_user_modal: false, //показ модального окна для добавления нового пользователя
        current_user_id_to_change: null, //выбранный для изменения данных пользователь
        new_user_first_name: '', //Ф
        new_user_second_name: '', //И
        new_user_third_name: '', //О
        new_user_email: '',
        new_user_password: '',
        new_user_department: '',

        // данные для добавления файла
        show_add_file_modal: false, //показ модального окна для добавления файла
        new_doc_name: '',
        new_doc_deps: '',
        new_doc_file: null,

        // База данных (временно)
        Document: [
            {
                doc_id: 1,
                name: 'График отпусков 2024',
                filename: 'Отпуска2024.docx'
            },
            {
                doc_id: 2,
                name: 'Счет на оплату №567',
                filename: 'Счет567.docx'
            },
            {
                doc_id: 3,
                name: 'Стратегический план',
                filename: 'План.docx'
            },
            {
                doc_id: 4,
                name: 'Годовой бюджет 2024',
                filename: 'Бюджет2024.docx'
            },
            {
                doc_id: 5,
                name: 'Приказ о приеме на работу',
                filename: 'Приказ о приеме на работу.docx'
            },
            {
                doc_id: 6,
                name: 'Акт сверки с контрагентом',
                filename: 'Акт сверки.docx'
            },
            {
                doc_id: 7,
                name: 'Должностная инструкция',
                filename: 'Должност инструкция.docx'
            },
            {
                doc_id: 8,
                name: 'Годовой отчет СовДиру',
                filename: 'ОтчетСовДиру.docx'
            },
            {
                doc_id: 9,
                name: 'Бухгалтерский баланс',
                filename: 'БухБаланс.docx'
            },
            {
                doc_id: 10,
                name: 'Положение об оплате труда',
                filename: 'Оплата труда.docx'
            },
            {
                doc_id: 11,
                name: 'Протокол собрания директоров',
                filename: 'Протокол СовДир.docx'
            },
            {
                doc_id: 12,
                name: 'Отчет о движении денег',
                filename: 'Отчет о движ денег.docx'
            },
            {
                doc_id: 13,
                name: 'Штатное расписание',
                filename: 'ШтатнРаспис.docx'
            },
            {
                doc_id: 14,
                name: 'Политика конфиденциальности',
                filename: 'Политика конфиденциальности.docx'
            },
            {
                doc_id: 15,
                name: 'Налоговая декларация',
                filename: 'НалогДеклар.docx'
            },
            {
                doc_id: 16,
                name: 'Заявление на отпуск',
                filename: 'Заявление на отпуск.docx'
            },
            {
                doc_id: 17,
                name: 'Устав предприятия',
                filename: 'Устав.docx'
            },
            {
                doc_id: 18,
                name: 'Счет-фактура №78-Ф',
                filename: '78Ф.docx'
            },
            {
                doc_id: 19,
                name: 'План развития на 2024-2025',
                filename: 'План20242025.docx'
            },
            {
                doc_id: 20,
                name: 'Акт о нарушении дисциплины',
                filename: 'Акт о наруш дисциплины.docx'
            },
            {
                doc_id: 21,
                name: 'Трудовой договор ИТ-0001',
                filename: 'ИТ0001.docx'
            },
        ],
        Department: [
            {
                department_id: 1,
                name: 'HR'
            },
            {
                department_id: 2,
                name: 'Руководство'
            },
            {
                department_id: 3,
                name: 'Финансы'
            },
            {
                department_id: 4,
                name: 'Администратор'
            }
        ],
        DocumentDepartment: [
            {
                doc_id: 1,
                department_id: 1
            },
            {
                doc_id: 2,
                department_id: 2
            },
            {
                doc_id: 3,
                department_id: 3
            },
            {
                doc_id: 4,
                department_id: 2
            },
            {
                doc_id: 4,
                department_id: 3
            },
            {
                doc_id: 5,
                department_id: 1
            },
            {
                doc_id: 6,
                department_id: 2
            },
            {
                doc_id: 7,
                department_id: 1
            },
            {
                doc_id: 8,
                department_id: 1
            },
            {
                doc_id: 8,
                department_id: 3
            },
            {
                doc_id: 9,
                department_id: 3
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
                department_id: 3
            },
            {
                doc_id: 13,
                department_id: 1
            },
            {
                doc_id: 14,
                department_id: 1
            },
            {
                doc_id: 14,
                department_id: 2
            },
            {
                doc_id: 14,
                department_id: 3
            },
            {
                doc_id: 15,
                department_id: 3
            },
            {
                doc_id: 16,
                department_id: 1
            },
            {
                doc_id: 17,
                department_id: 1
            },
            {
                doc_id: 17,
                department_id: 2
            },
            {
                doc_id: 17,
                department_id: 3
            },
            {
                doc_id: 18,
                department_id: 3
            },
            {
                doc_id: 19,
                department_id: 2
            },
            {
                doc_id: 20,
                department_id: 1
            },
            {
                doc_id: 21,
                department_id: 1
            },
        ],
        User: [
            {
                user_id: 0,
                first_name: 'Громова',
                second_name: 'Мария',
                third_name: 'Матвеевна',
                email: 'grom@corp.ru',
                password: '$2b$10$wrmUUUhh9wBj4Zce8osQOOOYXy8/m53f5iWYBBOhY4jAte41Qqouq', // gromovam
                department_id: 3
            },
            {
                user_id: 1,
                first_name: 'Попов',
                second_name: 'Евгений',
                third_name: 'Андреевич',
                email: 'head@corp.ru',
                password: '$2b$10$wrmUUUhh9wBj4Zce8osQOOoWURzJvdBPLC5/axdegSZyJHkdiF/lO', // popove
                department_id: 1
            },
            {
                user_id: 2,
                first_name: 'Ильин',
                second_name: 'Евгений',
                third_name: 'Васильевич',
                email: 'ilev@corp.ru',
                password: '$2b$10$wrmUUUhh9wBj4Zce8osQOO0WIJOa2YL.gIHlUyJQUzFgHk8chIbny', // ilinevvas
                department_id: 0
            },
        ],
        DeletionRequests: [
            {
                del_id: 0,
                doc_id: 1,
                user_id: 1
            },
            {
                del_id: 1,
                doc_id: 15,
                user_id: 2
            },
            {
                del_id: 2,
                doc_id: 10,
                user_id: 1
            }
        ],

        // айди для бд
        next_del_id: 3,
        next_doc_id: 21,
        next_user_id: 3,

        // данные для вывода документов/запросов/пользователей
        lastn_docs_arr: [],
        dep_docs_arr: [],
        dep_docs_lastn_arr: []
    }),
    getters: {
        department_by_id: (state) => (id) => {
            for (const dep of state.Department){
                if (dep.department_id == id){
                    return dep.name;
                }
            }
        },
        //lastn: (state) => (n) => {
        //    return state.Document.slice(state.Document.length - n).reverse();
        //},
        //dep_docs: (state) => (id) => {
        //    const doc_ids = state.DocumentDepartment.filter((item) => item.department_id == id).map((item) => item.doc_id)
        //    return state.Document.filter((item) => doc_ids.includes(item.doc_id))
        //},
        //dep_lastn: (state) => (dep_id, n) => {
        //    const items = state.DocumentDepartment.filter((item) => item.department_id == dep_id);
        //    const doc_ids = items.slice(items.length - n).map((item) => item.doc_id);
        //    return state.Document.filter((item) => doc_ids.includes(item.doc_id)).reverse();
        //},
        //path_by_doc_id: (state) => (doc_id) => {
        //    for (const doc of state.Document){
        //        if (doc.doc_id == doc_id){
        //            return '../../store/files/' + filename
        //        }
        //    }
        //},
        doc_search: (state) => (search_req) => {
            return state.Document.filter((item) => item.name.toLowerCase().includes(search_req.toLowerCase()) || item.filename.toLowerCase().includes(search_req.toLowerCase()))
        },
        doc_by_doc_id: (state) => (doc_id) => {
            for (const doc of state.Document){
                if (doc.doc_id == doc_id){
                    return doc
                }
            }
        },
        user_by_user_id: (state) => (user_id) => {
            for (const user of state.User){
                if (user.user_id == user_id){
                    return user
                }
            }
        },
        user_search: (state) => (search_req) => {
            return state.User.filter((item) => item.first_name.toLowerCase().includes(search_req.toLowerCase()) ||
            item.second_name.toLowerCase().includes(search_req.toLowerCase()) ||
            item.third_name.toLowerCase().includes(search_req.toLowerCase()) ||
            state.department_by_id(item.department_id).toLowerCase().includes(search_req.toLowerCase()))
        },
        req_search: (state) => (search_req) => {
            return state.DeletionRequests.filter((item) => state.doc_by_doc_id(item.doc_id).name.toLowerCase().includes(search_req.toLowerCase()) ||
            state.doc_by_doc_id(item.doc_id).filename.toLowerCase().includes(search_req.toLowerCase()))
        }
    },
    actions:{
        async authentificate(email, password){
            try{
                const response = await axios.get('http://localhost:3001/api/authentificate', {
                    params: {
                        email: email,
                        password: password
                    }
                })
                this.my_password = ''
                if (response.data[0] != null){
                    this.my_email = email
                    this.my_department_id = response.data[0].department_id
                    if(this.my_department_id == 4){
                        this.my_status = 'admin'
                    }
                    else{
                        this.my_status = 'worker'
                    }
                    this.my_first_name = response.data[0].first_name
                    this.my_second_name = response.data[0].second_name
                    this.my_third_name = response.data[0].third_name
                    this.my_user_id = response.data[0].user_id
                }
                else{
                    console.log('auth error')
                }
            } catch (error) {
                console.log('auth error', error)
            }

        },
        exit() {
            this.my_first_name = null
            this.my_second_name = null
            this.my_third_name = null
            this.my_department_id = null
            this.my_status = null
            this.my_email = ''
            this.my_user_id = 0
        },
        async lastn(n) {
            try{
                const response = await axios.get('http://localhost:3001/api/lastn', {
                    params: {
                        n: n
                    }
                })
                this.lastn_docs_arr = response.data
            } catch (error) {
                console.log('lastn error', error)
            }
        },
        async dep_docs(department_id) {
            try{
                const response = await axios.get('http://localhost:3001/api/dep_docs', {
                    params: {
                        department_id: department_id
                    }
                })
                this.dep_docs_arr = response.data
            } catch (error) {
                console.log('dep_docs error', error)
            }
        },
        async dep_docs_lastn() {
            try{
                const response = await axios.get('http://localhost:3001/api/dep_docs_lastn')
                this.dep_docs_lastn_arr = response.data
            } catch (error) {
                console.log('dep_docs error', error)
            }
        },
        async add_new_document(){
            const name = this.new_doc_name
            const dep_ids = []
            for(let dep of this.Department){
                if(this.new_doc_deps.toLowerCase().includes(dep.name.toLowerCase())){
                    dep_ids.push(dep.department_id)
                }
            }
            if(dep_ids.length==0){
                console.log('No departments')
                throw Error('No departments')
            }
            const formData = new FormData()
            formData.append('name', name)
            formData.append('department_ids', dep_ids)
            formData.append('file', this.new_doc_file)
            try{
                await axios.post('http://localhost:3001/api/upload_doc', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
            } catch (error) {
                console.log('dep_docs error', error)
            }
            this.show_add_file_modal = false
        },
        delete_by_doc_id(doc_id) {
            this.Document = this.Document.filter((item) => item.doc_id != doc_id)
            this.DocumentDepartment = this.DocumentDepartment.filter((item) => item.doc_id != doc_id)
            this.DeletionRequests = this.DeletionRequests.filter((item) => item.doc_id != doc_id)
            console.log(this.Document.length)
        },
        delete_by_del_id(del_id) {
            let i = 0;
            while(this.DeletionRequests[i].del_id != del_id){
                i++;
            }
            this.delete_by_doc_id(this.DeletionRequests[i].doc_id)
        },
        request_deletion(doc_id, user_id) {
            this.DeletionRequests.push(
                {
                    del_id: this.next_del_id,
                    doc_id: doc_id,
                    user_id: user_id
                }
            )
            this.next_del_id++
            console.log(this.DeletionRequests)
        },
        cancel_deletion(del_id){
            this.DeletionRequests = this.DeletionRequests.filter((item) => item.del_id != del_id)
        },
        //add_new_document() {
        //    this.Document.push({
        //        doc_id: this.next_doc_id,
        //        name: this.new_doc_name,
        //        filename: this.new_doc_name+'.docx'
        //    })
        //    this.next_doc_id++
        //    for(let i in [0,1,2]){
        //        if (this.new_doc_deps.includes(this.department_by_id(i))){
        //            this.DocumentDepartment.push({
        //                doc_id: this.new_doc_id,
        //                department_id: i
        //            })
        //        }
        //    }
        //    this.show_add_file_modal = false;
        //},
        delete_by_user_id(user_id) {
            this.User = this.User.filter((item) => item.user_id != user_id)
        },
        change_user_props(){
            let i=0
            while(this.User[i].user_id!=this.current_user_id_to_change){
                i++
            }
            
            if(this.new_user_first_name!='')this.User[i].first_name = this.new_user_first_name
            if(this.new_user_second_name!='')this.User[i].second_name = this.new_user_second_name
            if(this.new_user_email!='')this.User[i].email = this.new_user_email
            if(this.new_user_password!='')this.User[i].password = hashSync(this.new_user_password, '$2b$10$wrmUUUhh9wBj4Zce8osQOO')
            
            this.show_change_user_modal = false
            this.new_user_first_name = ''
            this.new_user_second_name = ''
            this.new_user_email = ''
            this.new_user_password = ''
        },
        add_new_user() {
            if(this.new_user_first_name=='' || this.new_user_second_name=='' || this.new_user_third_name=='' || this.new_user_email=='' || this.new_user_password=='' || this.new_user_department==''){
                console.log('incorrect props to add new user')
                return
            }

            let i = 0
            while(this.Department[i].name != this.new_user_department) i++
            if(this.Department[i].name != this.new_user_department){
                console.log('there is not such department')
                return
            }

            let department_id = this.Department[i].department_id

            this.User.push({
                user_id: this.next_user_id,
                first_name: this.new_user_first_name,
                second_name: this.new_user_second_name,
                third_name: this.new_user_third_name,
                email: this.new_user_email,
                password: hashSync(this.new_user_password, '$2b$10$wrmUUUhh9wBj4Zce8osQOO'),
                department_id: department_id
            })
            this.next_user_id++
            this.show_add_user_modal = false
            this.new_user_first_name = ''
            this.new_user_second_name = ''
            this.new_user_third_name = ''
            this.new_user_email = ''
            this.new_user_password = ''
            this.new_user_department = ''
        },
        set_new_file(event){
            this.new_doc_file = event.target.files[0]
        }
    }
});
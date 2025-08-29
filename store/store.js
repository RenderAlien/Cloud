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

        // данные для вывода документов/запросов/пользователей
        lastn_docs_arr: [],
        dep_docs_arr: [],
        dep_docs_lastn_arr: [],
        search: [],
        user: [],
        all_docs: [],
        all_del_requests: [],
        del_req_search_arr: [],
        user_search_arr: []
    }),
    getters: {
        department_by_id: (state) => (id) => {
            for (const dep of state.Department){
                if (dep.department_id == id){
                    return dep.name;
                }
            }
        },
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
                console.log('add_new_document error', error)
            }
            this.show_add_file_modal = false
        },
        async download_by_doc_id(doc_id, filename){
            try{
                const response = await axios.get('http://localhost:3001/api/download_by_doc_id', {
                    responseType: 'blob',
                    params:{
                        doc_id: doc_id
                    }
                });
                
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                
                link.remove();
                window.URL.revokeObjectURL(url);

            } catch (error) {
                console.log('download_by_doc_id error', error)
            }
        },
        async doc_search(search_req){
            try{
                const response = await axios.get('http://localhost:3001/api/doc_search', {
                    params: {
                        search_req: search_req
                    }
                })
                this.search = response.data
            } catch (error) {
                console.log('doc_search error', error)
            }
        },
        async request_deletion(doc_id, user_id){
            try{
                const response = await axios.get('http://localhost:3001/api/request_deletion', {
                    params: {
                        doc_id: doc_id,
                        user_id: user_id
                    }
                })
            } catch (error) {
                console.log('request_deletion error', error)
            }
        },
        async get_all_users(){
            try{
                const response = await axios.get('http://localhost:3001/api/get_all_users')
                this.user = response.data
            } catch (error) {
                console.log('dep_docs error', error)
            }
        },
        async add_new_user(){
            try{
                const response = await axios.get('http://localhost:3001/api/add_new_user', {
                    params: {
                        first_name: this.new_user_first_name,
                        second_name: this.new_user_second_name,
                        third_name: this.new_user_third_name,
                        email: this.new_user_email,
                        password: this.new_user_password,
                        department: this.new_user_department
                    }
                })
                this.show_add_user_modal = false
                this.new_user_first_name = ''
                this.new_user_second_name = ''
                this.new_user_third_name = ''
                this.new_user_email = ''
                this.new_user_password = ''
                this.new_user_department = ''
                console.log('succesful adding new user')
            } catch (error) {
                console.log('add_new_user error', error)
            }
            
        },
        async change_user_props(){
            try{
                const response = await axios.get('http://localhost:3001/api/change_user_props', {
                    params: {
                        user_id: this.current_user_id_to_change,
                        first_name: this.new_user_first_name,
                        second_name: this.new_user_second_name,
                        email: this.new_user_email,
                        password: this.new_user_password,
                    }
                })
                this.show_change_user_modal = false
                this.new_user_first_name = ''
                this.new_user_second_name = ''
                this.new_user_email = ''
                this.new_user_password = ''
                console.log('succesful changing user')
            } catch (error) {
                console.log('change_user_props error', error)
            }
        },
        async delete_by_doc_id(doc_id){
            try{
                const response = await axios.get('http://localhost:3001/api/delete_by_doc_id', {
                    params: {
                        doc_id: doc_id
                    }
                })
                console.log('succesful deletion')
            } catch (error) {
                console.log('delete_by_doc_id error', error)
            }
        },
        async get_all_docs(){
            try{
                const response = await axios.get('http://localhost:3001/api/get_all_docs')
                this.all_docs = response.data
            } catch (error) {
                console.log('get_all_docs error', error)
            }
        },
        async delete_by_del_id(del_id){
            try{
                const response = await axios.get('http://localhost:3001/api/delete_by_del_id', {
                    params: {
                        del_id: del_id
                    }
                })
                console.log('succesful deletion')
            } catch (error) {
                console.log('delete_by_del_id error', error)
            }
        },
        async get_all_del_requests(){
            try{
                const response = await axios.get('http://localhost:3001/api/get_all_del_requests')
                this.all_del_requests = response.data
            } catch (error) {
                console.log('get_all_docs error', error)
            }
        },
        async cancel_deletion(del_id){
            try{
                const response = await axios.get('http://localhost:3001/api/cancel_deletion', {
                    params: {
                        del_id: del_id
                    }
                })
            } catch (error) {
                console.log('cancel_deletion error', error)
            }
        },
        async delete_by_user_id(user_id){
            try{
                const response = await axios.get('http://localhost:3001/api/delete_by_user_id', {
                    params: {
                        user_id: user_id
                    }
                })
            } catch (error) {
                console.log('delete_by_user_id error', error)
            }
        },
        async del_request_search(search_req){
            try{
                const response = await axios.get('http://localhost:3001/api/del_request_search', {
                    params: {
                        search_req: search_req
                    }
                })
                this.del_req_search_arr = response.data
            } catch (error) {
                console.log('del_request_search error', error)
            }
        },
        async user_search(search_req){
            try{
                const response = await axios.get('http://localhost:3001/api/user_search', {
                    params: {
                        search_req: search_req
                    }
                })
                this.user_search_arr = response.data
            } catch (error) {
                console.log('user_search error', error)
            }
        },
        set_new_file(event){
            this.new_doc_file = event.target.files[0]
        }
    }
});
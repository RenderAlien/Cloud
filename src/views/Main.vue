<script setup>
import { useCounterStore } from '../../store/store';
import { useRouter } from 'vue-router';

const router = useRouter()

const store = useCounterStore(); //редирект на страницу для админа
if (store.my_status == 'admin'){
    router.push('/admin_users')
}
store.lastn(3)
store.dep_docs(store.my_department_id)
</script>

<template>

    <div class="content-text">Недавно добавленные:</div>
    <div class="item-container">
        <div v-for="doc in store.lastn_docs_arr" class="item">
            <div class="item-text">
                {{ doc.name }}
            </div>
            <div @click="store.download_by_doc_id(doc.doc_id, doc.filename)" class="item-blue-button" download>
                Скачать
            </div>
            <div class="item-red-button" @click="store.request_deletion(doc.doc_id, store.my_user_id)">
                Удалить
            </div>
        </div>
    </div>
    <div class="content-text">Мой отдел:</div>
    <div class="item-container">
        <div v-for="doc in store.dep_docs_arr.length>3 ? store.dep_docs_arr.slice(store.dep_docs_arr.length-3) : store.dep_docs_arr" class="item">
            <div class="item-text">
                {{ doc.name }}
            </div>
            <div @click="store.download_by_doc_id(doc.doc_id, doc.filename)" class="item-blue-button" download>
                Скачать
            </div>
            <div class="item-red-button" @click="store.request_deletion(doc.doc_id, store.my_user_id)">
                Удалить
            </div>
        </div>
    </div>

</template>
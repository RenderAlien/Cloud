<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
store.dep_docs(store.current_department_id)
</script>

<template>

    <div class="content-text">{{ 'Отдел ' + store.department_by_id(store.current_department_id) + ':' }}</div>
    <div class="item-container">
        <div v-for="doc in store.dep_docs_arr" class="item">
            <div class="item-text">
                {{ doc.name }}
            </div>
            <a class="item-blue-button" @click="store.download_by_doc_id(doc.doc_id, doc.filename)" download>
                Скачать
            </a>
            <div class="item-red-button" @click="store.request_deletion(doc.doc_id, store.my_user_id)">
                Удалить
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
</script>

<template>

    <div class="content-text">{{ 'Отдел ' + store.department_by_id(store.current_department_id) }}</div>
    <div class="item-container">
        <div v-for="doc in store.dep_docs(store.current_department_id)" class="item">
            <div class="item-text">
                {{ doc.name }}
            </div>
            <div class="item-blue-button">
                Скачать
            </div>
            <div class="item-red-button" @click="store.request_deletion(doc.doc_id, store.my_user_id)">
                Удалить
            </div>
        </div>
    </div>
    
</template>
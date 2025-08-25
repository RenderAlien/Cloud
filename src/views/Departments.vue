<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
</script>

<template>

    <div v-for="department_id in [0,1,2]">
        <RouterLink class="content-text" to="/dep" @click="store.current_department_id = department_id">{{ 'Отдел ' + store.department_by_id(department_id) + ':' }}</RouterLink>
        <div class="item-container">
            <div v-for="doc in store.dep_lastn(department_id, 3)" class="item">
                <div class="item-text">
                    {{ doc.name }}
                </div>
                <a class="item-blue-button" :href="store.path_by_doc_id(doc.doc_id)" download>
                    Скачать
                </a>
                <div class="item-red-button" @click="store.request_deletion(doc.doc_id, store.my_user_id)">
                    Удалить
                </div>
            </div>
        </div>
    </div>
    
</template>
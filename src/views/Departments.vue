<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
</script>

<template>

    <div v-for="department_id in [0,1,2]">
        <div class="content-text">{{ 'Отдел ' + store.department_by_id(department_id) }}</div>
        <div class="item-container">
            <div v-for="doc in store.dep_lastn(department_id, 3)" class="item">
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
    </div>
    
</template>
<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
store.dep_docs_lastn()
</script>

<template>

    <div v-for="dep_docs in store.dep_docs_lastn_arr">
        <RouterLink class="content-text" to="/dep" @click="store.current_department_id = dep_docs.department_id">{{ 'Отдел ' + store.department_by_id(dep_docs.department_id) + ':' }}</RouterLink>
        <div class="item-container">
            <div v-for="doc in dep_docs.docs" class="item">
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
    </div>
    
</template>
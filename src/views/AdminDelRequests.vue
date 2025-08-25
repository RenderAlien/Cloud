<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
</script>

<template>

    <div class="header m-0">
        <input type="text" class="search" placeholder="Поиск по запросам..." v-model="store.current_search">
        <RouterLink class="header-profile-button" to="/profile">{{ store.my_first_name + " " + store.my_second_name[0] + "." }}</RouterLink>
    </div>
      
    <div v-if="store.current_search == ''" class="page">
        <div class="item-container">
            <div v-for="req in store.DeletionRequests" class="item">
                <div class="item-text">
                    {{ store.doc_by_doc_id(req.doc_id).name }}
                </div>
                <a class="req-blue-button" :href="store.path_by_doc_id(req.doc_id)" download>
                    Скачать
                </a>
                <div class="req-blue-button-small" @click="store.cancel_deletion(req.del_id)" title="Отмена"></div>
                <div class="req-red-button-small" @click="store.delete_by_del_id(req.del_id)" title="Удалить"></div>
            </div>
        </div>
    </div>

    <div v-else class="page">
        <div class="content-text">Результат поиска:</div>
        <div class="item-container">
          <div v-for="doc in store.doc_search(store.current_search)" class="item">
            <div class="item-text">{{ doc.name }}</div>
            <a class="item-blue-button" :href="store.path_by_doc_id(doc.doc_id)" download>Скачать</a>
            <div class="item-red-button" @click="store.request_deletion(doc.doc_id, store.my_user_id)">Удалить</div>
          </div>
        </div>
    </div>
    
</template>
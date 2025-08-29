<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
store.get_all_del_requests()
</script>

<template>

    <div class="header m-0">
        <input type="text" class="search" placeholder="Поиск по запросам..."  v-model="store.current_search" v-on:input="store.del_request_search(store.current_search)">
        <RouterLink class="header-profile-button" to="/profile">{{ store.my_first_name + " " + store.my_second_name[0] + "." }}</RouterLink>
    </div>
      
    <div v-if="store.current_search == ''" class="page">
        <div class="item-container">
            <div v-for="req in store.all_del_requests" class="item">
                <div class="item-text">
                    {{ req.name }}
                </div>
                <a class="req-blue-button" @click="store.download_by_doc_id(req.doc_id, req.filename)" download>
                    Скачать
                </a>
                <div class="req-blue-button-small" @click="store.cancel_deletion(req.del_id);store.get_all_del_requests();" title="Отмена"></div>
                <div class="req-red-button-small" @click="store.delete_by_del_id(req.del_id);store.get_all_del_requests();" title="Удалить"></div>
            </div>
        </div>
    </div>

    <div v-else class="page">
        <div class="content-text">Результат поиска:</div>
        <div class="item-container">
          <div v-for="req in store.del_req_search_arr" class="item">
                <div class="item-text">
                    {{ req.name }}
                </div>
                <a class="req-blue-button" @click="store.download_by_doc_id(req.doc_id, req.filename)" download>
                    Скачать
                </a>
                <div class="req-blue-button-small" @click="store.cancel_deletion(req.del_id);" title="Отмена"></div>
                <div class="req-red-button-small" @click="store.delete_by_del_id(req.del_id);" title="Удалить"></div>
          </div>
        </div>
    </div>
    
</template>
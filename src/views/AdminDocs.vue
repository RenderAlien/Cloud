<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
store.get_all_docs();
</script>

<template>
    <div class="header m-0">
        <input type="text" class="search" placeholder="Поиск по документам..." v-model="store.current_search" v-on:input="store.doc_search(store.current_search)">
        <RouterLink class="header-profile-button" to="/profile">{{ store.my_first_name + " " + store.my_second_name[0] + "." }}</RouterLink>
    </div>
      
    <div v-if="store.current_search == ''" class="page">
        <div class="item-container">
            <div class="content-button" @click="store.show_add_file_modal=true">
                <div class="content-button-text">
                    Добавить новый документ...
                </div>
            </div>
            <div v-for="doc in store.all_docs" class="item">
                <div class="item-text">
                    {{ doc.name }}
                </div>
                <a class="item-blue-button" @click="store.download_by_doc_id(doc.doc_id, doc.filename)" download>
                    Скачать
                </a>
                <div class="item-red-button" @click="store.delete_by_doc_id(doc.doc_id)">
                    Удалить
                </div>
            </div>
        </div>
    </div>
    <div v-else class="page">
        <div class="content-text">Результат поиска:</div>
        <div class="item-container">
          <div v-for="doc in store.search" class="item">
            <div class="item-text">{{ doc.name }}</div>
            <a class="item-blue-button" @click="store.download_by_doc_id(doc.doc_id, doc.filename)" download>Скачать</a>
            <div class="item-red-button" @click="store.delete_by_doc_id(doc.doc_id)">Удалить</div>
          </div>
        </div>
    </div>
    
</template>
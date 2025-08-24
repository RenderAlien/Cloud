<script setup>
import { useCounterStore } from '../../store/store';

const store = useCounterStore();
</script>

<template>

    <div class="content-text">Недавно добавленные:</div>
    <div class="item-container">
        <div v-for="doc in store.lastn(3)" class="item">
            <div class="item-text">
                {{ doc.name }}
            </div>
            <div class="item-blue-button">
                Скачать
            </div>
            <div class="item-red-button">
                Удалить
            </div>
        </div>
    </div>
    <div class="content-text">Мой отдел</div>
    <div class="item-container">
        <div v-for="doc in store.dep_lastn(store.my_department_id, 3)" class="item">
            <div class="item-text">
                {{ doc.name }}
            </div>
            <div class="item-blue-button">
                Скачать
            </div>
            <div class="item-red-button">
                Удалить
            </div>
        </div>
    </div>

</template>
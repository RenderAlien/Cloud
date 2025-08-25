<script>
import { useCounterStore } from '../../store/store';

export default{
    name: 'AddFileModal',
    setup() {
        const store = useCounterStore();
        return {store}
    }
}
</script>

<template>
    <div v-if="store.show_add_file_modal" class="modal">
        <div class="modal-window">
            <input type="text" placeholder="Название файла..." class="modal-input" v-model="store.new_doc_name" style="margin-top: 10.9259vh">
            <input type="text" placeholder="Отделы..." class="modal-input" v-model="store.new_doc_deps">
            <div>
                <input type="file" class="modal-file-input" name="add_file_input" id="add_file_input">
            </div>
            <div style="display: flex; flex-direction: row; gap: 1.04167vw;">
                <div class="modal-button" @click="store.show_add_file_modal=false">Отмена</div>
                <div class="modal-button">Добавить</div>
            </div>
        </div>
    </div>
</template>
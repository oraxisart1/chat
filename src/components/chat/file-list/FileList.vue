<template>
  <q-dialog
      class="chat__files"
  >
    <q-card class="chat__files__card">
      <q-card-section class="chat__files__card__tabs">
        <q-tabs v-model="tab" class="chat__files__card__tabs-list">
          <template v-for="tab in tabs">
            <q-tab v-bind="tab" class="chat__files__card__tabs-item">
              <span class="chat__files__card__tabs-item__count">
                  {{ filesCount[tab.target] }}
              </span>
            </q-tab>
          </template>
        </q-tabs>
      </q-card-section>

      <q-card-section class="chat__files__card__panels chat__scrollbar--custom">
        <q-tab-panels v-model="tab" class="chat__files__card__panels-list">
          <q-tab-panel
              v-for="tab in tabs"
              :name="tab.name"
              class="chat__files__card-list"
          >
            <template v-if="!!filesCount[tab.target]">
              <div
                  v-for="(files, date) in groupedFiles"
                  class="chat__files__card-list__group"
              >
                <span
                    class="chat__files__card-list__group-date"
                >
                    {{ formatFilesDate(date) }}
                </span>
                <q-list>
                  <q-item
                      @click="fileClickHandler(file)"
                      clickable
                      v-for="file in files[tab.target]"
                      :data-file-id="file.id"
                      class="chat__files__card-list__group-item"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon name="insert_drive_file"></q-icon>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{ file.name }}</q-item-section>

                    <Menu :entity="file" :options="file.contextOptions"></Menu>
                  </q-item>
                </q-list>
              </div>
            </template>

            <template v-else>
              <div class="chat__files__card-list--not-found">
                <span class="chat__files__card-list--not-found__text">Файлы не найдены</span>
              </div>
            </template>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<!--suppress JSValidateTypes -->
<script setup>
import {useChatStore} from 'stores/chat/chat';
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import {downloadFile} from 'components/chat/chat.functions';
import {formatFilesDate} from 'components/chat/file-list/file-list.functions';
import Menu from 'components/chat/menu/Menu';

const store = useChatStore();

const {
  filesCount,
  groupedFiles,
  selectedFiles,
  isSelectedFiles,
} = storeToRefs(store);

const {
  unselectFile,
  selectFile,
} = store;

const tab = ref('files');
const tabs = ref([
  {
    label: 'Изображения',
    target: 'images',
    name: 'images',
    icon: 'image',
  },
  {
    label: 'Видео',
    target: 'videos',
    name: 'videos',
    icon: 'videocam',
  },
  {
    label: 'Файлы',
    target: 'all',
    name: 'files',
    icon: 'insert_drive_file',
  },
]);

function isFileSelected(file) {
  return selectedFiles.value.has(file.id);
}

function fileClickHandler(file) {
  if (!isSelectedFiles.value) {
    return downloadFile(file.path);
  }

  return isFileSelected(file) ? unselectFile(file) : selectFile(file);
}
</script>

<style scoped>

</style>
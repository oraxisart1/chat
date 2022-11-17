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

      <q-card-section class="chat__files__card__panels">
        <q-tab-panels v-model="tab" class="chat__files__card__panels-list">
          <q-tab-panel
              v-for="tab in tabs"
              :name="tab.name"
              class="chat__files-list"
          >
            <div
                v-for="(files, date) in groupedFiles"
                class="chat__files-list__group"
            >
                <span
                    class="chat__files-list__group-date"
                >
                    {{ new Date(date).toLocaleDateString(undefined, {month: 'long'}) }}
                </span>
              <q-list>
                <q-item clickable v-for="file in files[tab.target]">
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon name="insert_drive_file"></q-icon>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{ file.name }}</q-item-section>
                  <q-menu
                      context-menu
                      touch-position
                      auto-close
                  >
                    <q-list class="message-context-menu">
                      <template v-for="option in options.fileListContext">
                        <q-item clickable v-if="option.expression?.(file) ?? true"
                                @click="option.action(file)">
                          <q-item-section avatar>
                            <q-icon :name="option.icon"></q-icon>
                          </q-item-section>
                          <q-item-section>{{ option.title }}</q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-menu>
                </q-item>
              </q-list>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useChatStore} from 'stores/chat/chat';
import {ref} from 'vue';
import {storeToRefs} from 'pinia';

const store = useChatStore();

const {
  filesCount,
  groupedFiles,
} = storeToRefs(store);

const tab = ref('images');
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
</script>

<style scoped>

</style>
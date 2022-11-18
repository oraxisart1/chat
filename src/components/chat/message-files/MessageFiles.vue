<template>
  <q-dialog
      class="chat__message-files"
      ref="dialog"
      persistent
      no-shake
      @keydown.esc.stop.exact="clearMessageFiles"
      @keydown.enter.stop.exact="sendMessageHandler"
  >
    <q-card class="chat__message-files__card">
      <q-card-section class="chat__message-files__card-header">
        <q-btn
            icon="close"
            round
            unelevated
            size="sm"
            class="chat__message-files__card-header__button_cancel button__hover--disable"
            @click="clearMessageFiles"
        ></q-btn>

        <div>
          <span class="chat__message-files__card-header__text">{{ headerText }}</span>

          <q-btn
              icon="add"
              round
              unelevated
              size="sm"
              class="chat__message-files__card-header__button_add button__hover--disable"
              @click="pickFiles"
          ></q-btn>
        </div>

        <q-btn
            label="Оптравить"
            unelevated
            class="chat__message-files__card-header__button_send button__hover--disable"
            size="12px"
            @click="sendMessageHandler"
        ></q-btn>
      </q-card-section>

      <q-card-section class="chat__message-files__card-content">
        <q-list
            class="chat__message-files__card-content__list chat__scrollbar--custom"
        >
          <q-item v-for="(file, index) in formattedMessageFiles" class="chat__message-files__card-content__item">
            <q-item-section avatar class="chat__message-files__card-content__item-avatar">
              <q-avatar>
                <q-icon name="insert_drive_file"></q-icon>
              </q-avatar>
            </q-item-section>

            <q-item-section class="chat__message-files__card-content__item-info ellipsis">
              <span class="chat__message-files__card-content__item-info__name ellipsis">{{ file.name }}</span>
              <span class="chat__message-files__card-content__item-info__size">{{ file.sizeString }}</span>
            </q-item-section>

            <Menu :options="contextOptions" :entity="file" :index="index"></Menu>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section class="chat__message-files__card-message">
        <q-input
            v-model="messageText"
            dense
            borderless
            class="chat__message-files__card-message__input"
            input-class="chat__message-files__card-message__input__native chat__scrollbar--custom"
            autogrow
            autofocus
            placeholder="Введите сообщение..."
        >

        </q-input>
      </q-card-section>
    </q-card>

    <q-file
        @update:model-value="addMessageFiles"
        v-model="filesModel"
        ref="filePicker"
        v-show="false"
        multiple
    ></q-file>
  </q-dialog>
</template>

<!--suppress JSValidateTypes -->
<script setup>
import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';
import {computed, ref} from 'vue';
import Menu from 'components/chat/menu/Menu';
import {scrollToBottom} from 'components/chat/messages-area/handlers';

const store = useChatStore();

const {
  formattedMessageFiles,
  messageFilesCount,
  messageText,
} = storeToRefs(store);

const {addMessageFiles, deleteMessageFile, clearMessageFiles, sendMessage} = store;

const filesModel = ref();
const filePicker = ref();
const contextOptions = ref([
  {
    icon: 'remove',
    title: 'Удалить',
    action: (_, index) => deleteMessageFile(index),
  },
]);

const headerText = computed(
    () => messageFilesCount.value === 1 ? 'Отправить файл' : `Отправить файлы (${messageFilesCount.value})`);

function pickFiles() {
  filePicker.value.pickFiles();
}

function sendMessageHandler() {
  sendMessage();
  scrollToBottom(true);
}

const c = computed(() => console);
</script>

<style scoped>

</style>
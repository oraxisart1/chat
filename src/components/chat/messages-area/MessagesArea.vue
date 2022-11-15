<template>
  <div
    class="chat__messages-area"
    ref="scrollTarget"
    data-messages-area
    @scroll="calculateScrollPosition"
  >
    <q-infinite-scroll reverse @load="onLoad" :scroll-target="scrollTarget">
      <div
        v-for="(messages, date) in allMessages"
        class="chat__messages-group"
        :data-messages-date="date"
        :key="date"
      >
        <div
          class="chat__messages-date"
          @click="isShowDatePicker = true"
        >
          {{ formatDate(date) }}
        </div>

        <div
          class="chat__message-container"
          v-for="message in messages"
          :key="message.id"
          :data-message-id="message.id"
          @click="messageClickHandler(message)"
          @dblclick="startReplyingMessage(message.id)"
        >
          <Message :message="message"></Message>
          <ContextMenu :entity="message" :options="message.contextOptions"></ContextMenu>
        </div>
      </div>
    </q-infinite-scroll>

    <transition name="scroll-button">
      <q-btn
        icon="expand_more"
        round
        class="chat__messages-area__scroll-button"
        v-show="scrollPosition > 700"
        @click="scrollToBottom"
      >
      </q-btn>
    </transition>

    <div class="chat__messages-actions__container" v-show="getSelectedMessages.size > 0">
      <q-btn
        class="chat__messages-actions__button q-mr-sm"
        no-caps
        text-color="white"
      >
        <span>Переслать <strong>{{ getSelectedMessages.size }}</strong></span>
      </q-btn>

      <q-btn
        class="chat__messages-actions__button q-mr-sm"
        no-caps
        text-color="white"
        v-if="!isOtherUserMessageSelected"
        @click="deleteSelectedMessagesHandler"
      >
        <span>Удалить <strong>{{ getSelectedMessages.size }}</strong></span>
      </q-btn>

      <q-btn
        class="chat__messages-actions__button"
        no-caps
        text-color="white"
        @click="clearMessageSelection"
      >
        <span>Отменить</span>
      </q-btn>
    </div>
  </div>

  <ConfirmDialog ref="confirmDialog"></ConfirmDialog>

  <q-dialog v-model="isShowDatePicker" class="chat__messages-area__date-picker">
    <q-card class="chat__messages-area__date-picker__card">
      <q-card-section class="row items-center">
        <q-date
          v-model="currentDate"
          minimal
          class="chat__messages-area__date-picker__input"
          dark
          mask="YYYY-MM-DD"
          flat
          @update:model-value="datePickerHandler"
        ></q-date>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Отменить"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useChatStore} from 'stores/chat';
import {formatDate, getDateElement} from 'components/chat/messages-area/messages-area.functions';
import Message from 'components/chat/message/Message';
import ContextMenu from 'components/chat/menu/Menu';
import {scrollToBottom} from 'components/chat/messages-area/handlers';
import ConfirmDialog from 'components/chat/confirm-dialog/ConfirmDialog';

const store = useChatStore();
const {
  allMessages,
  getSelectedMessages,
  isOtherUserMessageSelected,
  isChatFocused,
} = storeToRefs(store);
const {
  deleteSelectedMessages,
  selectMessage,
  unselectMessage,
  clearMessageSelection,
  startReplyingMessage,
} = store;
const scrollTarget = ref();
const scrollPosition = ref(0);
const scrollButtonTimer = ref(0);
const confirmDialog = ref();
const selectedMessages = getSelectedMessages.value;
const isShowDatePicker = ref(false);
const currentDate = ref(null);

function calculateScrollPosition(event) {
  const target = event.target;
  if (scrollButtonTimer.value) {
    return;
  }
  scrollButtonTimer.value = setTimeout(() => {
    scrollPosition.value = target.scrollHeight - target.clientHeight - target.scrollTop;
    clearTimeout(scrollButtonTimer.value);
    scrollButtonTimer.value = 0;
  }, 100);
}

function messageClickHandler(message) {
  if (selectedMessages.size > 0) {
    selectedMessages.has(message.id) ? unselectMessage(message) : selectMessage(message);
  }
}

function deleteSelectedMessagesHandler() {
  confirmDialog.value.show({
    message: 'Вы уверены что хотите удалить выбранные сообщения?',
  }).then(() => {
    deleteSelectedMessages();
  }).catch(() => {
  });
}

function datePickerHandler(event) {
  isShowDatePicker.value = false;
  const target = getDateElement(scrollTarget.value, event);
  if (target) {
    target.scrollIntoView({
      block: 'center',
    });
  }
}

function onLoad(index, done) {
  done();
}
</script>

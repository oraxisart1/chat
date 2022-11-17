<template>
  <div class="chat__message-form" data-message-form>
    <div class="chat__message-form__replying-message non-selectable" v-if="!!replyingMessage">
      <q-icon
        name="reply"
        size="24px"
        class="chat__message-form__replying-message__icon chat__message-form__replying-message__icon_reply"
      ></q-icon>

      <div
        class="chat__message-form__replying-message__content ellipsis"
        @click="scrollToMessage(replyingMessage.id)"
      >
        <span class="chat__message-form__replying-message__content-user">{{ replyingMessage.name }}</span>
        <span class="chat__message-form__replying-message__content-text ellipsis">{{ replyingMessage.text }}</span>
      </div>

      <q-icon
        @click="stopReplyingMessage"
        class="chat__message-form__replying-message__icon chat__message-form__replying-message__icon_clear"
        name="clear"
        size="24px"
      ></q-icon>
    </div>

    <div
      class="chat__message-form__editing-message non-selectable" v-if="!!editingMessage">
      <q-icon
        name="edit"
        size="24px"
        class="chat__message-form__editing-message__icon chat__message-form__editing-message__icon_edit"
      ></q-icon>

      <div
        class="chat__message-form__editing-message__content ellipsis"
        @click="scrollToMessage(editingMessage.id)"
      >
        <span class="chat__message-form__editing-message__content-user">Редактирование сообщения</span>
        <span class="chat__message-form__editing-message__content-text ellipsis">{{ editingMessage.text }}</span>
      </div>

      <q-icon
        @click="stopEditingMessage"
        class="chat__message-form__editing-message__icon chat__message-form__editing-message__icon_clear"
        name="clear"
        size="24px"
      ></q-icon>
    </div>

    <q-icon
      name="attach_file"
      size="24px"
      class="chat__message-form__button chat__message-form__button_files"
      @click="filePicker.pickFiles()"
    ></q-icon>

    <div
      class="chat__message-form__input"
      contenteditable
      data-message-input
      @input="messageInputHandler"
      @keydown.enter.exact.prevent="sendMessageHandler"
      placeholder="Введите сообщение..."
      ref="messageInput"
      @paste.prevent="inputPasteHandler"
    ></div>

    <q-icon
      name="mood"
      size="24px"
      class="button__hover--disable chat__message-form__button"
      :class="is.showEmojiPicker ? 'chat__message-form__button_emoji--active' : ''"
      @mouseenter="is.btnHovered = true"
      @mouseleave="is.btnHovered = false"
    ></q-icon>

    <q-icon
      name="send"
      size="24px"
      class="button__hover--disable chat__message-form__button chat__message-form__button_send"
      :class="[!!messageText?.trim() ? 'chat__message-form__button_send--active' : '']"
      @click="sendMessageHandler"
    ></q-icon>
  </div>

  <q-file v-model="files" ref="filePicker" v-show="false" multiple></q-file>

  <div
    class="row chat__message-form__emoji"
    v-show="is.showEmojiPicker"
    @mouseover="is.pickerHovered = true"
    @mouseleave="is.pickerHovered = false"
  >
    <div
      class="col-12 full-height"
    >
      <EmojiPicker
        :native="true"
        class="chat__message-form__emoji-picker full-width full-height"
        @mousedown.prevent
        @select="emojiSelectHandler"
      ></EmojiPicker>
    </div>
  </div>
</template>

<!--suppress JSValidateTypes -->
<script setup>
import '/node_modules/vue3-emoji-picker/dist/style.css';
import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';
import {resizeArea} from 'components/chat/messages-area/messages-area.storeFunctions';
import {scrollToBottom} from 'components/chat/messages-area/handlers';
import {reactive, ref, watch} from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import {emojiSelectHandler} from 'components/chat/message-form/message-form.handlers';
import {scrollToMessage} from 'components/chat/handlers';
import {focusMessageInput} from 'components/chat/message-form/message-form.functions';

const {messageText, replyingMessage, editingMessage} = storeToRefs(useChatStore());
const {sendMessage, stopReplyingMessage, stopEditingMessage} = useChatStore();
const filePicker = ref();
const files = ref();
const messageInput = ref();
const is = reactive({
  btnHovered: false,
  pickerHovered: false,
  showEmojiPicker: false,
});

watch(() => is.pickerHovered, (newVal) => {
  setTimeout(() => {
    if (!newVal && !is.btnHovered) {
      is.showEmojiPicker = false;
    }
  }, 200);
});

watch(() => is.btnHovered, (newVal) => {
  if (newVal) {
    is.showEmojiPicker = newVal;
  }
  setTimeout(() => {
    if (!newVal && !is.pickerHovered) {
      is.showEmojiPicker = false;
    }
  }, 200);
});

function messageInputHandler(event) {
  let value = event.target.innerText.trim();

  if (!value) {
    value = '';
  }
  messageText.value = value.trim();
  resizeArea();
}

function sendMessageHandler() {
  if (!!messageText.value.trim()) {
    sendMessage();
    scrollToBottom(true);
    resizeArea();
    focusMessageInput();
  }
}

watch(replyingMessage, () => {
  resizeArea();
});

watch(editingMessage, (newValue) => {
  messageInput.value.textContent = newValue?.text ?? '';
  resizeArea();
});

function inputPasteHandler(event) {
  const text = event.clipboardData.getData('text/plain');
  document.execCommand('insertText', false, text);
}
</script>

<template>
  <div class="chat__message-form" data-message-form>
    <q-btn
      icon="attach_file"
      unelevated
      square
      class="button__hover--disable chat__message-form__button"
      @click="filePicker.pickFiles()"
    >
    </q-btn>

    <div class="chat__message-form__replying-message" v-if="!!replyingMessage">
      <div style="width: 10%" class="row justify-center items-center">
        <q-icon
          name="reply"
          style="color: #6FBCF2"
          size="24px"
        ></q-icon>
      </div>
      <div
        style="width: 80%"
        class="row non-selectable cursor-pointer"
        @click="scrollToMessage(replyingMessage.id)"
      >
        <div class="col-12 q-pt-xs">
          <span style="color: #6FBCF2">{{ replyingMessage.name }}</span>
        </div>
        <div class="col-12"
             style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: #F5F5F5">
          <span>{{ replyingMessage.text }}</span>
        </div>
      </div>

      <div style="width: 10%" class="">
        <q-icon
          @click="onReplyClear"
          class="cursor-pointer"
          name="clear"
          style="color: lightgray"
          size="24px"
        ></q-icon>
      </div>
    </div>

    <div
      class="chat__message-form__input"
      contenteditable
      data-message-input
      @input="messageInputHandler"
      @keydown.enter.exact.prevent="sendMessageHandler"
      placeholder="Введите сообщение..."
    ></div>

    <q-btn
      icon="mood"
      unelevated
      square
      :class="is.showEmojiPicker ? 'chat__message-form__button_emoji--active' : ''"
      class="button__hover--disable chat__message-form__button"
      @mouseenter="is.btnHovered = true"
      @mouseleave="is.btnHovered = false"
    >
    </q-btn>

    <q-btn
      icon="send"
      :class="[!!messageText?.trim() ? 'chat__message-form__button_send--active' : '']"
      unelevated
      square
      @click="sendMessageHandler"
      class="button__hover--disable chat__message-form__button"
    >
    </q-btn>
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

<script setup>
import '/node_modules/vue3-emoji-picker/dist/style.css'
import {useChatStore} from "stores/chat";
import {storeToRefs} from "pinia";
import {resizeArea} from "components/chat/messages-area/messages-area.functions";
import {scrollToBottom} from "components/chat/messages-area/handlers";
import {reactive, ref, watch} from "vue";
import EmojiPicker from "vue3-emoji-picker";
import {emojiSelectHandler} from "components/chat/message-form/message-form.handlers";
import {scrollToMessage} from "components/chat/handlers"

const {messageText, replyingMessage, indexedMessages} = storeToRefs(useChatStore())
const {sendMessage} = useChatStore();
const filePicker = ref();
const files = ref();
const is = reactive({
  btnHovered: false,
  pickerHovered: false,
  showEmojiPicker: false,
})

watch(() => is.pickerHovered, (newVal) => {
  setTimeout(() => {
    if (!newVal && !is.btnHovered) {
      is.showEmojiPicker = false;
    }
  }, 200)
})

watch(() => is.btnHovered, (newVal) => {
  if (newVal) {
    is.showEmojiPicker = newVal;
  }
  setTimeout(() => {
    if (!newVal && !is.pickerHovered) {
      is.showEmojiPicker = false;
    }
  }, 200)
})

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
  }
}

watch(replyingMessage, () => {
  resizeArea()
})
</script>

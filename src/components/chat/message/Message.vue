<template>
  <q-chat-message
    size="6"
    text-color="white"
    :bg-color="message.name === 'me' ? 'cyan-9' : 'blue-grey-8'"
    :sent="message.name === 'me'"
    class="chat__message"
    :class="getMessageClasses(message)"
    :data-next-same-user="message.isNextSame"
    :data-prev-same-user="message.isPreviousSame"
  >
    <template #default>
      <div class="row chat__message-content">

        <div
          class="col-12 row unselectable chat__message-reply"
          v-if="!!message.replyMessageId"
          @click="scrollToMessage(message.replyMessageId)"
        >

          <div class="col-12 q-pt-xs chat__message-reply_name">
            <span>{{ getMessageById(message.replyMessageId).name }}</span>
          </div>

          <div class="col-12 ellipsis">
            <span class="ellipsis chat__message-reply_text">{{ getMessageById(message.replyMessageId).text }}</span>
          </div>

        </div>

        <div class="col-12 row chat__messages-files" v-if="message.files?.length > 0">

          <q-list class="chat__messages-file-list">

            <template v-for="file in message.files">

              <template v-if="isImage(file.path)">
                <q-img
                  :src="file.path"
                  style="width: 100%"
                  class="cursor-pointer"
                  @click="openImageFullscreen(file.path)"
                ></q-img>
              </template>

              <template v-else>
                <q-item
                  clickable
                  @click="downloadFile(file)"
                >
                  <q-item-section avatar>
                    <q-icon name="description"></q-icon>
                  </q-item-section>
                  <q-item-section>{{ file.name }}</q-item-section>
                </q-item>
              </template>

            </template>

          </q-list>

        </div>
        <div class="col-12 chat__message-content__text">
          {{ message.text }}
        </div>
      </div>
    </template>
    <template #name>
      <div
        v-if="message.name !== 'me'"
        @click="openUserProfile(message.name)"
        class="chat__message-name unselectable"
      >{{ message.name }}
      </div>
    </template>
    <template #avatar>
      <q-avatar
        @click="openUserProfile(message.name)"
        v-if="message.name !== 'me'"
        class="chat__message-avatar unselectable"
      >
        <q-img
          :src="message.avatar ?? 'https://cdn-icons-png.flaticon.com/512/147/147142.png'">
        </q-img>
      </q-avatar>
    </template>
    <template #stamp>
      <div class="row unselectable">
        <div class="q-ml-auto">
          <q-icon
            name="push_pin"
            v-if="message.isPinned"
            class="chat__message-icon chat__message-icon_pin"
          >
          </q-icon>
          <q-icon
            name="edit"
            v-if="message.isEdited"
            class="chat__message-icon chat__message-icon_edit"
          >
          </q-icon>
          <span class="chat__message-stamp unselectable">{{ message.stamp }}</span>
        </div>
      </div>
    </template>
  </q-chat-message>
</template>

<script setup>
import {getMessageById} from "components/chat/messages-area/messages-area.functions"
import {isImage} from "components/chat/chat.functions";
import {openUserProfile, scrollToMessage} from "components/chat/handlers";
import {useChatStore} from "stores/chat";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const {getSelectedMessages} = storeToRefs(useChatStore())
const selectedMessages = getSelectedMessages.value
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const getMessageClasses = computed(() => {
  return message => {
    const classes = [];
    if (selectedMessages.has(message.id)) {
      classes.push('chat__message--selected');
    }

    return classes;
  }
})
</script>

<style scoped>

</style>

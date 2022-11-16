<template>
  <template v-if="message.type === 'info'">
    <div class="chat__message--info">
      <span class="chat__message--info__text">{{ message.text }}</span>
    </div>
  </template>
  <template v-else>
    <q-chat-message
      size="6"
      text-color="white"
      :bg-color="message.name === 'me' ? 'cyan-9' : 'blue-grey-8'"
      :sent="message.name === 'me'"
      class="chat__message"
      :data-next-same-user="message.isNextSame"
      :data-prev-same-user="message.isPreviousSame"
    >
      <template #default>
        <div class="chat__message-content">

          <div
            class="chat__message-content__reply unselectable"
            v-if="!!message.replyMessageId"
            @click="scrollToMessage(message.replyMessageId)"
          >
            <span class="chat__message-content__reply-user">{{ getMessageById(message.replyMessageId).name }}</span>

            <span
              class="ellipsis chat__message-content__reply-text"
            >{{ getMessageById(message.replyMessageId).text }}</span>
          </div>

          <!--        <div class="col-12 row chat__messages-files" v-if="message.files?.length > 0">

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

                  </div>-->

          <span class="chat__message-content__text" data-type="message-text">{{ message.text }}</span>
        </div>
      </template>

      <template #name>
        <div
          v-if="message.name !== 'me'"
          @click="openUserProfile(message.name)"
          class="chat__message-user unselectable"
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
        <div class="chat__message-info">
          <q-icon
            name="push_pin"
            v-if="message.isPinned"
            class="chat__message-info__icon chat__message-info__icon_pin"
          >
          </q-icon>
          <q-icon
            name="edit"
            v-if="message.isEdited"
            class="chat__message-info__icon chat__message-info__icon_edit"
          >
          </q-icon>
          <span class="chat__message-info__stamp unselectable">{{ message.stamp }}</span>
        </div>
      </template>
    </q-chat-message>
  </template>
</template>

<script setup>
// import {isImage} from 'components/chat/chat.functions';
import {openUserProfile, scrollToMessage} from 'components/chat/handlers';
import {getMessageById} from 'stores/chat/chatStore.functions';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>

</style>

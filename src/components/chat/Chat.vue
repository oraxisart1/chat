<template>
  <div class="chat">
    <MessagesArea></MessagesArea>

    <MessageForm></MessageForm>

    <q-btn
      icon="more_horiz"
      round
      size="12px"
      class="chat__button--settings"
    >
      <q-menu :offset="[0, 5]" style="border-radius: 5px">
        <q-list style="min-width: 100px" class="chat-settings-menu">
          <template v-for="setting in options.chatSettings">
            <q-item
              clickable
              v-close-popup
              v-if="setting.expression() ?? true"
              @click="setting.action"
            >
              <q-item-section avatar>
                <q-icon :name="setting.icon"></q-icon>
              </q-item-section>
              <q-item-section>{{ setting.title }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn
      icon="push_pin"
      round
      size="12px"
      class="chat__button--pinned"
      v-if="isPinnedMessages"
      @click="pinnedButtonHandler"
    >
      <q-menu :offset="[0, 5]" style="border-radius: 5px;">
        <q-list style="min-width: 100px; max-width: 200px" class="chat-settings-menu" v-show="pinnedMessagesCount > 1">
          <template v-for="message in getPinnedMessages">
            <q-item
              clickable
              v-close-popup
              @click="scrollToMessage(message.id, false)"
            >
              <q-item-section>
                <div class="row" style="max-width: 180px">
                  <div class="col-12">
                    <span style="color: #6FBCF2; font-size: 13px">{{ message.name }}</span>
                  </div>
                  <div class="col-12 ellipsis">
                    <span class="ellipsis">{{ message.text }}</span>
                  </div>
                </div>
              </q-item-section>

              <q-menu
                context-menu
                touch-position
                auto-close
              >
                <q-list class="message-context-menu">
                  <template v-for="option in options.pinnedMessageContext">
                    <q-item
                      clickable
                      v-if="option.expression?.(message) ?? true"
                      @click="option.action(message)"
                    >
                      <q-item-section avatar>
                        <q-icon :name="option.icon"></q-icon>
                      </q-item-section>
                      <q-item-section>{{ option.title }}</q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-menu>
            </q-item>
          </template>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
import MessagesArea from '/src/components/chat/messages-area/MessagesArea'
import MessageForm from '/src/components/chat/message-form/MessageForm'
import '/src/css/chat/index.scss'
import {useChatStore} from "stores/chat";
import {storeToRefs} from "pinia";
import {scrollToMessage} from "components/chat/handlers";

const {isPinnedMessages, pinnedMessagesCount, getPinnedMessages} = storeToRefs(useChatStore());
const pinnedMessages = getPinnedMessages.value;

function pinnedButtonHandler() {
  if (pinnedMessagesCount.value === 1) {
    scrollToMessage(Object.values(pinnedMessages)[0].id)
  }
}
</script>

<style scoped>

</style>

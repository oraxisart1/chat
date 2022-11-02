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
        <div class="chat__messages-date">
          {{ formatDate(date) }}
        </div>

        <div
          class="chat__message-container"
          v-for="message in messages"
          :key="message.id"
          :data-message-id="message.id"
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
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {storeToRefs} from "pinia";
import {useChatStore} from "stores/chat";
import {formatDate} from "components/chat/messages-area/functions";
import Message from "components/chat/message/Message";
import ContextMenu from "components/chat/context-menu/ContextMenu";
import {scrollToBottom} from "components/chat/messages-area/handlers";

const {allMessages, getSelectedMessages, getPinnedMessages} = storeToRefs(useChatStore());
const {selectMessage, unselectMessage, clearMessageSelection, pinMessage, unpinMessage} = useChatStore();
const scrollTarget = ref();
const scrollPosition = ref(0);
const scrollButtonTimer = ref(0)

function calculateScrollPosition(event) {
  const target = event.target;
  if (scrollButtonTimer.value) return;
  scrollButtonTimer.value = setTimeout(() => {
    scrollPosition.value = target.scrollHeight - target.clientHeight - target.scrollTop;
    clearTimeout(scrollButtonTimer.value);
    scrollButtonTimer.value = 0;
  }, 100);
}

// DEBUG
const c = computed(() => console)

function onLoad(index, done) {
  done()
}
</script>

<style scoped>

</style>

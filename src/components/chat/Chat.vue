<template>
  <div
      class="chat"
      @keydown.esc.exact.stop="stopAllActions"
      tabindex="0"
  >
    <template v-if="isCurrentUserInChat">
      <MessagesArea></MessagesArea>
      <MessageForm></MessageForm>
      <Settings></Settings>
    </template>
    <template v-else>
      <div class="chat--leaved">
        <span class="chat--leaved__text" @click="returnToChat">Нажмите, чтобы вернуться в чат</span>
      </div>
    </template>
  </div>

  <MemberAdd v-model="showMemberDialogAdd"></MemberAdd>
  <MemberList v-model="showMemberDialogList"></MemberList>
  <FileList v-model="showDialogFileList"></FileList>

</template>

<!--suppress JSValidateTypes -->
<script setup>
import MessagesArea from '/src/components/chat/messages-area/MessagesArea';
import MessageForm from '/src/components/chat/message-form/MessageForm';
import MemberAdd from 'components/chat/member-add/MemberAdd';
import MemberList from 'components/chat/member-list/MemberList';
import Settings from 'components/chat/chat-settings/Settings';
import FileList from 'components/chat/file-list/FileList';
import '/src/css/chat/index.scss';
import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';

const store = useChatStore();
const {
  isCurrentUserInChat,
  showMemberDialogAdd,
  showMemberDialogList,
  showDialogFileList,
} = storeToRefs(store);
const {returnToChat, stopAllActions} = store;
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.chat-messages-filter-leave-active, .chat-messages-filter-enter-active {
  transition: all .1s;
}

.chat-messages-filter-leave-to, .chat-messages-filter-enter-from {
  transform: scaleX(0);
}

.chat-filter-button-leave-active {
  transition: all .1s;
}

.chat-filter-button-enter-active {
  transition: all .4s;
}

.chat-filter-button-leave-to, .chat-filter-button-enter-from {
  opacity: 0;
}
</style>

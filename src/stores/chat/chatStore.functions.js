import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';

const chatStore = useChatStore();

const {indexedMessages, indexedUsers, currentUser} = storeToRefs(chatStore);

export function getMessageById(messageId) {
  return indexedMessages?.value[messageId];
}

export function getUserById(userId) {
  return indexedUsers?.value[userId];
}

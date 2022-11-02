import {useChatStore} from "stores/chat";
import {storeToRefs} from "pinia";

export function formatDate(date) {
  date = new Date(date);
  const options = {
    day: 'numeric',
    month: 'long'
  };

  if (date.getFullYear() !== new Date().getFullYear()) {
    options.year = 'numeric';
  }

  return date.toLocaleDateString(undefined, options);
}

const {indexedMessages} = storeToRefs(useChatStore());

export function getMessageById(messageId) {
  return indexedMessages.value[messageId];
}

import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';
import {scrollToBottom} from 'components/chat/messages-area/handlers';

const {
  indexedMessages,
  replyingMessage,
  editingMessage,
} = storeToRefs(useChatStore());

export function getMessageById(messageId) {
  return indexedMessages.value[messageId];
}

let messageFormHeight = null;

export function resizeArea() {
  const messageForm = document.querySelector('[data-message-form]');
  const messageArea = document.querySelector('[data-messages-area]');
  if (!messageArea) {
    return;
  }

  let inputHeight = messageForm.clientHeight;

  if (replyingMessage.value || editingMessage.value) {
    inputHeight += 40;
  }

  if (messageFormHeight !== inputHeight) {
    const bodyHeight = document.body.clientHeight;
    const bodyHeightPercent = bodyHeight / 100;
    let inputMaxHeight = bodyHeightPercent * 20;
    if (replyingMessage.value || editingMessage.value) {
      inputMaxHeight += 40;
    }
    if (inputHeight <= inputMaxHeight + 10) {
      const newAreaHeight = (bodyHeight - 50 - inputHeight) / bodyHeight * 100;
      const scrollHeight = messageArea.scrollHeight - messageArea.clientHeight;
      messageArea.style.maxHeight = newAreaHeight + 'vh';

      if (Math.floor(scrollHeight) - Math.floor(messageArea.scrollTop) < 10) {
        scrollToBottom(true);
      }
    }
    messageFormHeight = inputHeight;
  }
}

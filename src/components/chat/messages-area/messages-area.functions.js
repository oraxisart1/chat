import {useChatStore} from 'stores/chat';
import {storeToRefs} from 'pinia';
import {scrollToBottom} from 'components/chat/messages-area/handlers';

const {
  indexedMessages,
  replyingMessage,
  editingMessage,
} = storeToRefs(useChatStore());

export function formatDate(date) {
  date = new Date(date);
  const options = {
    day: 'numeric',
    month: 'long',
  };

  if (date.getFullYear() !== new Date().getFullYear()) {
    options.year = 'numeric';
  }

  return date.toLocaleDateString(undefined, options);
}

export function getMessageById(messageId) {
  return indexedMessages.value[messageId];
}

export function getDateElement(scrollTarget, date) {
  const target = scrollTarget.querySelector(`[data-messages-date="${date}"]`);
  if (target) {
    return target;
  }

  const targetTime = new Date(date).getTime();
  const dateContainers = scrollTarget.querySelectorAll(`[data-messages-date]`);
  for (const el of dateContainers) {
    const elDate = el.dataset.messagesDate;
    const elTime = new Date(elDate).getTime();
    if (elTime > targetTime) {
      return el;
    }
  }
}

let messageFormHeight = null;

export function resizeArea() {
  const messageForm = document.querySelector('[data-message-form]');
  const messageArea = document.querySelector('[data-messages-area]');

  let inputHeight = messageForm.clientHeight;

  /*if (this.is.replyMessage || this.is.editMessage) {
    inputHeight += 40;
  }*/

  if (replyingMessage.value || editingMessage.value) {
    inputHeight += 40;
  }

  if (messageFormHeight !== inputHeight) {
    const bodyHeight = document.body.clientHeight;
    const bodyHeightPercent = bodyHeight / 100;
    let inputMaxHeight = bodyHeightPercent * 20;
    /*if (this.is.replyMessage || this.is.editMessage) {
      inputMaxHeight += 40;
    }*/
    if (replyingMessage.value || editingMessage.value) {
      inputMaxHeight += 40;
    }
    if (inputHeight <= inputMaxHeight + 10) {
      const newAreaHeight = (bodyHeight - 50 - inputHeight) / bodyHeight * 100;
      const scrollHeight = messageArea.scrollHeight - messageArea.clientHeight;
      messageArea.style.maxHeight = newAreaHeight + 'vh';

      if (Math.floor(scrollHeight) - Math.floor(messageArea.scrollTop) < 10) {
        scrollToBottom();
      }
    }
    messageFormHeight = inputHeight;
  }
}

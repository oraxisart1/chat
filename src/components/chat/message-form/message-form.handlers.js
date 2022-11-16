import {addEmojiToInput} from "components/chat/message-form/message-form.functions";
import {useChatStore} from "stores/chat/chat";
import {storeToRefs} from "pinia";

const {messageText} = storeToRefs(useChatStore());

export function emojiSelectHandler({i: emoji}) {
  const input = document.querySelector('[data-message-input]');
  const selection = window.getSelection();
  if (selection.focusNode !== input && selection.focusNode?.parentNode !== input && messageText !== '') {
    const newRange = document.createRange();
    const lastChild = input?.lastChild;
    if (lastChild) {
      newRange.setStartAfter(lastChild);
    } else {
      newRange.setStart( input, 0 )
    }

    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange)
  } else {
    input.focus();
  }

  addEmojiToInput(`${emoji}`)
  messageText.value = input.innerText
}

let messageInput = null;
setTimeout(() => {
  messageInput = document.querySelector('[data-message-input]');
})

export function focusMessageInput() {
  messageInput.focus();
}

export function addEmojiToInput(emoji) {
  const selection = window.getSelection();
  let range = null;
  if (selection.getRangeAt && selection.rangeCount) {
    range = selection.getRangeAt(0);
    range.deleteContents();

    const element = document.createElement("div");
    element.innerHTML = emoji;
    let fragment = document.createDocumentFragment(),
      node,
      lastNode;
    while ((node = element.firstChild)) {
      lastNode = fragment.appendChild(node);
    }
    range.insertNode(fragment);

    if (lastNode) {
      range = range.cloneRange();
      range.setStartAfter(lastNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

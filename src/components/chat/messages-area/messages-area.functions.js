export function getMessageElementById(messageId) {
  const messagesArea = document.querySelector('[data-messages-area]');
  return messagesArea?.querySelector(`[data-message-id="${messageId}"]`);
}

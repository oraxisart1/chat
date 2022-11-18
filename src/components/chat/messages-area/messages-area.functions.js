export function getMessageElementById(messageId) {
  const messagesArea = document.querySelector('[data-messages-area]');
  return messagesArea?.querySelector(`[data-message-id="${messageId}"]`);
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

export function formatMessagesDate(date) {
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
let scroller = null;
export function scrollToBottom() {
  if (!scroller) {
    scroller = document.querySelector('[data-messages-area]');
  }

  scroller.focus()
  scroller.scrollTo({
    top: scroller.scrollHeight - scroller.clientHeight,
    behavior: 'smooth'
  })
}

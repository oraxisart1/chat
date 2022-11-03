let scroller = null;

export function scrollToBottom(isDelay) {
  if (!scroller) {
    scroller = document.querySelector('[data-messages-area]');
  }

  const scroll = () => {
    scroller.focus()
    scroller.scrollTo({
      top: scroller.scrollHeight - scroller.clientHeight,
      behavior: 'smooth'
    })
  }

  if (isDelay) {
    setTimeout(() => {
      scroll();
    })
  } else {
    scroll()
  }
}

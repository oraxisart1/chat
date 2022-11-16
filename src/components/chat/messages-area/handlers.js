let scroller = null;
setTimeout(() => {
  scroller = document.querySelector('[data-messages-area]');
}, 100);

export function scrollToBottom(isDelay) {
  const scroll = () => {
    scroller.scrollBy({
      top: scroller.scrollHeight - scroller.clientHeight,
      behavior: 'smooth',
    });
  };

  if (isDelay === true) {
    setTimeout(() => {
      scroll();
    });
  } else {
    scroll();
  }
}

export function openUserProfile(userName) {
  console.log(`${userName}'s profile`);
}

let lastAnimatedMessage = null;

export function scrollToMessage(messageId, isSmooth = true) {
  const message = document.querySelector(`[data-message-id="${messageId}"]`);
  if (message) {
    message.scrollIntoView({
      behavior: isSmooth ? 'smooth' : 'auto',
      block: 'center',
    });
    const animation = [
      {backgroundColor: '#263238'},
      {backgroundColor: '#6FBCF2', opacity: '0.7'},
      {backgroundColor: '#263238'},
    ];

    const duration = {
      duration: 1000,
      iterations: 1,
    }
    message.animate(animation, duration)

    if (lastAnimatedMessage !== null && message !== lastAnimatedMessage) {
      for (const elementAnimation of lastAnimatedMessage.getAnimations()) {
        elementAnimation.cancel();
      }
    }

    lastAnimatedMessage = message;
  }
}

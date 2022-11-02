import {getFilteredContextOptions} from "components/chat/functions";

export function getMessageContextOptions(message, state) {
  const options = [
    {
      title: 'Закрепить',
      icon: 'push_pin',
      expression: (message) => {
        return state.getSelectedMessages.size === 0 && !state.getPinnedMessages[message.id]
      },
      action: (message) => state.pinMessage(message.id),
      isConfirm: true,
      confirmOptions: {
        message: 'Вы действительно хотите закрепить сообщение?'
      }
    },
    {
      title: 'Открепить',
      icon: 'push_pin',
      expression: (message) => state.getSelectedMessages.size === 0 && !!state.getPinnedMessages[message.id],
      action: (message) => state.unpinMessage(message.id),
      isConfirm: true,
      confirmOptions: {
        message: 'Вы действительно хотите открепить сообщение?'
      }
    },
    {
      title: 'Копировать текст',
      icon: 'content_copy',
      expression: () => state.getSelectedMessages.size === 0,
      action: (message) => navigator.clipboard.writeText(message.text[0])
    },
    {
      title: 'Редактировать',
      icon: 'edit',
      expression: (message) => state.getSelectedMessages.size === 0 && message.name === 'me',
      // action: (message) => this.editMessage(message)
    },
    {
      title: 'Создать задачу',
      icon: 'task',
      expression: () => state.getSelectedMessages.size === 0,
      action: (message) => {}
    },
    {
      title: 'Удалить',
      icon: 'delete',
      expression: (message) => message.name === 'me' && state.getSelectedMessages.size === 0,
      action: (message) => state.deleteMessage(message),
      isConfirm: true,
      confirmOptions: {
        message: 'Вы действительно хотите удалить сообщение?'
      }
    },
    {
      title: 'Ответить',
      icon: 'reply',
      expression: () => state.getSelectedMessages.size === 0,
      action: (message) => this.replyMessage(message)
    },
    {
      title: 'Выбрать',
      icon: 'check_circle_outline',
      action: (message) => {
        state.selectMessage(message)
      },
      expression: (message) => !state.getSelectedMessages.has(message.id),
    },
    {
      title: 'Копировать выделенные как текст',
      icon: 'content_copy',
      expression: () => state.getSelectedMessages.size > 0 && state.getSelectedMessages.has(message.id),
      action: () => this.copySelectedMessages(),
    },
    {
      title: 'Удалить выбранные',
      icon: 'delete',
      expression: (message) => state.getSelectedMessages.has(message.id),
      action: () => state.deleteSelectedMessages(),
      isConfirm: true,
      confirmOptions: {
        message: 'Вы действительно хотите удалить выбранные сообщения?'
      }
    },
    {
      title: 'Отменить выбранные',
      icon: 'check_circle_outline',
      expression: (message) => state.getSelectedMessages.has(message.id),
      action: () => state.clearMessageSelection()
    },
  ];

  return getFilteredContextOptions( options, message )
}

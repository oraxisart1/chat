import {defineStore} from 'pinia';
import {
  getMessageContextOptions, getPinnedMessageContextOptions,
} from 'components/chat/message/message.functions';
import {getCurrentDate, getCurrentTime} from 'components/chat/chat.functions';
import {
  focusMessageInput,
} from 'components/chat/message-form/message-form.functions';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: {
      '2021-09-19': [
        {
          id: 1,
          text: 'Hello',
          stamp: '15:41',
          name: 'me',
          date: '2021-09-19',
          isPinned: true,
        },
        {
          id: 2,
          text: 'Hello',
          stamp: '15:41',
          name: 'Jane',
          date: '2021-09-19',
          isPinned: true,
        },
      ],
      '2022-09-15': [
        {
          id: 3,
          text: 'Hello',
          stamp: '15:40',
          name: 'Jane',
          date: '2022-09-15',
        },
        {
          id: 4,
          text: 'Hello',
          stamp: '15:41',
          name: 'me',
          date: '2022-09-15',
        },
        {
          id: 5,
          text: 'How are you?',
          stamp: '15:42',
          name: 'Jane',
          date: '2022-09-15',
        },
      ],
      '2022-09-16': [
        {
          id: 10,
          text: 'Terminator',
          stamp: '15:41',
          name: 'me',
          date: '2022-09-16',
        },
      ],
      '2022-09-17': [
        {
          id: 11,
          text: 'Hello',
          stamp: '15:41',
          name: 'me',
          date: '2022-09-17',
          isRead: false,
        },
        {
          id: 12,
          text: 'Hello',
          stamp: '15:41',
          name: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          date: '2022-09-17',
          isRead: false,
        },
      ],
      '2022-09-18': [
        {
          id: 13,
          text: 'Hello',
          stamp: '15:41',
          name: 'me',
          date: '2022-09-18',
          isRead: false,
        },
        {
          id: 14,
          text: 'Hello',
          stamp: '15:41',
          name: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          date: '2022-09-18',
          isRead: false,
        },
      ],
      '2022-09-19': [
        {
          id: 15,
          text: 'Hello',
          stamp: '15:41',
          name: 'me',
          date: '2022-09-19',
          isRead: false,
        },
        {
          id: 16,
          text: 'Hello',
          stamp: '15:41',
          name: 'Jane',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          date: '2022-09-19',
          isRead: false,
        },
      ],
      '2022-09-20': [
        {
          id: 17,
          text: 'Hello',
          stamp: '14:04',
          name: 'me',
          date: '2022-09-20',
          isRead: false,
        },
      ],
      '2022-09-21': [
        {
          id: 18,
          text: 'Hello',
          stamp: '14:04',
          name: 'me',
          date: '2022-09-21',
          isRead: false,
        },
        {
          id: 19,
          text: 'Hello',
          stamp: '14:04',
          name: 'me',
          date: '2022-09-21',
          isRead: false,
        },
        {
          id: 20,
          text: 'Hello',
          stamp: '14:04',
          name: 'Jane',
          date: '2022-09-21',
          isRead: false,
        },
        {
          id: 21,
          text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
          stamp: '14:04',
          name: 'Jane',
          date: '2022-09-21',
          isRead: false,
        },
        {
          id: 22,
          text: '123',
          stamp: '14:04',
          name: 'me',
          date: '2022-09-21',
          replyMessageId: 21,
          isRead: false,
        },
      ],
      '2022-09-26': [
        {
          id: 23,
          text: 'Here\'s my file',
          stamp: '13:23',
          name: 'me',
          date: '2022-09-26',
          files: [
            {
              id: 1,
              path: 'http://axiomabio.com/pdf/test.pdf',
              name: 'test.pdf',
            },
          ],
          isRead: false,
        },
        {
          id: 24,
          text: 'Here\'s my file',
          stamp: '13:23',
          name: 'Jane',
          date: '2022-09-26',
          files: [
            {
              id: 2,
              path: 'http://axiomabio.com/pdf/test.pdf',
              name: 'test.pdf',
            },
          ],
          isRead: false,
        },
      ],
    },
    selectedMessages: new Map(),
    messagesFilter: '',
    messageText: '',
    replyingMessageId: null,
    editingMessageId: null,
    chatFocused: false,
    showFilter: false,
    users: [
      {
        fullName: 'Алексей Калошин',
        avatar: 'https://e7.pngegg.com/pngimages/621/689/png-clipart-avenhart-avatar-series-hat-meme-duck-hat-pl.png',
        isProject: true,
        online: true,
        id: 1,
        isMember: true,
      },
      {
        fullName: 'Алексей Мосиевский',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDbznAmvQAiZIZktwK1G-1kC6eYlS8RtDTTw&usqp=CAU',
        isProject: false,
        online: false,
        id: 2,
      },
      {
        fullName: 'Алексей Смирнов',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQF1j34aNj6ObFmgklQHkbbrecFEYiGICCg&usqp=CAU',
        isProject: false,
        online: false,
        id: 3,
      },
      {
        fullName: 'Семен Вологдин',
        avatar: 'https://cdn.memes.com/profilepics/80627711548565577/imageThumb/1548643563_thumb.jpg',
        isProject: false,
        online: true,
        id: 4,
      },
      {
        fullName: 'Артем Бородихин',
        avatar: 'https://www.meme-arsenal.com/memes/b6e23b9793806cb7297ac18f3fe41844.jpg',
        isProject: false,
        online: false,
        id: 5,
      },
      {
        fullName: 'Кирилл Карпенко',
        avatar: 'https://i1.wp.com/novocom.top/image/aS5wabWcuYW5pbWcuY29t/736x/af/b4/fb/afb4fb53e01c86eda7564519d94cd13d.jpg',
        isProject: false,
        online: false,
        id: 6,
      },
      {
        id: 7,
        online: false,
        avatar: 'https://e7.pngegg.com/pngimages/621/689/png-clipart-avenhart-avatar-series-hat-meme-duck-hat-pl.png',
        fullName: 'Илья Максименко',
      },
    ],
    currentUser: {
      fullName: 'Артем Бородихин',
      avatar: 'https://www.meme-arsenal.com/memes/b6e23b9793806cb7297ac18f3fe41844.jpg',
      isProject: false,
      online: false,
      id: 5,
    },
  }),

  getters: {
    isMessages: state => !!Object.values(state.messages).length,
    allMessages: (state) => {
      for (const messages of Object.values(state.messages)) {
        messages.forEach((message, index) => {
          message.contextOptions = getMessageContextOptions(message, state);
          if (message.isPinned) {
            message.pinnedContextOptions = getPinnedMessageContextOptions(
              state, message);
          }
          const nextMessage = messages[index + 1];
          if (nextMessage && nextMessage.name === message.name) {
            message.isPreviousSame = true;
          }

          const prevMessage = messages[index - 1];
          if (prevMessage && prevMessage.name === message.name) {
            message.isNextSame = true;
          }
        });
      }

      return state.messages;
    },
    indexedMessages: (state) => {
      const result = {};
      for (const messages of Object.values(state.messages)) {
        for (const message of messages) {
          result[message.id] = message;
        }
      }

      return result;
    },
    getSelectedMessages: (state) => state.selectedMessages,
    getPinnedMessages: (state) => {
      const result = {};
      for (const message of Object.values(state.indexedMessages)) {
        if (message.isPinned) {
          result[message.id] = message;
        }
      }

      return result;
    },
    isOtherUserMessageSelected: (state) => !!Array.from(
      state.selectedMessages.values()).find(message => message.name !== 'me'),
    isPinnedMessages: (state) => !!state.pinnedMessagesCount,
    pinnedMessagesCount: (state) => Object.values(
      state.getPinnedMessages).length,
    getReplyingMessageId: (state) => state.replyingMessageId,
    getEditingMessageId: (state) => state.editingMessageId,
    replyingMessage: (state) => state.getReplyingMessageId !== null
      ? state.indexedMessages[state.getReplyingMessageId]
      : null,
    editingMessage: (state) => state.getEditingMessageId !== null
      ? state.indexedMessages[state.getEditingMessageId]
      : null,
    isChatFocused() {
      return this.chatFocused;
    },
    isShowFilter() {
      return this.showFilter;
    },
    settingsOptions() {
      return [
        {
          title: 'Список файлов',
          icon: 'folder',
          // expression: () => this.getFilesCount.all > 0,
          action: () => this.is.chatFilesModal = true,
        },
        {
          title: 'Список пользователей',
          icon: 'person',
          expression: () => true,
          action: () => this.is.membersDialog = true,
        },
        {
          title: 'Добавить пользователя',
          icon: 'person_add',
          expression: () => true,
          action: () => this.is.memberAddDialog = true,
        },
        {
          title: 'Отключить уведомления',
          icon: 'notifications_off',
          // expression: () => this.getIndexedMembers[this.getCurrentUser.id].notifications,
          // action: () => this.toggleNotifications(),
        },
        {
          title: 'Включить уведомления',
          icon: 'notifications_active',
          // expression: () => !this.getIndexedMembers[this.getCurrentUser.id].notifications,
          // action: () => this.toggleNotifications(),
        },
        {
          title: 'Покинуть чат',
          icon: 'group_remove',
          expression: () => true,
          // action: () => this.leaveChat(),
        },
      ];
    },
    allUsers() {
      return this.users;
    },
    chatMembers() {
      return this.users.filter(user => user.isMember);
    },
  },

  actions: {
    selectMessage(message) {
      this.selectedMessages.set(message.id, message);
    },
    unselectMessage(message) {
      this.selectedMessages.delete(message.id);
    },
    clearMessageSelection() {
      this.selectedMessages.clear();
    },
    pinMessage(messageId) {
      this.indexedMessages[messageId].isPinned = true;
    },
    unpinMessage(messageId) {
      this.indexedMessages[messageId].isPinned = false;
    },
    deleteMessage(message) {
      this.messages[message.date] = this.messages[message.date].filter(
        msg => msg.id !== message.id);
      if (!this.messages[message.date].length) {
        delete this.messages[message.date];
      }
    },
    deleteSelectedMessages() {
      for (const message of this.selectedMessages.values()) {
        this.deleteMessage(message);
      }

      this.clearMessageSelection();
    },
    sendMessage() {
      if (this.editingMessageId !== null) {
        const editingMessage = this.indexedMessages[this.editingMessageId];
        editingMessage.text = this.messageText;
        editingMessage.isEdited = true;
        this.stopEditingMessage();
        return;
      }

      const currentDate = getCurrentDate();
      if (!Array.isArray(this.messages[currentDate])) {
        this.messages[currentDate] = [];
      }

      const newMessage = {
        id: new Date().getTime(),
        name: 'me',
        stamp: getCurrentTime(),
        text: this.messageText,
      };

      if (this.replyingMessageId) {
        newMessage.replyMessageId = this.replyingMessageId;
      }

      this.messages[currentDate].push(newMessage);

      this.clearMessageInput();
      this.stopReplyingMessage();
    },
    clearMessageInput() {
      this.messageText = null;
      document.querySelector('[data-message-input]').innerText = '';
    },
    startReplyingMessage(messageId) {
      this.stopEditingMessage();
      this.replyingMessageId = messageId;
      focusMessageInput();
    },
    stopReplyingMessage() {
      this.replyingMessageId = null;
    },
    copySelectedMessages() {
      let result = '';
      for (const message of this.getSelectedMessages.values()) {
        result += message.text + '\n';
      }
      window.navigator.clipboard.writeText(result.trim());
    },
    startEditingMessage(messageId) {
      this.stopReplyingMessage();
      this.editingMessageId = messageId;
      this.messageText = this.indexedMessages[messageId].text;
      focusMessageInput();
    },
    stopEditingMessage() {
      this.editingMessageId = null;
    },
  },
});

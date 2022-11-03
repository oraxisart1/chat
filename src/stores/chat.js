import {defineStore} from 'pinia';
import {getMessageContextOptions} from "components/chat/message/message.functions";
import {getCurrentDate, getCurrentTime} from "components/chat/functions";

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
          date: '2022-09-15'
        },
        {
          id: 4,
          text: 'Hello',
          stamp: '15:41',
          name: 'me',
          date: '2022-09-15'
        },
        {
          id: 5,
          text: 'How are you?',
          stamp: '15:42',
          name: 'Jane',
          date: '2022-09-15'
        },
      ],
      '2022-09-16': [
        {
          id: 10,
          text: 'Terminator',
          stamp: '15:41',
          name: 'me',
          date: '2022-09-16'
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
              name: 'test.pdf'
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
              name: 'test.pdf'
            },
          ],
          isRead: false,
        }
      ]
    },
    selectedMessages: new Map(),
    messagesFilter: '',
    messageText: '',
    replyingMessageId: 0,
  }),

  getters: {
    isMessages: state => !!Object.values(state.messages).length,
    allMessages: (state) => {
      for (const messages of Object.values(state.messages)) {
        messages.forEach((message, index) => {
          message.contextOptions = getMessageContextOptions(message, state)
          const nextMessage = messages[index + 1];
          if (nextMessage && nextMessage.name === message.name) {
            message.isPreviousSame = true;
          }

          const prevMessage = messages[index - 1];
          if (prevMessage && prevMessage.name === message.name) {
            message.isNextSame = true;
          }
        })
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
    isOtherUserMessageSelected: (state) => !!Array.from(state.selectedMessages.values()).find(message => message.name !== 'me'),
    isPinnedMessages: (state) => !!state.pinnedMessagesCount,
    pinnedMessagesCount: (state) => Object.values(state.getPinnedMessages).length,
    getReplyingMessageId: (state) => state.replyingMessageId,
    replyingMessage: (state) => state.indexedMessages[state.getReplyingMessageId]
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
      this.messages[message.date] = this.messages[message.date].filter(msg => msg.id !== message.id)
      if (!this.messages[message.date].length) {
        delete this.messages[message.date]
      }
    },
    deleteSelectedMessages() {
      for (const message of this.selectedMessages.values()) {
        this.deleteMessage(message)
      }

      this.clearMessageSelection()
    },
    sendMessage() {
      const currentDate = getCurrentDate();
      if (!Array.isArray(this.messages[currentDate])) {
        this.messages[currentDate] = [];
      }

      const newMessage = {
        id: new Date().getTime(),
        name: 'me',
        stamp: getCurrentTime(),
        text: this.messageText
      };

      if (this.replyingMessageId) {
        newMessage.replyMessageId = this.replyingMessageId;
      }

      this.messages[currentDate].push(newMessage)

      this.clearMessageInput();
      this.stopReplyingMessage();
    },
    clearMessageInput() {
      this.messageText = null;
      document.querySelector('[data-message-input]').innerText = ''
    },
    startReplyingMessage(messageId) {
      this.replyingMessageId = messageId;
    },
    stopReplyingMessage() {
      this.replyingMessageId = null;
    },
    copySelectedMessages() {
      let result = '';
      for (const message of this.getSelectedMessages.values()) {
        result += message.text + '\n'
      }
      window.navigator.clipboard.writeText(result.trim())
    }
  }
})

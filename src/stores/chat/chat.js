import {defineStore} from 'pinia';
import {
  getMemberContextOptions,
  getMessageContextOptions, getPinnedMessageContextOptions,
} from 'components/chat/message/message.functions';
import {getCurrentDate, getCurrentTime} from 'components/chat/chat.functions';
import {
  focusMessageInput,
} from 'components/chat/message-form/message-form.functions';
import {
  getMessageElementById,
} from 'components/chat/messages-area/messages-area.functions';
import {scrollToBottom} from 'components/chat/messages-area/handlers';
import {
  getFileContextOptions,
  getFileElement,
} from 'components/chat/file-list/file-list.functions';
import {
  bytesToSize,
} from 'components/chat/message-files/message-files.functions';

const checkDate = (state, date) => {
  if (!Array.isArray(state.messages[date])) {
    state.messages[date] = [];
  }
};

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
            {
              id: 11,
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
    showFilter: false,
    users: [
      {
        fullName: 'Алексей Калошин',
        avatar: 'https://e7.pngegg.com/pngimages/621/689/png-clipart-avenhart-avatar-series-hat-meme-duck-hat-pl.png',
        isProject: true,
        online: true,
        id: 1,
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
      {
        id: 8,
        online: false,
        avatar: 'https://e7.pngegg.com/pngimages/621/689/png-clipart-avenhart-avatar-series-hat-meme-duck-hat-pl.png',
        fullName: 'Матвей Казаков',
      },
      {
        id: 9,
        online: false,
        avatar: 'https://e7.pngegg.com/pngimages/621/689/png-clipart-avenhart-avatar-series-hat-meme-duck-hat-pl.png',
        fullName: 'Роман Степанов',
      },
    ],
    members: [
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
    ],
    currentUser: {
      fullName: 'Артем Бородихин',
      avatar: 'https://www.meme-arsenal.com/memes/b6e23b9793806cb7297ac18f3fe41844.jpg',
      isProject: false,
      online: false,
      id: 5,
    },
    showMemberDialogAdd: false,
    showMemberDialogList: false,
    showDialogFileList: false,
    memberAddFilter: '',
    memberListFilter: '',
    files: {
      1: {
        id: 1,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 23,
      },
      2: {
        id: 2,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      3: {
        id: 3,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      4: {
        id: 4,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      5: {
        id: 5,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      6: {
        id: 6,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      7: {
        id: 7,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      8: {
        id: 8,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      9: {
        id: 9,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      10: {
        id: 10,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      11: {
        id: 11,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
      12: {
        id: 12,
        path: 'http://axiomabio.com/pdf/test.pdf',
        name: 'test.pdf',
        messageId: 24,
      },
    },
    selectedFiles: new Map(),
    messageFiles: [],
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
          expression: () => this.filesCount.all > 0,
          action: () => this.showDialogFileList = true,
        },
        {
          title: 'Список пользователей',
          icon: 'person',
          expression: () => true,
          action: () => this.showMemberDialogList = true,
        },
        {
          title: 'Добавить пользователя',
          icon: 'person_add',
          expression: () => true,
          action: () => this.showMemberDialogAdd = true,
        },
        {
          title: 'Отключить уведомления',
          icon: 'notifications_off',
          expression: () => !!this.isNotificationsEnabled,
          action: () => this.toggleNotifications(),
          isConfirm: true,
          confirmOptions: {
            message: 'Вы действительно хотите отключить уведомления?',
          },
        },
        {
          title: 'Включить уведомления',
          icon: 'notifications_active',
          expression: () => !this.isNotificationsEnabled,
          action: () => this.toggleNotifications(),
        },
        {
          title: 'Покинуть чат',
          icon: 'group_remove',
          expression: () => this.isCurrentUserInChat,
          action: () => this.leaveChat(),
          isConfirm: true,
          confirmOptions: {
            message: 'Вы действительно хотите покинуть чат?',
          },
        },
      ];
    },
    indexedUsers() {
      const result = {};

      for (const user of this.users) {
        user.isMember = !!this.indexedMembers[user.id];
        result[user.id] = user;
      }

      return result;
    },
    indexedMembers() {
      const result = {};

      for (const member of this.members) {
        member.contextOptions = getMemberContextOptions(this, member);
        result[member.id] = member;
      }
      return result;
    },
    isCurrentUserInChat() {
      return Object.hasOwn(this.indexedMembers, this.currentUser.id);
    },
    isNotificationsEnabled() {
      return this.indexedMembers[this.currentUser.id].isNotifications;
    },
    isStartedAction() {
      return !!this.replyingMessage || !!this.editingMessage ||
          !!this.getSelectedMessages.size;
    },
    groupedFiles() {
      const result = {};
      const images = ['png', 'jpg'];
      const videos = ['mp4', 'webp'];

      for (const file of Object.values(this.files)) {
        const message = this.indexedMessages[file.messageId];
        if (message) {
          const extension = file.path.split('.').pop();
          file.message = message;
          if (!result[message.date]?.all) {
            result[message.date] = {};
            result[message.date]['all'] = {};
            result[message.date]['videos'] = {};
            result[message.date]['images'] = {};
          }

          if (videos.includes(extension)) {
            result[message.date]['videos'][file.id] = file;
          } else if (images.includes(extension)) {
            result[message.date]['images'][file.id] = file;
          }

          file.contextOptions = getFileContextOptions(this, file);

          result[message.date]['all'][file.id] = file;
        }
      }
      return result;
    },
    filesCount() {
      const result = {
        all: 0,
        images: 0,
        videos: 0,
      };

      for (const files of Object.values(this.groupedFiles)) {
        result.all += Object.values(files.all).length;
        result.images += Object.values(files.images).length;
        result.videos += Object.values(files.videos).length;
      }

      return result;
    },
    selectedFilesCount() {
      return this.selectedFiles.size;
    },
    isSelectedFiles() {
      return !!this.selectedFilesCount;
    },
    isOwnFilesSelected() {
      if (!this.isSelectedFiles) {
        return false;
      }

      for (const file of this.selectedFiles.values()) {
        if (file.message.name !== 'me') {
          return false;
        }
      }

      return true;
    },
    isMessageFiles() {
      return !!this.messageFilesCount;
    },
    messageFilesCount() {
      return this.messageFiles?.length;
    },
    formattedMessageFiles() {
      if (!this.messageFiles) {
        return [];
      }

      const result = [];
      this.messageFiles.forEach(file => {
        file.sizeString = bytesToSize(file.size);
        result.push(file);
      });

      return result;
    },
  },

  actions: {
    selectMessage(message) {
      this.selectedMessages.set(message.id, message);
      const messageElement = getMessageElementById(message.id);
      messageElement.classList.add('chat__message--selected');
      message.$el = messageElement;
      message.selected = true;
    },
    unselectMessage(message) {
      this.selectedMessages.delete(message.id);
      message.$el?.classList.remove('chat__message--selected');
    },
    clearMessageSelection() {
      for (const message of this.selectedMessages.values()) {
        message.$el.classList.remove('chat__message--selected');
      }
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

      if (message.files?.length) {
        message.files.forEach(this.deleteFile);
      }
    },
    deleteSelectedMessages() {
      for (const message of this.selectedMessages.values()) {
        this.deleteMessage(message);
      }

      this.clearMessageSelection();
    },
    sendMessage() {
      if (!this.isCurrentUserInChat) {
        this.returnToChat();
      }

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

      if (this.messageFiles.length) {
        newMessage.files = [];
        this.messageFiles.forEach(file => newMessage.files.push({
          id: Date.now(),
          name: file.name,
          path: 'http://axiomabio.com/pdf/test.pdf',
        }));

        this.clearMessageFiles();
      }

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
      this.messageText = '';
    },
    leaveChat() {
      this.stopAllActions();
      this.members = this.members.filter(
          member => member.id !== this.currentUser.id);

      const currentDate = getCurrentDate();
      if (!Array.isArray(this.messages[currentDate])) {
        this.messages[currentDate] = [];
      }

      this.messages[currentDate].push({
        type: 'info',
        userId: this.currentUser.id,
        text: `Пользователь ${this.currentUser.fullName} покинул чат`,
      });
    },
    returnToChat() {
      this.members.push(this.currentUser);

      const currentDate = getCurrentDate();
      if (!Array.isArray(this.messages[currentDate])) {
        this.messages[currentDate] = [];
      }

      this.messages[currentDate].push({
        type: 'info',
        userId: this.currentUser.id,
        text: `Пользователь ${this.currentUser.fullName} вернулся в чат`,
      });
    },
    toggleNotifications() {
      const isNotifications = this.indexedMembers[this.currentUser.id].isNotifications;
      this.indexedMembers[this.currentUser.id].isNotifications = !isNotifications;
    },
    addMembers(members = new Map()) {
      const date = getCurrentDate();
      checkDate(this, date);
      for (const member of members.values()) {
        this.members.push(member);

        this.messages[date].push({
          type: 'info',
          text: `${this.currentUser.fullName} добавил пользователя ${member.fullName}`,
        });
      }
    },
    filterUsers() {
      this.users.forEach(user => {
        const fullName = user.fullName.toLowerCase();
        const filterValue = this.memberAddFilter.toLowerCase();
        user.isHidden = fullName.indexOf(filterValue) === -1;
      });
    },
    deleteMember(deleteMember) {
      this.members = this.members.filter(
          member => member.id !== deleteMember.id);
      const date = getCurrentDate();
      checkDate(this, date);
      this.messages[date].push({
        type: 'info',
        text: `${this.currentUser.fullName} исключил пользователя ${deleteMember.fullName}`,
      });
      scrollToBottom(true);
    },
    stopAllActions() {
      if (this.isStartedAction) {
        this.clearMessageSelection();
        this.stopReplyingMessage();
        this.stopEditingMessage();
      }
    },
    selectFile(file) {
      this.selectedFiles.set(file.id, file);
      const $element = getFileElement(file.id);
      $element.classList.add('chat__files__card-list__group-item--selected');
    },
    unselectFile(file) {
      this.selectedFiles.delete(file.id);
      const $element = getFileElement(file.id);
      $element.classList.remove('chat__files__card-list__group-item--selected');
    },
    clearFileSelection() {
      for (const file of this.selectedFiles.values()) {
        this.unselectFile(file);
      }
    },
    deleteSelectedFiles() {
      for (const file of this.selectedFiles.values()) {
        this.deleteMessage(file.message);
      }

      this.clearFileSelection();
    },
    deleteFile(file) {
      delete this.files[file.id];
    },
    addMessageFiles(files) {
      this.messageFiles.push(...files);
    },
    deleteMessageFile(index) {
      this.messageFiles.splice(index, 1);
    },
    clearMessageFiles() {
      this.messageFiles = [];
    },
  },
});

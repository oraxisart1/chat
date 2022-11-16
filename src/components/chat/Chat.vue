<template>
  <div
    class="chat"
    @mouseenter="focusChat"
    @mouseleave="blurChat"
  >
    <template v-if="isCurrentUserInChat">
      <MessagesArea></MessagesArea>

      <MessageForm></MessageForm>

      <div class="chat__settings">
        <q-btn
          icon="more_horiz"
          round
          size="12px"
          class="chat__settings-button_actions"
        >
          <Menu
            :options="settingsOptions"
            :context-menu="false"
            :offset="[0, 5]"
            :touch-position="false"
          ></Menu>
        </q-btn>

        <q-btn
          icon="push_pin"
          round
          size="12px"
          class="chat__settings-button_pinned"
          v-if="isPinnedMessages"
          @click="pinnedButtonHandler"
        >
          <q-menu :offset="[0, 5]" class="chat__replying-messages">
            <q-list
              class="chat__replying-messages-list"
              v-show="pinnedMessagesCount > 1"
            >
              <template v-for="message in getPinnedMessages" :key="message.id">
                <q-item
                  clickable
                  v-close-popup
                  @click="scrollToMessage(message.id, false)"
                >
                  <div class="chat__replying-messages__item">
                    <span class="chat__replying-messages__item-user">{{ message.name }}</span>
                    <span class="chat__replying-messages__item-text ellipsis">{{ message.text }}</span>
                  </div>

                  <Menu :entity="message" :options="message.pinnedContextOptions"></Menu>
                </q-item>
              </template>
            </q-list>
          </q-menu>
        </q-btn>

        <transition name="chat-filter-button">
          <q-btn
            icon="search"
            round
            v-if="isMessages && !isShowFilter"
            size="12px"
            class="chat__settings-button_filter"
            :class="[!!messagesFilter?.trim() ? 'chat__settings-button_filter--active' : '']"
            @click="showFilter"
          >
          </q-btn>
        </transition>

        <transition name="chat-messages-filter">
          <div
            class="chat__settings__filter"
            v-if="isShowFilter"
          >
            <div class="chat__settings__filter-container">

              <q-input
                v-model="messagesFilter"
                dense
                borderless
                input-class="chat__settings__filter-input"
                placeholder="Поиск по сообщениям..."
                @keydown.enter.exact="hideFilter"
                ref="filterInput"
                @blur="hideFilter"
                @keydown.esc.exact="clearFilter"
              ></q-input>
            </div>

            <q-btn
              icon="cancel"
              round
              unelevated
              class="chat__settings__filter-button_clear button__hover--disable"
              @click="clearFilter"
              data-type="button-close-filter"
            ></q-btn>
          </div>
        </transition>
      </div>
    </template>
    <template v-else>
      <div class="chat--leaved">
        <span class="chat--leaved__text" @click="returnToChat">Нажмите, чтобы вернуться в чат</span>
      </div>
    </template>
  </div>

  <q-dialog
    v-model="showMemberDialogAdd"
    no-esc-dismiss
    no-shake
    ref="member-add-dialog"
    @hide="memberAddFilter = ''"
    class="chat__dialog-member--add"
  >
    <q-card class="chat__dialog-member--add__card">
      <span class="chat__dialog-member--add__card-title">Добавить пользователя</span>

      <div class="chat__dialog-member--add__card__filter">

        <q-icon
          name="search"
          color="grey-5"
          size="16px"
          class="chat__dialog-member--add__card__filter-icon"
        ></q-icon>

        <q-input
          v-model="memberAddFilter"
          dense
          borderless
          input-style="color: white"
          ref="member-add-filter"
          placeholder="Поиск по пользователям"
          autofocus
          class="chat__dialog-member--add__card__filter-input"
        ></q-input>

        <q-btn
          icon="clear"
          round
          flat
          size="10px"
          v-if="!!memberAddFilter.trim()"
          color="grey-5"
        ></q-btn>
      </div>

      <q-list class="chat__dialog-member--add__card__list">

        <q-item
          v-for="member in users"
          @click.right.prevent
          class="chat__dialog-member--add__card__list-user"
        >

          <q-item-section
            avatar
            class="chat__dialog-member--add__card__list-user__avatar"
          >
            <q-avatar class="chat__dialog-member--add__card__list-user__avatar-container">
              <q-img
                :src="member.avatar"
                class="chat__dialog-member--add__card__list-user__avatar-image"
              ></q-img>
            </q-avatar>
            <q-icon
              name="check_circle"
              class="chat__dialog-member--add__card__list-user__avatar-icon"
              size="18px"
            ></q-icon>
          </q-item-section>

          <q-item-section class="chat__dialog-member--add__card__list-user__info">
            <span class="chat__dialog-member--add__card__list-user__info-name">{{ member.fullName }}</span>
            <span
              class="chat__dialog-member--add__card__list-user__info-status"
              :class="[member.online === true ? 'chat__dialog-member--add__card__list-user__info-status--active' : '']"
            >{{ member.online === true ? 'online' : 'offline' }}</span>
          </q-item-section>

        </q-item>

      </q-list>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Отменить"
          v-close-popup
          class="dialog-button"
        ></q-btn>
        <q-btn
          flat
          label="Добавить"
          class="dialog-button"
        ></q-btn>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<!--suppress JSValidateTypes -->
<script setup>
import MessagesArea from '/src/components/chat/messages-area/MessagesArea';
import MessageForm from '/src/components/chat/message-form/MessageForm';
import '/src/css/chat/index.scss';
import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';
import {scrollToMessage} from 'components/chat/handlers';
import {nextTick, ref, watch} from 'vue';
import Menu from 'components/chat/menu/Menu';

const store = useChatStore();
const {
  isPinnedMessages,
  pinnedMessagesCount,
  getPinnedMessages,
  isMessages,
  messagesFilter,
  isShowFilter,
  settingsOptions,
  isCurrentUserInChat,
  showMemberDialogAdd,
  memberAddFilter,
  users,
} = storeToRefs(store);
const {returnToChat} = store;
const pinnedMessages = getPinnedMessages.value;
const filterInput = ref();

function pinnedButtonHandler() {
  if (pinnedMessagesCount.value === 1) {
    scrollToMessage(Object.values(pinnedMessages)[0].id);
  }
}

function focusChat() {
  store.$patch({
    chatFocused: true,
  });
}

function blurChat() {
  store.$patch({
    chatFocused: false,
  });
}

function showFilter() {
  store.$patch({
    showFilter: true,
  });
}

function hideFilter(event) {
  const dataset = event.relatedTarget?.dataset;
  if (!dataset || dataset.type !== 'button-close-filter') {
    store.$patch({
      showFilter: false,
    });
  }
}

function focusFilterInput() {
  nextTick(() => {
    filterInput.value.focus();
  });
}

function clearFilter() {
  focusFilterInput();
  const newState = {
    messagesFilter: '',
  };
  if (!messagesFilter.value.trim()) {
    newState.showFilter = false;
  }
  store.$patch(newState);

}

watch(isShowFilter, (newVal) => {
    if (newVal) {
      focusFilterInput();
    }
  },
);
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.chat-messages-filter-leave-active, .chat-messages-filter-enter-active {
  transition: all .1s;
}

.chat-messages-filter-leave-to, .chat-messages-filter-enter-from {
  transform: scaleX(0);
}

.chat-filter-button-leave-active {
  transition: all .1s;
}

.chat-filter-button-enter-active {
  transition: all .4s;
}

.chat-filter-button-leave-to, .chat-filter-button-enter-from {
  opacity: 0;
}
</style>

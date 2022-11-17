<template>
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

<script setup>
import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';
import Menu from 'components/chat/menu/Menu';
import {scrollToMessage} from 'components/chat/handlers';
import {nextTick, ref, watch} from 'vue';

const store = useChatStore();
const filterInput = ref();

const {
  isShowFilter,
  getPinnedMessages,
  pinnedMessagesCount,
  isPinnedMessages,
  settingsOptions,
  isMessages,
  messagesFilter,
} = storeToRefs(store);

function pinnedButtonHandler() {
  if (pinnedMessagesCount.value === 1) {
    scrollToMessage(Object.values(getPinnedMessages.value)[0].id);
  }
}

function hideFilter(event) {
  const dataset = event.relatedTarget?.dataset;
  if (!dataset || dataset.type !== 'button-close-filter') {
    store.$patch({
      showFilter: false,
    });
  }
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

function showFilter() {
  store.$patch({
    showFilter: true,
  });
}

function focusFilterInput() {
  nextTick(() => {
    filterInput.value.focus();
  });
}

watch(isShowFilter, (newVal) => {
      if (newVal) {
        focusFilterInput();
      }
    },
);
</script>

<style scoped>

</style>
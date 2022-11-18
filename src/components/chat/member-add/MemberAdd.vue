<template>
  <q-dialog
      no-esc-dismiss
      no-shake
      ref="dialog"
      @hide="onClose"
      class="chat__member-add"
      @keydown.esc.stop.prevent="escHandler"
      @keydown.enter.exact="addHandler"
  >
    <q-card class="chat__member-add__card">
      <span class="chat__member-add__card-title">Добавить пользователя</span>

      <div class="chat__member-add__card__filter">

        <q-icon
            name="search"
            color="grey-5"
            size="16px"
            class="chat__member-add__card__filter-icon"
        ></q-icon>

        <q-input
            v-model="memberAddFilter"
            dense
            borderless
            input-style="color: white"
            ref="filterInput"
            placeholder="Поиск по пользователям"
            autofocus
            class="chat__member-add__card__filter-input"
            data-type="filter-input"
            @keydown.enter.exact.stop="inputEnterHandler"
        ></q-input>

        <q-btn
            icon="clear"
            round
            flat
            size="10px"
            v-if="!!memberAddFilter.trim()"
            color="grey-5"
            @click="clearFilter"
        ></q-btn>
      </div>

      <q-list
          class="chat__member-add__card__list chat__scrollbar--custom"
          ref="userList"
      >

        <q-item
            v-for="user in indexedUsers"
            @click.right.prevent
            class="chat__member-add__card__list-user"
            :clickable="!user.isMember"
            @click="userSelectHandler(user)"
            :data-user-id="user.id"
            :key="user.id"
            v-show="!user.isHidden"
        >

          <q-item-section
              avatar
              class="chat__member-add__card__list-user__avatar"
          >
            <q-avatar class="chat__member-add__card__list-user__avatar-container">
              <q-img
                  :src="user.avatar"
                  class="chat__member-add__card__list-user__avatar-image"
              ></q-img>
            </q-avatar>
            <q-icon
                name="check_circle"
                class="chat__member-add__card__list-user__avatar-icon"
                size="18px"
                v-show="isUserSelected(user.id) || user.isMember"
            ></q-icon>
          </q-item-section>

          <q-item-section class="chat__member-add__card__list-user__info">
            <span class="chat__member-add__card__list-user__info-name">{{ user.fullName }}</span>
            <span
                class="chat__member-add__card__list-user__info-status"
                :class="[user.online === true ? 'chat__member-add__card__list-user__info-status--active' : '']"
            >{{ user.online === true ? 'online' : 'offline' }}</span>
          </q-item-section>

        </q-item>

      </q-list>

      <q-card-actions align="right" class="chat__member-add__card__buttons">
        <q-btn
            flat
            label="Отменить"
            v-close-popup
            class="dialog-button"
        ></q-btn>
        <q-btn
            flat
            :label="buttonAddLabel"
            class="dialog-button"
            @click="addHandler"
        ></q-btn>
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<!--suppress JSValidateTypes -->
<script setup>
import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';
import {computed, ref, watch} from 'vue';
import {scrollToBottom} from 'components/chat/messages-area/handlers';

const store = useChatStore();

const {memberAddFilter, indexedUsers} = storeToRefs(store);
const {addMembers, filterUsers} = store;

const selectedMembers = ref(new Map());
const userList = ref();
const dialog = ref();
const selectedCount = computed(() => selectedMembers.value.size);
const buttonAddLabel = computed(() => `Добавить ${selectedCount.value ? '(' + selectedCount.value + ')' : ''}`);
const shownUsers = computed(() => Object.values(indexedUsers.value).filter(user => !user.isHidden));

function userSelectHandler(user) {
  if (user.isMember) {
    return;
  }

  isUserSelected(user.id) ? unselectUser(user) : selectUser(user);
}

function selectUser(user) {
  const userElement = getUserElement(user.id);
  selectedMembers.value.set(user.id, user);
  userElement.classList.add('chat__member-add__card__list-user--selected');
}

function unselectUser(user) {
  const userElement = getUserElement(user.id);
  selectedMembers.value.delete(user.id);
  userElement.classList.remove('chat__member-add__card__list-user--selected');
}

function getUserElement(userId) {
  const list = userList.value.$el;
  return list.querySelector(`[data-user-id="${userId}"]`);
}

function isUserSelected(userId) {
  return selectedMembers.value.has(userId);
}

function onClose() {
  clearFilter();
  clearUserSelection();
}

function clearFilter() {
  memberAddFilter.value = '';
}

function clearUserSelection() {
  selectedMembers.value.clear();
}

function isFilter() {
  return !!memberAddFilter.value;
}

function isSelectedUsers() {
  return !!selectedCount.value;
}

function hideDialog() {
  dialog.value.hide();
}

function escHandler() {
  if (isFilter()) {
    return clearFilter();
  }

  if (isSelectedUsers()) {
    return clearUserSelection();
  }

  hideDialog();
}

function addHandler() {
  if (!isSelectedUsers()) {
    return;
  }

  addMembers(selectedMembers.value);
  hideDialog();
  scrollToBottom(true);
}

function inputEnterHandler() {
  const users = shownUsers.value;
  if (users[0]) {
    userSelectHandler(users[0]);
    clearFilter();
  }
}

watch(memberAddFilter, filterUsers);
</script>

<template>
  <q-dialog
      class="chat__member-list"
      @hide="onClose"
      @keydown.esc.exact.stop="escHandler"
      ref="dialog"
  >
    <q-card class="chat__member-list__card">
      <q-card-section class="chat__member-list__card__header">
        <div>
          <q-icon
              name="emoji_people"
              size="20px"
              class="chat__member-list__card__header__icon chat__member-list__card__header__icon_online"
              :class="onlineButtonClasses"
              @click="toggleOnline"
          ></q-icon>
          <q-tooltip>
            <span>{{ onlineButtonTooltip }}</span>
          </q-tooltip>
        </div>

        <span class="chat__member-list__card__header__content">
          Количество пользователей:
          <b class="chat__member-list__card__header__content-count">{{ Object.values(indexedMembers).length }}</b>
        </span>

        <q-icon
            name="person_add"
            size="20px"
            class="chat__member-list__card__header__icon chat__member-list__card__header__icon_add"
            @click="openDialogAdd"
        >
        </q-icon>
      </q-card-section>

      <q-card-section class="chat__member-list__card__filter">
        <q-input
            v-model="memberListFilter"
            dense
            borderless
            placeholder="Поиск по пользователям"
            class="chat__member-list__card__filter-input"
            input-class="chat__member-list__card__filter-input__native"
            autofocus
        ></q-input>

        <q-icon
            name="clear"
            class="chat__member-list__card__filter-icon_clear"
            v-show="isFilter"
            @click="clearFilter"
        ></q-icon>
      </q-card-section>

      <q-list
          class="chat__member-list__card__list chat__scrollbar--custom"
          ref="userList"
      >

        <q-item
            v-for="member in indexedMembers"
            class="chat__member-list__card__list-user"
            clickable
            :data-member-id="member.id"
            :key="member.id"
            v-show="!isMemberHidden(member.id)"
            @click="openUserProfile(member.fullName)"
        >

          <q-item-section
              avatar
              class="chat__member-list__card__list-user__avatar"
          >
            <q-avatar class="chat__member-list__card__list-user__avatar-container">
              <q-img
                  :src="member.avatar"
                  class="chat__member-list__card__list-user__avatar-image"
              ></q-img>
            </q-avatar>
          </q-item-section>

          <q-item-section class="chat__member-list__card__list-user__info">
            <span class="chat__member-list__card__list-user__info-name">{{ member.fullName }}</span>
            <span
                class="chat__member-list__card__list-user__info-status"
                :class="[member.online === true ? 'chat__member-list__card__list-user__info-status--active' : '']"
            >{{ member.online === true ? 'online' : 'offline' }}</span>
          </q-item-section>

          <Menu :options="member.contextOptions" :entity="member"></Menu>
        </q-item>

      </q-list>

    </q-card>
  </q-dialog>
</template>

<script setup>
import {useChatStore} from 'stores/chat/chat';
import {storeToRefs} from 'pinia';
import {computed, ref} from 'vue';
import Menu from 'components/chat/menu/Menu';
import {openUserProfile} from 'components/chat/handlers';

const store = useChatStore();
const {indexedMembers, memberListFilter} = storeToRefs(store);

const isShowOnline = ref(false);
const onlineButtonTooltip = computed(() => isShowOnline.value
    ? 'Показать всех пользователей'
    : 'Показать пользователей онлайн',
);
const onlineButtonClasses = computed(() => {
  const classes = [];

  if (isShowOnline.value) {
    classes.push('chat__member-list__card__header__icon_online--active');
  }

  return classes;
});
const isFilter = computed(() => !!memberListFilter.value);
const dialog = ref();

const hiddenMembersIds = computed(() => {
  const result = [];
  Object.values(indexedMembers.value).forEach((member) => {
    if (isShowOnline.value && !member.online) {
      result.push(member.id);
    }

    if (member.fullName.toLowerCase().indexOf(memberListFilter.value.toLowerCase()) === -1) {
      result.push(member.id);
    }
  });

  return result;
});

function isMemberHidden(memberId) {
  return hiddenMembersIds.value.includes(memberId);
}

function toggleOnline() {
  isShowOnline.value = !isShowOnline.value;
}

function disableOnlineFilter() {
  isShowOnline.value = false;
}

function openDialogAdd() {
  store.$patch({
    showMemberDialogAdd: true,
  });
}

function clearFilter() {
  memberListFilter.value = '';
}

function onClose() {
  clearFilter();
  disableOnlineFilter();
}

function closeDialog() {
  dialog.value.hide();
}

function escHandler() {
  if (isFilter.value) {
    return clearFilter();
  }

  closeDialog();
}
</script>

<style scoped>

</style>
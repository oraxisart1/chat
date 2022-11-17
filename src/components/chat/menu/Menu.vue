<template>
  <q-menu
    :context-menu="contextMenu"
    :touch-position="touchPosition"
    auto-close
    class="chat__menu"
    :offset="offset"
  >
    <q-list class="chat__menu-list">
      <template v-for="option in filteredOptions">
        <q-item
          clickable
          @click="processAction(option)"
          class="chat__menu-list__item"
        >
          <slot name="item">
            <q-item-section avatar v-if="option.icon">
              <slot name="avatar">
                <q-icon :name="option.icon" size="20px" class="chat__menu-list__item-avatar"></q-icon>
              </slot>
            </q-item-section>
            <q-item-section class="chat__menu-list__item-content">
              <slot name="item-content">
                <span>{{ option.title }}</span>
              </slot>
            </q-item-section>
          </slot>
        </q-item>

        <slot name="item-context"></slot>
      </template>
    </q-list>
  </q-menu>
  <ConfirmDialog ref="dialog"></ConfirmDialog>
</template>

<script setup>
import {computed, ref} from 'vue';
import ConfirmDialog from 'components/chat/confirm-dialog/ConfirmDialog';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  entity: {
    type: Object,
    default: () => ({}),
  },
  contextMenu: {
    type: Boolean,
    default: true,
  },
  offset: {},
  touchPosition: {
    type: Boolean,
    default: true,
  },
});


const dialog = ref();
const filteredOptions = computed(() => {
  return props.options.filter(option => option.expression?.(props.entity) ?? true);
});

function processAction(option) {
  if (option.isConfirm) {
    dialog.value.show(option.confirmOptions).then(() => {
      option.action(props.entity);
    }).catch(() => {
    });

    return;
  }

  option.action(props.entity);
}
</script>

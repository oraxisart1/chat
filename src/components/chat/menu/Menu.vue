<template>
  <q-menu
    :context-menu="contextMenu"
    :touch-position="touchPosition"
    auto-close
    class="context__menu"
    :offset="offset"
  >
    <q-list class="context__list">
      <template v-for="option in filteredOptions">
        <q-item
          clickable
          @click="processAction(option)"
          class="context__item"
        >
          <slot name="item">
            <q-item-section avatar v-if="option.icon">
              <q-icon :name="option.icon" size="20px" class="context__item-icon"></q-icon>
            </q-item-section>
            <q-item-section class="context__item-title">
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
import {computed, ref, defineExpose} from 'vue';
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

<style scoped>

</style>

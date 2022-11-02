<template>
  <q-menu
    context-menu
    touch-position
    auto-close
    class="context__menu"
  >
    <q-list class="context__list">
      <template v-for="option in filteredOptions">
        <q-item
          clickable
          @click="processAction(option)"
          class="context__item"
        >
          <q-item-section avatar>
            <q-icon :name="option.icon" size="20px" class="context__item-icon"></q-icon>
          </q-item-section>
          <q-item-section class="context__item-title">
            <span>{{ option.title }}</span>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-menu>
  <ConfirmDialog ref="dialog"></ConfirmDialog>
</template>

<script setup>
import {computed, ref, defineExpose} from "vue";
import ConfirmDialog from "components/chat/confirm-dialog/ConfirmDialog"

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  entity: {
    type: Object,
    required: true,
  }
})

const dialog = ref()

// DEBUG
const c = computed(() => console)

const filteredOptions = computed(() => {
  return props.options.filter(option => option.expression(props.entity))
})

function processAction(option) {
  if (option.isConfirm) {
    dialog.value.show(option.confirmOptions)
      .then(() => {
        option.action(props.entity)
      })
      .catch(() => {
      })

    return;
  }

  option.action(props.entity)
}
</script>

<style scoped>

</style>

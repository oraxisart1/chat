<template>
  <q-dialog v-model="isShow" class="chat__confirm-dialog">
    <q-card class="chat__confirm-dialog__card">
      <q-card-section class="row items-center">
        <span class="q-ml-sm">{{ options.message ?? 'Вы уверены?' }}</span>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          :label="options.cancelButton ?? 'Отменить'"
          @click="cancel"
          v-close-popup
        ></q-btn>
        <q-btn
          flat
          :label="options.confirmButton ?? 'Подтвердить'"
          @click="confirm"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {defineExpose, ref} from "vue";
defineExpose({show})

const isShow = ref(false)

function open() {
  isShow.value = true;
}

function close() {
  isShow.value = false;
}

const resolveLink = ref(null);
const rejectLink = ref(null);
const options = ref({})

function show(opts = {}) {
  open();
  options.value = opts;
  return new Promise((resolve, reject) => {
    resolveLink.value = resolve;
    rejectLink.value = reject;
  })
}

function confirm() {
  close();
  resolveLink.value();
}

function cancel() {
  close();
  rejectLink.value();
}
</script>

<style scoped>

</style>

<template>
  <div class="row">
    <div class="col-6">
      <q-page class="flex flex-center">
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-vertical.svg"
          style="width: 200px; height: 200px"
        >
      </q-page>
    </div>

    <div class="col-6">
      <Chat></Chat>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import Chat from '/src/components/chat/Chat'

export default defineComponent({
  name: 'IndexPage',
  components: {
    Chat
  }
})
</script>

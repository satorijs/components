<template>
  <div class="textarea">
    <input
      autocomplete="off"
      step="any"
      :value="text"
      @input="onInput"
      @paste="onPaste"
      @keydown.enter.stop="onEnter"
    />
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import segment from '@koishijs/segment'

const emit = defineEmits(['send'])

const text = ref('')

function onEnter() {
  if (!text.value) return
  emit('send', text.value)
  text.value = ''
}

function onInput(event: Event) {
  text.value = (event.target as HTMLInputElement).value
}

async function onPaste(event: ClipboardEvent) {
  const item = event.clipboardData.items[0]
  if (item.kind === 'file') {
    event.preventDefault()
    const file = item.getAsFile()
    const reader  = new FileReader()
    reader.addEventListener('load', function () {
      emit('send', segment.image('base64://' + reader.result.slice(22)))
    }, false)
    reader.readAsDataURL(file)
  }
}

</script>

<style lang="scss" scoped>

input {
  padding: 0;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1em;
  height: inherit;
  color: inherit;
  display: inline-block;
  transition: 0.3s ease;
  box-sizing: border-box;
  background-color: transparent;
}

</style>

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
    const [type] = file.type.split('/', 1)
    if (!['image', 'audio', 'video'].includes(type)) {
      console.warn('Unsupported file type:', file.type)
      return
    }

    const reader  = new FileReader()
    reader.addEventListener('load', function () {
      emit('send', segment(type, {
        url: 'base64://' + reader.result.slice(22),
      }))
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

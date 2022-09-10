<template>
  <div class="message-content">
    <template v-for="({ type, attrs }) in segment.parse(content)">
      <span v-if="type === 'text'">{{ attrs.content }}</span>
      <slot v-else-if="type === 'at'" name="at" v-bind="attrs">
        <span>@{{ attrs.name }}</span>
      </slot>
      <slot v-else-if="type === 'image'" name="image" v-bind="attrs">
        <img :src="attrs.url">
      </slot>
      <slot v-else-if="type === 'audio'" name="audio" v-bind="attrs">
        <audio :src="attrs.url" controls></audio>
      </slot>
      <slot v-else-if="type === 'video'" name="video" v-bind="attrs">
        <video :src="attrs.url" controls></video>
      </slot>
      <slot v-else v-bind="attrs"></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>

import segment from '@satorijs/element'

defineProps<{
  content: string
}>()

</script>

<style lang="scss" scoped>

.message-content {
  white-space: break-spaces;
  line-height: 1.5;
  position: relative;

  :deep(img), :deep(audio), :deep(video) {
    display: block;
    max-height: 320px;
    max-width: 100%;
  }
}

</style>

<template>
  <div class="message-content">
    <template v-for="({ type, data }) in segment.parse(content)">
      <span v-if="type === 'text'">{{ data.content }}</span>
      <slot v-else-if="type === 'at'" name="at" v-bind="data">
        <span>@{{ data.name }}</span>
      </slot>
      <slot v-else-if="type === 'image'" name="image" v-bind="data">
        <img :src="data.url">
      </slot>
      <slot v-else v-bind="data"></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>

import segment from '@koishijs/segment'

defineProps<{
  content: string
}>()

</script>

<style lang="scss" scoped>

.message-content {
  white-space: break-spaces;
  line-height: 1.5;
  position: relative;

  img {
    max-height: 320px;
    max-width: 100%;
  }
}

</style>

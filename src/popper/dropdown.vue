<template>
  <Popper :placement="placement" :offset="offset" :arrow="true" transition="fade" :active="active">
    <template #default>
      <div class="dropdown-trigger" @click="active = !active">
        <slot name="default"></slot>
      </div>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
  </Popper>
</template>

<script lang="ts" setup>

import Popper from './popper.vue'
import { Placement } from '@popperjs/core'
import { ref } from 'vue'

defineProps<{
  placement?: Placement
  offset?: number
  tooltip?: string
}>()

const active = ref(false)

</script>

<style lang="scss" scoped>

</style>

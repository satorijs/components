<template>
  <Popper ref="root" :placement="placement" :offset="offset" :arrow="true" transition="fade" :active="active" @show="onShow">
    <template #default>
      <div class="tooltip-trigger"><slot name="default"></slot></div>
    </template>
    <template #content>
      <slot name="content">{{ content }}</slot>
    </template>
  </Popper>
</template>

<script lang="ts" setup>

import Popper from './popper.vue'
import { Placement } from '@popperjs/core'
import { onMounted, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = defineProps<{
  placement?: Placement
  content?: string
  offset?: number
  disable?: boolean
}>()

const active = ref(false)
const root = ref<any>(null)

watch(() => props.disable, (value) => {
  if (value) active.value = false
})

const showEvents = ['mouseenter', 'focus']
const hideEvents = ['mouseleave', 'blur']

let timer: number

onMounted(() => {
  registerEvents(root.value.trigger)
})

function show() {
  if (props.disable) return
  window.clearTimeout(timer)
  active.value = true
}

function hide() {
  timer = window.setTimeout(() => {
    active.value = false
  }, 300)
}

function registerEvents(el: HTMLElement) {
  for (const event of hideEvents) {
    useEventListener(el, event, hide)
  }
  for (const event of showEvents) {
    useEventListener(el, event, show)
  }
}

function onShow(el: HTMLElement) {
  registerEvents(el)
}

</script>

<style lang="scss" scoped>

</style>

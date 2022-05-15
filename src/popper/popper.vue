<template>
  <div ref="trigger">
    <slot></slot>
  </div>
  <teleport :to="target">
    <transition :name="transition">
      <div class="popper" v-if="active && $slots.content" ref="popper">
        <slot name="content"></slot>
        <div v-if="arrow" class="arrow"></div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>

import { createPopper, Placement } from '@popperjs/core'
import { inject, ref, watch } from 'vue'
import { injections } from './shared'

const props = defineProps<{
  placement?: Placement
  offset?: number
  arrow?: boolean
  active?: boolean
  transition?: string
}>()

const emit = defineEmits(['show', 'hide'])

const trigger = ref<HTMLElement>(null)
const popper = ref<HTMLElement>(null)

const target = inject(injections.teleport, 'body')
const placement = inject(injections.placement)

watch(popper, (el) => {
  emit(el ? 'show' : 'hide', el)
  if (!el) return
  const instance = createPopper(trigger.value, el, {
    placement: props.placement ?? placement,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, props.offset ?? 12],
      },
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 8,
          bottom: 8,
          left: 8,
          right: 8,
        },
      },
    }, {
      name: 'arrow',
      options: {
        element: '.arrow',
      },
    }],
  })
  instance.update()
})

defineExpose({
  trigger,
  popper,
})

</script>

<style lang="scss" scoped>

.popper {
  z-index: 10;
  user-select: none;
  background-color: var(--background-floating);
  box-shadow: var(--elevation-high);
  padding: 0.375rem 0.5rem;
  border-radius: 6px;
  transition: opacity .3s ease;
}

.popper[data-popper-placement^="right"] > .arrow {
  left: -4px;
}
.popper[data-popper-placement^="left"] > .arrow {
  right: -4px;
}
.popper[data-popper-placement^="top"] > .arrow {
  bottom: -4px;
}
.popper[data-popper-placement^="bottom"] > .arrow {
  top: -4px;
}

.arrow {
  width: 10px;
  height: 10px;
  z-index: -1;

  &::before {
    display: block;
    transition: transform 0.2s ease-out 0s, visibility 0.2s ease-out 0s;
    visibility: visible;
    transform: translateX(0px) rotate(45deg);
    transform-origin: center center;
    content: '';
    background: var(--background-floating);
    top: 0px;
    left: 0px;
    width: 10px;
    height: 10px;
  }
}

</style>

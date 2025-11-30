<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: 'w-80',
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },

  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },

  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    toggle() {
      this.isOpen = !this.isOpen
    },

    handleOutsideClick(e: MouseEvent) {
      const root = this.$refs.root as HTMLElement | undefined
      if (!root) return

      if (!root.contains(e.target as Node)) {
        this.isOpen = false
      }
    },
  },
})
</script>

<template>
  <div class="relative inline-block" ref="root">
    <div @click.stop="toggle">
      <slot name="trigger" :is-open="isOpen" :open="open" :close="close" :toggle="toggle"></slot>
    </div>

    <div v-show="isOpen" :class="[width, 'absolute z-[9999] mt-2 right-0']" @click.stop>
      <div
        class="bg-white border border-[#E1EAF3] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <slot :close="close"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Popover } from 'primevue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Popover },
  data() {
    return {
      popoverRef: null as InstanceType<typeof Popover> | null,
      isOpen: false,
    }
  },
  mounted() {
    this.popoverRef = this.$refs.op as InstanceType<typeof Popover>
  },
  methods: {
    toggle(e: MouseEvent) {
      this.popoverRef?.toggle(e)
      this.isOpen = !this.isOpen
    },
    show(e: MouseEvent) {
      this.popoverRef?.show(e)
      this.isOpen = true
    },
    hide() {
      this.popoverRef?.hide()
      this.isOpen = false
    },
    handleHide() {
      this.isOpen = false
    },
  },
})
</script>

<template>
  <div class="card flex justify-center">
    <slot name="trigger" :isOpen="isOpen" :open="show" :close="hide" :toggle="toggle"></slot>

    <Popover
      :visible="isOpen"
      :arrow="false"
      :show-arrow="false"
      @hide="handleHide"
      ref="op"
      class="no-scrollbar"
      :pt="{
        root: { style: { '&::before, &::after': { display: 'none !important' } } },
      }"
    >
      <slot :close="hide"></slot>
    </Popover>
  </div>
</template>

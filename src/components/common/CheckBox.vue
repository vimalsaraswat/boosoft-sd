<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
  },

  emits: ['update:modelValue'],

  methods: {
    onChange(e: Event) {
      const target = e.target as HTMLInputElement
      this.$emit('update:modelValue', target.checked)
    },
  },
})
</script>

<template>
  <input
    @click.stop
    type="checkbox"
    class="size-[18px]! rounded-sm cursor-pointer border-[#E1EAF3] mt-1"
    :checked="modelValue"
    @change="onChange"
  />
</template>

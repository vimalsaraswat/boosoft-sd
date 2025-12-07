<script lang="ts">
import { defineComponent } from 'vue'
import DropdownSelector from '@/components/common/DropdownSelector.vue'

export default defineComponent({
  components: {
    DropdownSelector,
  },

  data() {
    return { pages: [5, 10, 20, 50] }
  },

  props: {
    page: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    total: { type: Number, required: true },
    isLoading: { type: Boolean, default: false },
  },

  emits: ['update:pageSize', 'update:page'],

  computed: {
    hasNextPage() {
      return this.page * this.pageSize < this.total
    },
    hasPrevPage() {
      return this.page > 1
    },
    rangeLabel() {
      if (this.total === 0) return '0-0 of 0'
      const start = (this.page - 1) * this.pageSize + 1
      const end = Math.min(this.page * this.pageSize, this.total)
      return `${start}-${end} of ${this.total}`
    },
  },

  methods: {
    onPageSizeChange(val: string) {
      const value = Number(val) || 20
      this.$emit('update:pageSize', value)
    },
    goToPrevPage() {
      if (!this.hasPrevPage || this.isLoading) return
      this.$emit('update:page', this.page - 1)
    },
    goToNextPage() {
      if (!this.hasNextPage || this.isLoading) return
      this.$emit('update:page', this.page + 1)
    },
  },
})
</script>

<template>
  <div class="flex justify-between items-center pt-4 border-t-2 border-[#EAF0F9]">
    <DropdownSelector
      :items="pages.map((item) => ({ id: String(item), label: String(item) }))"
      :model-value="String(pageSize)"
      v-on:update:model-value="onPageSizeChange"
    />

    <div class="flex items-center text-sm text-[#5F6368]">
      <span>{{ rangeLabel }}</span>
      <div class="flex ml-4">
        <button
          class="p-2 hover:bg-gray-200 rounded-md disabled:opacity-50"
          @click="goToPrevPage"
          :disabled="!hasPrevPage || isLoading"
        >
          <img src="@/assets/icons/chevron-down.svg" width="14" height="14" class="rotate-90" />
        </button>
        <button
          class="p-2 hover:bg-gray-200 rounded-md disabled:opacity-50"
          @click="goToNextPage"
          :disabled="!hasNextPage || isLoading"
        >
          <img src="@/assets/icons/chevron-down.svg" width="14" height="14" class="-rotate-90" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopoverWrapper from './PopoverWrapper.vue'

interface Item {
  id: string
  label: string
}

export default defineComponent({
  components: {
    PopoverWrapper,
  },
  props: {
    items: {
      type: Array<Item>,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Select an option',
    },
  },

  emits: {
    'update:modelValue': (id: string) => true,
  },

  computed: {
    selectedLabel(): string {
      if (!this.modelValue) return this.placeholder

      const selected = this.items.find((item) => item.id === this.modelValue)
      return selected ? selected.label : this.placeholder
    },
  },

  methods: {
    select(item: Item) {
      this.$emit('update:modelValue', item.id)
    },
  },
})
</script>

<template>
  <PopoverWrapper>
    <template #trigger="{ toggle, isOpen }">
      <button
        @click="toggle"
        class="cursor-pointer px-3 py-2 flex items-center gap-[10px] rounded-md border border-[#E1EAF3]"
      >
        <span class="font-medium text-[#5F6368]">
          {{ selectedLabel }}
        </span>
        <img
          src="@/assets/icons/dropdown-icon.svg"
          :class="[isOpen && 'rotate-180', 'transition-transform duration-150']"
        />
      </button>
    </template>

    <template #default="{ close }">
      <ul class="min-w-28 space-y-1 p-1 bg-white rounded-md border border-[#E1EAF3]">
        <li
          v-for="item in items"
          class="text-[#5F6368] text-xs rounded-lg px-2 py-1 cursor-pointer hover:bg-[#ecf1f876]"
          :class="{ 'bg-[#ECF1F8]': item.id === modelValue }"
          :key="item.id"
          @click="
            () => {
              select(item)
              close()
            }
          "
        >
          {{ item.label }}
        </li>
      </ul>
    </template>
  </PopoverWrapper>
</template>

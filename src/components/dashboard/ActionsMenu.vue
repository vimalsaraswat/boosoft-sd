<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import PopoverWrapper from '../common/PopoverWrapper.vue'
import { UserMenuItems } from '@/constants'
import { UserStatus } from '@/types/user'

export default defineComponent({
  components: {
    PopoverWrapper,
  },

  props: {
    variant: {
      type: String as PropType<UserStatus>,
      required: true,
    },
  },

  emits: ['select'],

  computed: {
    items() {
      if (this.variant === UserStatus.Pending) {
        return [UserMenuItems.approve, UserMenuItems.reject]
      }

      return [
        UserMenuItems.view,
        UserMenuItems.edit,
        this.variant === UserStatus.Active ? UserMenuItems.deactivate : UserMenuItems.activate,
      ]
    },
  },

  methods: {
    select(id: string) {
      console.log('items', this.items)
      this.$emit('select', id)
    },
  },
})
</script>

<template>
  <PopoverWrapper>
    <template #trigger="{ toggle }">
      <button
        @click="toggle"
        class="flex items-center cursor-pointer justify-center size-7 rounded-full bg-[#ECF1F8] text-[#5F6368] font-medium text-sm hover:bg-[#e1eaf3]"
      >
        <img
          src="@/assets/icons/dots-horizontal.svg"
          alt="Avatar"
          class="w-full h-full rounded-full object-cover"
        />
      </button>
    </template>

    <template #default>
      <div
        class="w-56 bg-white border-[1.5px] space-y-1 border-[#E1EAF3] rounded-lg p-1 shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <template v-for="(it, idx) in items" :key="idx">
          <div v-if="idx === items?.length - 1" class="border-t border-[#E1EAF3]"></div>

          <button
            @click="select(it.id)"
            class="w-full text-[#5F6368] flex items-center gap-3 p-3 hover:bg-gray-50 focus:bg-gray-50"
            type="button"
          >
            <img v-if="it.icon" :src="it.icon" class="size-4" />
            <span :style="{ color: it.accent }">
              {{ it.label }}
            </span>
          </button>
        </template>
      </div>
    </template>
  </PopoverWrapper>
</template>

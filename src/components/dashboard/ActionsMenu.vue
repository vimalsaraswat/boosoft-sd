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
      this.$emit('select', id)
    },
  },
})
</script>

<template>
  <PopoverWrapper width="w-80">
    <template #trigger>
      <button
        class="flex items-center cursor-pointer justify-center size-10 rounded-full bg-[#ECF1F8] text-[#5F6368] font-medium text-sm hover:ring-4 hover:ring-blue-100 focus:outline-none"
      >
        <img
          src="@/assets/icons/dots-horizontal.svg"
          alt="Avatar"
          class="w-full h-full rounded-full object-cover"
        />
      </button>
    </template>

    <template>
      <div class="w-full">
        <div class="bg-white border border-[#E1EAF3] rounded-xl overflow-hidden shadow-sm">
          <div class="divide-y divide-gray-100">
            <template v-for="(it, idx) in items" :key="idx">
              <div v-if="idx === items?.length - 1" class="border-t my-2 border-gray-200"></div>

              <button
                @click="select(it.id)"
                class="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                :aria-label="it.label"
                type="button"
              >
                <span :class="it.destructive ? 'text-red-600 font-medium' : 'text-gray-700'">
                  {{ it.label }}
                </span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </template>
  </PopoverWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopoverWrapper from '@/components/common/PopoverWrapper.vue'
import { getInitials } from '@/lib/utils'

export default defineComponent({
  components: {
    PopoverWrapper,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
  },

  emits: {
    signout: () => true,
  },

  computed: {
    initials() {
      return getInitials(this.name)
    },
  },
})
</script>

<template>
  <PopoverWrapper>
    <template #trigger="{ toggle }">
      <button
        @click="toggle"
        class="flex cursor-pointer items-center justify-center size-10 rounded-full bg-[#ECF1F8] text-[#5F6368] font-medium text-sm hover:ring-4 hover:ring-blue-100 focus:outline-none"
      >
        <img
          v-if="avatar"
          :src="avatar"
          alt="Avatar"
          class="w-full h-full rounded-full object-cover"
        />
        <span v-else>{{ initials }}</span>
      </button>
    </template>

    <template #default="{ close }">
      <div
        class="w-80 bg-white border border-[#E1EAF3] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <div class="p-6">
          <div class="flex flex-col items-center gap-4">
            <div
              class="size-16 bg-[#ECF1F8] rounded-full overflow-hidden flex items-center justify-center"
            >
              <img v-if="avatar" :src="avatar" alt="Avatar" class="w-full h-full object-cover" />
              <img v-else src="@/assets/icons/user.svg" class="size-8 text-[#5F6368]" />
            </div>

            <div class="text-center">
              <p class="font-bold text-[#5F6368]">{{ name }}</p>
              <p class="text-sm text-[#5F6368] mt-1">{{ email }}</p>
            </div>
          </div>
        </div>

        <div class="border-t border-[#E1EAF3]">
          <button
            @click="
              () => {
                $emit('signout')
                close()
              }
            "
            class="w-full flex items-center justify-center gap-3 py-4 text-[#5F6368] font-semibold hover:bg-gray-50"
          >
            <img src="@/assets/icons/logout.svg" alt="Logout" class="size-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </template>
  </PopoverWrapper>
</template>

<script lang="ts">
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import UsersTable from '@/components/dashboard/UsersTable.vue'
import { userService } from '@/services'
import type { User } from '@/types/user'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { UsersTable, DashboardHeader },
  data(): {
    allUsers: User[]
    isLoading: boolean
    error: string | null
    query: string
  } {
    return {
      allUsers: [],
      isLoading: false,
      error: null,
      query: '',
    }
  },
  computed: {
    users() {
      return this.allUsers?.filter((user) => user.name.includes(this.query))
    },
  },
  async mounted() {
    await this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.error = null
      this.isLoading = true
      try {
        const res = await userService.getUsers()
        this.allUsers = res
      } catch (err) {
        console.error('Error fetching users: ', err)
        this.error = 'Error fetching users!'
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>

<template>
  <div class="min-h-screen">
    <DashboardHeader />

    <div class="p-8 space-y-[9px]">
      <div class="">
        <h1 class="font-medium text-[#5F6368]">Manage Users</h1>
        <div class="border-b border-[#EAF0F9]">
          <nav class="-mb-px flex space-x-8">
            <a
              href="#"
              class="whitespace-nowrap py-4 px-1 border-b-2 border-[#4285F4] font-medium text-sm text-[#4285F4]"
            >
              All Users
            </a>
          </nav>
        </div>
      </div>

      <div
        class="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start justify-between items-center mb-4"
      >
        <div class="relative sm:w-1/3">
          <input
            type="text"
            placeholder="Search here..."
            v-model="query"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src="@/assets/icons/search.svg" width="20" />
          </div>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">
            / K
          </div>
        </div>
        <div class="flex max-sm:gap-2 max-sm:flex-wrap space-x-4 text-xs text-[#5F6368]">
          <select class="border border-[#E1EAF3] rounded-md px-4 py-2">
            <option>Country</option>
          </select>
          <select class="border border-[#E1EAF3] rounded-md px-4 py-2">
            <option>Department</option>
          </select>
          <select class="border border-[#E1EAF3] rounded-md px-4 py-2">
            <option>Roles</option>
          </select>
          <select class="border border-[#E1EAF3] rounded-md px-4 py-2">
            <option>Status</option>
          </select>
        </div>
      </div>

      <UsersTable :users="users" />

      <div class="flex justify-between items-center pt-4 border-t-2 border-[#EAF0F9]">
        <div class="flex items-center">
          <select class="border border-[#EAF0F9] rounded-md p-2 text-sm">
            <option>20</option>
          </select>
          <span class="ml-3 text-sm text-[#5F6368]">rows per page</span>
        </div>
        <div class="flex items-center text-sm text-[#5F6368]">
          <span>1-7 of 7</span>
          <div class="flex ml-4">
            <button class="p-2 hover:bg-gray-200 rounded-md">
              <img src="@/assets/icons/chevron-down.svg" width="14" height="14" class="rotate-90" />
            </button>
            <button class="p-2 hover:bg-gray-200 rounded-md">
              <img
                src="@/assets/icons/chevron-down.svg"
                width="14"
                height="14"
                class="-rotate-90"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

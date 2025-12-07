<script lang="ts">
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import PaginationFooter from '@/components/dashboard/PaginationFooter.vue'
import SearchAndFilters from '@/components/dashboard/SearchAndFilters.vue'
import UsersTable from '@/components/dashboard/UsersTable.vue'
import { userService } from '@/services'
import type { User, UserStatus } from '@/types/user'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { UsersTable, DashboardHeader, PaginationFooter, SearchAndFilters },
  data() {
    return {
      users: [] as User[],
      isLoading: false,
      error: null as string | null,
      query: '',

      filters: {
        country: '' as string | undefined,
        department: '' as string | undefined,
        role: '' as string | undefined,
        status: '' as UserStatus | '' | undefined,
      },

      page: 1,
      pageSize: 20,
      total: 0,
      searchDebounceTimer: null as number | null,

      selectedIds: [] as number[],
    }
  },

  watch: {
    filters: {
      handler() {
        this.resetToFirstPageAndFetch()
      },
      deep: true,
    },

    pageSize() {
      this.fetchUsers()
    },
    page() {
      this.fetchUsers()
    },

    query() {
      this.debouncedSearch()
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
        const res = await userService.getUsers({
          page: this.page,
          pageSize: this.pageSize,
          search: this.query || undefined,
          country: this.filters.country || undefined,
          department: this.filters.department || undefined,
          role: this.filters.role || undefined,
          status: (this.filters.status as UserStatus | undefined) || undefined,
        })

        this.users = res.items
        this.total = res.total
      } catch (err) {
        console.error('Error fetching users: ', err)
        this.error = 'Something went wrong while fetching users.'
      } finally {
        this.isLoading = false
      }
    },

    resetToFirstPageAndFetch() {
      this.page = 1
      this.fetchUsers()
    },

    debouncedSearch() {
      if (this.searchDebounceTimer) {
        window.clearTimeout(this.searchDebounceTimer)
      }

      this.searchDebounceTimer = window.setTimeout(() => {
        this.page = 1
        this.fetchUsers()
      }, 300)
    },

    async handlePageChange(newPage: number) {
      if (newPage === this.page) return
      this.page = newPage
    },

    async handlePageSizeChange(newPageSize: number) {
      if (newPageSize === this.pageSize) return
      this.pageSize = newPageSize
      this.page = 1
    },
  },
})
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <DashboardHeader />

    <div class="p-8 gap-[9px] flex-1 flex flex-col overflow-hidden">
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

      <SearchAndFilters
        :query="query"
        @update:query="query = $event"
        :selected-country="filters.country"
        @update:selected-country="filters.country = $event"
        :selected-department="filters.department"
        @update:selected-department="filters.department = $event"
        :selected-role="filters.role"
        @update:selected-role="filters.role = $event"
        :selected-status="filters.status"
        @update:selected-status="filters.status = $event"
      />

      <div class="flex-1 overflow-auto">
        <div v-if="error" class="h-full w-full flex items-center justify-center">
          <h3 class="text-sm font-medium text-red-800">Error</h3>
          <p class="mt-1 text-sm text-red-700">{{ error }}</p>
        </div>
        <div v-else-if="isLoading" class="h-full w-full flex items-center justify-center">
          <div
            class="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
          ></div>
        </div>
        <div
          v-else-if="!isLoading && users.length === 0 && !error"
          class="h-full flex items-center justify-center text-center"
        >
          <div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">No users found</h3>
            <p class="mt-2 text-sm text-gray-500">
              {{
                query || Object.values(filters).some(Boolean)
                  ? 'Try adjusting your search or filters.'
                  : 'There are no users to display.'
              }}
            </p>
          </div>
        </div>

        <UsersTable
          v-else
          :users="users"
          :selected-ids="selectedIds"
          @update:selected-ids="selectedIds = $event"
        />
      </div>

      <PaginationFooter
        :page="page"
        :page-size="pageSize"
        :total="total"
        :is-loading="isLoading"
        @update:page="handlePageChange"
        @update:pageSize="handlePageSizeChange"
      />
    </div>
  </div>
</template>

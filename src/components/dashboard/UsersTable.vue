<script lang="ts">
import type { User } from '@/types/user'
import { defineComponent } from 'vue'
import UserRow from './UserRow.vue'

export default defineComponent({
  components: {
    UserRow,
  },

  props: {
    users: {
      type: Array as () => User[],
      required: true,
    },
  },

  data() {
    return {
      expandedRow: null as number | null,
    }
  },

  methods: {
    toggleRow(id: number) {
      this.expandedRow = this.expandedRow === id ? null : id
    },

    getRoleClasses(role: string) {
      const map: Record<string, string> = {
        Editor: 'bg-green-50 text-green-700',
        Admin: 'bg-blue-50 text-blue-600',
        Viewer: 'bg-yellow-50 text-yellow-700',
      }
      return map[role] || 'bg-gray-100 text-gray-700'
    },

    getStatusClasses(status: string) {
      const map: Record<string, string> = {
        Active: 'text-green-600',
        Suspended: 'text-red-600',
        Pending: 'text-yellow-600',
      }
      return map[status] || 'text-gray-600'
    },

    hasYellowDot(department: string) {
      return (
        department.includes('Au') ||
        department.includes('Retail') ||
        department.includes('Product') ||
        department.includes('Customer')
      )
    },

    showSummary(entries: User['entries']) {
      return entries.length > 1
    },
  },
})
</script>

<template>
  <div class="rounded-lg border border-[#E1EAF3] max-w-[calc(100vw-64px)] overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-600">
      <thead class="bg-[#ECF1F8] text-[#5F6368] font-medium">
        <tr>
          <th class="w-12 px-4 py-3"></th>
          <th class="px-6 py-4">Name</th>
          <th class="px-6 py-4">Country</th>
          <th class="px-6 py-4">Department</th>
          <th class="px-6 py-4">Roles</th>
          <th class="px-6 py-4">Status</th>
          <th class="px-6 py-4">Created Date</th>
          <th class="px-6 py-4 text-right pr-10">Last Login</th>
          <th class="w-12"></th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <UserRow
          v-for="u in users"
          :key="u.id"
          :user="u"
          :expanded="expandedRow === u.id"
          @toggle="toggleRow"
        />
      </tbody>
    </table>
  </div>
</template>

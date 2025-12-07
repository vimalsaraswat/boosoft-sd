<script lang="ts">
import type { User } from '@/types/user'
import { defineComponent } from 'vue'
import UserRow from './UserRow.vue'
import CheckBox from '@/components/common/CheckBox.vue'

export default defineComponent({
  components: {
    UserRow,
    CheckBox,
  },

  props: {
    users: {
      type: Array as () => User[],
      required: true,
    },
    selectedIds: { type: Array as () => number[], required: true },
  },

  emits: ['update:selectedIds'],

  computed: {
    allSelected(): boolean {
      return this.users.length > 0 && this.users.every((u) => this.selectedIds.includes(u.id))
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

    toggleSelectAll() {
      if (this.allSelected) {
        this.$emit('update:selectedIds', [])
      } else {
        this.$emit(
          'update:selectedIds',
          this.users.map((u) => u.id),
        )
      }
    },

    toggleRowSelection(id: number) {
      const newList = this.selectedIds.includes(id)
        ? this.selectedIds.filter((x) => x !== id)
        : [...this.selectedIds, id]

      this.$emit('update:selectedIds', newList)
    },
  },
})
</script>

<template>
  <div class="rounded-lg border p-[2px] border-[#E1EAF3] h-full w-full overflow-x-auto">
    <table class="w-full text-left text-sm text-[#5F6368]">
      <thead class="sticky top-0">
        <tr class="font-medium">
          <th class="w-12 px-4 pl-8 py-3 rounded-tl-lg">
            <CheckBox v-model="allSelected" @update:modelValue="toggleSelectAll" />
          </th>
          <th class="py-4 pl-6">Name</th>
          <th class="py-4">Country</th>
          <th class="py-4">Department</th>
          <th class="py-4">Roles</th>
          <th class="py-4">Status</th>
          <th class="py-4">Created Date</th>
          <th class="py-4 text-right pr-10">Last Login</th>
          <th class="rounded-tr-lg"></th>
        </tr>
      </thead>

      <tbody class="">
        <UserRow
          v-for="u in users"
          :key="u.id"
          :user="u"
          :expanded="expandedRow === u.id"
          @toggle="toggleRow"
          :checked="selectedIds.includes(u.id)"
          @toggle:selected="toggleRowSelection"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th {
  background-color: #ecf1f8;
}
</style>

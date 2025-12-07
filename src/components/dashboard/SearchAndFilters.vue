<script lang="ts">
import { defineComponent } from 'vue'
import DropdownSelector from '@/components/common/DropdownSelector.vue'

export default defineComponent({
  components: { DropdownSelector },

  props: {
    query: String,
    selectedCountry: String,
    selectedDepartment: String,
    selectedRole: String,
    selectedStatus: String,
    isLoading: Boolean,
  },

  emits: [
    'update:query',
    'update:selectedCountry',
    'update:selectedDepartment',
    'update:selectedRole',
    'update:selectedStatus',
  ],
})
</script>

<template>
  <div
    class="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start justify-between items-center mb-4"
  >
    <div class="relative sm:w-1/3">
      <input
        type="text"
        placeholder="Search here..."
        :value="query"
        @input="$emit('update:query', ($event.target as HTMLInputElement).value)"
        :disabled="isLoading"
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <img src="@/assets/icons/search.svg" width="20" />
      </div>
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">/ K</div>
    </div>

    <div class="flex max-sm:gap-2 max-sm:flex-wrap space-x-4 text-xs text-[#5F6368]">
      <DropdownSelector
        :items="[
          { id: 'Australia (AU)', label: 'Australia (AU)' },
          { id: 'NewZealand (NZ)', label: 'NewZealand (NZ)' },
          { id: 'Canada (CA)', label: 'Canada (CA)' },
          { id: 'Mexico (MX)', label: 'Mexico (MX)' },
        ]"
        placeholder="Country"
        :model-value="selectedCountry"
        @update:model-value="$emit('update:selectedCountry', $event)"
      />

      <DropdownSelector
        :items="[
          { id: 'Au - Store Ops', label: 'Au - Store Ops' },
          { id: 'Retail Management', label: 'Retail Management' },
          { id: 'Product Design', label: 'Product Design' },
          { id: 'Customer Service', label: 'Customer Service' },
        ]"
        placeholder="Department"
        :model-value="selectedDepartment"
        @update:model-value="$emit('update:selectedDepartment', $event)"
      />

      <DropdownSelector
        :items="[
          { id: 'Admin', label: 'Admin' },
          { id: 'Editor', label: 'Editor' },
          { id: 'Viewer', label: 'Viewer' },
        ]"
        placeholder="Roles"
        :model-value="selectedRole"
        @update:model-value="$emit('update:selectedRole', $event)"
      />

      <DropdownSelector
        :items="[
          { id: 'Active', label: 'Active' },
          { id: 'Suspended', label: 'Suspended' },
          { id: 'Pending', label: 'Pending' },
        ]"
        placeholder="Status"
        :model-value="selectedStatus"
        @update:model-value="$emit('update:selectedStatus', $event)"
      />
    </div>
  </div>
</template>

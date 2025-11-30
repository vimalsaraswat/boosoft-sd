<script lang="ts">
import { defineComponent } from 'vue'
import type { User, UserEntry } from '@/types/user'
import { getInitials } from '@/lib/utils'
import ActionsMenu from './ActionsMenu.vue'

export default defineComponent({
  components: {
    ActionsMenu,
  },

  props: {
    user: { type: Object as () => User, required: true },
    expanded: { type: Boolean, default: false },
  },

  emits: ['toggle'],

  computed: {
    initials(): string {
      return getInitials(this.user.name)
    },

    firstEntry(): UserEntry {
      return this.user.entries[0]
    },

    hasMultiple(): boolean {
      return this.user.entries.length > 1
    },
  },

  methods: {
    toggle() {
      this.$emit('toggle', this.user.id)
    },

    statusClass(status: UserEntry['status']) {
      return {
        'text-green-600': status === 'Active',
        'text-red-600': status === 'Suspended',
        'text-yellow-600': status === 'Pending',
      }
    },

    roleLabel(role: UserEntry['role'] | null, count = 1): string {
      return role ? role : `+${count}`
    },

    roleClasses(role: UserEntry['role'] | null) {
      if (!role) return 'bg-gray-100 text-gray-700'
      const map = {
        Editor: 'bg-green-50 text-green-700',
        Admin: 'bg-blue-50 text-blue-600',
        Viewer: 'bg-yellow-50 text-yellow-700',
      }
      return map[role] ?? 'bg-gray-100 text-gray-700'
    },
  },
})
</script>

<template>
  <tr
    class="hover:bg-gray-50 transition-colors cursor-pointer"
    :class="{ 'bg-gray-50': expanded }"
    @click="toggle"
  >
    <td class="px-8 pr-3 py-4">
      <div class="flex items-center justify-between gap-3">
        <input type="checkbox" class="w-4 h-4 rounded border-gray-300" />
        <img
          src="@/assets/icons/chevron-down.svg"
          width="14"
          height="14"
          class="transition-transform duration-200"
          :class="[expanded ? 'rotate-180' : '']"
        />
      </div>
    </td>

    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="rounded-full flex items-center justify-center size-10 font-medium bg-[#ECF1F8]">
          {{ initials }}
        </div>
        <div>
          <div class="font-medium text-[#5F6368]">{{ user.name }}</div>
          <div class="text-xs text-gray-500">{{ user.email }}</div>
        </div>
      </div>
    </td>

    <td class="px-6 py-4 text-[#5F6368]">
      <span v-if="hasMultiple">+{{ user.entries.length }}</span>
      <span v-else>{{ firstEntry.country }}</span>
    </td>

    <td class="px-6 py-4">
      <div class="flex items-center gap-2">
        <div v-if="!hasMultiple" class="w-3 h-3 rounded-full border-2 border-yellow-500"></div>
        <span class="text-[#5F6368]">
          {{ hasMultiple ? `+${user.entries.length}` : firstEntry.department }}
        </span>
      </div>
    </td>

    <td class="px-6 py-4 text-center">
      <span
        :class="[
          'inline-flex px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap',
          roleClasses(hasMultiple ? null : firstEntry.role),
        ]"
      >
        {{ roleLabel(hasMultiple ? null : firstEntry.role, user.entries.length) }}
      </span>
    </td>

    <td class="px-6 py-4 text-center font-medium">
      <span v-if="!hasMultiple" :class="statusClass(firstEntry.status)">
        {{ firstEntry.status }}
      </span>
      <span v-else>-</span>
    </td>

    <td class="px-6 py-4 text-[#5F6368]">
      <span v-if="!hasMultiple">
        {{ firstEntry.createdDate }}
      </span>
      <span v-else>-</span>
    </td>

    <td class="px-6 py-4 pr-10 text-[#5F6368]">
      <span v-if="!hasMultiple">
        {{ firstEntry.lastLogin }}
      </span>
      <span v-else>-</span>
    </td>

    <td class="px-4 py-4">
      <ActionsMenu :variant="firstEntry?.status" />
    </td>
  </tr>

  <template v-if="expanded && hasMultiple">
    <tr
      v-for="(entry, idx) in user.entries"
      :key="user.id + '-expanded-' + idx"
      class="border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors"
    >
      <td class="w-12 px-4 py-4"></td>
      <td class="px-6 py-4"></td>

      <td class="px-6 py-4 font-medium">{{ entry.country }}</td>

      <td class="px-6 py-4">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full border-2 border-yellow-500"></div>
          <span>{{ entry.department }}</span>
        </div>
      </td>

      <td class="px-6 py-4 text-center">
        <span
          :class="[
            'inline-flex px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap',
            roleClasses(entry.role),
          ]"
          >{{ roleLabel(entry.role) }}</span
        >
      </td>

      <td class="px-6 py-4 text-center font-medium" :class="statusClass(entry.status)">
        {{ entry.status }}
      </td>

      <td class="px-6 py-4">{{ entry.createdDate }}</td>
      <td class="px-6 py-4 pr-10">{{ entry.lastLogin }}</td>
      <td></td>
    </tr>
  </template>
</template>

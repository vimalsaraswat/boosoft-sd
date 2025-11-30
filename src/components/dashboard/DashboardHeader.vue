<script lang="ts">
import { defineComponent } from 'vue'
import ProfileDropdown from './ProfileDropdown.vue'
import { useAuthStore } from '@/stores'

export default defineComponent({
  components: {
    ProfileDropdown,
  },

  data() {
    return {
      auth: useAuthStore(),
    }
  },

  methods: {
    handleSignout() {
      this.auth.clearAuth()
      this.$router.push({ name: 'login' })
    },
  },
})
</script>

<template>
  <header class="p-4 h-16 flex items-center justify-between bg-[#F8F9FA]">
    <div class="flex items-center gap-2">
      <img src="@/assets/rect-logo.svg" height="36" width="65" />
      <span class="text-[#5F6368] font-medium">BooSoft</span>
    </div>
    <ProfileDropdown name="Bibash Khadka" :email="auth.email ?? ''" @signout="handleSignout" />
  </header>
</template>

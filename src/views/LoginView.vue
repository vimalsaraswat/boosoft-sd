<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores'
import { authService } from '@/services'
import { validateEmail } from '@/lib/utils'
import SquareLogo from '@/components/common/SquareLogo.vue'
import FooterLinks from '@/components/auth/FooterLinks.vue'

export default defineComponent({
  components: {
    SquareLogo,
    FooterLinks,
  },

  data() {
    return { email: '', loading: false, error: '', auth: useAuthStore() }
  },

  computed: {
    validEmail() {
      return validateEmail(this.email)
    },
  },

  methods: {
    async handleSendOtp() {
      this.error = ''
      if (!this.validEmail) {
        this.error = 'Please enter a valid email address.'
        return
      }
      this.loading = true
      try {
        const res = await authService.sendOtp(this.email)
        if (res && res.success) {
          this.auth.setAuth(this.auth.token || '', this.email)
          this.$router.push({ name: 'verify', query: { email: this.email } })
        } else {
          this.error = res?.message || 'Failed to send OTP'
        }
      } catch (err) {
        console.error('Eerror sending otp: ', err)
        this.error = 'Something went wrong. Try again.'
      } finally {
        this.loading = false
      }
    },
  },
})
</script>

<template>
  <div class="w-screen h-screen grid place-items-center">
    <div
      class="rounded-2xl flex flex-col items-center justify-center bg-white p-12 gap-8"
      style="box-shadow: 0px 20px 60px 0px #00000015"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-5 items-center">
          <SquareLogo />
          <div class="space-y-2">
            <h1 class="text-[28px] font-bold text-center text-[#5F6368]">Welcome to E-store</h1>
            <p class="mt-2 font-normal text-center text-[#5F6368]">
              Sign in to your account to continue.
            </p>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleSendOtp">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="!email || loading"
              style="box-shadow: 0px 4px 12px 0px #667eea40"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent font-semibold rounded-lg text-white bg-[#4285F4] hover:cursor-pointer hover:bg-[#3c7add] disabled:bg-[#E1EAF3] disabled:cursor-not-allowed"
            >
              <span v-if="!loading">Get OTP</span>
              <span v-else>Sending...</span>
            </button>
          </div>
          <p v-if="error" class="text-sm text-center text-red-500 mt-4">{{ error }}</p>
        </form>
      </div>

      <FooterLinks />
    </div>
  </div>
</template>

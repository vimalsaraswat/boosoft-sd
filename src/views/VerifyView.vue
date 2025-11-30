<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores'
import { authService } from '@/services'
import SquareLogo from '@/components/common/SquareLogo.vue'
import OtpInput from '@/components/OtpInput.vue'
import FooterLinks from '@/components/auth/FooterLinks.vue'

export default defineComponent({
  components: { SquareLogo, OtpInput, FooterLinks },

  data() {
    return {
      otp: '',
      isVerifying: false,
      isResending: false,
      error: '',
      auth: useAuthStore(),
    }
  },

  computed: {
    currentEmail() {
      return (this.$route.query.email as string) || (this.auth.email as string) || ''
    },
    maskedEmail() {
      const e = this.currentEmail || ''
      if (!e) return 'your email'
      const [local, domain] = e.split('@')
      if (!domain || !local) return e
      const visible = local?.length > 2 ? local?.slice(0, 2) + '...' : local?.[0] + '...'
      return `${visible}@${domain}`
    },
  },

  methods: {
    onComplete(fullCode: string) {
      this.otp = fullCode
      this.handleVerify()
    },

    async handleVerify() {
      this.error = ''

      if (!this.otp || this.otp.length < 6) {
        this.error = 'Please enter the 6-digit code.'
        return
      }

      this.isVerifying = true
      try {
        const res = await authService.verifyOtp(this.currentEmail, this.otp)
        if (res && res.success && res.token) {
          this.auth.setAuth(res.token, this.currentEmail)
          this.$router.replace({ name: 'dashboard' })
        } else {
          this.error = (res && res.message) || 'Invalid code. Please try again.'
        }
      } catch (err) {
        console.error('Error verifying OTP:', err)
        this.error = 'Verification failed. Please try again.'
      } finally {
        this.isVerifying = false
      }
    },

    async handleResend() {
      this.error = ''
      this.isResending = true
      try {
        const res = await authService.sendOtp(this.currentEmail)
        if (!(res && res.success)) {
          this.error = res?.message || 'Failed to resend OTP. Try again.'
        }
      } catch (err) {
        console.error('Error resending OTP:', err)
        this.error = 'Could not resend OTP. Try again later.'
      } finally {
        this.isResending = false
      }
    },
  },
})
</script>

<template>
  <div class="w-screen h-screen grid place-items-center">
    <div
      class="rounded-2xl flex flex-col items-center bg-white p-12 gap-8 max-w-md w-full"
      style="box-shadow: 0px 20px 60px 0px #00000015"
    >
      <div class="space-y-6">
        <router-link
          to="/login"
          class="flex items-center gap-[10px] text-[#5F6368] hover:text-[#40454b] self-start"
        >
          <img alt="Boosoft logo" src="@/assets/icons/arrow-left.svg" width="24" height="24" />
          <span>Back to Login</span>
        </router-link>

        <div class="flex flex-col items-center text-center gap-2">
          <SquareLogo />

          <h1 class="text-[28px] font-bold text-[#5F6368]">Verify Your Account</h1>
          <p class="font-normal text-[#5F6368]">
            Please enter the 6-digit code sent to your <br />email address.
          </p>
        </div>

        <form @submit.prevent="handleVerify" class="w-full space-y-6">
          <div class="space=y=2">
            <label for="otp" class="block text-sm font-medium text-[#5F6368] mb-2"
              >Enter code</label
            >
            <OtpInput v-model="otp" :num-inputs="6" />
          </div>
          <button
            type="submit"
            :disabled="otp.length !== 6 || isVerifying"
            style="box-shadow: 0px 4px 12px 0px #667eea40"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent font-semibold rounded-lg text-white bg-[#4285F4] hover:cursor-pointer hover:bg-[#3c7add] disabled:bg-[#E1EAF3] disabled:cursor-not-allowed"
          >
            <span v-if="!isVerifying">Verify & Continue</span>
            <span v-else>Verifying...</span>
          </button>
          <p v-if="error" class="text-sm text-center text-red-500 mt-4">{{ error }}</p>
        </form>

        <p class="text-center font-semibold text-[#5F6368]">
          Didn’t receive the code?
          <button class="border-b border-[#5F6368]" @click="handleResend" :disabled="isResending">
            <span v-if="!isResending">Resend</span>
            <span v-else>Sending...</span>
          </button>
        </p>
      </div>

      <FooterLinks />
    </div>
  </div>
</template>

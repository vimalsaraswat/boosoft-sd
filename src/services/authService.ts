// import api from '@/lib/api'
import { mockSendOtp, mockVerifyOtp } from './mockApi'

const authService = {
  async sendOtp(email: string) {
    // return api.post("/auth/send-otp", { email });
    return mockSendOtp(email)
  },

  async verifyOtp(email: string, code: string) {
    // return api.post("/auth/verify-otp", { email, code });
    return mockVerifyOtp(email, code)
  },
}

export default authService

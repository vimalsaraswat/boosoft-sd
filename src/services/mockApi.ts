import type { User } from '@/types/user'

const MOCK_OTP = '123456'

export const mockSendOtp = (email: string) =>
  new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      console.log(`[mockApi] sendOtp for ${email} -> ${MOCK_OTP}`)
      resolve({ success: true, message: 'OTP sent (mock)' })
    }, 1500)
  })

export const mockVerifyOtp = (email: string, code: string) =>
  new Promise<{ success: boolean; token?: string; message?: string }>((resolve) => {
    setTimeout(() => {
      if (code === MOCK_OTP) {
        resolve({ success: true, token: 'mock-jwt-token-123' })
      } else {
        resolve({ success: false, message: 'Invalid OTP' })
      }
    }, 1500)
  })

const USERS = [
  {
    id: 1,
    name: 'Anika',
    email: 'AS12@email.com',
    entries: [
      {
        country: 'Australia (AU)',
        department: 'Au - Store Ops',
        role: 'Editor',
        status: 'Active',
        createdDate: '9th April 2025',
        lastLogin: '9th April 2025',
      },
      {
        country: 'Australia (AU)',
        department: 'Au - Store Ops',
        role: 'Admin',
        status: 'Active',
        createdDate: '9th April 2025',
        lastLogin: '9th April 2025',
      },
    ],
  },
  {
    id: 2,
    name: 'Dev Sharma',
    email: 'DS22@email.com',
    entries: [
      {
        country: 'NewZealand (NZ)',
        department: 'Au - Store Ops',
        role: 'Editor',
        status: 'Active',
        createdDate: '9th April 2025',
        lastLogin: '9th April 2025',
      },
    ],
  },
  {
    id: 3,
    name: 'Akh Khan',
    email: 'AK23@email.com',
    entries: [
      {
        country: 'Australia (AU)',
        department: 'Retail Management',
        role: 'Editor',
        status: 'Active',
        createdDate: '15th May 2025',
        lastLogin: '15th May 2025',
      },
    ],
  },
  {
    id: 4,
    name: 'Liam Johnson',
    email: 'LJ45@email.com',
    entries: [
      {
        country: 'Canada (CA)',
        department: 'Product Design',
        role: 'Admin',
        status: 'Suspended',
        createdDate: '20th June 2025',
        lastLogin: '20th June 2025',
      },
    ],
  },
  {
    id: 5,
    name: 'Maria',
    email: 'MP76@email.com',
    entries: [
      {
        country: 'Mexico (MX)',
        department: 'Customer Service',
        role: 'Viewer',
        status: 'Pending',
        createdDate: '1st July 2025',
        lastLogin: '1st July 2025',
      },
    ],
  },
] as User[]

export const mockGetUsers = () =>
  new Promise<User[]>((resolve) => {
    setTimeout(() => resolve(USERS.slice()), 400)
  })

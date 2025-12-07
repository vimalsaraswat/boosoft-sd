import type { GetUsersParams, PaginatedResponse, User } from '@/types/user'

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
  ...Array.from({ length: 95 }).map((_, i) => {
    const id = i + 6

    const names = [
      'Ethan',
      'Sofia',
      'Noah',
      'Olivia',
      'Arjun',
      'Chloe',
      'Rahul',
      'Emma',
      'Lucas',
      'Harper',
      'Ishaan',
      'Zoe',
      'Daniel',
      'Lily',
      'Mohammed',
      'Ava',
      'Benjamin',
      'Mia',
      'Henry',
      'Charlotte',
      'Leo',
      'Isabella',
      'James',
      'Amelia',
      'Jack',
      'Ella',
      'Samuel',
      'Ariana',
      'David',
      'Victoria',
      'Jayden',
      'Nora',
      'Gabriel',
      'Hannah',
      'Elijah',
      'Abigail',
      'Wyatt',
      'Scarlett',
      'Mateo',
      'Penelope',
      'Owen',
      'Layla',
      'Julian',
      'Grace',
      'Caleb',
      'Chloe',
      'Nathan',
    ]

    const departments = [
      'Au - Store Ops',
      'Retail Management',
      'Product Design',
      'Customer Service',
    ]

    const countries = ['Australia (AU)', 'NewZealand (NZ)', 'Canada (CA)', 'Mexico (MX)']

    const roles = ['Admin', 'Editor', 'Viewer']

    const statuses = ['Active', 'Pending', 'Suspended']

    const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

    const entriesCount = Math.floor(Math.random() * 3) + 1 // 1, 2, or 3
    const entries = Array.from({ length: entriesCount }).map(() => ({
      country: random(countries),
      department: random(departments),
      role: random(roles),
      status: random(statuses),
      createdDate: `${Math.ceil(Math.random() * 28)}th August 2025`,
      lastLogin: `${Math.ceil(Math.random() * 28)}th August 2025`,
    }))

    return {
      id,
      name: names[i % names.length],
      email: `user${id}@email.com`,
      entries,
    }
  }),
] as User[]

export const mockGetUsers = (params: GetUsersParams): Promise<PaginatedResponse<User>> => {
  const { page = 1, pageSize = 10, search, country, department, role, status } = params

  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = USERS.slice()

      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase()
        filtered = filtered.filter(
          (user) =>
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q) ||
            user.entries.some(
              (item) =>
                item.country.toLowerCase().includes(q) ||
                item.department.toLowerCase().includes(q) ||
                item.role.toLowerCase().includes(q) ||
                item.status.toLowerCase().includes(q),
            ),
        )
      }

      if (country) {
        filtered = filtered.filter((user) => user.entries.some((e) => e.country === country))
      }

      if (department) {
        filtered = filtered.filter((user) => user.entries.some((e) => e.department === department))
      }

      if (role) {
        filtered = filtered.filter((user) => user.entries.some((e) => e.role === role))
      }

      if (status) {
        filtered = filtered.filter((user) => user.entries.some((e) => e.status === status))
      }

      const total = filtered.length
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const items = filtered.slice(start, end)

      resolve({
        items,
        total,
        page,
        pageSize,
      })
    }, 400)
  })
}

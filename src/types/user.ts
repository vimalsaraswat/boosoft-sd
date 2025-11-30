export interface User {
  id: number
  name: string
  email: string
  entries: [UserEntry, ...UserEntry[]]
}

export interface UserEntry {
  country: string
  department: string
  role: 'Editor' | 'Admin' | 'Viewer'
  status: UserStatus
  createdDate: string
  lastLogin: string
}

export enum UserStatus {
  Active = 'Active',
  Suspended = 'Suspended',
  Pending = 'Pending',
}

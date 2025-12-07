export interface User {
  id: number
  name: string
  email: string
  entries: [UserEntry, ...UserEntry[]]
}

export interface UserEntry {
  country: string
  department: string
  role: UserRole
  status: UserStatus
  createdDate: string
  lastLogin: string
}

export enum UserRole {
  Editor = 'Editor',
  Admin = 'Admin',
  Viewer = 'Viewer',
}

export enum UserStatus {
  Active = 'Active',
  Suspended = 'Suspended',
  Pending = 'Pending',
}

export interface GetUsersParams {
  page?: number
  pageSize?: number
  search?: string
  country?: string
  department?: string
  role?: UserRole | string
  status?: UserStatus
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

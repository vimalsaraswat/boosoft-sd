// import api from '@/lib/api'
import type { GetUsersParams, PaginatedResponse, User } from '@/types/user'
import { mockGetUsers } from './mockApi'

const userService = {
  async getUsers(params: GetUsersParams = {}): Promise<PaginatedResponse<User>> {
    //  return api.get("/users");
    return mockGetUsers({
      ...params,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 20,
    })
  },
}
export default userService

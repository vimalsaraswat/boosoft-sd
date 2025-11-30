// import api from '@/lib/api'
import { mockGetUsers } from './mockApi'

const userService = {
  async getUsers() {
    //  return api.get("/users");
    return mockGetUsers()
  },
}
export default userService

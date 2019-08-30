import Model from '@/model/login.model'
import { json } from '@/utils'

export default {
  // get 查询列表
  async login(ctx: any) {
    const condition = { isDeleted: 0 }
    const info = Model.find(condition)
    if (info) {
    }
  },
  async logout(ctx: any) {}
}

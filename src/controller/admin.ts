import { adminModel as Model } from '@/model'
import { json, filterEmptyField } from '@/utils'
import { pagination } from '@/const'

export default {
  // get 查询列表
  async find(ctx: any) {
    let condition: any = { isDeleted: 0 }
    const {
      username,
      nickname,
      current = pagination.current,
      pageSize = pagination.pageSize
    } = ctx.query

    condition.username = username
    condition.nickname = nickname

    condition = filterEmptyField(condition)

    const fields = '_id username createdAt'

    const result = await Promise.all([
      Model.count(condition),
      Model.find(condition, fields)
        .sort({ createdAt: -1 })
        .limit(+pageSize)
        .skip((current - 1) * +pageSize)
    ])
    const [total, list] = result
    ctx.body = json({
      list,
      total
    })
  },

  async save(ctx: any) {
    const { _id, username, nickname, password } = ctx.request.body
    const data = {
      _id,
      username,
      nickname,
      password
    }

    let result: Object
    if (_id) {
      result = await Model.update({ _id }, { $set: data })
    } else {
      result = await Model.create(data)
    }
    ctx.body = json(result)
  },

  async delete(ctx: any) {
    const { _id } = ctx.request.body
    const result = await Model.update({ _id }, { $set: { isDeleted: 1 } })
    ctx.body = json(result)
  }
}

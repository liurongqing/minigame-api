import Model from '@/model/gameType.model'
import { json } from '@/utils'
import { pagination } from '@/const'

export default {
  // 查询列表
  async find(ctx: any) {
    const condition = { isDeleted: 0 }
    const list = await Model.find(condition).sort({ createdAt: -1 })

    ctx.body = json({
      list
    })
  },

  async save(ctx: any) {
    const { _id, name, parentId } = ctx.request.body
    const data = {
      _id,
      name,
      parentId
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

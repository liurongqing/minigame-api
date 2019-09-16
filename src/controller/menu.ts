import { menuModel as Model } from '@/model'
import { json, filterEmptyField } from '@/utils'
import { errcode } from '@/const'

export default {
  // get 查询列表
  async find(ctx: any) {
    let condition: any = { isDeleted: 0 }
    const { text, status } = ctx.query

    condition.text = text
    condition.status = status

    condition = filterEmptyField(condition)

    const fields = '_id parentId text link icon status createdAt updatedAt sort'

    const list = await Model.find(condition, fields).sort({
      sort: 1,
      createdAt: -1
    })
    ctx.body = json({
      data: {
        list,
        total: 0
      }
    })
  },

  async save(ctx: any) {
    const { _id, parentId, text, link, icon, status, sort } = ctx.request.body
    let data: any = {
      _id,
      parentId,
      text,
      link,
      icon,
      status,
      sort
    }

    data = filterEmptyField(data)

    let result: Object
    try {
      if (_id) {
        result = await Model.updateOne({ _id }, { $set: data })
      } else {
        result = await Model.create(data)
      }
      ctx.body = json({ data: result })
    } catch (err) {
      ctx.body = json({
        code: errcode.DATABASE_ERROR,
        msg: _id ? '修改失败' : '添加失败',
        log: err.message
      })
    }
  },

  async delete(ctx: any) {
    const { _id } = ctx.request.body
    const result = await Model.update({ _id }, { $set: { isDeleted: 1 } })
    ctx.body = json(result)
  }
}

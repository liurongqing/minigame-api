import { permissionsModel as Model } from '@/model'
import { json, filterEmptyField } from '@/utils'
import { errcode } from '@/const'

export default {
  // get 查询列表
  async find(ctx: any) {
    let condition: any = { isDeleted: 0 }

    condition = filterEmptyField(condition)

    const fields = '_id page feature'

    const list = await Model.find(condition, fields).sort({
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
    const { _id, page, feature } = ctx.request.body
    let data: any = {
      _id,
      page,
      feature
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
  }
}

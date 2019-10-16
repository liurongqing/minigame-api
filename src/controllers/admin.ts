import { adminModel as Model } from '@/models'
import { json, filterEmptyField } from '@/utils'
import { pagination, errcode } from '@/const'

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

    const fields = '_id username nickname role createdAt isDeleted'

    const result = await Promise.all([
      Model.countDocuments(condition),
      Model.find(condition, fields)
        .sort({ createdAt: -1 })
        .limit(+pageSize)
        .skip((current - 1) * +pageSize)
    ])
    const [total, list] = result
    ctx.body = json({
      data: {
        list,
        total
      }
    })
  },

  async save(ctx: any) {
    const { _id, username, nickname, role, password } = ctx.request.body
    let data: any = {
      _id,
      username,
      nickname,
      role,
      password
    }

    data = filterEmptyField(data)

    let result: Object
    try {
      if (_id) {
        result = await Model.update({ _id }, { $set: data })
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

    // 更新下权限表， 菜单未激活或不存在了，权限删除禁用
  }
}

import { menuModel as Model, permissionsModel } from '@/model'
import { json, filterEmptyField } from '@/utils'
import { errcode } from '@/const'
import { ObjectID, ObjectId } from 'bson'

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

    let result: any
    try {
      if (_id) {
        result = await Model.findByIdAndUpdate(
          { _id },
          { $set: data },
          {
            new: true
          }
        )
      } else {
        result = await Model.create(data)
      }

      ctx.body = json({ data: result })

      // 保存或修改成功时，要更新下权限表
      const permissionsData = await permissionsModel.findOne({ menuId: _id })
      if (permissionsData) {
        // 权限表存在该条数据的话
        if (!!result.status) {
          // 是激活的话，更新菜单内容
          await permissionsModel.update(
            { menuId: _id },
            {
              $set: {
                page: JSON.stringify({
                  value: result.link,
                  title: result.text
                }),
                isDeleted: 0
              }
            }
          )
        } else {
          // 没激活，则删除该菜单权限信息
          await permissionsModel.update({ menuId: _id }, { $set: { isDeleted: 1 } })
        }
      } else {
        // 权限表不存在该条数据的话
        if (!!result.status) {
          // 如果是激活的话，添加该数据
          await permissionsModel.create({
            menuId: _id,
            page: JSON.stringify({
              value: result.link,
              title: result.text
            }),
            feature: '[]'
          })
        }
      }
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

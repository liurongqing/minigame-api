// import Model from '@/model/menu.model'
// import { json } from '@/utils'

// export default {
//   // get 查询列表
//   async find(ctx: any) {
//     const condition = { isDeleted: 0 }
//     const list = await Model.find(condition).sort({ createdAt: -1 })
//     console.log(list)
//     ctx.body = json({
//       list,
//       total: 0
//     })
//   },

//   async save(ctx: any) {
//     const { _id, parentId, text, link, icon, status } = ctx.request.body
//     const data = {
//       _id,
//       parentId,
//       text,
//       link,
//       icon,
//       status: +status
//     }

//     let result: Object
//     if (_id) {
//       result = await Model.update({ _id }, { $set: data })
//     } else {
//       result = await Model.create(data)
//     }
//     ctx.body = json(result)
//   },
//   async delete(ctx: any) {
//     const { _id } = ctx.request.body
//     const result = await Model.update({ _id }, { $set: { isDeleted: 1 } })
//     ctx.body = json(result)
//   }
// }

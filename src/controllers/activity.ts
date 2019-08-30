import Model from '../models/activity.model';
import { json } from '../utils';
import { pagination } from '../constants';

export default {
  // get 查询列表
  async find(ctx: any) {
    const condition = { isDeleted: 0 }
    const {
      page = pagination.page,
      pageSize = pagination.pageSize
    } = ctx.query;
    const result = await Promise.all([
      Model.count(condition),
      Model.find(condition)
        .sort({ createdAt: -1 })
        .limit(+pageSize)
        .skip((page - 1) * +pageSize)
    ]);

    const [total, list] = result;

    ctx.body = json({
      list,
      total
    });
  },

  async save(ctx: any) {
    const { _id, name,startAt, endAt,status } = ctx.request.body;
    const data = {
      _id,
      name,
      startAt,
      endAt,
      status
    };

    let result: Object;
    if (_id) {
      result = await Model.update({ _id }, { $set: data });
    } else {
      result = await Model.create(data);
    }
    ctx.body = json(result);
  },
  async delete(ctx: any) {
    const { _id } = ctx.request.body;
    const result = await Model.update({ _id }, { $set: { isDeleted: 1 } });
    ctx.body = json(result);
  }
};

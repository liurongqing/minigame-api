
## 请求方式

- GET：读取（Read）
- POST：新建（Create）
- PUT：更新（Update）
- DELETE：删除（Delete）


## 增删改查命名

find 查询 get
save 添加与更新 post
delete 删除 delete

## 状态

成功状态

- GET: 200 OK
- POST: 201 Created
- PUT: 200 OK
- DELETE: 204 No Content

## 传参

注意：
1. 每页条数 pageSize
2. 当前页 page
3. 全部 page: 0

## 返回值

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "list": [{}, {}],
    "total": 100
  }
}
```

## 返回码与说明

-1 系统繁忙，此时请开发者稍候再试
0 请求成功
-40001
-50001
-60001
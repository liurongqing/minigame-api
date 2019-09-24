const data = [[/db x/, '字段不可重复']]
export const checkDB = (msg: any) => {
  const singleData = data.find((v: any) => {
    return new RegExp(v[0]).test(v[1])
  })
  if (singleData) {
    return singleData[1]
  }
  return ''
}

export const filterEmptyField = (obj: any) => {
  let newObj = {}
  for (let i in obj) {
    if (obj[i] !== null && obj[i] !== undefined && obj[i] !== '') {
      newObj[i] = obj[i]
    }
  }
  return newObj
}
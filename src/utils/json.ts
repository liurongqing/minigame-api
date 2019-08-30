import { code } from '@/const'
export const json = (data = {}, status = code.SUCCESS, msg = '') => {
  return {
    code: status,
    data,
    msg
  }
}

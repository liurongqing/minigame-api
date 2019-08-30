import { code } from '@/const'
export default (data = {}, status = code.SUCCESS, msg = '') => {
  return {
    code: status,
    data,
    msg
  }
}

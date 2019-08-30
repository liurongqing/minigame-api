import { code } from '../constants'
export default (data = {}, status = code.SUCCESS, msg = '') => {
  return {
    code: status,
    data,
    msg
  }
}

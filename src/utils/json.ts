import { errcode } from '@/const'
export const json = ({
  data = {},
  code = errcode.SUCCESS,
  msg = '',
  log = ''
} = {}) => {
  return {
    code,
    data,
    msg,
    log
  }
}

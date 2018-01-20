import request from '@/utils/request'

export function dataPage(params) {
  const url = '/sysAdmin/user/page'
  return request({
    url: url,
    method: 'get',
    params
  })
}

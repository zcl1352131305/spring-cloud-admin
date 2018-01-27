import request from '@/utils/request'

export function doGet(params) {
  return request({
    url: params.url,
    method: 'get',
    params: params.data
  })
}

export function doPost(params) {
  return request({
    url: params.url,
    method: 'post',
    data: params.data
  })
}

export function doPut(params) {
  return request({
    url: params.url,
    method: 'put',
    data: params.data
  })
}

export function doDelete(params) {
  return request({
    url: params.url,
    method: 'delete',
    params: params.data
  })
}

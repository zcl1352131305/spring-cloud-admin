import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/sysAuth/auth/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/sysAdmin/user/loginUserInfo',
    method: 'get'
  })
}


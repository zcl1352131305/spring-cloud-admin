import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent

  /* config.headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }*/
  if (config.url.indexOf('/sysAuth/auth/login') === -1) {
    if (store.getters.token) {
      config.headers.Token = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    } else {
      Promise.reject('token不能为空')
    }
  }
  console.log('请求参数：' + JSON.stringify(config.data))
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    console.log('请求结果：' + JSON.stringify(response.data))

    if (typeof response.data === 'string') {
      response.data = JSON.parse(response.data)
    }
    const res = response.data
    if (res.code === 401 || res.code === '401') {
      location.href = '/'
    } else if (res.code === 402 || res.code === '402') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else if (res.code === 403 || res.code === '403') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */

  error => {
    removeToken()
    const code = error.request.status
    if (code === 401 || code === '401') {
      location.href = '/'
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  })

export default service

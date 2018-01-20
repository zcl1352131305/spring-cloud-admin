import { dataPage } from '@/api/sysAdmin/user'

const con = {
  actions: {
    // 用户名登录
    dataPage({ commit }, formInfo) {
      return new Promise((resolve, reject) => {
        dataPage(formInfo).then(response => {
          const data = response.result
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default con

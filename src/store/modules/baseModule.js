import { doPost, doGet, doPut, doDelete} from '@/api/base'

const con = {
  actions: {
    // 分页列表
    doPost({ commit }, params) {
      return new Promise((resolve, reject) => {
        doPost(params).then(response => {
          const data = response.result
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    doGet({ commit }, params) {
      return new Promise((resolve, reject) => {
        doGet(params).then(response => {
          const data = response.result
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    doPut({ commit }, params) {
      return new Promise((resolve, reject) => {
        doPut(params).then(response => {
          const data = response.result
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    doDelete({ commit }, params) {
      return new Promise((resolve, reject) => {
        doDelete(params).then(response => {
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

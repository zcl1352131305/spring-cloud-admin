import { doPost, doGet, doPut, doDelete } from '@/api/baseApi'

const con = {
  actions: {
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
    },
    saveOrUpdate({ commit }, params) {
      return new Promise((resolve, reject) => {
        if (params.isEdit) {
          params.url += 'update'
          doPut(params).then(response => {
            const data = response.result
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        } else {
          params.url += 'add'
          doPost(params).then(response => {
            const data = response.result
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        }
      })
    }
  }
}

export default con

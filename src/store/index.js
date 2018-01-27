import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import home from './modules/home'
import getters from './getters'
import baseAction from './modules/baseModule'

// import sysAdminUser from './modules/sysAdmin/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    tagsView,
    home,
    baseAction
  },
  getters
})

export default store

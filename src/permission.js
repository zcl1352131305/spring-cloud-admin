import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/authredirect']// 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      // 获取用户基本信息以及权限菜单信息
      store.dispatch('GetUserInfo').then(res => {
        next()
      }).catch(() => {
        next({ path: '/login' })
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

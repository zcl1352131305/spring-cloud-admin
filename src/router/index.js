import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home/init'
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'init',
        component: _import('home/index'),
        name: 'homeInit',
        meta: {
          title: '主页'
        }
      }
    ]
  },
  {
    path: '/sysAdmin',
    component: Layout,
    children: [
      {
        path: 'sysUser',
        component: _import('sysAdmin/user/index'),
        redirect: '/sysAdmin/sysUser/init',
        children: [
          {
            path: 'init',
            component: _import('sysAdmin/user/init'),
            name: 'sysUser',
            meta: { title: '用户管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('sysAdmin/user/edit'),
            name: 'sysUser',
            meta: { title: '用户编辑', isTag: false }
          }
        ]
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { role: ['admin'] },
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        role: ['admin']
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
    {path: '/Goods', name: 'Goods', component: Goods},
    {path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall,
          meta: {
            'keepAlive': true // 需要缓存
          }
        },
        {path: '/CategoryList',
          name: 'CategoryList',
          component: CategoryList,
          meta: {
            'keepAlive': true // 需要缓存
          }},
        {path: '/Cart', name: 'Cart', component: Cart}
      ]
    }]
})

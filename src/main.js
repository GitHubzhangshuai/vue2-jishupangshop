// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Search, Swipe, SwipeItem, Lazyload, List, NavBar, Field, Toast, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem } from 'vant'
import Swiper, { Pagination, Navigation } from 'swiper'
Swiper.use([Pagination, Navigation])
Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload, {preload: '30px'}).use(List).use(NavBar).use(Field).use(Toast).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

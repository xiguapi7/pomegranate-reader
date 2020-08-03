import Vue from 'vue'
import Router from 'vue-router'
import EBook from '../views/EBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      name: 'ebook',
      component: EBook
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import calculate from '@/components/calculate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calculate',
      component: calculate
    }
  ]
})

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Home from '../src/components/Home'

Vue.use(VueRouter)
Vue.config.productionTip = false

// const components = [
//   Home
// ]

Array.prototype.last = function(){
  return this[this.length-1]
}

// const routes = components.map(o => ({path: o.__file.split('/').last().split('.')[0], component: o }) )


// const router = new VueRouter({
//   routes
// })

new Vue({
  render: h => h(App)
}).$mount('#app')

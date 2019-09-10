import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from '../src/components/Home'
import Graph from '../src/components/Graph'
// import Chart from 'v-chart-plugin'
import VueGoogleCharts from 'vue-google-charts'
 
Vue.use(VueGoogleCharts)

// Vue.use(Chart);
Vue.use(VueRouter)
Vue.config.productionTip = false

const components = [
  Home,
  Graph  
]

Array.prototype.last = function(){
  return this[this.length-1]
}


const routes = components.map(o => ({path: o.__file.split('/').last().split('.')[0], component: o }) )


const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App)
}).$mount('#app')

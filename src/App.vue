<template>
  <div id="app">
    <!-- header  -->
    <!-- <Graph :graphData="graphData" /> -->
    <Graph :data="test"/>
    
    <!-- router view  -->
    <!-- footer -->
  </div>
</template>

<script>
import Graph from "./components/Graph";
import Welcome from "./components/Welcome";
import router from "vue-router";
import data from "./assets/data.json";
 

export default {
  name: "app",
  components: {
    Graph,
  },
  data() {
    return {
      graphData: [],
      chartData: [
        ['', 'Profit'],
        ['2014', 200],
        ['2015', 250],
        ['2016', 300],
        ['2017', 350]
      ],
      lineData: [],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      },
      test: {}
    };
  },
  created() {
    this.choseData('Matches')
  },
  methods: {
    choseData(type) {
      const usage = data.Usage
      const keys = Object.keys(data.Usage)
      const toArray = obj => Object.keys(obj).map(x => ({ [x]: obj[x] }))
      const get = (obj, key) => ({ [key]: obj[key] })
      const objectSize = object => Object.keys(object).length

      const add = (a, b) => a + b
      const count = (obj) => Object.keys(obj).map(x => obj[x]).reduce(add, 0)

      const { app_opens, matches, messages_received, messages_sent, swipes_likes, swipes_passes } = usage

      const mass = {
        matches,
        swipes_passes,
        swipes_likes,
        messages_sent,
        messages_received,
        app_opens
      };

      const numbers = Object.keys(mass).map(x => ({[x]: count(mass[x])}))

      const test = Object.keys(mass).reduce((acc, key, index) => {
        acc[key] = count(mass[key])
        return acc
      }, {})
      console.log(test)
      this.test = {key: 'swipes_likes', value: test.swipes_likes}
      this.test = {key: 'swipes_passes', value: test.swipes_passes}

    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flex-container {
  display: flex;
  width: 100vw;
  justify-content: space-around;
  height: 90%;
}
.button {
  background: #3498db;
  width: 180px;
  padding: 4px 0;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 3px;
}
p {
  font-family: "Roboto";
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  user-select: none;
}

p:hover {
  cursor: pointer;
}
</style>

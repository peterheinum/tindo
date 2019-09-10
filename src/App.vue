<template>
  <div id="app">
    <!-- header  -->
    <!-- <Graph :graphData="graphData" /> -->
    <GChart
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
    />
    <!-- router view  -->
    <!-- footer -->
  </div>
</template>

<script>
import Graph from "./components/Graph";
import Welcome from "./components/Welcome";
import router from "vue-router";
import data from "./assets/data.json";
import { GChart } from 'vue-google-charts'
 

export default {
  name: "app",
  components: {
    Graph,
    Welcome,
    GChart,
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
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
    };
  },
  created() {
    this.choseData('Matches')
  },
  methods: {
    choseData(type) {
      const usage = data.Usage;
      const keys = Object.keys(data.Usage);
      const toArray = obj => Object.keys(obj).map(x => ({ [x]: obj[x] }));
      const get = (obj, key) => ({ [key]: obj[key] });
      const objectSize = object => Object.keys(object).length;

      const add = (a, b) => a + b
      const count = (obj) => Object.keys(obj).map(x => obj[x]).reduce(add, 0)


      const { app_opens } = get(usage, "app_opens");
      const { matches } = get(usage, "matches");
      const { messages_received } = get(usage, "messages_received");
      const { messages_sent } = get(usage, "messages_sent");
      const { swipes_likes } = get(usage, "swipes_likes");
      const { swipes_passes } = get(usage, "swipes_passes");

      const mass = {
        matches,
        swipes_passes,
        swipes_likes,
        messages_sent,
        messages_received,
        app_opens
      };

      const numbers = Object.keys(mass).map(x => ({[x]: count(mass[x])}))
      const first = Object.keys(mass).map(x => x)
      const test = Object.keys(mass).reduce((acc, key) => {
        acc.push([key, count(mass[key])])
        return acc
      }, [])
      test.unshift('', 'Things')
      
      this.chartData = test


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

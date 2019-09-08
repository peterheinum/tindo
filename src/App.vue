<template>
  <div id="app">
    <!-- header  -->
    <Graph :graphData="graphData"/>
    <!-- router view  -->
    <!-- footer -->
    <div class="flex-container">
      <div class="button" @click="choseData('Matches')">
        <p>Matches</p>
      </div>
      <div class="button" @click="choseData('Likes')">
        <p>Likes</p>
      </div>
      <div class="button" @click="choseData('Passes')">
        <p>Passes</p>
      </div>
    </div>
  </div>
</template>

<script>
import Graph from "./components/Graph";
import router from "vue-router";
import data from "./assets/data.json";

export default {
  name: "app",
  components: {
    Graph
  },
  data() {
    return {
      graphData: [],
      chartData: {
        chartType: 'barChart',
        selector: 'chart',
        title: 'Important Data',
        width: 300,
        height: 200,
        data: [120, 140, 70, 90, 110, 65, 210]      
      },
      charts: []
    };
  },
  methods: {
    changeData() {
      const arr = [];
      for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * Math.floor(100));
        arr.push(random);
      }
      this.graphData = arr;
    },
    choseData(type) {
      const usage = data.Usage;
      const keys = Object.keys(data.Usage)
      const toArray = obj => Object.keys(obj).map(x => ({ [x]: obj[x] }));
      const get = (obj, key) => ({ [key]: obj[key] });
      const objectSize = object => Object.keys(object).length;

      const { app_opens } = get(usage, 'app_opens')
      const { matches } = get(usage, 'matches')
      const { messages_received } = get(usage, 'messages_received')
      const { messages_sent } = get(usage, 'messages_sent')
      const { swipes_likes } = get(usage, 'swipes_likes')
      const { swipes_passes } = get(usage, 'swipes_passes')
      
      const mass = {
        Matches: matches,
        Passes: swipes_passes,
        Likes: swipes_likes
      }

      const arr = Object.keys(mass[type]).map(x => mass[type][x])
      this.graphData = arr

      

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
  display:flex;
  width:100vw;
  justify-content:space-around;
  height:90%;
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

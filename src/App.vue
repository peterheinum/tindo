<template>
  <div id="app">
    <div v-for="(key, index) in mass" :key="index" class="flexer">
      <button @click="choseData(key)" style="width:80px;height:30px;">{{labels[key]}}</button>
    </div>
    <button @click="inventory = []" style="width:80px;height:30px;">Empty</button>

    <!-- header  -->
    <!-- <Graph :graphData="graphData" /> -->
    <Graph v-if="reload" :data="inventory" />

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
    Graph
  },
  data() {
    return {
      graphData: [],
      inventory: [],
      reload: true,
      labels: {
        matches: 'matches',
        swipes_passes: 'swipes',
        swipes_likes: 'passes',
        messages_sent: 'messages sent',
        messages_received: 'messages received',
        app_opens: 'app opens'
      },
      mass: [
        'matches',
        'swipes_passes',
        'swipes_likes',
        'messages_sent',
        'messages_received',
        'app_opens'
      ],
      items: {}
    };
  },
  created() {
    this.formatData()
  },
  watch: {
    inventory(){
      this.reload = false
      setTimeout(() => this.reload = true, 20);
    }
  },
  methods: {
    mostUsedWords(messages) {
      const words = messages
        .map(x => x.messages.map(o => o.message.split(" ")))
        .flat(2)
        .map(x => x.toLowerCase());
      const temp = words.reduce((acc, cur) => {
        acc[cur] ? acc[cur]++ : (acc[cur] = 1);
        return acc;
      }, {});
      const occurances = Object.keys(temp).map(x => ({
        word: x,
        value: temp[x]
      }));
      const sorted = occurances.sort((a, b) => b.value - a.value);
    },

    formatData(){
      const { Messages } = data;
      this.mostUsedWords(Messages);
      const usage = data.Usage;
      const keys = Object.keys(data.Usage);
      const toArray = obj => Object.keys(obj).map(x => ({ [x]: obj[x] }));
      const get = (obj, key) => ({ [key]: obj[key] });
      const objectSize = object => Object.keys(object).length;

      const add = (a, b) => a + b;
      const count = obj => Object.keys(obj).map(x => obj[x]).reduce(add, 0);

      const {
        app_opens,
        matches,
        messages_received,
        messages_sent,
        swipes_likes,
        swipes_passes
      } = usage;
    },

    getRandomColor(){
      return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    },

    choseData(type) {
      const { Messages } = data;
      this.mostUsedWords(Messages);
      const usage = data.Usage;
      const keys = Object.keys(data.Usage);
      const toArray = obj => Object.keys(obj).map(x => ({ [x]: obj[x] }));
      const get = (obj, key) => ({ [key]: obj[key] });
      const objectSize = object => Object.keys(object).length;

      const add = (a, b) => a + b;
      const count = obj => Object.keys(obj).map(x => obj[x]).reduce(add, 0);

      const {
        app_opens,
        matches,
        messages_received,
        messages_sent,
        swipes_likes,
        swipes_passes
      } = usage;

      const mass = {
        matches,
        swipes_passes,
        swipes_likes,
        messages_sent,
        messages_received,
        app_opens
      };

      const numbers = Object.keys(mass).map(x => ({ [x]: count(mass[x]) }));

      const items = Object.keys(mass).reduce((acc, key, index) => {
        acc[key] = count(mass[key]);
        return acc;
      }, {});




      const colors = {
        swipes_likes: '#fe5665',
        swipes_passes: '#2be6ae'
      }

      const color = colors[type] || this.getRandomColor()
      
      this.inventory.push({ label: this.labels[type], backgroundColor: color, data: [items[type]] })

     
      
    



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

.flexer {
  display:inline;
}
body {
  overflow-y: hidden;
}
</style>

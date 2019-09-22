<template>
  <div class="small">
    <line-chart :height="800" :width="800" :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    props: { data: Array },
    
    data () {
      return {
        datacollection: null
      }
    },
    created () {
      this.createGraph()
    },
    methods: {
      createGraph() {
        this.datacollection = {
          labels: ['statistics'],
          datasets: this.data.map(x => x).sort((a, b) => a.data - b.data)
        }
        this.data.forEach(e => console.log(e))
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
<template>
  <div class="small">
    <line-chart :height="800" :width="800" :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'

  export default {
    components: {
      BarChart
    },
    props: { data: Array },
    watch: {
      data(data) {
        this.datacollection = {
          labels: ['statistics'],
          datasets: data.map(x => x).sort((a, b) => a.data - b.data)
        }
      }
    },
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
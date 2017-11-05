<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Mango Tree</h1>
        {{mangoTree}}
      </b-col>
    </b-row>
    <b-card-group columns>
      <b-card v-for="tree in mangoTree" :key="tree['.key']" :header="tree.treeName">
        <p class="card-text text-left">
          Age: {{tree.age}}
        </p>
        <p class="card-text text-left">
          Height: {{tree.height}}
        </p>
        <p class="card-text text-left">
          Capacity: {{tree.capacity}}
        </p>
        <p class="card-text text-left">
          Fruits: {{Object.keys(tree.fruits).length}}
        </p>
        <p class="card-text text-left">
          Harvested: {{tree.harvested}}
        </p>
        <p class="card-text text-left">
          Health Status: {{tree.isHealthy}}
        </p>
      </b-card>
    </b-card-group>
  </b-container>
</template>
<script>
import db from '../assets/js/firebase.conf'
const mangoRef = db.ref('trees')

export default {
  name: 'DashboardComponent',

  data: () => ({}),

  firebase: {
    mangoTree: mangoRef
  }
}
</script>
<style scoped>
</style>

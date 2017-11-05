<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Mango Tree</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card-group deck>
          <b-card v-for="tree in mangoTree" :key="tree['.key']" :header="tree.treeName" :header-bg-variant="(tree._isHealthy) ? 'primary' : 'danger'">
            <p class="card-text text-left">
              Age: {{tree._age}}
            </p>
            <p class="card-text text-left">
              Height: {{tree._height}} Cm
            </p>
            <p class="card-text text-left">
              Last Capacity: {{tree._capacity}} Fruits
            </p>
            <p class="card-text text-left">
              Fruits:
              <ul class="inline-block">
                <li v-for="(fruit, index) in tree._fruits" :key="index">
                  Fruit: {{fruit.fruitName}}
                  Quality: {{fruit.quality}}
                </li>
              </ul>
            </p>
            <p class="card-text text-left">
              Last Harvested: {{tree._harvested}}
            </p>
            <p class="card-text text-left">
              Health Status: {{(tree._isHealthy) ? 'Healthy' : 'Dead'}}
            </p>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import db from '../assets/js/firebase.conf'
const mangoRef = db.ref('trees')

export default {
  name: 'DashboardComponent',

  data: () => ({
    mangoTree: ''
  }),

  firebase: {
    mangoTree: mangoRef
  }
}
</script>
<style scoped>
</style>

'use strict'

// Release 2
class FruitTree {
  // Initialize a new Tree
  constructor (maxHeightInc, maxYearHeight, maxYearFruit, firstFruit, maxCapacity) {
    this._age = 0
    this._height = 0
    this._capacity = 0
    this._fruits = []
    this._harvested = ''
    this._isHealthy = true

    this.maxHeightInc = maxHeightInc
    this.maxYearHeight = maxYearHeight
    this.maxYearFruit = maxYearFruit
    this.firstFruit = firstFruit
    this.maxCapacity = maxCapacity
  }

  getAge () {
    return this._age
  }
  getHeight () {
    return this._height
  }
  getFruits () {
    return this._fruits
  }
  getHarvested () {
    return this._harvested
  }
  getHealtyStatus () {
    return this._isHealthy
  }

  // Get current states here
  // Grow the tree
  grow () {
    this._age += 1
    if (this.getAge() <= this.maxYearHeight) {
      this._height += Math.floor(Math.random() * this.maxHeightInc) + 1
    }
  }

  checkLivingAge () {
    if (this.getAge() > this.maxYearFruit) {
      this._isHealthy = false
    }
  }

  // Get some fruits
  harvest () {
    let countAll = 0
    let countGood = 0
    let countBad = 0
    for (let i = 0; i < this.getFruits()
      .length; i++) {
      countAll++
      if (this._fruits[i].quality === 'good') {
        countGood++
      } else {
        countBad++
      }
    }
    this._harvested = countAll + ' (' + countGood + ' good, ' + countBad + ' bad)'
  }
}

class Fruit {
  constructor (quality) {
    (quality === 0) ? this.quality = 'bad' : this.quality = 'good'
  }
}

// release 0
class MangoTree extends FruitTree {
  constructor (maxHeightInc, maxYearHeight, maxYearFruit, firstFruit, maxCapacity) {
    super(maxHeightInc, maxYearHeight, maxYearFruit, firstFruit, maxCapacity)
    this.treeName = 'Mango Tree'
  }
  // Produce some fruits
  produceFruits () {
    let fruits = []
    this._capacity = Math.floor(Math.random() * this.maxCapacity) + 1
    if (this.getHealtyStatus()) {
      for (let i = 0; i < this._capacity; i++) {
        let fruit = new Mango(Math.round(Math.random()))
        fruits.push(fruit)
      }
    }
    this._fruits = fruits
  }
}
class Mango extends Fruit {
  // Produce a mango
  constructor (quality) {
    super(quality)
    this.fruitName = 'Mango'
  }
}

// Release 1
class AppleTree extends FruitTree {
  constructor (maxHeightInc, maxYearHeight, maxYearFruit, firstFruit, maxCapacity) {
    super(maxHeightInc, maxYearHeight, maxYearFruit, firstFruit, maxCapacity)
    this.treeName = 'Apple Tree'
  }
  // Produce some fruits
  produceFruits () {
    let fruits = []
    this._capacity = Math.floor(Math.random() * this.maxCapacity) + 1
    if (this.getHealtyStatus()) {
      for (let i = 0; i < this._capacity; i++) {
        let fruit = new Apple(Math.round(Math.random()))
        fruits.push(fruit)
      }
    }
    this._fruits = fruits
  }
}
class Apple extends Fruit {
  // Produce a mango
  constructor (quality) {
    super(quality)
    this.fruitName = 'Apple'
  }
}

class PearTree extends FruitTree {
  constructor (maxHeightInc, maxYearHeight, maxYearFruit, firstFruit, maxCapacity) {
    super(maxHeightInc, maxYearHeight, maxYearFruit, firstFruit, maxCapacity)
    this.treeName = 'Pear Tree'
  }
  // Produce some fruits
  produceFruits () {
    let fruits = []
    this._capacity = Math.floor(Math.random() * this.maxCapacity) + 1
    if (this.getHealtyStatus()) {
      for (let i = 0; i < this._capacity; i++) {
        let fruit = new Pear(Math.round(Math.random()))
        fruits.push(fruit)
      }
    }
    this._fruits = fruits
  }
}
class Pear extends Fruit {
  // Produce a mango
  constructor (quality) {
    super(quality)
    this.fruitName = 'Pear'
  }
}

require('dotenv')
  .config()
const CronJob = require('cron')
  .CronJob
const firebase = require('firebase')
const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL
}
let app = firebase.initializeApp(config)
let db = app.database()
let treeRef = db.ref('trees')

treeRef.set(null)
  .then((value) => {
    console.log('Initial Set as null')
    let newAppleTree = treeRef.push()
    let appleTree = new AppleTree(20, 10, 20, 2, 23)
    let newMangoTree = treeRef.push()
    let mangoTree = new MangoTree(21, 14, 15, 3, 20)
    let newPearTree = treeRef.push()
    let pearTree = new PearTree(25, 22, 10, 4, 23)

    Promise.all([newAppleTree.set(appleTree), newMangoTree.set(mangoTree), newPearTree.set(pearTree)])
      .then(() => {
        console.log('Created new tree: ', appleTree.treeName)
        console.log('Created new tree: ', mangoTree.treeName)
        console.log('Created new tree: ', pearTree.treeName)

        let job = new CronJob({
          cronTime: '1-59/2 * * * *',
          onTick: function () {
            console.log('Running Cron')
            if (appleTree.getHealtyStatus() !== false) {
              appleTree.grow()
              appleTree.produceFruits()
              appleTree.harvest()
              appleTree.checkLivingAge()
              newAppleTree.update(appleTree)
                .then(() => {
                  console.log(appleTree)
                })
                .catch((err) => {
                  console.error(err)
                })
            }
            if (mangoTree.getHealtyStatus() !== false) {
              mangoTree.grow()
              mangoTree.produceFruits()
              mangoTree.harvest()
              mangoTree.checkLivingAge()
              newMangoTree.update(mangoTree)
                .then(() => {
                  console.log(mangoTree)
                })
                .catch((err) => {
                  console.error(err)
                })
            }
            if (pearTree.getHealtyStatus() !== false) {
              pearTree.grow()
              pearTree.produceFruits()
              pearTree.harvest()
              pearTree.checkLivingAge()
              newPearTree.update(pearTree)
                .then(() => {
                  console.log(pearTree)
                })
                .catch((err) => {
                  console.error(err)
                })
            }
          },
          start: false,
          timeZone: 'Asia/Jakarta'
        })
        job.start()
      })
      .catch((err) => {
        console.error(err)
      })
  })
  .catch((err) => {
    console.error(err)
  })

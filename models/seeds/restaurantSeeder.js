const Restaurant = require('../restaurant') 
const restaurants = require("../../restaurants.json").results
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurants)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant') 
const User = require('../user')
const restaurantsList = require("../../restaurants.json").results
const db = require('../../config/mongoose')

const USER_SEEDERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
    ownRestaurantsIndex: [0, 1, 2]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    ownRestaurantsIndex: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(
    USER_SEEDERS.map((user) => {
      const { email, password, ownRestaurantsIndex} = user
      return User.create({
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(12))
      })
      .then((user) => {
        const restaurants = ownRestaurantsIndex.map((index) => {
          const restaurant = restaurantsList[index]
          restaurant.userId = user._id
          return restaurant
        })
        return Restaurant.create(restaurants) 
      })
    })
  )
  .then(() => {
    console.log("restaurantSeeder done!")
    db.close()
  })
  .catch(err => console.log(err))  
})
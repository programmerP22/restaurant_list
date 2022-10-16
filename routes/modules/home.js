const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')
const sortSelector = require('../../utilities/sortSelector');

//homepage
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants })
    })
    .catch(err => console.log(err))
})

// search page
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
      )
      res.render('index', { restaurants: filteredRestaurants, keyword })
    })
    .catch(error => console.error(error))
})

//sort function
router.get('/search/sort', (req, res) => {
  const sortingType = req.query.sortingType

  Restaurant.find()
    .sort(sortSelector(sortingType))
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})
module.exports = router
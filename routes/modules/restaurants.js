const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//new webpage
router.get('/new', (req, res) => {
  res.render("new")
})

//create function
router.post('/', (req, res) => {
  req.body.userId = req.user._id
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//show detail webpage
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// edit webpage
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

//edit function
router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body
  Restaurant.findOne({ _id, userId })
    .then(
      (restaurant) => {
        (restaurant.name = name),
        (restaurant.name_en = name_en),
        (restaurant.category = category),
        (restaurant.image = image),
        (restaurant.location = location),
        (restaurant.phone = phone),
        (restaurant.google_map = google_map),
        (restaurant.rating = rating),
        (restaurant.description = description)
        return restaurant.save()
      }
    )
    .then(() => { res.redirect(`/restaurants/${_id}`) })
    .catch(err => console.log(err))
})

//delete function
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
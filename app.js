// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') 
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/Restaurant')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting

// index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants })
    })
    .catch(err => console.log(err))
})

// search
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find({})
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

//new webpage
app.get('/restaurants/new', (req, res) => {
  res.render("new")
})

//create function
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//show detail webpage
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// edit webpage
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

//edit function
app.post("/restaurants/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(()=> {res.redirect(`/restaurants/${id}`)})
    .catch(err => console.log(err))
})

//delete function
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
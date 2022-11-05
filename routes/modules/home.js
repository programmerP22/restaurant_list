const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortSelector = require('../../utilities/sortSelector');

//homepage
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
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
  const userId = req.user._id
  //在find()方法裡，先加入 ＄OR 条件语句 讓搜尋字串只要符合name或category其中一項便可，然後再使用正則表達式 $regex，搜尋包含搜尋字串的餐廳，最後再設置 $options 為 $i，讓搜尋結果不區分大小寫。
  Restaurant.find({
    userId,
    $or: [
      { name: { $regex: keyword, $options: 'i', } },
      { category: { $regex: keyword, $options: 'i', } },
    ]
  })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.error(error))
})

//sort function
router.get('/search/sort', (req, res) => {
  const sortingType = req.query.sortingType
  const userId = req.user._id
  Restaurant.find({ userId })
    .sort(sortSelector(sortingType))
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})
module.exports = router
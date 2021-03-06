const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

const cateLists = ['中東料理', '日本料理', '義式餐廳', '美式', '酒吧', '咖啡']

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use('/webfonts', express.static('./public/stylesheets/webfonts'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, hasResults: true })
})

app.get('/restaurants/:rest_id', (req, res) => {
  const restaurantId = req.params.rest_id;
  const restaurant = restaurantList.results.find((rest) => {
    return rest.id.toString() === restaurantId
  })
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter((rest) => {
    if (cateLists.includes(keyword)) {
      return rest.category.includes(keyword)
    } else {
      return rest.name.toLowerCase().includes(keyword.toLowerCase())
    }
  })
  let hasResults = false
  if (restaurants.length > 0) {
    hasResults = true
  }
  res.render('index', { restaurants: restaurants, keyword: keyword, hasResults: hasResults })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

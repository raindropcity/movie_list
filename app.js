// 從node module中載入Express與Express-Handlebars
const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
const app = express()

// Define localhost ralated variables
const port = 3000

// 告訴Express模板引擎要使用Handlebars
// app.engine()解釋：定義要使用的樣板引擎。第一個參數是這個樣板引擎的名稱(就是副檔名)；第二個參數是放入和此樣板引擎相關的設定。這裡設定了預設的佈局(default layout)需使用名為main的檔案。 所以Express會去抓main.handlebars這支檔案。
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 透過app.set()告訴Express說要設定的view engine是handlebars
app.set('view engine', 'handlebars')

// 靜態檔案所在的資料夾
// 告訴 Express 靜態檔案是放在名為 public 的資料夾中，它不必針對這個資料夾內的檔案做什麼，只要產生對應的路由讓我們可以使用就好
app.use(express.static('public'))

// 設定路由
app.get('/', (req, res) => {
  // res.render()是指Express會「回傳HTML來呈現前端樣板」
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

app.get('/movie/:movie_id', (req, res) => {
  const movie = movieList.results.filter((movie) => {
    return movie.id === Number(req.params.movie_id)
  })

  res.render('show', { movieList: movie[0] })
})

// 監聽並啟動伺服器
app.listen(port, () => {
  console.log(`Movie list server started on localhost:${port}!`)
})
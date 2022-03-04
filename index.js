const express = require('express')
const app = express()
const port = 3001
const obj = require('./restorans.json');
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/restorants', (req, res) => {
  const results = obj.restaurants.sort((first, second) => {
    let firstRating = first.reviews.reduce((prev, curr) => prev + curr.rating, 0) / first.reviews.length;
    let secondRating = second.reviews.reduce((prev, curr) => prev + curr.rating, 0) / second.reviews.length;

    return secondRating - firstRating;
  })
  res.json(results);
})

app.get('/restorants/:id', (req, res) => {
  res.json(obj.restaurants.find(v => v.id == req.params.id) || null);
})

app.post('/restorants/:id', (req, res) => {
  const restaurant = obj.restaurants.find(v => v.id == req.params.id);
  const data = {...req.body, date: new Date() }; 
  restaurant.reviews.push(data);
  res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})



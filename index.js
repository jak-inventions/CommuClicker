const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

let score = 0;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.listen(port, () => console.log(`Running on port ${port}`));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/getScore', (req, res) => {
  res.send(''+score);
});

app.post('/increment', (req, res) => {
  score++;
  res.send(''+score);
});

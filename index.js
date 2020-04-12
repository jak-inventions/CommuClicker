const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.listen(port, () => console.log(`Running on port ${port}`));

app.get('/', (req, res) => {
  res.render('index');
});

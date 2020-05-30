const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socket = require('socket.io');
let io;

//  Constants
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/comclicker';
const UniversalScore = require('./models/UniversalScore.js');
const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
  io = require('socket.io')(server);
});

// DB Vars
let db;
let scoreCollection;

// App settings
app.set('view engine', 'pug');
app.set('views', './views');
mongoose.connect(
  mongoURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

// Middleware

app.use(express.static('public'));

// Score functions
const getScore = async () => {
  const universalScore = await UniversalScore.findOne({});
  return universalScore.score;
}

const addToScore = () => {
  UniversalScore.findOne({}, async (err, universalScore) => {
    universalScore.score = await getScore() + 1;
    universalScore.save();
  });
}

const initScore = async (req, res, next) => {
  const scoreExists = await UniversalScore.findOne({});
  if(!scoreExists){
    const score = new UniversalScore({
      score: 0
    });
    score.save();
  }
}

// Routers
app.get('/', async (req, res) => {
  await initScore();
  res.render('index', {
    topPlayers: ['Coming soon']
  });
});

app.get('/score', async (req, res) => {
  res.send('' + await getScore());
});

app.post('/increment', async (req, res) => {
  addToScore();
  io.emit('updateScore', { score: await getScore() });
  res.send('' + await getScore());
});

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//  Constants
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/comclicker';
const UniversalScore = require('./models/UniversalScore.js');
const User = require('./models/User.js');
let io;
const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
  io = require('socket.io')(server);
});

// Routers
const authRouter = require('./routers/auth.js');

// App settings
app.set('view engine', 'pug');
app.set('views', './views');
dotenv.config();
mongoose.connect(
  mongoURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

// Middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
// Router Middleware
app.use('/api/user/', authRouter);

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

const initScore = async () => {
  const scoreExists = await UniversalScore.findOne({});
  if(!scoreExists){
    const score = new UniversalScore({
      score: 0
    });
    score.save();
  }
}

// Get top players
const getTopPlayers = async () => {
  const userArray = await User.find({});
  var topTen = userArray.sort((a,b) => b.score-a.score).slice(0,10);
  const usernames = [];
  topTen.forEach((user) => {
    usernames.push(user.username);
  });
  return usernames;
}

// Routers
app.get('/', async (req, res) => {
  await initScore();
  res.render('index', {
    topPlayers: await getTopPlayers()
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

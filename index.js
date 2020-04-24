const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const socket = require('socket.io');
let io;

//  Constants
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
const dbName = process.env.MONGODB_URI ? 'heroku_9xwgz2ht' : 'mydb';

// DB Vars
let db;
let scoreCollection;

// App settings
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

// Score functions
async function getScore(){
  let query = { name: 'scoreCount' };
  let result = await scoreCollection.findOne(query);
  return result.score;
}

async function addToScore(){
  var query = { name: 'scoreCount' };
  var newObj = {
    $set: {
      score: parseInt(await getScore()) + 1
    }
  };
  scoreCollection.updateOne(query, newObj);
}

function initScore(){
  let query = {name: 'scoreCount'};
  scoreCollection.find(query).toArray((err, result) => {
    if (err) throw err;
    if(result.length == 0){
      let myobj = {name: 'scoreCount', score: 0};
      scoreCollection.insertOne(myobj, (err, res) => {
        if (err) throw err;
      });
    }
  });
}

// Starts server after connecting to MongoDB database
MongoClient.connect(mongoURI, {useUnifiedTopology: true}, async (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  scoreCollection = db.collection('score');
  const server = app.listen(port, () => console.log(`Running on port ${port}`));
  io = require('socket.io')(server);
});

// Routers
app.get('/', async (req, res) => {
  initScore();
  res.render('index');
});

app.get('/score', async (req, res) => {
  res.send('' + await getScore());
});

app.post('/increment', async (req, res) => {
  await addToScore();
  io.emit('updateScore', { score: await getScore() });
  res.send('' + await getScore());
});

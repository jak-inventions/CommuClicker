const express = require('express');
const app = express();
let MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
const dbName = process.env.MONGODB_URI ? 'heroku_9xwgz2ht' : 'mydb';
let db;
let scoreCollection;
let score = 0;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

async function getScore(){
  let query = { name: 'scoreCount' };
  return await new Promise((resolve, reject) => {
    scoreCollection.findOne(query, (err, result) => {
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    });
  });
}

function addToScore(){
  var query = { name: 'scoreCount' };
  var newObj = {
    $set: {
      score: getScore() + 1
    }
  };
  scoreCollection.updateOne(query, newObj, function(err, res) {
    if (err) throw err;
  });
}

function initScore(){
  let query = {name: 'scoreCount'};
  scoreCollection.find(query).toArray(function(err, result) {
    if (err) throw err;
    if(result.length == 0){
      let myobj = {name: 'scoreCount', score: 0};
      scoreCollection.insertOne(myobj, function(err, res) {
        if (err) throw err;
      });
    }
  });
}

MongoClient.connect(mongoURI, {useUnifiedTopology: true}, function(err, client) {
  if (err) throw err;
  db = client.db(dbName);
  scoreCollection = db.collection('score');
  getScore().then(
  (result) => {
    console.log(result)
  });
  app.listen(port, () => console.log(`Running on port ${port}`));
});

app.get('/', (req, res) => {
  initScore();
  res.render('index');
});

app.post('/getScore', (req, res) => {
  res.send(''+score);
});

app.post('/increment', (req, res) => {
  score++;
  res.send(''+score);
});

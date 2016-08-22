const express = require('express');
const graphQLHTTP = require('express-graphql');
const bodyParser = require('body-parser')

const schema = require('./schema');
const db = require('./db');

const PORT = 3001;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(graphQLHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  res.send('hello test');
});

app.get('/notifications', (req, res) => {
  db.getAllNotification()
    .then(notifications => {
      res.send({
        notifications: Object.keys(notifications).map(id => Object.assign(notifications[id], { id }))
      })
    });
});

app.get('/notifications/:id', (req, res) => {
  db.getNotificationById(req.params.id)
    .then(notification => res.send(notification));
});

app.get('/senders', (req, res) => {
  db.getAllSenders()
    .then(senders => res.send(senders));
});

app.get('/senders/:id', (req, res) => {
  db.getSendersById(req.params.id)
    .then(sender => res.send(sender));
});

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}/`);
});
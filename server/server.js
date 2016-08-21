const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const PORT = 3001;
const db = `https://notifications-poc-d793c.firebaseio.com`;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('hello test');
});

app.get('/notifications', (req, res) => {
  fetch(`${db}/notifications.json`)
    .then(res => res.json())
    .then(notifications => {
      res.send({
        notifications: Object.keys(notifications).map(id => Object.assign(notifications[id], { id }))
      })
    });
});

app.get('/notifications/:id', (req, res) => {
  fetch(`${db}/notifications/${req.params.id}.json`)
    .then(res => res.json())
    .then(notification => res.send(notification));
});

app.get('/senders', (req, res) => {
  fetch(`${db}/senders.json`)
    .then(res => res.json())
    .then(senders => res.send(senders));
});

app.get('/senders/:id', (req, res) => {
  fetch(`${db}/senders/${req.params.id}.json`)
    .then(res => res.json())
    .then(sender => res.send(sender));
});


app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}/`);
});
const express = require('express');
const graphQLHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const DataLoader = require('dataloader');

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

app.use(graphQLHTTP(() => {
  const senderLoader = new DataLoader(
    keys => Promise.all(keys.map(db.getSendersById))
  );
  const loaders = {
    sender: senderLoader
  };
  return {
    context: { loaders },
    schema,
    graphiql: true
  }
}));

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}/`);
});
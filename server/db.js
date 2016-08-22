const fetch = require('node-fetch');

const db = `https://notifications-poc-d793c.firebaseio.com`;

const getAllNotification = () => {
  const url = `${db}/notifications.json`;
  console.log(url);
  return fetch(url)
    .then(res => res.json());
};

const getNotificationById = (id) => {
  const url = `${db}/notifications/${id}.json`;
  console.log(url);
  return fetch(url)
    .then(res => res.json());
};

const getAllSenders = (id) => {
  const url = `${db}/senders.json`;
  console.log(url);
  return fetch(url)
    .then(res => res.json())
};

const getSendersById = (id) => {
  const url = `${db}/senders/${id}.json`;
  console.log(url);
  return fetch(url)
    .then(res => res.json())
};

module.exports = {
  getAllNotification,
  getNotificationById,
  getAllSenders,
  getSendersById
}
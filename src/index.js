import Relay from 'react-relay';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import './index.css';

const route = {
  queries: {
    unread: () => {
      return Relay.QL`
        query {
          unread
        }
      `
    }
  },
  params: {},
  name: 'AppRoute'
}

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={route} />,
  document.getElementById('root')
);

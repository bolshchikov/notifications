import Relay from 'react-relay';
import React, { Component } from 'react';
import './app.css';

import Badge from '../badge/badge';
import Notifications from '../notifications/notifications';

class App extends Component {

  componentWillMount() {
    this.setState({
      isOpened: false
    });
  }

  toggle() {
    this.setState({
      isOpened: !this.state.isOpened
    });
  }

  render() {
    return (
      <div className="app">
        <Badge onClick={() => this.toggle() }/>
        {this.state.isOpened && <Notifications />}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    unread: () => Relay.QL`
      fragment on Unread {
        unread
      }
    `
  }
});

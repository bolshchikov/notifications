import 'whatwg-fetch';
import React, { Component } from 'react';
import './badge.css';

class Badge extends Component {

  calculateUnreadNotification(data) {
    const unread = Object.keys(data).filter(key => !data[key].read).length;
    this.setState({ unread });
  }

  setInitialState() {
    this.setState({
      unread: 0
    });
  }

  componentWillMount() {
    this.setInitialState();

    fetch(`http://localhost:3001/notifications`)
      .then(data => data.json())
      .then(json => this.calculateUnreadNotification(json));
  }

  render() {
    const { onClick } = this.props;
    const { unread } = this.state;
    return (
      <div className="badge center" onClick={onClick}>
        {unread}
      </div>
    );
  }
}

export default Badge;
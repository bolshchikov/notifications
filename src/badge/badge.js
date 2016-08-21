import 'whatwg-fetch';
import React, { Component } from 'react';
import './badge.css';

class Badge extends Component {

  getUnreadNotification(notifications) {
    const unread = notifications.filter(notification => !notification.read).length;
    this.setState({ unread });
  }

  getAllNotifications() {
    return fetch(`http://localhost:3001/notifications`)
      .then(data => data.json())
  }

  setInitialState() {
    this.setState({
      unread: 0
    });
  }

  componentWillMount() {
    this.setInitialState();
    this.getAllNotifications()
      .then(data => this.getUnreadNotification(data.notifications));
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
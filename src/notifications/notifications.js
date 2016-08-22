import React, { Component } from 'react';
import './notifications.css';

class Notifications extends Component {

  getAllNotifications() {
    return fetch(`http://localhost:3001/notifications`)
      .then(data => data.json())
  }

  sortNotification(notifications) {
    this.setState({
      notifications: notifications.sort((a, b) => a.createdAt - b.createdAt)
    })
  }

  setInitalState() {
    this.setState({
      notifications: []
    });
  }

  componentWillMount() {
    this.setInitalState();
    this.getAllNotifications()
      .then(data => this.sortNotification(data.notifications));
  }

  render() {
    const { notifications } = this.state;
    return (
      <div className="notifications">
        <h3 className="notifications-header">
          Notifications
        </h3>
        <ul className="notifications-list">
          { notifications.map((notification) => {
            let date = new Date(notification.createdAt);
            return (
              <li className="notification" key={notification.id}>
                <div className="notification-title">
                  <span>{notification.title}</span> | <span className="notification-date">{date.toString()}</span>
                  <button className="notification-mark">mark as read</button>
                </div>
                <div className="notification-body">
                  {notification.body}
                </div>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}

export default Notifications;
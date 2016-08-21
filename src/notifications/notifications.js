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
            return (
              <li className="notification-body" key={notification.id}>
                <span>{notification.title}</span>
                <button className="notification-mark">mark as read</button>  
              </li>);
          }) }
        </ul>
      </div>
    );
  }
}

export default Notifications;
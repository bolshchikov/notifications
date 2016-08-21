import React, { Component } from 'react';
import './notifications.css';

class Notifications extends Component {
  render() {
    return (
      <div className="notifications">
        <h3 className="notifications-header">
          Notifications
        </h3>
        <ul className="notifications-list">
          <li>Notification 1</li>
          <li>Notification 2</li>
          <li>Notification 3</li>
        </ul>
      </div>
    );
  }
}

export default Notifications;
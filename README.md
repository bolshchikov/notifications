# Notifications POC

## Purpose
The purpose of this project is to validate technologies. Mainly Relay and GraphQL. 

## Description
The app aims to build the notification functionality with the following requirements:

1. The component `notifications-badge` should display a badge with unread notifications;
2. The component `notifications` should display the list of **read** and **unread** notifications;
3. **unread** notifications should be displayed first;
4. **unread** notification should have **mark as read** functionality;

## Architecture
Firebase is used a database that stores all notifications. Server side is written in node with 
Express and GraphQL that does REST requsts to the database. Relay on the client side manages data fetching.

## Start

1. `npm run server` launches the server on `http://localhost:3001`
2. `npm run start` launches the client side on `http://localhost:3000`

## License
MIT 


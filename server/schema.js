const graphql = require('graphql');

const db = require('./db');

const SenderType = new graphql.GraphQLObjectType({
  name: 'Sender',
  fields: {
    id: { type: graphql.GraphQLString },
    link: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

const NotificationType = new graphql.GraphQLObjectType({
  name: 'Notification',
  fields: {
    id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    body: { type: graphql.GraphQLString },
    createdAt: { type: graphql.GraphQLInt },
    read: { type: graphql.GraphQLBoolean },
    sender: {
      type: SenderType,
      resolve: (notification) => db.getSendersById(notification.senderId)
    }
  }
});

module.exports = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: {
      feed: {
        type: new graphql.GraphQLList(NotificationType),
        resolve: () => db.getAllNotification()
          .then(notifications => Object.keys(notifications).map(id => Object.assign({}, notifications[id])))
      },
      unread: {
        type: graphql.GraphQLInt,
        description: 'Number of unread notifications',
        resolve: () => db.getAllNotification()
          .then(notifications => Object.keys(notifications).filter(id => !notifications[id].read))
          .then(unreadNotifications => unreadNotifications.length)
      },
      notification: {
        type: NotificationType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (root, args) => db.getNotificationById(args.id)
      }
    }
  })
});
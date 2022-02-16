const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const { cars, users } = require('./data');
const me = users[0];

const typeDefs = gql`
    type Query {
        me: User
        users: [User]!
        user(id: ID!): User
        cars: [Car]!
        car(id: ID!): Car
    }

    type User {
        id: ID!
        name: String!
    }

    type Car {
        id: ID!
        maker: String!
        model: String!
        color: String!
    }
`;

const resolvers = {
    Query: {
        me: () => me,
        users: () => users,
        user: (_parent, arguments, _context, _info) =>
            users.find((user) => user.id === arguments.id),
        cars: () => cars,
        car: (_parent, arguments, _context, _info) => cars.find((user) => user.id === arguments.id),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen(3000, () => console.info('Apollo GraphQL server is running on port 3000'));
});

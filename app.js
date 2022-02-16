const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
let cars = require('./data').cars;
let users = require('./data').users;
const me = users[0];

const typeDefs = gql`
    type Query {
        me: User
        users: [User]!
        user(id: ID!): User
        cars: [Car!]!
        car(id: ID!): Car
    }

    type Mutation {
        makeUser(name: String!): User!
        removeUser(id: ID!): Boolean
        makeCar(make: String!, model: String!, color: String!, ownedBy: ID!): Car!
        removeCar(id: ID!): Boolean
    }

    type User {
        id: ID!
        name: String!
        cars: [Car!]!
    }

    type Car {
        id: ID!
        make: String!
        model: String!
        color: String!
        owner: User!
    }
`;

const resolvers = {
    Query: {
        me: () => me,
        users: () => users,
        user: (_parent, arguments, _context, _info) =>
            users.find((user) => user.id === arguments.id),
        cars: () => cars,
        car: (_parent, arguments, _context, _info) => cars.find(({ id }) => id === arguments.id),
    },
    Mutation: {
        makeUser: (parent, { name }) => {
            const nextId = parseInt(users[users.length - 1].id, 10) + 1;
            const newUser = { id: nextId, name, cars: [] };
            users.push(newUser);
            return newUser;
        },
        removeUser: (parent, { id }) => {
            let found = false;
            users = users.filter((user) => {
                if (user.id === id) {
                    found = true;
                    return false;
                }
                return true;
            });
            return found;
        },
        makeCar: (parent, { model, make, color, ownedBy }) => {
            const nextId = parseInt(cars[cars.length - 1].id, 10) + 1;
            const newCar = { id: nextId, model, make, color, ownedBy };
            cars.push(newCar);
            return newCar;
        },
        removeCar: (parent, { id }) => {
            let found = false;
            cars = cars.filter((car) => {
                if (car.id === id) {
                    found = true;
                    return false;
                }
                return true;
            });
            return found;
        },
    },
    Car: {
        owner: (parent) => users.find(({ id }) => id === parent.ownedBy),
    },
    User: {
        cars: (parent) => parent.cars.map((carId) => cars.find(({ id }) => id === carId)),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen(3000, () => console.info('Apollo GraphQL server is running on port 3000'));
});

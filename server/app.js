require('dotenv').config();

const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const models = require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const getLoggedInUser = (req) => {
    const token = req.headers['x-auth-token'];
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Session expired');
        }
    }
    return null;
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        models,
        secret: process.env.JWT_SECRET,
        me: getLoggedInUser(req),
    }),
});

server.start().then(() => {
    server.applyMiddleware({ app });
    app.use(cors);

    app.listen(3000, () => console.info('Apollo GraphQL server is running on port 3000'));
});

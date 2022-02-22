const { gql } = require('apollo-server-express');

/**
 * Only user-related definitions
 */
const typeDefs = gql`
    scalar CloudinaryOptions

    extend type Query {
        me: User
        users: [User]!
        user(id: ID!): User
    }

    extend type Mutation {
        registerUser(name: String!, username: String!, password: String!): User
        removeUser(id: ID!): Boolean
        login(username: String!, password: String!): Token!
        uploadImage(filename: String!): String!
    }

    type User {
        id: ID!
        name: String!
        username: String!
        photo(options: CloudinaryOptions): String
        cars: [Car!]!
    }

    type Token {
        token: String!
    }
`;

module.exports = typeDefs;

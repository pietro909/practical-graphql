const { gql } = require('apollo-server-express');

/**
 * Only user-related definitions
 */
const typeDefs = gql`
    extend type Query {
        me: User
        users: [User]!
        user(id: ID!): User
    }

    extend type Mutation {
        makeUser(name: String!): User!
        removeUser(id: ID!): Boolean
    }

    type User {
        id: ID!
        name: String!
        cars: [Car!]!
    }
`;

module.exports = typeDefs;

const { gql } = require('apollo-server-express');

/**
 * Only car-related definitions
 */
const typeDefs = gql`
    extend type Query {
        cars: [Car!]!
        car(id: ID!): Car
    }

    extend type Mutation {
        makeCar(make: String!, model: String!, color: String!, ownedBy: ID!): Car!
        removeCar(id: ID!): Boolean
    }

    type Car {
        id: ID!
        make: String!
        model: String!
        color: String!
        owner: User!
    }
`;

module.exports = typeDefs;

const { gql } = require('apollo-server-express');

const defaultSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

module.exports = defaultSchema;

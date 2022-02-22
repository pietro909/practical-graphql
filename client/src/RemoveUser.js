import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import query from './query';

const removeUser = gql`
    mutation removeUser($id: ID!) {
        removeUser(id: $id)
    }
`;

export default class RemoveUser extends Component {
    render() {
        return (
            <Mutation mutation={removeUser} refetchQueries={[{ query }]} awaitRefetchQueries={true}>
                {(removeUser, { loading, error }) => (
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            removeUser({
                                variables: { id: this.props.id },
                            });
                        }}
                    >
                        <span>Delete</span>
                        {loading && <p>Adding user...</p>}
                        {error && <p>Error!</p>}
                    </button>
                )}
            </Mutation>
        );
    }
}

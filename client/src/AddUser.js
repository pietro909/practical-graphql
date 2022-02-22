import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import query from './query';

const addUser = gql`
    mutation makeUser($name: String!) {
        makeUser(name: $name) {
            id
            name
            cars {
                make
            }
        }
    }
`;

export default class AddUser extends Component {
    state = {
        name: '',
    };

    resetFields = () => {
        this.setState({ name: '' });
    };

    nameChanged = ({ target: { value } }) => {
        this.setState({ name: value });
    };

    render() {
        return (
            <Mutation mutation={addUser} refetchQueries={[{ query }]} awaitRefetchQueries={true}>
                {(makeUser, { loading, error }) => (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            makeUser({
                                variables: { name: this.state.name },
                            });
                            this.resetFields();
                        }}
                    >
                        <label>
                            <span>Name</span>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.nameChanged}
                            />{' '}
                        </label>
                        <div>
                            <button>Add User</button>
                        </div>
                        {loading && <p>Adding user...</p>}
                        {error && <p>Error!</p>}
                    </form>
                )}
            </Mutation>
        );
    }
}

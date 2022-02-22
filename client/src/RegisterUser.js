import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import query from './query';

const registerUser = gql`
    mutation registerUser($name: String!, $username: String!, $password: String!) {
        registerUser(name: $name, username: $username, password: $password) {
            id
            name
            cars {
                make
            }
        }
    }
`;

export default class RegisterUser extends Component {
    state = {
        name: '',
        username: '',
        password: '',
    };

    resetFields = () => {
        this.setState({ name: '', username: '', password: '' });
    };

    fieldChanged =
        (id) =>
        ({ target: { value } }) => {
            this.setState({ [id]: value });
        };

    render() {
        return (
            <Mutation
                mutation={registerUser}
                refetchQueries={[{ query }]}
                awaitRefetchQueries={true}
            >
                {(registerUser, { loading, error }) => (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            registerUser({ variables: { ...this.state } });
                            this.resetFields();
                        }}
                    >
                        <label htmlFor="name">Name </label>
                        <input
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.fieldChanged('name')}
                        />
                        <label htmlFor="username">Username </label>
                        <input
                            id="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.fieldChanged('username')}
                        />
                        <label htmlFor="password">Password </label>
                        <input
                            id="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.fieldChanged('password')}
                        />
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

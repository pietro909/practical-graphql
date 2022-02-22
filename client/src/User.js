import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import query from './query';
import AddUser from './AddUser';

export default class User extends Component {
    render() {
        return (
            <div>
                <AddUser />
                <hr />
                <Query query={query}>
                    {({ data, loading }) => {
                        if (loading) {
                            return <p>Loading...</p>;
                        }
                        return (
                            <div>
                                <ul>
                                    {data.users.map(({ id, name, cars }) => (
                                        <li key={id}>
                                            {name}
                                            <ul>
                                                {cars.length !== 0 ? (
                                                    cars.map(({ id, make, model, color }) => (
                                                        <li key={`${id}-${make}`}>
                                                            {make} {model} {color}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>{'No cars'}</li>
                                                )}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import query from './query';

export default class User extends Component {
    render() {
        return (
            <div>
                <Query query={query}>
                    {({ data }) => {
                        console.log(data);
                        return null;
                    }}
                </Query>
            </div>
        );
    }
}

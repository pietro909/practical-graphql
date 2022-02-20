import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import User from './User';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <div>
            <ApolloProvider client={apolloClient}>
                <User />
            </ApolloProvider>
        </div>
    );
}

export default App;

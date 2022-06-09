import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClient from "./components/AddClient";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

//setting new client with graphql uri
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClient />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;

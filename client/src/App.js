import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import NotFound from "./pages/NotFound";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";

//setting new client with graphql uri
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
        <Header />
        <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
         
        </div>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;

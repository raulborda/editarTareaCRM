import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";

// const PORT = `4002`; //puerto de escucha de GraphQL
// const PROTOCOL = window.location.protocol;
// const HOSTNAME = window.location.hostname;
// const SEARCH = window.location.search;
// const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}/${SEARCH}`;

const Client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    // uri: URL,
    uri: `http://beeapp.binamics.com.ar:4002`,
    fetch,
  }),
});

export default Client;

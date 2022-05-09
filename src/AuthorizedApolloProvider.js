import React, { useState, useEffect } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  concat,
  split
} from "@apollo/client";

import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const isProduction = process.env.REACT_APP_ENVIRONMENT === "production";

const AuthorizedApolloProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = document.cookie
      ?.split("; ")
      ?.find((x) => x.startsWith("serviceToken"))
      ?.split("=")[1];
    if (token && !accessToken) {
      setAccessToken(token);
    }
  }, []);

  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  // for local & production
  // const httpLink = createHttpLink({
  //   uri: "/graphql",
  // });

  const httpLink = createUploadLink({
    uri: "/graphql",
  });

  //for production
  const wsLink = isProduction && new WebSocketLink({
    uri: "wss://api-dot-lpsync-staging.uc.r.appspot.com/subscriptions",
    options: {
      reconnect: true,
      connectionParams: async () => {
        return {
          Authorization: accessToken || null,
        };
      },
    },
  });

  // for local
  // const wsLink = new WebSocketLink({
  //   uri: "ws://localhost:8080/subscriptions",
  //   options: {
  //     reconnect: true,
  //     connectionParams: async () => {
  //       debugger
  //       return {
  //         Authorization: accessToken || null,
  //       };
  //     },
  //   },
  // });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({headers = {}}) => ({
      headers: {
        ...headers,
        authorization: accessToken || null,
      },
    }));

    return forward(operation);
  });

  const splitLink = isProduction && split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    concat(authMiddleware, httpLink)
  );

  const client = new ApolloClient({
    // disabled for prod
    // link: splitLink,
    cache: new InMemoryCache({
      addTypename: true,
    }),
    link: isProduction ? splitLink : concat(authMiddleware, httpLink),
    // link: concat(authMiddleware, splitLink),
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;

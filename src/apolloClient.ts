import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const getToken = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const authLink = setContext((_, { headers }) => {
  const token = getToken("__session");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const uploadLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log("🚀 ~ graphQLErrors.map ~ locations:", locations);
      console.log(
        `graphql error -> message: ${message}, locations: ${locations}, path: ${path}}`
      );
    });
    //   for (let err of graphQLErrors) {
    //     switch (err.extensions.code) {
    //       // Apollo Server sets code to UNAUTHENTICATED
    //       // when an AuthenticationError is thrown in a resolver
    //       case "UNAUTHENTICATED":
    //         // Modify the operation context with a new token
    //         const oldHeaders = operation.getContext().headers;
    //         operation.setContext({
    //           headers: {
    //             ...oldHeaders,
    //             authorization: getNewToken(),
    //           },
    //         });
    //         // Retry the request, returning the new observable
    //         return forward(operation);
    //     }
    //   }
  }
  if (networkError) {
    console.log(`network error -> ${networkError}`);
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink.concat(uploadLink)),
});

export default client;

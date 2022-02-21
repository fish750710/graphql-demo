import { ApolloLink, ApolloClient, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

// Base Link
const baseLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaSI6IjE3MDcwMDAxIiwiYWkiOiI1ODRhYzUyNi1jOTFiLTExZTctOGQ2NS03MDRkN2I4Nzc1YjgiLCJpYXQiOjE2MzU5Mjg3NDcxMjksImlzcyI6ImFkbWluQG15cmUubGlmZSIsImV4cCI6MTY2NzQ2NDc0NzEzMCwiaXNBZG1pbiI6ZmFsc2V9.QUJQC5pAyWJ1yJpH2Jd5zwji2QYu4n-p3421Efz_V1Y',
      ci: '971cadd0-80c2-11e8-8a19-b558096c71b9'
    }
  });

  return forward(operation);
});

// Error Link
const errorLink = onError(error => {
  console.error(error);
});

// Upload Link
const uploadLink = createUploadLink({
  uri: 'http://192.168.11.250:8890/api/graphql',
  // credentials: 'same-origin'
});

const httpLink = ApolloLink.from([baseLink, errorLink, uploadLink]);


// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: false,
  connectToDevTools: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  }
})
import { gql } from "@apollo/client";

export const GET_SERVER = gql`
  query GetServers {
    getServers {
      id
      name
      imageUrl
    }
  }
`;

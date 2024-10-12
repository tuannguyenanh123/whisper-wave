import { gql } from "@apollo/client";

export const CREATE_SERVER = gql`
  mutation CreateServer(
    $createServerInput: CreateServerInputDto!
    $file: Upload!
  ) {
    createServer(createServerInput: $createServerInput, file: $file) {
      id
      name
      imageUrl
      members {
        id
      }
    }
  }
`;

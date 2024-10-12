import { useQuery } from "@apollo/client";
import { GET_SERVER } from "../../../graphql/queries/server/GetServers";
import {
  GetServersQuery,
  GetServersQueryVariables,
} from "../../../gql/graphql";

export function useServer() {
  const { data: servers, loading } = useQuery<
    GetServersQuery,
    GetServersQueryVariables
  >(GET_SERVER);

  return {
    servers: servers?.getServers || [],
    loading,
  };
}

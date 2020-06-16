import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const TESTING_QUERY = gql`
  query {
    dummy
  }
`;

const Test: React.FC = () => {
  const { loading, error, data } = useQuery(TESTING_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>{data && data.dummy}</div>;
};

export default Test;

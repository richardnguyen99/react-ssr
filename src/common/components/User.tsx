/**
 * User component to fetch user data from MongoDB
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

interface UserData {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface UserDataList {
  getUsers: UserData[];
}

const UserComponent: React.FC = () => {
  const { loading, error, data } = useQuery<UserDataList>(gql`
    {
      getUsers {
        username
        email
        firstname
        lastname
      }
    }
  `);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      {data &&
        data.getUsers.map((user) => (
          <p key={user.username}>
            {user.username}:{user.email}
          </p>
        ))}
    </div>
  );
};

export default UserComponent;

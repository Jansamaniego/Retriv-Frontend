import React from 'react';
import { useGetUsersQuery } from '../../redux/services/userApi';
import { Card } from '../common';
import styled from 'styled-components';

const UserManagerGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const StyledCard = styled(Card)`
  min-height: 10vh;
`;

const UserCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const UserItem = ({ id }) => {
  const { user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.find((user) => user.id === id),
    }),
  });

  return <UserCard>{user.name}</UserCard>;
};

const UserList = ({ users }) => {
  return users.map(({ id }) => <UserItem key={id} id={id} />);
};

const UserManager = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  console.log(users);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <UserManagerGrid>
      <UserList users={users} />
    </UserManagerGrid>
  );
};

export default UserManager;

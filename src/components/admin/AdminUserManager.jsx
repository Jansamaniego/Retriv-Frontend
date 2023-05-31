import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';

const StyledCard = styled(Card)`
  display: flex;
  gap: 2rem;
`;

const AdminUserCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const AdminUserItem = ({ user }) => {
  const { profileImage, name } = user;

  return <AdminUserCard>{name}</AdminUserCard>;
};

const AdminUserList = ({ user }) => {
  return user.map((user) => <AdminUserItem key={user.id} user={user} />);
};

const AdminUserManager = () => {
  return <AdminUserList />;
};

export default AdminUserManager;

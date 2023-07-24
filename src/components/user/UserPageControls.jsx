import React from 'react';
import { useDeleteUserMutation } from '../../redux/services/userApi';
import { Button, Card } from '../common';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserPageControls = ({ userId }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation(userId);
  return (
    <Card>
      <ButtonContainer>
        <Button onClick={deleteUser} disabled={isLoading}>
          Remove User
        </Button>
      </ButtonContainer>
    </Card>
  );
};

export default UserPageControls;

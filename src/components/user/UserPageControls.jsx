import React from 'react';
import { useDeleteUserMutation } from '../../redux/services/userApi';
import { Button, Card } from '../common';
import styled from 'styled-components';

const UserPageControlsFlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div``;

const UserPageControls = ({ userId }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation(userId);
  return (
    <Card>
      <UserPageControlsFlexWrapper>
        <ButtonContainer>
          <Button onClick={deleteUser} disabled={isLoading}>
            Remove User
          </Button>
        </ButtonContainer>
      </UserPageControlsFlexWrapper>
    </Card>
  );
};

export default UserPageControls;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useDeleteUserMutation } from 'redux/services/userApi/userApi';
import { Button, Card, StyledModal } from 'components/common';

interface IUserControlProps {
  userId: string;
}

const UserPageControlsFlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div``;

const UserControl: React.FC<IUserControlProps> = ({ userId }) => {
  const navigate = useNavigate();

  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const openDeleteUserModal = () => {
    setIsDeleteUserModalOpen(true);
  };

  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };

  const deleteUserOnClickHandler = async () => {
    await deleteUser(userId);
    if (!isLoading) {
      navigate('/user-table');
    }
  };

  return (
    <Card>
      <UserPageControlsFlexWrapper>
        <ButtonContainer>
          <Button onClick={openDeleteUserModal} disabled={isLoading}>
            Remove User
          </Button>
        </ButtonContainer>
      </UserPageControlsFlexWrapper>
      {isDeleteUserModalOpen && (
        <StyledModal
          isModalOpen={isDeleteUserModalOpen}
          closeModal={closeDeleteUserModal}
          isLoading={isLoading}
          onClick={deleteUserOnClickHandler}
        >
          are you sure you want to delete this user?
        </StyledModal>
      )}
    </Card>
  );
};

export default UserControl;

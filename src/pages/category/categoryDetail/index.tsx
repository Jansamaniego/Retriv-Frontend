import React, { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { ICategory } from 'types';
import {
  useDeleteCategoryMutation,
  useUpdateCategoryDetailsMutation,
} from 'redux/services/categoryApi/categoryApi';
import {
  Button,
  Card,
  StyledInput,
  StyledModal,
  StyledTextarea,
} from 'components/common';
import UpdateCategoryImageModal from 'pages/category/categoryDetail/updateCategoryImageModal';
import { EditIconButton } from 'components/common/editIconButton';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

interface ICategoryDetailProps {
  category: ICategory;
}

interface IFormValues {
  name: string;
  description: string;
}

const CategoryDetailStyledCard = styled(Card)``;

const ProductShopInfoFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ShopImageContainer = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
`;

const ShopImage = styled.img`
  position: relative;
  border-radius: 50%;
  outline: 0.5rem solid ${(props) => props.theme.neutral[900]};
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditButtonWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

const ShopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  max-width: 75ch;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Info = styled.h5`
  font-weight: 700;
`;

const SubInfo = styled.h5`
  font-weight: 400;
`;

const CategoryDetail: React.FC<ICategoryDetailProps> = ({ category }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [isImageEditModalOpen, setIsImageEditModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [isEditNameMode, setIsEditNameMode] = useState(false);
  const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false);

  const [updateCategoryDetails, { isLoading: updateCategoryDetailsIsLoading }] =
    useUpdateCategoryDetailsMutation();

  const [deleteCategory, { isLoading: deleteCategoryIsLoading }] =
    useDeleteCategoryMutation();

  const { image, name, description, _id: id } = category;

  const updateCategorySchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const methods = useForm({
    defaultValues: { name, description },
    resolver: zodResolver(updateCategorySchema),
  });

  const { handleSubmit, control } = methods;

  useEffect(() => {
    const { role } = loggedInUser || {};
    setIsAdmin(role === 'admin');
  }, [loggedInUser]);

  const openImageEditModal = () => {
    setIsImageEditModalOpen(true);
  };

  const closeImageEditModal = () => {
    setIsImageEditModalOpen(false);
  };

  const openEditModal = () => {
    setisEditModalOpen(true);
  };

  const closeEditModal = () => {
    setisEditModalOpen(false);

    if (isEditNameMode) {
      setIsEditNameMode(false);
    }

    if (isEditDescriptionMode) {
      setIsEditDescriptionMode(false);
    }
  };

  const enableEditNameMode = () => {
    setIsEditNameMode(true);
    openEditModal();
  };

  const disableEditNameMode = () => {
    setIsEditNameMode(false);
    closeEditModal();
  };

  const enableEditDescriptionMode = () => {
    setIsEditDescriptionMode(true);
    openEditModal();
  };

  const disableEditDescriptionMode = () => {
    setIsEditDescriptionMode(false);
    closeEditModal();
  };

  const openDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(true);
  };

  const closeDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(false);
  };

  const deleteCategoryOnClickHandler = async () => {
    await deleteCategory(id);
    navigate('/category');
  };

  const onSubmit = async (data: IFormValues) => {
    console.log('hello');
    await updateCategoryDetails({ categoryId: id, ...data });

    if (isEditNameMode) return disableEditNameMode();
    if (isEditDescriptionMode) return disableEditDescriptionMode();
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CategoryDetailStyledCard>
            <ProductShopInfoFlex>
              <div>
                <ShopImageContainer>
                  {image && <ShopImage src={image} />}
                  {isAdmin && (
                    <EditButtonWrapper>
                      <EditIconButton
                        buttonProps={{
                          onClick: openImageEditModal,
                        }}
                        svgProps={{ width: '2rem' }}
                      />
                    </EditButtonWrapper>
                  )}
                </ShopImageContainer>
              </div>
              <ShopInfoContainer>
                <InfoContainer>
                  <Info>{name}</Info>
                  {isAdmin && (
                    <EditIconButton
                      buttonProps={{
                        onClick: enableEditNameMode,
                        disabled: isEditModalOpen,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  )}
                </InfoContainer>
                <InfoContainer>
                  <SubInfo>{description}</SubInfo>
                  {isAdmin && (
                    <EditIconButton
                      buttonProps={{
                        onClick: enableEditDescriptionMode,
                        disabled: isEditModalOpen,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  )}
                </InfoContainer>
                {id !== '64df6a203bb08b6c3f1d7a8f' && isAdmin && (
                  <Button type="button" large onClick={openDeleteCategoryModal}>
                    Delete Category
                  </Button>
                )}
              </ShopInfoContainer>
            </ProductShopInfoFlex>
            {isImageEditModalOpen && (
              <UpdateCategoryImageModal
                isModalOpen={isImageEditModalOpen}
                closeModal={closeImageEditModal}
                id={id}
              />
            )}
          </CategoryDetailStyledCard>
          {isEditModalOpen && (
            <StyledModal
              isModalOpen={isEditModalOpen}
              closeModal={closeEditModal}
              isLoading={updateCategoryDetailsIsLoading}
            >
              {isEditNameMode && (
                <>
                  <h4>Name</h4>
                  <StyledInput
                    placeholder="Name"
                    name="name"
                    marginBottom={0}
                  />
                </>
              )}
              {isEditDescriptionMode && (
                <>
                  <h4>Description</h4>
                  <StyledTextarea
                    placeholder="Please write a description"
                    name="description"
                    marginBottom={'0'}
                  />
                </>
              )}
            </StyledModal>
          )}
        </Form>
        <DevTool control={control} />
      </FormProvider>
      {isDeleteCategoryModalOpen && (
        <StyledModal
          isModalOpen={isDeleteCategoryModalOpen}
          closeModal={closeDeleteCategoryModal}
          onClick={deleteCategoryOnClickHandler}
          isLoading={deleteCategoryIsLoading}
        >
          Are you sure you want to delete this category?
        </StyledModal>
      )}
    </>
  );
};

export default CategoryDetail;

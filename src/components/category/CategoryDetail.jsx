import React, { useEffect } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button,
  Card,
  Loading,
  StyledInput,
  StyledModal,
  ProfileImageLogo,
} from '../common';
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryDetailsMutation,
  useUpdateCategoryImageMutation,
} from '../../redux/services/categoryApi';
import { useState } from 'react';
import { EditIcon } from '../../assets/icons';
import UpdateCategoryImageModal from './UpdateCategoryImageModal';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

const CategoryDetailStyledCard = styled(Card)``;

const ProductShopInfoFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const ShopImageContainer = styled.div`
  position: relative;
`;

const ShopImage = styled.img`
  border-radius: 50%;
  outline: 0.5rem solid ${(props) => props.theme.neutral[900]};
  object-fit: cover;
  position: relative;
  width: 18rem;
  height: 18rem;
`;

const ShopDataInputFlexWrapper = styled.div`
  display: flex;
  align-items: center;
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

const StyledEditIcon = styled(EditIcon)`
  position: absolute;
  cursor: pointer;
  right: 0.2rem;
  bottom: 0.05rem;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
`;

const EditIconButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: none;
  padding: 0;
  font: inherit;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  outline: inherit;
`;

const CategoryDetail = ({ category }) => {
  const navigate = useNavigate();
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [isImageEditModalOpen, setIsImageEditModalOpen] = useState(false);
  const [isEditMode, setisEditMode] = useState(false);
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

  const openImageEditModal = () => {
    setIsImageEditModalOpen(true);
  };

  const closeImageEditModal = () => {
    setIsImageEditModalOpen(false);
  };

  const enableEditNameMode = () => {
    setIsEditNameMode(true);
    setisEditMode(true);
  };

  const disableEditNameMode = () => {
    setIsEditNameMode(false);
    setisEditMode(false);
  };

  const enableEditDescriptionMode = () => {
    setIsEditDescriptionMode(true);
    setisEditMode(true);
  };

  const disableEditDescriptionMode = () => {
    setIsEditDescriptionMode(false);
    setisEditMode(false);
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

  const onSubmit = async (data) => {
    await updateCategoryDetails({ categoryId: id, ...data });

    if (isEditNameMode) return disableEditNameMode();
    if (isEditDescriptionMode) return disableEditDescriptionMode();
  };

  console.log(category);

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CategoryDetailStyledCard>
            <ProductShopInfoFlex>
              <ShopImageContainer>
                {image ? <ShopImage src={image} /> : null}
                <StyledEditIcon width="2rem" onClick={openImageEditModal} />
              </ShopImageContainer>
              <ShopInfoContainer>
                {isEditNameMode ? (
                  <>
                    <ShopDataInputFlexWrapper>
                      <StyledInput
                        placeholder="Name"
                        name="name"
                        marginBottom={0}
                      />
                      <ButtonFlexWrapper>
                        <Button
                          onClick={disableEditNameMode}
                          disabled={updateCategoryDetailsIsLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={updateCategoryDetailsIsLoading}
                        >
                          Update
                        </Button>
                      </ButtonFlexWrapper>
                    </ShopDataInputFlexWrapper>
                  </>
                ) : (
                  <InfoContainer>
                    <Info>{name}</Info>
                    <EditIconButton
                      onClick={enableEditNameMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  </InfoContainer>
                )}
                {isEditDescriptionMode ? (
                  <>
                    <ShopDataInputFlexWrapper>
                      <StyledInput
                        placeholder="Description"
                        name="description"
                        marginBottom={0}
                      />
                      <ButtonFlexWrapper>
                        <Button
                          onClick={disableEditDescriptionMode}
                          disabled={updateCategoryDetailsIsLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={updateCategoryDetailsIsLoading}
                        >
                          Update
                        </Button>
                      </ButtonFlexWrapper>
                    </ShopDataInputFlexWrapper>
                  </>
                ) : (
                  <InfoContainer>
                    <SubInfo>{description}</SubInfo>
                    <EditIconButton
                      onClick={enableEditDescriptionMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  </InfoContainer>
                )}
                {id !== '64df6a203bb08b6c3f1d7a8f' && (
                  <Button type="button" large onClick={openDeleteCategoryModal}>
                    Delete Category
                  </Button>
                )}
              </ShopInfoContainer>
            </ProductShopInfoFlex>
            {isImageEditModalOpen && (
              <UpdateCategoryImageModal
                showModal={openImageEditModal}
                closeModal={closeImageEditModal}
                id={id}
              />
            )}
          </CategoryDetailStyledCard>
        </Form>
        <DevTool control={control} />
      </FormProvider>
      {isDeleteCategoryModalOpen && (
        <StyledModal
          showModal={openDeleteCategoryModal}
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

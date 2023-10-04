import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  StyledInput,
  StyledModal,
  ProfileImageLogo,
} from '../../../components/common';
import {
  DateIcon,
  EditIcon,
  ProductIcon,
  ProductsSoldIcon,
  StarRatingIcon,
} from '../../../assets/icons';
import {
  useDeleteShopMutation,
  useGetShopByIdQuery,
  useUpdateShopMutation,
} from '../../../redux/services/shopApi/shopApi';
import { Form, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetShopRatingsQuery } from '../../../redux/services/ratings/shopRatingsApi/shopRatingsApi';
import { DevTool } from '@hookform/devtools';
import UpdateShopImageModal from './updateShopImageModal';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileApi } from '../../../redux/services/myProfileApi/myProfileApi';
import { removeShop } from '../../../redux/features/shopSlice';

const ShopHeaderFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  gap: 4rem;

  @media (max-width: 1124px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShopImageAndInfoContainer = styled.div`
  position: relative;
  display: flex;
  gap: 2rem;
  /* width: 100%; */
  /* justify-content: space-between; */
  /* min-width: 110rem; */
  @media (max-width: 715px) {
    flex-direction: column;
    align-items: center;
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

const InfoFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  /* max-width: 75ch; */
  width: 100%;
`;

const StyledEditIcon = styled(EditIcon)`
  position: absolute;
  cursor: pointer;
  right: 0.2rem;
  bottom: 0.05rem;
`;

const ShopInfoContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 2rem;
  padding-top: 1rem;
  min-width: 20ch;
  /* max-width: 75ch;
  width: 100%; */
  word-wrap: break-word;

  @media (max-width: 1570px) {
    flex-direction: column;
  }
`;

const ShopDataInputFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  word-wrap: break-word;
  width: 50ch;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  word-wrap: break-word;
`;

const Info = styled.h5`
  font-weight: 700;
`;

const SubInfo = styled.h6`
  font-weight: 400;
`;

const ShopHeaderStatsContainer = styled.section`
  margin-top: 3.5rem;
  padding: 1rem;
  width: 60%;

  @media (max-width: 1124px) {
    width: inherit;
    margin-top: 0;
  }
`;

const ShopHeaderStatsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 3rem;
  column-gap: 3rem;
`;

const ShopHeaderStatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ShopStat = styled.h5`
  font-weight: 300;
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

const MyShopHeader = ({ shop }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: shopRatings, isLoading: shopRatingsIsLoading } =
    useGetShopRatingsQuery(shop.id);

  const [
    deleteShop,
    { isLoading: deleteShopIsLoading, isSuccess: deleteShopIsSuccess },
  ] = useDeleteShopMutation();

  const [updateShop, { isLoading: updateShopIsLoading }] =
    useUpdateShopMutation();

  const [isDeleteShopModalOpen, setIsDeleteShopModalOpen] = useState(false);
  const [isShopImageEditModalOpen, setIsShopImageEditModalOpen] =
    useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [isEditNameMode, setIsEditNameMode] = useState(false);
  const [isEditAddressMode, setIsEditAddressMode] = useState(false);
  const [isEditPhoneMode, setIsEditPhoneMode] = useState(false);
  const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false);

  const {
    id,
    shopImage,
    name,
    description,
    phone,
    address,
    productsQuantity,
    totalUnitsSold,
    createdAt,
  } = shop;

  const updateShopSchema = z.object({
    name: z.string(),
    address: z.string(),
    phone: z.coerce.number(),
    description: z.string(),
  });

  const methods = useForm({
    defaultValues: useMemo(() => {
      return {
        name,
        address,
        description,
        phone,
      };
    }, [address, name, description, phone]),
    resolver: zodResolver(updateShopSchema),
  });

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset({ name, address, description, phone });
  }, [address, name, description, phone]);

  const openShopImageEditModal = () => {
    setIsShopImageEditModalOpen(true);
  };

  const closeShopImageEditModal = () => {
    setIsShopImageEditModalOpen(false);
  };

  const openEditModal = () => {
    setisEditModalOpen(true);
  };

  const closeEditModal = () => {
    setisEditModalOpen(false);

    if (isEditNameMode) setIsEditNameMode(false);
    if (isEditDescriptionMode) setIsEditDescriptionMode(false);
    if (isEditAddressMode) setIsEditAddressMode(false);
    if (isEditPhoneMode) setIsEditPhoneMode(false);
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

  const enableEditAddressMode = () => {
    setIsEditAddressMode(true);
    openEditModal();
  };

  const disableEditAddressMode = () => {
    setIsEditAddressMode(false);
    closeEditModal();
  };

  const enableEditPhoneMode = () => {
    setIsEditPhoneMode(true);
    openEditModal();
  };

  const disableEditPhoneMode = () => {
    setIsEditPhoneMode(false);
    closeEditModal();
  };

  const openDeleteShopModal = () => {
    setIsDeleteShopModalOpen(true);
  };

  const closeDeleteShopModal = () => {
    setIsDeleteShopModalOpen(false);
  };

  const deleteShopOnClickHandler = async () => {
    await deleteShop(id);
    if (!deleteShopIsLoading) {
      const { isSuccess } = await dispatch(
        myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
      );

      if (isSuccess) {
        dispatch(removeShop());
      }
      navigate('/');
    }
  };

  const onSubmit = async (data) => {
    await updateShop({ id, ...data });

    if (isEditNameMode) return disableEditNameMode();
    if (isEditDescriptionMode) return disableEditDescriptionMode();
    if (isEditAddressMode) return disableEditAddressMode();
    if (isEditPhoneMode) return disableEditPhoneMode();
  };

  if (shopRatingsIsLoading) return <h3>Loading...</h3>;

  const { ratingsAverage, ratingsQuantity } = shopRatings;

  console.log(isEditModalOpen);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <ShopHeaderFlexWrapper>
            <ShopImageAndInfoContainer>
              <div>
                <ShopImageContainer>
                  {shopImage ? <ShopImage src={shopImage} /> : null}
                  <StyledEditIcon
                    width="2rem"
                    onClick={openShopImageEditModal}
                  />
                </ShopImageContainer>
              </div>
              <InfoFlexWrapper>
                <InfoWrapper>
                  <InfoContainer>
                    <Info>{name}</Info>
                    <EditIconButton
                      onClick={enableEditNameMode}
                      disabled={isEditModalOpen}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  </InfoContainer>
                </InfoWrapper>
                <ShopInfoContainer>
                  <InfoWrapper>
                    <InfoContainer>
                      <SubInfo>{description}</SubInfo>
                      <EditIconButton
                        onClick={enableEditDescriptionMode}
                        disabled={isEditModalOpen}
                      >
                        <EditIcon width="2rem" />
                      </EditIconButton>
                    </InfoContainer>
                  </InfoWrapper>
                  <InfoWrapper>
                    <InfoContainer>
                      <SubInfo>{address}</SubInfo>
                      <EditIconButton
                        onClick={enableEditAddressMode}
                        disabled={isEditModalOpen}
                      >
                        <EditIcon width="2rem" />
                      </EditIconButton>
                    </InfoContainer>
                    <InfoContainer>
                      <SubInfo>{phone}</SubInfo>
                      <EditIconButton
                        onClick={enableEditPhoneMode}
                        disabled={isEditModalOpen}
                      >
                        <EditIcon width="2rem" />
                      </EditIconButton>
                    </InfoContainer>
                  </InfoWrapper>
                </ShopInfoContainer>
              </InfoFlexWrapper>
            </ShopImageAndInfoContainer>
            <ShopHeaderStatsContainer>
              <ShopHeaderStatsGridWrapper>
                <ShopHeaderStatContainer>
                  <ProductIcon width="2rem" />
                  <ShopStat>Products: {productsQuantity}</ShopStat>
                </ShopHeaderStatContainer>
                <ShopHeaderStatContainer>
                  <ProductsSoldIcon width="2rem" />
                  <ShopStat>Units Sold: {totalUnitsSold}</ShopStat>
                </ShopHeaderStatContainer>
                <ShopHeaderStatContainer>
                  <StarRatingIcon width="2rem" />
                  <ShopStat>
                    Rating: {ratingsAverage} &#40;{ratingsQuantity}{' '}
                    {ratingsQuantity > 1 ? 'ratings' : 'rating'}&#41;
                  </ShopStat>
                </ShopHeaderStatContainer>
                <ShopHeaderStatContainer>
                  <DateIcon width="2rem" />
                  <ShopStat>Joined: {createdAt}</ShopStat>
                </ShopHeaderStatContainer>
              </ShopHeaderStatsGridWrapper>
            </ShopHeaderStatsContainer>
          </ShopHeaderFlexWrapper>
        </Card>
        {isEditModalOpen && (
          <StyledModal
            isModalOpen={isEditModalOpen}
            closeModal={closeEditModal}
            isLoading={updateShopIsLoading}
          >
            {isEditNameMode && (
              <StyledInput placeholder="Name" name="name" marginBottom={0} />
            )}
            {isEditDescriptionMode && (
              <StyledInput
                placeholder="Description"
                name="description"
                marginBottom={0}
              />
            )}
            {isEditAddressMode && (
              <StyledInput
                placeholder="Address"
                name="address"
                marginBottom={0}
              />
            )}
            {isEditPhoneMode && (
              <StyledInput
                placeholder="Phone"
                type="number"
                name="phone"
                marginBottom={0}
              />
            )}
          </StyledModal>
        )}
      </Form>
      <DevTool control={control} />
      {isShopImageEditModalOpen && (
        <UpdateShopImageModal
          isModalOpen={isShopImageEditModalOpen}
          closeModal={closeShopImageEditModal}
          id={id}
        />
      )}
      {isDeleteShopModalOpen && (
        <StyledModal
          isModalOpen={isDeleteShopModalOpen}
          closeModal={closeDeleteShopModal}
          onClick={deleteShopOnClickHandler}
          isLoading={deleteShopIsLoading}
        >
          Are you sure you want to delete your shop?
        </StyledModal>
      )}
      <DevTool control={control} />
    </FormProvider>
  );
};

export default MyShopHeader;

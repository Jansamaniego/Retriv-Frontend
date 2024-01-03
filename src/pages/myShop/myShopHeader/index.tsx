import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Form, useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { IShopWithOwnerPickValues } from 'redux/services/shopApi/shopApi.types';
import { useAppDispatch } from 'redux/store';
import { useGetShopRatingsQuery } from 'redux/services/ratings/shopRatingsApi/shopRatingsApi';
import { myProfileApi } from 'redux/services/myProfileApi/myProfileApi';
import {
  useDeleteShopMutation,
  useUpdateShopMutation,
} from 'redux/services/shopApi/shopApi';
import { removeShop } from 'redux/features/shopSlice';
import { Card, Loading, StyledInput, StyledModal } from 'components/common';
import {
  DateIcon,
  ProductIcon,
  ProductsSoldIcon,
  StarRatingIcon,
} from 'assets/icons';
import UpdateShopImageModal from 'pages/myShop/myShopHeader/updateShopImageModal';
import { EditIconButton } from 'components/common/editIconButton';

interface IMyShopHeaderProps {
  shop: IShopWithOwnerPickValues;
}

interface FormValues {
  name: string;
  address: string;
  phone: number;
  description: string;
}

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

const EditButtonWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

const InfoFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  /* max-width: 75ch; */
  width: 100%;
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

const ShopRatingsText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const EditModalText = styled.h4`
  color: ${(props) => props.theme.neutral.text};
`;

const MyShopHeader: React.FC<IMyShopHeaderProps> = ({ shop }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: shopRatings, isLoading: shopRatingsIsLoading } =
    useGetShopRatingsQuery(shop.id);

  const [deleteShop, { isLoading: deleteShopIsLoading }] =
    useDeleteShopMutation();

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

  const methods = useForm<FormValues>({
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

  const { handleSubmit, reset, control } = methods;

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateShop({ id, ...data });

    if (isEditNameMode) return disableEditNameMode();
    if (isEditDescriptionMode) return disableEditDescriptionMode();
    if (isEditAddressMode) return disableEditAddressMode();
    if (isEditPhoneMode) return disableEditPhoneMode();
  };

  if (shopRatingsIsLoading) return <Loading />;

  if (!shopRatings)
    return <ShopRatingsText>No Shop ratings found</ShopRatingsText>;

  const { ratingsAverage, ratingsQuantity } = shopRatings;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <ShopHeaderFlexWrapper>
            <ShopImageAndInfoContainer>
              <div>
                <ShopImageContainer>
                  {shopImage && <ShopImage src={shopImage} />}
                  <EditButtonWrapper>
                    <EditIconButton
                      buttonProps={{
                        onClick: openShopImageEditModal,
                        disabled: isEditModalOpen,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  </EditButtonWrapper>
                </ShopImageContainer>
              </div>
              <InfoFlexWrapper>
                <InfoWrapper>
                  <InfoContainer>
                    <Info>{name}</Info>
                    <EditIconButton
                      buttonProps={{
                        onClick: enableEditNameMode,
                        disabled: isEditModalOpen,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  </InfoContainer>
                </InfoWrapper>
                <ShopInfoContainer>
                  <InfoWrapper>
                    <InfoContainer>
                      <SubInfo>{description}</SubInfo>
                      <EditIconButton
                        buttonProps={{
                          onClick: enableEditDescriptionMode,
                          disabled: isEditModalOpen,
                        }}
                        svgProps={{ width: '2rem' }}
                      />
                    </InfoContainer>
                  </InfoWrapper>
                  <InfoWrapper>
                    <InfoContainer>
                      <SubInfo>{address}</SubInfo>
                      <EditIconButton
                        buttonProps={{
                          onClick: enableEditAddressMode,
                          disabled: isEditModalOpen,
                        }}
                        svgProps={{ width: '2rem' }}
                      />
                    </InfoContainer>
                    <InfoContainer>
                      <SubInfo>{phone}</SubInfo>
                      <EditIconButton
                        buttonProps={{
                          onClick: enableEditPhoneMode,
                          disabled: isEditModalOpen,
                        }}
                        svgProps={{ width: '2rem' }}
                      />
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
                  <ShopStat>
                    Joined: {moment(createdAt).format('MM-DD-yyyy') || ''}
                  </ShopStat>
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
              <>
                <EditModalText>Name</EditModalText>
                <StyledInput placeholder="Name" name="name" marginBottom={0} />
              </>
            )}
            {isEditDescriptionMode && (
              <>
                <EditModalText>Description</EditModalText>
                <StyledInput
                  placeholder="Description"
                  name="description"
                  marginBottom={0}
                />
              </>
            )}
            {isEditAddressMode && (
              <>
                <EditModalText>Address</EditModalText>
                <StyledInput
                  placeholder="Address"
                  name="address"
                  marginBottom={0}
                />
              </>
            )}
            {isEditPhoneMode && (
              <>
                <EditModalText>Phone</EditModalText>
                <StyledInput
                  placeholder="Phone"
                  type="number"
                  name="phone"
                  marginBottom={0}
                />
              </>
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

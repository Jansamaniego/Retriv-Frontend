import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  StyledInput,
  StyledModal,
  ProfileImageLogo,
} from '../common';
import {
  DateIcon,
  EditIcon,
  ProductIcon,
  ProductsSoldIcon,
  StarRatingIcon,
} from '../../assets/icons';
import {
  useDeleteShopMutation,
  useGetShopByIdQuery,
  useUpdateShopMutation,
} from '../../redux/services/shopApi';
import { Form, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetShopRatingsQuery } from '../../redux/services/ratings/shopRatingsApi';
import { DevTool } from '@hookform/devtools';
import UpdateShopImageModal from './UpdateShopImageModal';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileApi } from '../../redux/services/myProfileApi';
import { removeShop } from '../../redux/features/shopSlice';

const ShopHeaderFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  gap: 4rem;
`;

const ShopImageAndInfoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  max-width: 175ch;
  width: 40%;
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

const StyledEditIcon = styled(EditIcon)`
  position: absolute;
  cursor: pointer;
  right: 0.2rem;
  bottom: 0.05rem;
`;

const ShopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  max-width: 75ch;
`;

const ShopDataInputFlexWrapper = styled.div`
  display: flex;
  align-items: center;
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

const ShopHeaderStatsContainer = styled.section`
  padding: 1rem;
  width: 60%;
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

const ShopHeader = ({ shop }) => {
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
  const [isEditMode, setisEditMode] = useState(false);
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

  const enableEditAddressMode = () => {
    setIsEditAddressMode(true);
    setisEditMode(true);
  };

  const disableEditAddressMode = () => {
    setIsEditAddressMode(false);
    setisEditMode(false);
  };

  const enableEditPhoneMode = () => {
    setIsEditPhoneMode(true);
    setisEditMode(true);
  };

  const disableEditPhoneMode = () => {
    setIsEditPhoneMode(false);
    setisEditMode(false);
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
  };

  if (shopRatingsIsLoading) return <h3>Loading...</h3>;

  const { ratingsAverage, ratingsQuantity } = shopRatings;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <ShopHeaderFlexWrapper>
            <ShopImageAndInfoContainer>
              <ShopImageContainer>
                {shopImage ? <ShopImage src={shopImage} /> : null}
                <StyledEditIcon width="2rem" onClick={openShopImageEditModal} />
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
                          disabled={updateShopIsLoading}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={updateShopIsLoading}>
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
                          disabled={updateShopIsLoading}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={updateShopIsLoading}>
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
                {isEditAddressMode ? (
                  <>
                    <ShopDataInputFlexWrapper>
                      <StyledInput
                        placeholder="Address"
                        name="address"
                        marginBottom={0}
                      />
                      <ButtonFlexWrapper>
                        <Button
                          onClick={disableEditAddressMode}
                          disabled={updateShopIsLoading}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={updateShopIsLoading}>
                          Update
                        </Button>
                      </ButtonFlexWrapper>
                    </ShopDataInputFlexWrapper>
                  </>
                ) : (
                  <InfoContainer>
                    <SubInfo>{address}</SubInfo>
                    <EditIconButton
                      onClick={enableEditAddressMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  </InfoContainer>
                )}
                {isEditPhoneMode ? (
                  <>
                    <ShopDataInputFlexWrapper>
                      <StyledInput
                        placeholder="Phone"
                        type="number"
                        name="phone"
                        marginBottom={0}
                      />
                      <ButtonFlexWrapper>
                        <Button
                          onClick={disableEditPhoneMode}
                          disabled={updateShopIsLoading}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={updateShopIsLoading}>
                          Update
                        </Button>
                      </ButtonFlexWrapper>
                    </ShopDataInputFlexWrapper>
                  </>
                ) : (
                  <InfoContainer>
                    <SubInfo>{phone}</SubInfo>
                    <EditIconButton
                      onClick={enableEditPhoneMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  </InfoContainer>
                )}
              </ShopInfoContainer>
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
                <ShopHeaderStatContainer>
                  <Button
                    onClick={openDeleteShopModal}
                    disabled={deleteShopIsLoading}
                  >
                    Delete Shop
                  </Button>
                </ShopHeaderStatContainer>
              </ShopHeaderStatsGridWrapper>
            </ShopHeaderStatsContainer>
          </ShopHeaderFlexWrapper>
        </Card>
      </Form>
      <DevTool control={control} />
      {isShopImageEditModalOpen && (
        <UpdateShopImageModal
          showModal={openShopImageEditModal}
          closeModal={closeShopImageEditModal}
          id={id}
        />
      )}
      {isDeleteShopModalOpen && (
        <StyledModal
          showModal={openDeleteShopModal}
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

export default ShopHeader;

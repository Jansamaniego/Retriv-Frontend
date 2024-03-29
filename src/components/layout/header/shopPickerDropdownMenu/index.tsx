import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IShop } from 'types';
import { IShopWithOwnerPickValues } from 'redux/services/shopApi/shopApi.types';
import { RootState } from 'redux/store';
import { setShop } from 'redux/features/shopSlice';
import { Card } from 'components/common';
import { PlusIcon } from 'assets/icons';

interface IShopPickerDropdownMenuListProps {
  userShops: IShopWithOwnerPickValues[] | IShop[];
  currentShop: IShopWithOwnerPickValues | IShop;
}

interface IShopPickerDropdownMenuItemProps {
  id: string;
}

const ShopPickerDropdownMenuContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 30rem;
  position: absolute;
  background: ${(props) => props.theme.neutral[900]};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  right: -1rem;
  top: 5.2rem;
`;

const ShopPickerDropdownMenuItemFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ShopPickerDropdownMenuItemContainer = styled.div``;

const ShopMainDetailFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const ShopFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShopImageContainer = styled.div`
  display: flex;
`;

const ShopImage = styled.img`
  height: 8rem;
  width: 8rem;
  object-fit: fill;
  border-radius: 50%;
`;

const ShopPickerText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const ShopName = styled.h5``;

const ShopProductsQuantity = styled.h6`
  font-weight: 400;
`;

const ShopTotalUnitsSold = styled.h6`
  font-weight: 400;
`;

const AddShopFlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.6rem;
`;

const PlusIconContainer = styled.div`
  border: 1px solid ${(props) => props.theme.neutral[600]};
  border-radius: 0.5rem;
`;

const AddShopText = styled.h5`
  font-weight: 400;
`;

const ShopPickerDropdownMenuItem: React.FC<
  IShopPickerDropdownMenuItemProps
> = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userShop = useSelector((state: RootState) =>
    state.shopState.userShops.find((userShop) => userShop._id === id)
  );

  if (!userShop) return <ShopPickerText>shop is not found</ShopPickerText>;

  const { name, shopImage, productsQuantity, totalUnitsSold } = userShop;

  const manageShopOnClickHandler = () => {
    dispatch(setShop(userShop));
    navigate('/my-shop');
  };

  return (
    <ShopPickerDropdownMenuItemContainer onClick={manageShopOnClickHandler}>
      <ShopPickerDropdownMenuItemFlexWrapper>
        <ShopMainDetailFlexWrapper>
          <ShopImageContainer>
            <ShopImage src={shopImage} alt={name} />
          </ShopImageContainer>
          <ShopName>{name}</ShopName>
        </ShopMainDetailFlexWrapper>
        <ShopFlexWrapper>
          <ShopProductsQuantity>
            Products: {productsQuantity}
          </ShopProductsQuantity>
          <ShopTotalUnitsSold>Units Sold: {totalUnitsSold}</ShopTotalUnitsSold>
        </ShopFlexWrapper>
      </ShopPickerDropdownMenuItemFlexWrapper>
    </ShopPickerDropdownMenuItemContainer>
  );
};

const ShopPickerDropdownMenuList: React.FC<
  IShopPickerDropdownMenuListProps
> = ({ userShops }) => {
  return userShops.map(({ _id }) => (
    <ShopPickerDropdownMenuItem key={_id} id={_id} />
  ));
};

const ShopPickerDropdownMenu = forwardRef<HTMLDivElement>((props, ref) => {
  const navigate = useNavigate();
  const { currentShop, userShops = [] } = useSelector(
    (state: RootState) => state.shopState
  );

  const navigateCreateShopPage = () => {
    navigate('/create-shop');
  };

  if (!currentShop || !userShops || userShops.length === 0)
    return <ShopPickerText> No shops found</ShopPickerText>;

  return (
    <ShopPickerDropdownMenuContainer ref={ref}>
      {userShops && userShops.length !== 0 && (
        <ShopPickerDropdownMenuList
          userShops={userShops}
          currentShop={currentShop}
        />
      )}
      <ShopPickerDropdownMenuItemContainer onClick={navigateCreateShopPage}>
        <AddShopFlexWrapper>
          <PlusIconContainer>
            <PlusIcon width="5rem" strokeWidth="0.2rem" />
          </PlusIconContainer>
          <AddShopText>Add New Shop</AddShopText>
        </AddShopFlexWrapper>
      </ShopPickerDropdownMenuItemContainer>
    </ShopPickerDropdownMenuContainer>
  );
});

export default ShopPickerDropdownMenu;

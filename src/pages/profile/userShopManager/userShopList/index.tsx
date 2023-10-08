import React from 'react';
import { useGetShopsQuery } from '../../../../redux/services/shopApi/shopApi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card } from '../../../../components/common';
import moment from 'moment';
import { setShop } from '../../../../redux/features/shopSlice';
import { useDispatch } from 'react-redux';
import { IShop } from 'src/types';
import { IShopWithOwnerPickValues } from 'src/redux/services/shopApi/shopApi.types';

interface IUserShopListProps {
  shops: IShop[] | IShopWithOwnerPickValues[];
  queryFilter: { filter: { id: string | undefined } };
}

interface IUserShopItemProps {
  id: string;
  queryFilter: { filter: { id: string | undefined } };
}

const ShopCard = styled(Card)`
  cursor: pointer;
`;

const ShopImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ShopImage = styled.img`
  width: 16rem;
  height: 16rem;
  object-fit: cover;
`;

const ShopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem;
`;

const ShopInfoName = styled.div``;

const Name = styled.h5`
  color: ${(props) => props.theme.neutral[300]};
`;

const ShopInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ShopInfoDetail = styled.h5`
  color: ${(props) => props.theme.primary[500]};
`;

const ShopInfoStats = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserShopItem: React.FC<IUserShopItemProps> = ({ id, queryFilter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop } = useGetShopsQuery(queryFilter.toString(), {
    selectFromResult: ({ data }) => {
      return {
        shop: data?.results?.find((shop) => shop.id === id),
      };
    },
  });

  if (!shop) return <h3>Shop is not found</h3>;

  const {
    address,
    dateCreated,
    name,
    productsQuantity,
    shopImage,
    totalSales,
    totalUnitsSold,
  } = shop;

  const manageShop = () => {
    dispatch(setShop(shop));
    navigate('/my-shop');
  };

  return (
    <ShopCard onClick={manageShop}>
      <ShopImageContainer>
        <ShopImage src={shopImage} />
      </ShopImageContainer>
      <ShopInfoContainer>
        <ShopInfoName>
          <Name>{name}</Name>
        </ShopInfoName>
        <ShopInfoDetails>
          <ShopInfoStats>
            <ShopInfoDetail>Products: {productsQuantity}</ShopInfoDetail>
            <ShopInfoDetail>Units Sold: {totalUnitsSold}</ShopInfoDetail>
          </ShopInfoStats>
          <ShopInfoDetail>
            Since: {moment(dateCreated).format('MMM DD YYYY')}
          </ShopInfoDetail>
        </ShopInfoDetails>
      </ShopInfoContainer>
    </ShopCard>
  );
};

const UserShopList: React.FC<IUserShopListProps> = ({ shops, queryFilter }) => {
  return shops.map(({ id }) => (
    <UserShopItem key={id} id={id} queryFilter={queryFilter} />
  ));
};

export default UserShopList;

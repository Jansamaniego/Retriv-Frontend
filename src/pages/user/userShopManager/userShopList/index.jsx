import React from 'react';
import { useGetShopsQuery } from '../../../../redux/services/shopApi/shopApi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card } from '../../../../components/common';
import moment from 'moment';
import { setShop } from '../../../../redux/features/shopSlice';
import { useDispatch } from 'react-redux';

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
  gap: 1.6rem;
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

const UserShopItem = ({ id, queryFilter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop } = useGetShopsQuery(queryFilter.toString(), {
    selectFromResult: ({ data }) => {
      return {
        shop: data?.results?.find((shop) => shop.id === id),
      };
    },
  });

  console.log(shop);

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

const UserShopList = ({ shops, queryFilter }) => {
  return shops.map(({ id }) => (
    <UserShopItem key={id} id={id} queryFilter={queryFilter} />
  ));
};

export default UserShopList;

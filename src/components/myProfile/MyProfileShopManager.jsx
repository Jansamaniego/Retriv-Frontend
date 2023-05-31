import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';
import { useOutletContext } from 'react-router-dom';

const MyProfileShopContainer = styled.main``;

const MyProfileShopHeading = styled.h4`
  padding-bottom: 1.6rem;
`;

const MyProfileShopGrid = styled.section`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 1.6rem;
  padding: 1.6rem;
`;

const StyledCard = styled(Card)`
  display: flex;
  gap: 2rem;
`;

const ImageFlexBoxWrapper = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  width: 15rem;
  max-width: 20rem;
  display: flex;

  & img {
    border-radius: 50%;
    border: 0.1rem solid ${(props) => props.theme.primary};
  }

  & .edit {
  }
`;

const MyProfileShopMainFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
  width: 60%;
  max-width: 175ch;
`;

const MyProfileShopFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const AvgRatingCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyProfileShopCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const MyProfileShopItem = ({ shop }) => {
  console.log(shop);
  const {
    shopImage,
    name,
    description,
    address,
    avgProductRating,
    productRatingQuantity,
  } = shop;
  return (
    <MyProfileShopCard>
      <ImageFlexBoxWrapper>
        <ImageContainer>
          <img src={shopImage} alt="user profile" />
        </ImageContainer>
      </ImageFlexBoxWrapper>
      <MyProfileShopMainFlexBox>
        <h4>Name: {name}</h4>
        <h4>Description: {description}</h4>
        <h4>Address: {address}</h4>
      </MyProfileShopMainFlexBox>
      <MyProfileShopFlexBox>
        <AvgRatingCard>
          <h1>{avgProductRating}</h1>
          <h3>Avg Rating</h3>
        </AvgRatingCard>

        <h5>{productRatingQuantity} Ratings</h5>
      </MyProfileShopFlexBox>
    </MyProfileShopCard>
  );
};

const MyProfileShopList = ({ shops }) => {
  return shops.map((shop) => <MyProfileShopItem key={shop.id} shop={shop} />);
};

const MyProfileShopManager = () => {
  const [user] = useOutletContext();
  const { shops } = user;
  return shops && shops.length !== 0 ? (
    <MyProfileShopContainer>
      <MyProfileShopHeading>My Shops</MyProfileShopHeading>
      <MyProfileShopGrid>
        <MyProfileShopList shops={shops} />
      </MyProfileShopGrid>
    </MyProfileShopContainer>
  ) : (
    <h3>No shops</h3>
  );
};

export default MyProfileShopManager;

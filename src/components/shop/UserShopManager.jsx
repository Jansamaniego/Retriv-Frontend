import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
`;

const ShopCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const UserShopItem = ({ shop }) => {
  console.log(shop);
  return <ShopCard>hello</ShopCard>;
};

const UserShopList = ({ shops }) => {
  return shops.map((shop) => <UserShopItem shop={shop} />);
};

const UserShopManager = ({ user }) => {
  const { shops } = user;
  console.log(user);
  return shops && shops.length !== 0 ? (
    <UserShopList shops={shops} />
  ) : (
    <h3>No shops</h3>
  );
};

export default UserShopManager;

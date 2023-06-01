import React from 'react';
import { useGetShopsQuery } from '../../redux/services/shopApi';
import { Card } from '../common';

const ShopCard = ({ children }) => {
  return <Card>{children}</Card>;
};

const ShopItem = ({ id }) => {
  const { shop } = useGetShopsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      shop: data?.find((shop) => shop.id === id),
    }),
  });

  return <ShopCard>{shop.name}</ShopCard>;
};

const ShopList = ({ shops }) => {
  return shops.map((id) => <ShopItem key={id} id={id} />);
};

const ShopManager = () => {
  const { data: shops, isLoading } = useGetShopsQuery();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return <ShopList shops={shops} />;
};

export default ShopManager;

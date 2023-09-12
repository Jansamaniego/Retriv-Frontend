import React from 'react';
import styled from 'styled-components';
import UserShopList from './userShopList';
import { useGetShopsQuery } from '../../../redux/services/shopApi';

const UserShopManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const UserShopManager = ({ user }) => {
  const queryFilter = { filter: { id: user.id } };

  const { shops, totalPages, isLoading } = useGetShopsQuery(
    queryFilter.toString(),
    {
      selectFromResult: ({ data }) => {
        return {
          shops: data?.results,
          totalPages: data?.totalPages,
        };
      },
    }
  );

  console.log(user);

  if (isLoading) return <h3>Loading...</h3>;

  if ((!shops || shops.length === 0) && !isLoading)
    return <h3>User has no shops</h3>;

  console.log(shops);

  return (
    <>
      <UserShopManagerGrid>
        <UserShopList shops={shops} queryFilter={queryFilter} />
      </UserShopManagerGrid>
    </>
  );
};

export default UserShopManager;

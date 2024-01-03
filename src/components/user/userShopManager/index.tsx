import React from 'react';
import styled from 'styled-components';

import { IUser } from 'types';
import { useGetShopsQuery } from 'redux/services/shopApi/shopApi';
import UserShopList from 'components/user/userShopManager/userShopList';
import { Loading } from 'components/common';

interface IUserShopManagerProps {
  user: IUser;
}

const UserShopManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const UserShopManager: React.FC<IUserShopManagerProps> = ({ user }) => {
  const queryFilter = { filter: { id: user.id } };

  const { shops, totalPages, isLoading } = useGetShopsQuery(
    queryFilter.toString(),
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          shops: data?.results,
          totalPages: data?.totalPages,
          isLoading,
        };
      },
    }
  );

  console.log(user);

  if (isLoading) return <Loading />;

  if (!shops || shops.length === 0) return <h3>User has no shops</h3>;

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

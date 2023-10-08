import React from 'react';
import styled from 'styled-components';
import UserShopList from './userShopList';
import { useGetShopsQuery } from '../../../redux/services/shopApi/shopApi';
import { IUser } from 'src/types';

interface IUserShopManagerProps {
  user: IUser | null;
}

const UserShopManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(5, minmax(28rem, 1fr));
  gap: 2rem;

  @media (max-width: 1850px) {
    grid-template-columns: repeat(4, minmax(27rem, 1fr));
  }

  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, minmax(26rem, 1fr));
  }
  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(15rem, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(1, minmax(20.8rem, 1fr));
  }
`;

const UserShopManager: React.FC<IUserShopManagerProps> = ({ user }) => {
  const queryFilter = { filter: { id: user?.id } };

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

  if (isLoading) return <h3>Loading...</h3>;

  if (!shops || shops.length === 0 || !isLoading)
    return <h3>User has no shops</h3>;

  return (
    <>
      <UserShopManagerGrid>
        <UserShopList shops={shops} queryFilter={queryFilter} />
      </UserShopManagerGrid>
    </>
  );
};

export default UserShopManager;

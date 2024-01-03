import { Outlet, useParams } from 'react-router-dom';

import { IUser } from 'types';
import { useGetUserByIdQuery } from 'redux/services/userApi/userApi';
import UserHeader from 'pages/userLayout/userHeader';
import { Loading } from 'components/common';
import styled from 'styled-components';

const UserLayoutText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

type ContextType = { user: IUser | null };

export const UserLayout = () => {
  const { userId = '' } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  if (isLoading) return <Loading />;

  if (!user) return <UserLayoutText>No user found</UserLayoutText>;

  return (
    <>
      <UserHeader user={user} />
      <Outlet context={{ user } satisfies ContextType} />
    </>
  );
};

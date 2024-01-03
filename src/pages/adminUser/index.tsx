import React, { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { IUserWithModifiedShops } from 'redux/services/userApi/userApi.types';
import { useGetUsersQuery } from 'redux/services/userApi/userApi';
import { Card, Loading } from 'components/common';

interface IUserTableProps {
  users: IUserWithModifiedShops[];
}

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  object-fit: cover;
`;

const StyledLink = styled(Link)`
  text-overflow: ellipsis;
  text-decoration: none;
`;

const Name = styled.h6`
  cursor: pointer;
  color: black;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileImageRenderer = (p: ValueFormatterParams) => {
  return (
    <>
      <ProfileImageContainer>
        <StyledLink to={`/user/${p.data.id}`}>
          <ProfileImage src={p.value} alt="profile" />
        </StyledLink>
      </ProfileImageContainer>
    </>
  );
};

const NameRenderer = (p: ValueFormatterParams) => {
  return (
    <StyledLink to={`/user/${p.data.id}`}>
      <Name>{p.value}</Name>
    </StyledLink>
  );
};

const PhoneRenderer = (p: ValueFormatterParams) => {
  return p.value ? <>{p.value}</> : <>{'N/A'}</>;
};

const DateJoinedRenderer = (p: ValueFormatterParams) => {
  return <>{moment(p.value).format('MMM DD YYYY')}</>;
};

const UserTable: React.FC<IUserTableProps> = ({ users }) => {
  const gridRef = useRef(null);
  const [rowData] = useState(users);
  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'profileImage',
      cellRenderer: ProfileImageRenderer,
      maxWidth: 150,
    },
    {
      field: 'username',
      cellRenderer: NameRenderer,
    },
    {
      field: 'firstName',
    },
    { field: 'lastName' },
    { field: 'role' },
    { field: 'email' },
    { field: 'phone', cellRenderer: PhoneRenderer },
    {
      field: 'createdAt',
      headerName: 'Date Joined',
      cellRenderer: DateJoinedRenderer,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 800 }}>
      <AgGridReact
        ref={gridRef}
        rowGroupPanelShow="always"
        suppressRowClickSelection={true}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="single"
      />
    </div>
  );
};

export const AdminUser = () => {
  const { data: users, isLoading } = useGetUsersQuery(null);

  if (isLoading) return <Loading />;

  if (!users || users.length === 0)
    return (
      <Card>
        <h2>No users found.</h2>
      </Card>
    );

  return <UserTable users={users} />;
};

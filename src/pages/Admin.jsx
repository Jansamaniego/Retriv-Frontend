import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AdminPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
`;

const AdminPageGrid = styled.main`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 5fr;
  row-gap: 5rem;
  max-height: 80vh;
`;

const AdminSideMenu = styled.aside`
  padding: 1.6rem;
`;

const OutletContainer = styled.section`
  padding: 1.6rem;
`;

const Admin = () => {
  return (
    <AdminPageContainer>
      <AdminPageGrid>
        <AdminSideMenu>Admin Page</AdminSideMenu>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </AdminPageGrid>
    </AdminPageContainer>
  );
};

export default Admin;

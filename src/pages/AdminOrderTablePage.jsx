import React, { useRef, useState, useMemo } from 'react';
import { useGetOrdersQuery } from '../redux/services/orderApi';
import { AgGridReact } from 'ag-grid-react';
import { Button, Card } from '../components/common';
import moment from 'moment/moment';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const DetailsStyledLink = styled(Link)`
  text-decoration: none;
`;

const DateFormatter = (p) => {
  return <>{moment(p.value, 'YYYYMMDD').fromNow()}</>;
};

const NameRenderer = (p) => {
  const { username } = p.data.user;
  return <>{username}</>;
};

const PriceFormatter = (p) => {
  return <>&#8369;{p.value}</>;
};

const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

const ActionsRenderer = (p) => {
  const navigate = useNavigate();

  const navigateOrderDetails = () => {
    navigate(`/order/${p.value}`);
  };

  return (
    <DetailsDiv>
      <Button onClick={navigateOrderDetails}>Details</Button>
    </DetailsDiv>
  );
};

const OrderTable = ({ orders }) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState(orders);
  const [columnDefs, setColumnDefs] = useState([
    { field: '_id', headerName: 'Order Id' },
    {
      field: 'dateOfPurchase',
      cellRenderer: DateFormatter,
      headerName: 'Date',
    },
    { field: 'status' },
    {
      field: 'user.email',
      headerName: 'Purchased by',
      cellRenderer: NameRenderer,
    },
    { field: 'totalPrice', cellRenderer: PriceFormatter },
    {
      field: '_id',
      headerName: 'Actions',
      cellRenderer: ActionsRenderer,
      cellStyle: { lineHeight: 0 },
    },
  ]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    sortable: true,
    filter: true,
  }));

  const rowStyle = {
    lineHeight: 0,
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  };

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
        rowStyle={rowStyle}
      />
    </div>
  );
};

const AdminOrderTablePage = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) return <h2>Loading...</h2>;

  if (!orders || orders.length === 0)
    return (
      <Card>
        <h2>No orders found.</h2>
      </Card>
    );

  return <OrderTable orders={orders} />;
};

export default AdminOrderTablePage;

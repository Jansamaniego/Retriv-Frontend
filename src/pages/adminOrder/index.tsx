import React, { useRef, useState, useMemo } from 'react';
import moment from 'moment/moment';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { useGetOrdersQuery } from 'redux/services/orderApi/orderApi';
import { Card, Loading } from 'components/common';

interface IOrderTableProps {
  orders: IFormattedOrder[];
}

interface IFormattedOrder {
  _id: string;
  dateOfPurchase: Date | undefined;
  status: string | undefined;
  user: { email: string };
  totalPrice: number;
}

const OrderId = styled.h6`
  font-weight: 300;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.neutral[400]};
    text-decoration: underline;
  }
`;

const DateFormatter = (p: ValueFormatterParams) => {
  return <>{moment(p.value, 'YYYYMMDD').fromNow()}</>;
};

const NameRenderer = (p: ValueFormatterParams) => {
  const { username } = p.data.user;
  return <>{username}</>;
};

const PriceFormatter = (p: ValueFormatterParams) => {
  return <>&#8369;{p.value}</>;
};

const OrderIdRenderer = (p: ValueFormatterParams) => {
  const navigate = useNavigate();

  const navigateOrderDetails = () => {
    navigate(`/order/${p.value}`);
  };

  return <OrderId onClick={navigateOrderDetails}>{p.value}</OrderId>;
};

const OrderTable: React.FC<IOrderTableProps> = ({ orders }) => {
  const gridRef = useRef(null);
  const [rowData] = useState(orders);
  const [columnDefs] = useState<ColDef[]>([
    { field: '_id', headerName: 'Order Id', cellRenderer: OrderIdRenderer },
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
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 180,
    }),
    []
  );

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
        data-testid="adminOrderTable"
      />
    </div>
  );
};

export const AdminOrder = () => {
  const { orders, isLoading } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        orders: data?.map((order) => {
          return {
            _id: order._id,
            dateOfPurchase: order.dateOfPurchase,
            status: order.status,
            user: { email: order.user.email },
            totalPrice: order.totalPrice,
          };
        }),
        isLoading,
      };
    },
  });

  if (isLoading) return <Loading />;

  if (!orders || orders.length === 0)
    return (
      <Card>
        <h2>No orders found.</h2>
      </Card>
    );

  return <OrderTable orders={orders} />;
};

import React from 'react';
import styled from 'styled-components';

const PlacedOrderInfoGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const PlacedOrderInfoGridCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.subInfo ? '2rem' : '1rem')};
`;

const PlacedOrderInfoHeader = styled.h6``;

const PlacedOrderInfoFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PlacedOrderSubInfoFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlacedOrderInfoData = styled.p``;

const OrderInfo = ({ order }) => {
  const {
    user,
    _id,
    totalQuantity,
    totalPrice,
    paymentMethod,
    shippingAddress,
    phone,
  } = order;

  const { firstName, lastName, email } = user;

  const { address, postalCode, country } = shippingAddress;
  return (
    <PlacedOrderInfoGrid>
      <PlacedOrderInfoGridCell>
        <PlacedOrderInfoHeader>Recipient Information</PlacedOrderInfoHeader>
        <PlacedOrderInfoFlexWrapper>
          <PlacedOrderInfoData>
            {firstName} {lastName}
          </PlacedOrderInfoData>
          <PlacedOrderInfoData>{address}</PlacedOrderInfoData>
          <PlacedOrderInfoData>{country}</PlacedOrderInfoData>
          <PlacedOrderInfoData>{postalCode}</PlacedOrderInfoData>
        </PlacedOrderInfoFlexWrapper>
      </PlacedOrderInfoGridCell>
      <PlacedOrderInfoGridCell>
        <PlacedOrderInfoHeader>Recipient Contacts</PlacedOrderInfoHeader>
        <PlacedOrderInfoFlexWrapper>
          <PlacedOrderInfoData>{email}</PlacedOrderInfoData>
          <PlacedOrderInfoData>{phone}</PlacedOrderInfoData>
        </PlacedOrderInfoFlexWrapper>
      </PlacedOrderInfoGridCell>
      <PlacedOrderInfoGridCell subInfo>
        <PlacedOrderSubInfoFlexWrapper>
          <PlacedOrderInfoHeader>Order #</PlacedOrderInfoHeader>
          <PlacedOrderInfoData>{_id}</PlacedOrderInfoData>
        </PlacedOrderSubInfoFlexWrapper>
        <PlacedOrderSubInfoFlexWrapper>
          <PlacedOrderInfoHeader>Payment Method</PlacedOrderInfoHeader>
          <PlacedOrderInfoData>{paymentMethod}</PlacedOrderInfoData>
        </PlacedOrderSubInfoFlexWrapper>
      </PlacedOrderInfoGridCell>
      <PlacedOrderInfoGridCell subInfo>
        <PlacedOrderSubInfoFlexWrapper>
          <PlacedOrderInfoHeader>Total Quantity</PlacedOrderInfoHeader>
          <PlacedOrderInfoData>{totalQuantity}</PlacedOrderInfoData>
        </PlacedOrderSubInfoFlexWrapper>
        <PlacedOrderSubInfoFlexWrapper>
          <PlacedOrderInfoHeader>Total Price</PlacedOrderInfoHeader>
          <PlacedOrderInfoData>&#8369;{totalPrice}</PlacedOrderInfoData>
        </PlacedOrderSubInfoFlexWrapper>
      </PlacedOrderInfoGridCell>
    </PlacedOrderInfoGrid>
  );
};

export default OrderInfo;

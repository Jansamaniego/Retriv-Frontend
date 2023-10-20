import styled from 'styled-components';

const OrderItemContainer = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

const OrderItemFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderItemListProductHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 15rem;
  width: 100%;
`;

const OrderItemListColumnHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;
`;

const OrderItemListColumnHeader = styled.h5``;

const CheckOutItemListHeader = () => {
  return (
    <>
      <OrderItemContainer>
        <OrderItemFlexWrapper>
          <OrderItemListProductHeaderContainer>
            <OrderItemListColumnHeader>Product</OrderItemListColumnHeader>
          </OrderItemListProductHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Name</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Unit Price</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Quantity</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Total Price</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
        </OrderItemFlexWrapper>
      </OrderItemContainer>
    </>
  );
};

export default CheckOutItemListHeader;

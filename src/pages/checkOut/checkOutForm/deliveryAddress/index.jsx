import React from 'react';
import {
  Card,
  StyledInput,
  CountrySelect,
} from '../../../../components/common';
import styled from 'styled-components';

const DeliveryAddressFlexWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  column-gap: 1rem;
  max-width: 80rem;

  @media (max-width: 830px) {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 1.6rem;

  max-width: 30rem;
`;

const StyledStyledInput = styled(StyledInput)`
  max-width: 30rem;
  min-width: 10rem;
  width: 100%;
`;

const DeliveryAddressLabel = styled.label`
  font-weight: 700;
`;

const CountryAndPostalCodeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3.2rem;
`;

const CountryStyledInputContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  /* max-width: 50%; */
  gap: 1.6rem;
  max-width: 30rem;
`;

const PostalCodeStyledInputContainer = styled.div`
  /* max-width: 50%; */
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 1.6rem;
  max-width: 30rem;
`;

const PostalCodeAddressLabel = styled.label`
  white-space: nowrap;
  font-weight: 700;
`;

const DeliveryAddress = () => {
  return (
    <Card>
      <DeliveryAddressFlexWrapper>
        <StyledInputContainer>
          <DeliveryAddressLabel htmlFor="address">Address</DeliveryAddressLabel>
          <StyledStyledInput id="address" name="address" />
        </StyledInputContainer>
        <CountryStyledInputContainer>
          <DeliveryAddressLabel htmlFor="country">Country</DeliveryAddressLabel>
          <CountrySelect name="country" id="country" />
        </CountryStyledInputContainer>
        <PostalCodeStyledInputContainer>
          <PostalCodeAddressLabel htmlFor="postalCode">
            Postal Code
          </PostalCodeAddressLabel>
          <StyledStyledInput id="postalCode" name="postalCode" />
        </PostalCodeStyledInputContainer>
        <StyledInputContainer>
          <DeliveryAddressLabel htmlFor="phone">Phone</DeliveryAddressLabel>
          <StyledStyledInput id="phone" name="phone" />
        </StyledInputContainer>
      </DeliveryAddressFlexWrapper>
    </Card>
  );
};

export default DeliveryAddress;

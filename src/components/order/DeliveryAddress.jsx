import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, StyledInput } from '../common';
import { CountrySelect } from '../common/CountrySelect';
import styled from 'styled-components';

const DeliveryAddressFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const StyledInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
`;

const DeliveryAddressLabel = styled.label`
  width: 7rem;
  font-size: 1.6rem;
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
  justify-content: space-between;
  align-items: center;
  /* max-width: 50%; */
  gap: 1.6rem;
`;

const PostalCodeStyledInputContainer = styled.div`
  /* max-width: 50%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
`;

const PostalCodeAddressLabel = styled.label`
  font-size: 1.6rem;
  width: 13rem;
  font-weight: 700;
`;

const DeliveryAddress = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <DeliveryAddressFlexWrapper>
        <StyledInputContainer>
          <DeliveryAddressLabel htmlFor="address">Address</DeliveryAddressLabel>
          <StyledInput {...register('address')} id="address" />
        </StyledInputContainer>
        <CountryAndPostalCodeWrapper>
          <CountryStyledInputContainer>
            <DeliveryAddressLabel htmlFor="country">
              Country
            </DeliveryAddressLabel>
            <CountrySelect name="country" id="country" />
          </CountryStyledInputContainer>
          <PostalCodeStyledInputContainer>
            <PostalCodeAddressLabel htmlFor="postalCode">
              Postal Code
            </PostalCodeAddressLabel>
            <StyledInput {...register('postalCode')} id="postalCode" />
          </PostalCodeStyledInputContainer>
        </CountryAndPostalCodeWrapper>
        <StyledInputContainer>
          <DeliveryAddressLabel htmlFor="phone">Phone</DeliveryAddressLabel>
          <StyledInput {...register('phone')} id="phone" />
        </StyledInputContainer>
      </DeliveryAddressFlexWrapper>
    </Card>
  );
};

export default DeliveryAddress;

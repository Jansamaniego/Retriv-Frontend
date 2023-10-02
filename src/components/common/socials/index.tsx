import React from 'react';
import styled from 'styled-components';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from '../../../assets/icons';

const SocialsFlexContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
`;

const SocialsText = styled.h5`
  font-weight: 400;
`;

export const Socials: React.FC = () => {
  return (
    <SocialsFlexContainer>
      <SocialsText>socials:</SocialsText>
      <InstagramIcon width="3rem" />
      <TwitterIcon width="3rem" />
      <FacebookIcon width="3rem" />
    </SocialsFlexContainer>
  );
};

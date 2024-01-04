import { GithubIcon, LinkedinIcon } from 'assets/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.div`
  margin-top: auto;
  background-color: ${(props) => props.theme.background.default};
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 3rem 0;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const CopyrightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Copyright = styled.h6`
  color: ${(props) => props.theme.neutral.text};
`;

const StyledLinkedinIcon = styled(LinkedinIcon)`
  cursor: pointer;
`;

const StyledGithubIcon = styled(GithubIcon)`
  cursor: pointer;
`;

const Footer = () => {
  const linkedinIconOnclickHandler = () => {
    window.location.href =
      'https://www.linkedin.com/in/jan-christian-samaniego-822977201/';
  };

  const githubIconOnclickHandler = () => {
    window.location.href = 'https://github.com/Jansamaniego';
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <SocialsContainer>
          <StyledLinkedinIcon
            width="4rem"
            height="4rem"
            onClick={linkedinIconOnclickHandler}
          />
          <StyledGithubIcon
            width="4rem"
            height="4rem"
            onClick={githubIconOnclickHandler}
          />
        </SocialsContainer>
        <CopyrightContainer>
          <Copyright>&copy;2023 Copyright, All rights reserved.</Copyright>
        </CopyrightContainer>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;

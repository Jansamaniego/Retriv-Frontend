import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { XMarkIcon } from 'assets/icons';

interface MobileDropdownMenuProps {
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
  showCategoryFilterModal: () => void;
}

const MobileDropdownMenuContainer = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.neutral.light};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 999;
`;

const MobileDropdownMenuFlexWrapper = styled.div`
  margin-top: 6rem;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MobileNavOptionContainer = styled.div`
  padding: 1.6rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;

  &:active {
    background-color: aquamarine;
  }
`;

const MobileNavOptionWrapper = styled.div``;

const MobileDropDownText = styled.h2`
  color: ${(props) => props.theme.neutral.text};
`;

const XMarkIconContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const StyledXMarkIcon = styled(XMarkIcon)`
  cursor: pointer;
`;

const MobileDropdownMenu: React.FC<MobileDropdownMenuProps> = ({
  setIsMobileMenuOpen,
  showCategoryFilterModal,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFilterOptionOpen, setIsFilterOptionOpen] = useState(false);

  useEffect(() => {
    if (searchParams.size) {
      setIsFilterOptionOpen(true);
    }
  }, [searchParams]);

  const navigateHome = () => {
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navigateRegister = () => {
    setIsMobileMenuOpen(false);
    navigate('/register');
  };

  return (
    <>
      <MobileDropdownMenuContainer>
        <XMarkIconContainer>
          <StyledXMarkIcon
            width="5rem"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </XMarkIconContainer>
        <MobileDropdownMenuFlexWrapper>
          <MobileNavOptionContainer onClick={navigateHome}>
            <MobileNavOptionWrapper>
              <MobileDropDownText>Home</MobileDropDownText>
            </MobileNavOptionWrapper>
          </MobileNavOptionContainer>
          <MobileNavOptionContainer onClick={navigateRegister}>
            <MobileNavOptionWrapper>
              <MobileDropDownText>Sign up!</MobileDropDownText>
            </MobileNavOptionWrapper>
          </MobileNavOptionContainer>
          {isFilterOptionOpen && (
            <MobileNavOptionContainer onClick={showCategoryFilterModal}>
              <MobileNavOptionWrapper>
                <MobileDropDownText>Filter</MobileDropDownText>
              </MobileNavOptionWrapper>
            </MobileNavOptionContainer>
          )}
        </MobileDropdownMenuFlexWrapper>
      </MobileDropdownMenuContainer>
    </>
  );
};

export default MobileDropdownMenu;

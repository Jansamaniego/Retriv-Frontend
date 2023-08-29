import React from 'react';
import styled from 'styled-components';
import { StyledLink } from '../../../common';
import { XMarkIcon } from '../../../../assets/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryFilterModal from '../../sideMenu/mobileSideMenuCategoryFilter/categoryFIlterModal';

const MobileDropdownMenuContainer = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.neutral.light};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  z-index: 999;
`;

const MobileDropdownMenuFlexWrapper = styled.div`
  margin-top: 6rem;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
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

const XMarkIconContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const StyledXMarkIcon = styled(XMarkIcon)`
  cursor: pointer;
`;

const MobileDropdownMenu = ({
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

  console.log(searchParams.size);

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
              <h2>Home</h2>
            </MobileNavOptionWrapper>
          </MobileNavOptionContainer>
          <MobileNavOptionContainer onClick={navigateRegister}>
            <MobileNavOptionWrapper>
              <h2>Sign up!</h2>
            </MobileNavOptionWrapper>
          </MobileNavOptionContainer>
          {isFilterOptionOpen && (
            <MobileNavOptionContainer onClick={showCategoryFilterModal}>
              <MobileNavOptionWrapper>
                <h2>Filter</h2>
              </MobileNavOptionWrapper>
            </MobileNavOptionContainer>
          )}
        </MobileDropdownMenuFlexWrapper>
      </MobileDropdownMenuContainer>
    </>
  );
};

export default MobileDropdownMenu;

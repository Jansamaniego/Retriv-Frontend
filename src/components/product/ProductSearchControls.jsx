import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from '../../assets/icons';
import { ChevronLeft } from '../../assets/icons/chevronLeft';
import { ChevronRight } from '../../assets/icons/chevronRight';
import { useSearchParams } from 'react-router-dom';
import { productApi } from '../../redux/services/productApi';

const SortBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: ${(props) => props.theme.neutral[900]};
  border-radius: 0.5rem;
  margin-bottom: 1.6rem;
  font-size: 1.6rem;
`;

const SortByLabel = styled.span`
  color: ${(props) => props.theme.neutral[300]};
  margin: 0 0.3125rem 0 0;
  font-weight: 400;
`;

const SortByOptions = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
`;

const SortByOption = styled.div`
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  height: 3.4rem;
  line-height: 3.4rem;
  border-radius: 0.5rem;
  border: 0;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  border-radius: 0.5rem;
  padding: 0 1.6rem;
  background: ${(props) => props.theme.neutral[600]};
  white-space: nowrap;
  margin-left: 1.2rem;
  box-sizing: border-box;
  cursor: pointer;
`;

const SortByPriceOption = styled.div`
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  height: 3.4rem;
  line-height: 3.4rem;
  border-radius: 0.5rem;
  border: 0;
  user-select: none;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.neutral[600]};
  margin-left: 1.2rem;
  cursor: pointer;
`;

const SelectWithStatus = styled.div``;

const SelectWithStatusHolder = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  position: relative;
  transition: border-color 0.1s ease;
  min-width: 18rem;
`;

const SelectWithStatusPlaceholder = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.8);
  margin: 0 0.625rem 0 0.75rem;
  padding: 0;
`;

const ChevronDownContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectWithStatusDropdown = styled.div`
  display: ${(props) => (props.isPriceDropdownOpen ? 'flex' : 'none')};
  flex-direction: ${(props) => (props.isPriceDropdownOpen ? 'column' : '')};
  gap: ${(props) => (props.isPriceDropdownOpen ? '1rem' : 0)};
  box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.05);
  margin: 0;
  padding: 1rem;
  border: 0;
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  background: #fff;
  z-index: 10000;
  width: 100%;
  overflow-y: auto;
  border-radius: 0.5rem;
`;

const SelectWithStatusDropdownItem = styled.div`
  padding: 0 0.75rem 0 0.9375rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.primary.main};
  }
`;

const MiniPageController = styled.div`
  display: flex;
  align-items: center;
`;

const MiniPageControllerState = styled.div``;

const MiniPageControllerCurrent = styled.span`
  color: ${(props) => props.theme.primary.main};
`;

const MiniPageControllerTotal = styled.span``;

const MiniPageControllerPrevButton = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s cubic-bezier(0.4, 0, 0.6, 1);
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 0.5rem;
`;

const MiniPageControllerNextButton = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s cubic-bezier(0.4, 0, 0.6, 1);
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 0.5rem;
`;

const formatQueryParams = (params) => {
  const obj = {};
  for (const [key, value] of params.entries()) {
    if (value !== '') obj[key] = value;
  }
  return obj;
};

const ProductSearchControls = ({
  totalPages,
  handlePageChange,
  currentPage,
}) => {
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        page: Number(currentPage),
      };
    });
  }, [currentPage]);

  const togglePriceDropdown = () => {
    setIsPriceDropdownOpen((value) => !value);
  };

  const sortByRelevanceClickHandler = () => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        sortBy: 'relevance',
        sort: -1,
      };
    });
    handlePageChange(1);
  };

  const sortByLatestClickHandler = () => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        sortBy: 'latest',
        sort: -1,
      };
    });
    handlePageChange(1);
  };
  const sortByTopSalesClickHandler = () => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        sortBy: 'top-sales',
        sort: -1,
      };
    });
    handlePageChange(1);
  };

  const sortByPriceOptionLowToHighClickHandler = () => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        sortBy: 'price',
        sort: 1,
      };
    });
    handlePageChange(1);
  };

  const sortByPriceOptionHighToLowClickHandler = () => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        sortBy: 'price',
        sort: -1,
      };
    });
    handlePageChange(1);
  };

  const prevPageOnClickHandler = () => {
    handlePageChange(currentPage - 1);
  };

  const nextPageOnClickHandler = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <SortBar>
      <SortByLabel>Sort By</SortByLabel>
      <SortByOptions>
        <SortByOption onClick={sortByRelevanceClickHandler}>
          Relevance
        </SortByOption>
        <SortByOption onClick={sortByLatestClickHandler}>Latest</SortByOption>
        <SortByOption onClick={sortByTopSalesClickHandler}>
          Top Sales
        </SortByOption>
        <SortByPriceOption onClick={togglePriceDropdown}>
          <SelectWithStatus>
            <SelectWithStatusHolder>
              <SelectWithStatusPlaceholder>Price</SelectWithStatusPlaceholder>
              <ChevronDownContainer>
                <ChevronDown width="2rem" />
              </ChevronDownContainer>
              <SelectWithStatusDropdown
                isPriceDropdownOpen={isPriceDropdownOpen}
              >
                <SelectWithStatusDropdownItem
                  onClick={sortByPriceOptionLowToHighClickHandler}
                >
                  Price: Low to High
                </SelectWithStatusDropdownItem>
                <SelectWithStatusDropdownItem
                  onClick={sortByPriceOptionHighToLowClickHandler}
                >
                  Price: High to Low
                </SelectWithStatusDropdownItem>
              </SelectWithStatusDropdown>
            </SelectWithStatusHolder>
          </SelectWithStatus>
        </SortByPriceOption>
      </SortByOptions>
      {totalPages > 1 && (
        <MiniPageController>
          <MiniPageControllerState>
            <MiniPageControllerCurrent>{currentPage}</MiniPageControllerCurrent>
            /<MiniPageControllerTotal>{totalPages}</MiniPageControllerTotal>
          </MiniPageControllerState>
          <MiniPageControllerPrevButton
            onClick={prevPageOnClickHandler}
            disabled={currentPage === 1}
          >
            <ChevronLeft width="2rem" />
          </MiniPageControllerPrevButton>
          <MiniPageControllerNextButton
            onClick={nextPageOnClickHandler}
            disabled={currentPage === totalPages}
          >
            <ChevronRight width="2rem" />
          </MiniPageControllerNextButton>
        </MiniPageController>
      )}
    </SortBar>
  );
};

export default ProductSearchControls;

import React, { ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  isPageNumber?: boolean;
}

const PaginationContainer = styled.div`
  display: flex;
`;

const PaginationButton = styled.button<PaginationButtonProps>`
  width: ${(props) => (props.isPageNumber ? '4rem' : '8rem')};
  color: ${(props) =>
    props.disabled ? props.theme.neutral[400] : props.theme.neutral[100]};
  background: ${(props) =>
    props.disabled ? props.theme.neutral[500] : props.theme.neutral[800]};
  font-weight: ${(props) => (props.disabled ? '300' : '500')};
  cursor: ${(props) => {
    return props.disabled ? 'inherit' : 'pointer';
  }};
  box-shadow: none;
  border: none;
  border-radius: 0.5rem;
  white-space: none;
  font-size: 1.6rem;
  padding: 0.4rem;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${(props) =>
      props.disabled ? props.theme.neutral[500] : props.theme.neutral[600]};
  }

  &:active {
    background: ${(props) =>
      props.disabled ? props.theme.neutral[500] : props.theme.neutral[700]};
  }
`;

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [pagesToShow, setPagesToShow] = useState(3);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - pagesToShow);
    const endPage = Math.min(totalPages, currentPage + pagesToShow);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <PaginationButton
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          isPageNumber={true}
        >
          {page}
        </PaginationButton>
      );
    }

    return buttons;
  };

  return (
    <PaginationContainer>
      {currentPage !== 1 && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
      )}
      {renderPaginationButtons()}
      {currentPage !== totalPages && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      )}
    </PaginationContainer>
  );
};

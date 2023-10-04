import React, { createContext, useContext, useState } from 'react';

interface PaginationContextProviderProps {
  children: React.ReactNode;
}

// Create the PaginationContext
const PaginationContext = createContext({
  currentPage: 1,
  setCurrentPage: (currentPage: number) => {},
  totalPages: 1,
  setTotalPages: (totalPages: number) => {},
});

// Create a PaginationProvider component
export const ProductPaginationProvider = ({
  children,
}: PaginationContextProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const contextValue = {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  };

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
};

// Custom hook to consume the PaginationContext
export const useProductPagination = () => {
  return useContext(PaginationContext);
};

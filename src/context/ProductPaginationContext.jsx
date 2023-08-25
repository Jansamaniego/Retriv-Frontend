import React, { createContext, useContext, useState } from 'react';

// Create the PaginationContext
const PaginationContext = createContext();

// Create a PaginationProvider component
export const ProductPaginationProvider = ({ children }) => {
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

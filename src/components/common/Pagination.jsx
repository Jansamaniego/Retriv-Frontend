import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [pagesToShow, setPagesToShow] = useState(3);

  const handlePageChange = (newPage) => {
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
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPaginationButtons()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

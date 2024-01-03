import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetProductsQuery } from 'redux/services/productApi/productApi';
import { useProductPagination } from 'context/ProductPaginationContext';
import { RootState } from 'redux/store';
import { Pagination, Loading } from 'components/common';
import ProductList from 'components/product/productManager/productList';
import ProductSearchControls from 'components/product/productManager/productSearchControls';

interface IProductManagerProps {
  isProductSearchControlsOpen?: boolean;
}

const ProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, minmax(20.8rem, 1fr));
  gap: 2rem;

  @media (max-width: 1650px) {
    grid-template-columns: repeat(5, minmax(20.8rem, 1fr));
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, minmax(20.8rem, 1fr));
  }
  @media (max-width: 830px) {
    grid-template-columns: repeat(2, minmax(20.8rem, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(20.8rem, 1fr));
  }
`;

const ProductManager: React.FC<IProductManagerProps> = ({
  isProductSearchControlsOpen,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    useProductPagination();

  const { products, totalProductPages, isLoading, isFetching, refetch } =
    useGetProductsQuery(searchParams.size ? searchParams.toString() : '', {
      selectFromResult: ({ data, isLoading, isFetching }) => {
        return {
          products: data?.results,
          totalProductPages: data?.totalPages,
          isLoading,
          isFetching,
        };
      },
    });

  useEffect(() => {
    setCurrentPage(1);
    setSearchParams((params) => {
      params.delete('page');
      return params;
    });
  }, []);

  useEffect(() => {
    if (totalProductPages) {
      setTotalPages(totalProductPages);
    }
  }, [totalProductPages]);

  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams((params) => {
        params.set('page', currentPage.toString());
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete('page');
        return params;
      });
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [currentUser, refetch, searchParams]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!products || products.length === 0 || !isLoading) {
    return <h1>No products found</h1>;
  }

  return (
    <>
      {isProductSearchControlsOpen &&
        !!searchParams.size &&
        !searchParams.get('googleSignIn') && (
          <ProductSearchControls
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      {isFetching ? (
        <Loading />
      ) : (
        <ProductManagerGrid>
          <ProductList products={products} />
        </ProductManagerGrid>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ProductManager;

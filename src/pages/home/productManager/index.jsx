import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import ProductList from './productList';
import ProductSearchControls from './productSearchControls';
import { useGetProductsQuery } from '../../../redux/services/productApi';
import { useSelector } from 'react-redux';
import { Pagination, Loading } from '../../../components/common';
import { useState } from 'react';
import { useProductPagination } from '../../../context/ProductPaginationContext';

const ProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20.8rem, 1fr));
  gap: 20px;
`;

const formatQueryParams = (params) => {
  const obj = {};
  for (const [key, value] of params.entries()) {
    if (value !== '') obj[key] = value;
  }
  return obj;
};

const ProductManager = () => {
  const currentUser = useSelector((state) => state.userState.user);
  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    useProductPagination();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, totalProductPages, isLoading, refetch } =
    useGetProductsQuery(
      searchParams.size ? searchParams.toString() : undefined,
      {
        selectFromResult: ({ data }) => {
          return {
            products: data?.results,
            totalProductPages: data?.totalPages,
          };
        },
      }
    );

  console.log(totalProductPages);

  useEffect(() => {
    setTotalPages(totalProductPages);
  }, [totalProductPages]);

  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams((params) => {
        return {
          ...formatQueryParams(params),
          page: Number(currentPage),
        };
      });
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      await refetch(searchParams.size ? searchParams.toString() : undefined);
    };

    fetchData();
  }, [currentUser, refetch, searchParams]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    return <h1>No products found</h1>;
  }

  return (
    <>
      {searchParams.size ? (
        <ProductSearchControls
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      ) : null}
      <ProductManagerGrid>
        <ProductList products={products} />
      </ProductManagerGrid>
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

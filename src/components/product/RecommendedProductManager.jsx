import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import ProductList from './ProductList';
import ProductSearchControls from './ProductSearchControls';
import { useGetProductsQuery } from '../../redux/services/productApi/productApi';
import RecommendedProductList from './RecommendedProductList';
import { Loading } from '../common';
import { useSelector } from 'react-redux';
import { Pagination } from '../common';
import { useState } from 'react';
import { useProductPagination } from '../../context/ProductPaginationContext';
import { current } from '@reduxjs/toolkit';

const ProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const formatQueryParams = (params) => {
  const obj = {};
  for (const [key, value] of params.entries()) {
    if (value !== '') obj[key] = value;
  }
  return obj;
};

const RecommendedProductManager = () => {
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
    setSearchParams((params) => {
      params.set('page', Number(currentPage));
      return params;
      // return {
      //   ...formatQueryParams(params),
      //   page: Number(currentPage),
      // };
    });
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
        <RecommendedProductList products={products} />
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

export default RecommendedProductManager;

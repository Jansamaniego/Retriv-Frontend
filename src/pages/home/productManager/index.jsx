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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        page: Number(currentPage),
      };
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

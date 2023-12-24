import React, { useEffect } from 'react';
import ShopProductList from './shopProductList';
import styled from 'styled-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetProductsByShopIdQuery } from '../../../redux/services/productApi/productApi';
import { Card, Loading, Pagination } from '../../../components/common';
import { useProductPagination } from 'context/ProductPaginationContext';

const ShopProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, minmax(20.8rem, 0.25fr));
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

const ShopProductManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { shopId = '' } = useParams();
  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    useProductPagination();
  const { products, totalProductPages, isLoading, refetch } =
    useGetProductsByShopIdQuery(
      {
        shopId,
        queryString: searchParams.toString(),
      },
      {
        selectFromResult: ({ data, isLoading }) => {
          return {
            products: data?.results,
            totalProductPages: data?.totalPages,
            isLoading,
          };
        },
      }
    );

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', '1');
      return params;
    });
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (totalProductPages) {
      setTotalPages(totalProductPages);
    }
  }, [totalProductPages]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', currentPage.toString());
      return params;
    });
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [refetch, searchParams]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <Card>
        <h1>Loading...</h1>
      </Card>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card>
        <h1>No products found.</h1>
      </Card>
    );
  }

  return (
    <>
      <ShopProductManagerGrid>
        <ShopProductList products={products} />
      </ShopProductManagerGrid>
      {totalPages && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ShopProductManager;

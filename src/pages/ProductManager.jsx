import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/services/productApi';
import ProductList from '../components/product/ProductList';
import ProductSearchControls from '../components/product/ProductSearchControls';

const ProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const ProductManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, totalPages, isLoading } = useGetProductsQuery(
    searchParams.size ? searchParams.toString() : undefined,
    {
      selectFromResult: ({ data }) => {
        console.log(data);
        return {
          products: data?.results,
          totalPages: data?.totalPages,
        };
      },
    }
  );

  console.log(searchParams);

  console.log(products);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!products || products.length === 0 || !Array.isArray(products)) {
    return <h3>No products found</h3>;
  }

  return (
    <>
      {searchParams.size ? (
        <ProductSearchControls totalPages={totalPages} />
      ) : null}
      <ProductManagerGrid>
        <ProductList products={products} />
      </ProductManagerGrid>
    </>
  );
};

export default ProductManager;

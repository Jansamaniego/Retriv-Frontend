import React, { useEffect } from 'react';
import { Card } from '../components/common';
import styled from 'styled-components';
import ProductList from '../components/product/ProductList';
import { useGetProductsQuery } from '../redux/services/productApi';
import { useSearchParams } from 'react-router-dom';

const PaymentCompletionFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const PaymentCompletion = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useGetProductsQuery(
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

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!products || products.length === 0 || !Array.isArray(products)) {
    return <h3>No products found</h3>;
  }

  return (
    <PaymentCompletionFlexWrapper>
      <Card>
        <h3>Your order has been processed successfully!</h3>
        <h4>Thank you for shopping with Retriv!</h4>
      </Card>
      <Card>
        <h4>Please check out our other products:</h4>
        <ProductManagerGrid>
          <ProductList products={products} />
        </ProductManagerGrid>
      </Card>
    </PaymentCompletionFlexWrapper>
  );
};

export default PaymentCompletion;
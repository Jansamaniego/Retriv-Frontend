import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useGetProductsQuery } from 'redux/services/productApi/productApi';
import { Card, Loading } from 'components/common';
import ProductManager from 'components/product/productManager';

const PaymentCompletionFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const PaymentCompletion = () => {
  const [searchParams] = useSearchParams();
  const { products, isLoading } = useGetProductsQuery(
    searchParams.size ? searchParams.toString() : '',
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          products: data?.results,
          totalPages: data?.totalPages,
          isLoading,
        };
      },
    }
  );

  if (isLoading) return <Loading />;

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
      </Card>
      <ProductManager isProductSearchControlsOpen={false} />
    </PaymentCompletionFlexWrapper>
  );
};

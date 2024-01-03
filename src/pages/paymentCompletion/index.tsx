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

const PaymentCompletionText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;
const PaymentCompletionSubText = styled.h4`
  color: ${(props) => props.theme.neutral.text};
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
    return <PaymentCompletionText>No products found</PaymentCompletionText>;
  }

  return (
    <PaymentCompletionFlexWrapper>
      <Card>
        <PaymentCompletionText>
          Your order has been processed successfully!
        </PaymentCompletionText>
        <PaymentCompletionSubText>
          Thank you for shopping with Retriv!
        </PaymentCompletionSubText>
      </Card>
      <Card>
        <PaymentCompletionSubText>
          Please check out our other products:
        </PaymentCompletionSubText>
      </Card>
      <ProductManager isProductSearchControlsOpen={false} />
    </PaymentCompletionFlexWrapper>
  );
};

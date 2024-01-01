import { PageFlexColumnWrapper } from 'components/common';
import ProductManager from 'components/product/productManager';
import CategoryManager from 'components/category/categoryManager';
import { useSearchParams } from 'react-router-dom';

export const Home = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get('googleSignIn'));
  return (
    <PageFlexColumnWrapper>
      <ProductManager isProductSearchControlsOpen={true} />
      <CategoryManager />
    </PageFlexColumnWrapper>
  );
};

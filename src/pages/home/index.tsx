import { PageFlexColumnWrapper } from 'components/common';
import ProductManager from 'components/product/productManager';
import CategoryManager from 'components/category/categoryManager';

export const Home = () => {
  return (
    <PageFlexColumnWrapper>
      <ProductManager isProductSearchControlsOpen={true} />
      <CategoryManager />
    </PageFlexColumnWrapper>
  );
};

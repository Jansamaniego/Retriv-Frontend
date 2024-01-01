import { PageFlexColumnWrapper } from 'components/common';
import ProductManager from 'components/product/productManager';
import CategoryManager from 'components/category/categoryManager';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const Home = () => {
  const [searchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(['logged_in']);

  useEffect(() => {
    if (searchParams.get('googleSignIn')) {
      setCookie('logged_in', true);
    }
  }, []);

  return (
    <PageFlexColumnWrapper>
      <ProductManager isProductSearchControlsOpen={true} />
      <CategoryManager />
    </PageFlexColumnWrapper>
  );
};

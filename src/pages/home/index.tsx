import { PageFlexColumnWrapper } from 'components/common';
import ProductManager from 'components/product/productManager';
import CategoryManager from 'components/category/categoryManager';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';

export const Home = () => {
  const [searchParams] = useSearchParams();
  const cookies = new Cookies(null, { path: '/' });

  useEffect(() => {
    if (searchParams.get('googleSignIn')) {
      cookies.set('logged_in', true, {
        maxAge: Number(process.env.REACT_APP_API_WEB_BASE_URL) * 60 * 1000,
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      });
    }
  }, []);

  return (
    <PageFlexColumnWrapper>
      <ProductManager isProductSearchControlsOpen={true} />
      <CategoryManager />
    </PageFlexColumnWrapper>
  );
};

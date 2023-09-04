import React from 'react';
import { PageFlexColumnWrapper } from '../../components/common';
import ProductManager from './productManager';
import CategoryManager from './categoryManager';

export const Home = () => {
  return (
    <PageFlexColumnWrapper>
      <ProductManager />
      <CategoryManager />
    </PageFlexColumnWrapper>
  );
};

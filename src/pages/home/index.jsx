import React from 'react';
import { productApi } from '../../redux/services/productApi';
import { categoryApi } from '../../redux/services/categoryApi';
import { Card, PageFlexColumnWrapper } from '../../components/common';
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

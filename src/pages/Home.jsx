import React from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import ProductManager from './ProductManager';
import CategoryManager, {
  categoryManagerLoader,
} from '../components/category/CategoryManager';
import { useSelector } from 'react-redux';
import RecommendedProductManager, {
  recommendedProductManagerLoader,
} from '../components/product/RecommendedProductManager';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { productApi } from '../redux/services/productApi';
import { categoryApi } from '../redux/services/categoryApi';

const HomeFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

const Home = () => {
  return (
    <HomeFlexWrapper>
      <RecommendedProductManager />
      <CategoryManager />
    </HomeFlexWrapper>
  );
};

export default Home;

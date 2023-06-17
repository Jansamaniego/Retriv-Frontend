import React from 'react';
import PieGraph from '../graph/PieGraph';
import { Card } from '../common';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 60rem;
`;

const SalesByCategoryGraph = ({ salesByCategoryData }) => {
  let formattedSalesByCategoryData = [];

  Object.entries(salesByCategoryData).forEach(([key, val]) => {
    formattedSalesByCategoryData.push({ id: key, label: key, value: val });
  });

  return (
    <StyledCard>
      <PieGraph data={formattedSalesByCategoryData} />
    </StyledCard>
  );
};

export default SalesByCategoryGraph;

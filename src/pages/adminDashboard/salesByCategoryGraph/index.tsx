import React from 'react';
import styled from 'styled-components';

import { Card } from 'components/common';
import PieGraph from 'pages/adminDashboard/salesByCategoryGraph/pieGraph';

interface ISalesByCategoryGraph {
  salesByCategoryData: {
    [keys: number]: number;
  };
}

interface IFormattedSalesByCategoryObject {
  id: string;
  label: string;
  value: number;
}

const StyledCard = styled(Card)`
  height: 60rem;
`;

const SalesByCategoryGraph: React.FC<ISalesByCategoryGraph> = ({
  salesByCategoryData,
}) => {
  let formattedSalesByCategoryData: IFormattedSalesByCategoryObject[] = [];

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

import React, { useMemo, useState } from 'react';
import LineGraph from '../graph/LineGraph';
import { Card, Select } from '../common';
import styled, { useTheme } from 'styled-components';
import moment from 'moment';

const StyledCard = styled(Card)`
  height: 60rem;
`;

const ViewSelectContainer = styled.div`
  display: flex;
`;

const ViewSelect = styled(Select)`
  width: 10rem;
  z-index: 50;
  top: 1rem;
  left: 1rem;
`;

const SalesAndUnitsPerMonthLineGraph = ({ monthlyData }) => {
  const theme = useTheme();
  const [view, setView] = useState('sales');
  const [salesPerMonthLine, unitsPerMonthLine] = useMemo(() => {
    if (!monthlyData) return [];

    let index = 0;

    let formattedMonthlyData = [];

    for (let i = 0; i < 12; i++) {
      const month = moment().day(1).month(i).format('MMMM');
      if (monthlyData[index] && month === monthlyData[index].month) {
        formattedMonthlyData.push({
          ...monthlyData[index],
        });
        index++;
      } else {
        formattedMonthlyData.push({
          month,
          totalSales: 0,
          totalUnits: 0,
        });
      }
    }

    const salesPerMonthLine = {
      id: 'salesPerMonth',
      color: theme.primary.main,
      data: [],
    };

    const unitsPerMonthLine = {
      id: 'unitsPerMonth',
      color: theme.secondary.main,
      data: [],
    };

    formattedMonthlyData.forEach(({ month, totalSales, totalUnits }) => {
      salesPerMonthLine.data = [
        ...salesPerMonthLine.data,
        { x: month, y: totalSales },
      ];
      unitsPerMonthLine.data = [
        ...unitsPerMonthLine.data,
        { x: month, y: totalUnits },
      ];
    });

    return [[salesPerMonthLine], [unitsPerMonthLine]];
  }, [monthlyData, theme.primary.main, theme.secondary.main]);

  const onChangeHandler = (e) => {
    setView(e.target.value);
  };

  return (
    <StyledCard>
      <ViewSelectContainer>
        <ViewSelect onChange={onChangeHandler}>
          <option value="sales">Sales</option>
          <option value="units">Units</option>
        </ViewSelect>
      </ViewSelectContainer>
      <LineGraph
        data={view === 'sales' ? salesPerMonthLine : unitsPerMonthLine}
        leftAxisLegend={view === 'sales' ? 'sales' : 'units'}
        bottomAxisLegend="month"
      />
    </StyledCard>
  );
};

export default SalesAndUnitsPerMonthLineGraph;

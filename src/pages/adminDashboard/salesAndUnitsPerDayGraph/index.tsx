import React, { ChangeEvent, useMemo, useState } from 'react';
import { Card, Select } from '../../../components/common';
import styled, { useTheme } from 'styled-components';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ResponsiveLine, Serie } from '@nivo/line';

interface ISalesAndUnitsPerDayGraphProps {
  dailyData: {
    date: string;
    totalSales: number;
    totalUnits: number;
  }[];
  year: number;
}

const StyledCard = styled(Card)`
  height: 60rem;
  padding: 3.4rem;
`;

const ViewSelect = styled(Select)`
  width: 10rem;
  z-index: 50;
  top: 1rem;
  left: 1rem;
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
`;

const SalesAndUnitsPerDayGraph: React.FC<ISalesAndUnitsPerDayGraphProps> = ({
  dailyData,
  year,
}) => {
  const theme = useTheme();
  const [view, setView] = useState('sales');
  const [startDate, setStartDate] = useState(
    moment(`${year}-06-01`).endOf('day').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    moment(`${year}-07-01`).endOf('day').format('YYYY-MM-DD')
  );

  const startDateFull = new Date(startDate);
  const endDateFull = new Date(endDate);

  const [salesPerDayLine, unitsPerDayLine] = useMemo(() => {
    if (!dailyData) return [];

    let index = 0;

    let formattedDailyData = [];

    const daysInAYear = moment(year).isLeapYear() ? 366 : 365;

    for (let i = 0; i < daysInAYear; i++) {
      const date = moment(`${year}-01-01`)
        .add(i, 'days')
        .startOf('day')
        .format('YYYY-MM-DD');

      if (date >= startDate && date <= endDate) {
        if (dailyData[index] && date === dailyData[index].date) {
          formattedDailyData.push({
            ...dailyData[index],
          });
          index++;
        } else {
          formattedDailyData.push({
            date: moment(date).format('YYYY-MM-DD'),
            totalSales: 0,
            totalUnits: 0,
          });
        }
      } else if (dailyData[index] && date === dailyData[index].date) {
        index++;
      }
    }

    const salesPerDayLine: Serie | Serie[] = {
      id: 'salesPerDay',
      color: theme.primary.main,
      data: [],
    };

    const unitsPerDayLine: Serie | Serie[] = {
      id: 'unitsPerDay',
      color: theme.secondary.main,
      data: [],
    };

    formattedDailyData.forEach(({ date, totalSales, totalUnits }) => {
      salesPerDayLine.data = [
        ...salesPerDayLine.data,
        { x: date, y: totalSales },
      ];
      unitsPerDayLine.data = [
        ...unitsPerDayLine.data,
        { x: date, y: totalUnits },
      ];
    });

    return [[salesPerDayLine], [unitsPerDayLine]];
  }, [
    dailyData,
    theme.primary.main,
    theme.secondary.main,
    year,
    endDate,
    startDate,
  ]);

  const onChangeHandler = (event: ChangeEvent) => {
    setView((event.target as HTMLInputElement).value);
  };

  return (
    <StyledCard>
      <DatePickerContainer>
        <ViewSelect onChange={onChangeHandler}>
          <option value="sales">Sales</option>
          <option value="units">Units</option>
        </ViewSelect>
        <div>
          <StyledDatePicker
            selected={startDateFull}
            onChange={(date: Date) =>
              setStartDate(moment(date).endOf('day').format('YYYY-MM-DD'))
            }
            selectsStart
            startDate={startDateFull}
            endDate={endDateFull}
          />
          <StyledDatePicker
            selected={endDateFull}
            onChange={(date: Date) =>
              setEndDate(moment(date).endOf('day').format('YYYY-MM-DD'))
            }
            selectsEnd
            startDate={startDateFull}
            endDate={endDateFull}
            minDate={startDateFull}
          />
        </div>
      </DatePickerContainer>
      <ResponsiveLine
        data={view === 'sales' ? salesPerDayLine || [] : unitsPerDayLine || []}
        axisLeft={{ legend: view === 'sales' ? 'sales' : 'units' }}
        axisBottom={{ legend: 'date' }}
      />
    </StyledCard>
  );
};

export default SalesAndUnitsPerDayGraph;

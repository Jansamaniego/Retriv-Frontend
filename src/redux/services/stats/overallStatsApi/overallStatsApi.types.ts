import { IResponse } from 'src/types';

export interface IGetOverallStatsResponse extends IResponse {
  overallStats: IOverallStats;
}

export interface IOverallStats {
  totalCustomers: number;
  yearlySalesTotal: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
  salesByCategory: {
    [keys: number]: number;
  };
}

interface IMonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

interface IDailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
}

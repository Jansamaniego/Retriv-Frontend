import { IProduct, IResponse } from 'types';

export interface IGetProductStats {
  shopId: string;
  productId: string;
  year: number;
}

export interface IGetProductStatsResponse extends IResponse {
  productStats: IProductStats;
}

export interface IProductStats {
  product: IProduct | string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
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

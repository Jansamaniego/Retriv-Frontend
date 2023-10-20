import { IShop, IResponse } from 'types';

export interface IGetShopStats {
  shopId: string;
  year: number;
}

export interface IGetshopStatsResponse extends IResponse {
  shopStats: IShopStats;
}

export interface IShopStats {
  shop: IShop | string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
  ratingsQuantityPerRatingScore: {
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

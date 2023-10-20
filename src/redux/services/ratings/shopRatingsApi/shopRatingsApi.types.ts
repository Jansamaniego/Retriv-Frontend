import { IResponse, IShop } from 'types';

export interface IGetShopRatingsResponse extends IResponse {
  shopRatings: IShopRatings;
}

export interface IShopRatings {
  shop: IShop | string;
  ratingsAverage: number;
  ratingsQuantity: number;
  ratingsQuantityPerRatingScore: {
    [keys: number]: number;
  };
}

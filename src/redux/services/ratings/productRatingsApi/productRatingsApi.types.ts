import { IProduct, IResponse } from 'src/types';

export interface IGetProductRatingsResponse extends IResponse {
  productRatings: IProductRatings;
}

export interface IGetProductRatings {
  shopId: string;
  productId: string;
}

export interface IProductRatings {
  product: IProduct | string;
  ratingsAverage: number;
  ratingsQuantity: number;
  ratingsQuantityPerRatingScore: {
    [keys: number]: number;
  };
}

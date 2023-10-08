import { IProduct, IResponse, IReview, IShop, IUser } from 'src/types';

export interface IReviewWithUserPickValues {
  id: string;
  _id: string;
  product: IProduct | string;
  shop: IShop | string;
  reviewText: string;
  rating: number;
  user: Pick<
    IUser,
    '_id' | 'firstName' | 'lastName' | 'profileImage' | 'profileImageId'
  >;
}

export interface IGetReviewsByProductIdResponse extends IResponse {
  reviews: {
    results: IReviewWithUserPickValues[];
    totalPages: number;
  };
}

export interface IGetReviewsByProductIdTransformedResponse {
  results: IReviewWithUserPickValues[];
  totalPages: number;
}

export interface IGetReviewsByProductId {
  shopId: string;
  productId: string;
}

export interface IGetReviewByIdResponse extends IResponse {
  review: IReviewWithUserPickValues;
}

export interface ICreateReviewResponse extends IResponse {
  review: IReview;
}

export interface ICreateReview {
  shopId: string;
  productId: string;
  reviewText: string;
  rating: number;
}

export interface IUpdateReviewResponse extends IResponse {
  review: IReviewWithUserPickValues;
}

export interface IUpdateReview {
  reviewId: string;
  productId: string;
  reviewText: string;
  rating: number;
}

export interface IDeleteReviewResponse extends IResponse {
  review: IReview;
}

export interface IDeleteReview {
  shopId: string;
  productId: string;
  reviewId: string;
}

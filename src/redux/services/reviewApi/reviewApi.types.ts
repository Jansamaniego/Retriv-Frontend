import { IResponse, IReview } from 'src/types';

export interface IGetReviewsByProductIdResponse extends IResponse {
  reviews: {
    results: IReview[];
    totalPages: number;
  };
}

export interface IGetReviewsByProductId {
  shopId: string;
  productId: string;
}

export interface IGetReviewByIdResponse extends IResponse {
  review: IReview;
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
  review: IReview;
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

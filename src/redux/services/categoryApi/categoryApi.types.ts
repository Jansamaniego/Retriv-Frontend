import { ICategory, IResponse } from 'src/types';

export interface IGetCategoriesResponse extends IResponse {
  categories: IGetCategoriesReturnObject;
}

export interface IGetCategoriesReturnObject {
  results: ICategory[];
  totalPages: number;
}

export interface ICategoryResponse extends IResponse {
  category: ICategory;
}

export interface ICreateCategory extends FormData {}

export interface IUpdateCategoryDetails {
  categoryId: string;
  name: string;
  description: string;
}

export interface IUpdateCategoryImage extends FormData {}

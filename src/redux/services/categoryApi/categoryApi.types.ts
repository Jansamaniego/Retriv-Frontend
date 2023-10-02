import { ICategory, IResponse } from 'src/types';

export interface IGetCategoriesResponse extends IResponse {
  categories: {
    results: ICategory[];
    totalPages: number;
  };
}

export interface ICategoryResponse extends IResponse {
  category: ICategory;
}

export interface ICreateCategory {
  name: string;
  description: string;
}

export interface IUpdateCategoryDetails {
  categoryId: string;
  name: string;
  description: string;
}

export interface IUpdateCategoryImage extends FormData {
  id: string;
  image: File;
}

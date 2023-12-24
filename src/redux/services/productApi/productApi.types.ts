import { IProduct, IResponse } from 'types';

export interface IGetProductsResponse extends IResponse {
  products: {
    results: IProduct[];
    totalPages: number;
  };
}

export interface IGetProductsTransformedResponse {
  results: IProduct[];
  totalPages: number;
}

export interface IGetProductsByShopId {
  shopId: string;
  queryString: string;
}

export interface IGetProductsByShopIdResponse extends IResponse {
  results: {
    results: IProduct[];
    totalPages: number;
  };
}

export interface IGetProductByIdResponse extends IResponse {
  product: IProduct;
}

export interface IGetProductById {
  shopId: string;
  productId: string;
}

export interface ICreateProductResponse extends IResponse {
  product: IProduct;
}

export interface ICreateProduct {
  shopId: string;
  formData: FormData;
}

interface ICreateProductFormEntries extends FormData {
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  category: string;
  mainImage: File;
  images: File[];
}

export interface IUpdateProductDetailsResponse extends IResponse {
  product: IProduct;
}

export interface IUpdateProductDetails {
  shopId: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
}

export interface IUpdateProductMainImage extends FormData {}

export interface IUpdateProductImages extends FormData {}

export interface IAddProductImages extends FormData {}

export interface IDeleteProductImage {
  shopId: string;
  productId: string;
  image: string;
}

export interface IDeleteProductResponse extends IResponse {
  product: IProduct;
}

export interface IDeleteProduct {
  shopId: string;
  productId: string;
}

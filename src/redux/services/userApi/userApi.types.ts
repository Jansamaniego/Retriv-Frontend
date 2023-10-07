import { IResponse, IUser } from 'src/types';

interface IModifiedShop {
  name: string;
  address: string;
  shopImage: string;
  shopImageId: string;
}

export interface IUserWithModifiedShops {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'seller';
  shops?: IModifiedShop[];
  isEmailVerified: boolean;
  passwordChangedAt?: string;
  dateJoined: string;
  address?: string;
  phone?: string;
  dateOfBirth?: string;
  avgShopRating?: number;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  profileImage: string;
  profileImageId: String;
  defaultShop: string;
  preferredCategories: string[];
}

export interface IGetUsersResponse extends IResponse {
  users: {
    results: IUserWithModifiedShops[];
    totalPages: number;
  };
}

export interface IGetUserByIdResponse extends IResponse {
  user: IUser;
}

export interface ICreateUserResponse extends IResponse {
  user: IUser;
}

export interface ICreateUser extends FormData {}

export interface IUpdateUserResponse extends IResponse {
  user: IUser;
}

export interface IUpdateUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  address?: string;
  phone?: string;
  dateOfBirth?: Date;
}

export interface IDeleteUserResponse extends IResponse {
  user: IUser;
}

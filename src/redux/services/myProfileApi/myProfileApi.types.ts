import { IResponse, IUser } from 'src/types';

export interface IGetMeResponse extends IResponse {
  user: IUser;
}

export interface IUpdateDetailsResponse extends IResponse {
  user: IUser;
}

export interface IUpdateDetails {
  firstName: 'string';
  lastName: 'string';
  username: 'string';
  email: 'string';
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  address?: 'string';
  phone?: 'string';
  dateOfBirth?: 'string';
}

export interface IUpdateProfileImage extends FormData {}

export interface IUpdateProfileImageResponse extends IResponse {
  user: IUser;
}

export interface IUpdateDefaultShopResponse extends IResponse {
  user: IUser;
}

export interface IDeleteMyAccountResponse extends IResponse {
  user: IUser;
}

import { IResponse, IUser } from 'src/types';

export interface IGetUsersResponse extends IResponse {
  users: {
    results: IUser[];
    totalPages: number;
  };
}

export interface IGetUserByIdResponse extends IResponse {
  user: IUser;
}

export interface ICreateUserResponse extends IResponse {
  user: IUser;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  image: File;
  address?: string;
  phone?: string;
  dateOfBirth?: Date;
}

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

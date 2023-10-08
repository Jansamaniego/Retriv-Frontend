import { IUser, IToken, IResponse } from 'src/types';

export interface ILogin {
  email: string;
  password: string;
}

export interface IloginResponse extends IResponse {
  tokens: Tokens;
  user: IUser;
}

export interface IRegister extends FormData {
  // username: string;
  // email: string;
  // password: string;
  // passwordConfirmation: string;
  // firstName: string;
  // lastName: string;
  // gender: 'male' | 'female' | 'other' | 'undisclosed';
  // image: File;
  // address?: string;
  // phone?: string;
  // dateOfBirth?: Date;
}

export interface IRegisterResponse extends IResponse {
  tokens: Tokens;
  user: IUser;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  passwordConfirmation: string;
  resetToken: string;
}

export interface IChangePasswordResponse extends IResponse {
  user: IUser;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface IVerifyEmailResponse extends IResponse {
  user: IUser;
}

export interface Tokens {
  accessToken: IToken;
  refreshToken: IToken;
}

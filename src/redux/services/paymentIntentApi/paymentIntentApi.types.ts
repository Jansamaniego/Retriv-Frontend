import { IResponse } from 'types';

export interface ICreatePaymentIntentResponse extends IResponse {
  clientSecret: string;
  paymentIntentId: string;
}

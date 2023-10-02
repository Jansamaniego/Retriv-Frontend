import { IResponse } from 'src/types';

export interface ICreatePaymentIntentResponse extends IResponse {
  clientSecret: string;
  paymentIntentId: string;
}

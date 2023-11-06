import { authHandlers } from './domain/auth';
import { cartHandlers } from './domain/cart';
import { productHandlers } from './domain/product';

export const handlers = [...authHandlers, ...cartHandlers, ...productHandlers];

import { faker } from '@faker-js/faker';
import retrivApi from 'mocks/baseUrls';
import { db } from 'mocks/mockDb/mockDb';
import { rest } from 'msw';

export const cartHandlers = [
  rest.get(retrivApi('cart'), (req, res, ctx) => {
    const cart = db.cart.findFirst({ where: { id: { equals: '123' } } });

    return res(ctx.json({ cart }));
  }),
  rest.delete(retrivApi('cart'), (req, res, ctx) => {
    const deletedCart = db.cart.delete({ where: { id: { equals: '123' } } });

    return res(
      ctx.json({
        cart: deletedCart,
      })
    );
  }),

  rest.delete(
    retrivApi('cart/remove-product/:productId'),
    async (req, res, ctx) => {
      const { productId } = req.params;

      const response =
        typeof productId === 'string' &&
        db.cartItem.delete({
          where: { product: { equals: productId } },
        });

      const cartItems = db.cartItem.getAll();
      console.log(cartItems);
      if (!response) {
        return res(ctx.status(404, 'removing item from cart failed'));
      }
      return res(ctx.status(202, 'item is removed from cart successfully'));
    }
  ),
];

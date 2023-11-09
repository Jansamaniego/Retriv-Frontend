import retrivApi from 'mocks/baseUrls';
import { db } from 'mocks/mockDb/mockDb';
import { rest } from 'msw';

export const productHandlers = [
  rest.get(retrivApi('shop/:shopId/product/:productId'), (req, res, ctx) => {
    let mockedProduct;
    mockedProduct = db.product.findFirst({
      where: { id: { equals: '123' } },
    });

    console.log(mockedProduct);

    if (!mockedProduct) {
      mockedProduct = db.product.create({ id: '123' });
    }

    return res(ctx.json({ product: mockedProduct }));
  }),
];

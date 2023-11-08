import retrivApi from 'mocks/baseUrls';
import { rest } from 'msw';

export const productHandlers = [
  rest.get(retrivApi('shop/:shopId/product/:productId'), (req) => {
    const { shopId, productId } = req.params;
    console.log('intercepted');
    return HttpResponse.json(
      {
        data: {
          product: {
            product: productId,
            shop: shopId,
            _id: productId,
            totalProductPrice: 3232,
            totalProductQuantity: 4,
          },
        },
      },
      { status: 200, statusText: 'product is found successfully' }
    );
  }),
];

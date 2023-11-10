import retrivApi from 'mocks/baseUrls';
import { db } from 'mocks/mockDb/mockDb';
import { rest } from 'msw';

export const categoryHandlers = [
  rest.patch(retrivApi('category/:categoryId/image'), (req, res, ctx) => {
    const category = db.category.update({
      where: { image: { equals: '123' } },
      data: { image: '456' },
    });

    return res(ctx.json({ category }));
  }),
];

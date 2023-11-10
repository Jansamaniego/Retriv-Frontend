import { screen } from '@testing-library/react';

import { renderWithProviders } from 'testUtils';
import CartItemManager from '.';
import { db } from 'mocks/mockDb/mockDb';
import { server } from 'setupTests';
import retrivApi from 'mocks/baseUrls';
import { rest } from 'msw';

describe('cart item manager', () => {
  db.cart.create({
    id: '123',
    items: [
      {
        product: '123',
      },
      {
        product: '456',
      },
    ],
  });
  test('renders correctly', async () => {
    renderWithProviders(<CartItemManager />);

    const ProductNameHeaderArray = await screen.findAllByRole('heading', {
      name: /test product/i,
    });

    expect(ProductNameHeaderArray[0]).toBeInTheDocument();

    const CartHeader = screen.queryByRole('heading', {
      name: /Your shopping cart is empty./i,
    });

    expect(CartHeader).not.toBeInTheDocument();
  });

  test('handle empty cart correctly', async () => {
    server.use(
      rest.get(retrivApi('cart'), (req, res, ctx) => {
        return res(ctx.json({ cart: null }));
      })
    );

    renderWithProviders(<CartItemManager />);

    const CartHeader = await screen.findByRole('heading', {
      name: /Your shopping cart is empty./i,
    });

    expect(CartHeader).toBeInTheDocument();
  });
});

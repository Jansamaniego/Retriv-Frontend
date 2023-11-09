import { screen } from '@testing-library/react';

import { renderWithProviders } from 'testUtils';
import CartItemList from '.';
import { db } from 'mocks/mockDb/mockDb';

describe('Cart item list', () => {
  db.cartItem.create({ id: '123' });
  db.cartItem.create({ id: '456' });
  db.cartItem.create({ id: '789' });
  test('renders correctly', async () => {
    const cartItemsData = db.cartItem.findMany({});

    renderWithProviders(<CartItemList cartItems={cartItemsData} />);

    const cartItems = await screen.findAllByRole('heading');

    expect(cartItems).toHaveLength(cartItemsData.length);
  });
});

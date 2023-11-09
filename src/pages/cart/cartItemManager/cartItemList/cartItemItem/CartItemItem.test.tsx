import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from 'testUtils';
import CartItemItem from '.';
import { db } from 'mocks/mockDb/mockDb';
import { server } from 'setupTests';
import { rest } from 'msw';
import retrivApi from 'mocks/baseUrls';
import { productApi } from 'redux/services';

describe('cart item item', () => {
  db.cartItem.create({ id: '123', product: '12345' });
  test('renders correctly', async () => {
    const cartItemData = db.cartItem.findFirst({
      where: { id: { equals: '123' } },
    });
    renderWithProviders(
      <CartItemItem cartItemIndex={0} cartItem={cartItemData!} />
    );

    const productNameHeader = await screen.findByRole('heading', {
      name: /test product/i,
    });

    expect(productNameHeader).toBeInTheDocument();

    const removeFromCartButton = await screen.findByRole('button', {
      name: /delete/i,
    });

    expect(removeFromCartButton).toBeInTheDocument();
  });

  test('remove item from cart correctly', async () => {
    const cartItemData = db.cartItem.findFirst({
      where: { id: { equals: '123' } },
    });

    const { rerender } = renderWithProviders(
      <CartItemItem cartItemIndex={0} cartItem={cartItemData!} />
    );

    const removeFromCartButton = await screen.findByRole('button', {
      name: /delete/i,
    });

    expect(removeFromCartButton).toBeInTheDocument();

    await userEvent.click(removeFromCartButton);

    await new Promise((resolve) => setTimeout(resolve, 10));

    const removedItem = db.cartItem.findFirst({
      where: { product: { equals: '12345' } },
    });

    expect(removedItem).toBeNull();
  });
});

import { renderWithProviders } from 'testUtils';
import CartItemList from '.';
import { screen } from '@testing-library/react';
import { useGetProductByIdQuery } from 'redux/services/productApi/productApi';

const CART_ITEMS = [
  {
    id: '123',
    _id: '123',
    product: '123',
    totalProductPrice: 3232,
    totalProductQuantity: 3,
    shop: '123',
    shopOwner: '123',
    category: '123',
  },
  {
    id: '346',
    _id: '346',
    product: '346',
    totalProductPrice: 5454,
    totalProductQuantity: 15,
    shop: '346',
    shopOwner: '346',
    category: '346',
  },
  {
    id: '789',
    _id: '789',
    product: '789',
    totalProductPrice: 9898,
    totalProductQuantity: 4,
    shop: '789',
    shopOwner: '789',
    category: '789',
  },
];

describe('Cart item list', () => {
  test('renders correctly', async () => {
    renderWithProviders(<CartItemList cartItems={CART_ITEMS} />);

    const cartItems = await screen.findAllByRole('listitem');

    expect(cartItems).toHaveLength(CART_ITEMS.length);
  });
});

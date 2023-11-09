import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CartControl, { ICartControlProps } from '.';
import { renderWithProviders } from 'testUtils';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('cart control', () => {
  const cartControlProps: ICartControlProps = {
    totalPrice: 345,
    totalQuantity: 4,
  };

  const { totalPrice, totalQuantity } = cartControlProps;

  test('renders correctly', () => {
    renderWithProviders(
      <CartControl totalPrice={totalPrice} totalQuantity={totalQuantity} />
    );

    const openDeleteCartModalButton = screen.getByRole('button', {
      name: /Delete Cart/i,
    });

    const cartDetailsHeader = screen.getByRole('heading', {
      name: `Total (${totalQuantity} items): ₱${totalPrice}`,
    });

    const checkOutButton = screen.getByRole('button', { name: /Check Out/i });

    const deleteModalText = screen.queryByRole('heading', {
      name: /Are you sure you want to delete your cart?/i,
    });

    expect(checkOutButton).toBeInTheDocument();
    expect(cartDetailsHeader).toBeInTheDocument();
    expect(openDeleteCartModalButton).toBeInTheDocument();
    expect(deleteModalText).not.toBeInTheDocument();
  });

  test('toggles delete cart modal', async () => {
    renderWithProviders(
      <CartControl totalPrice={totalPrice} totalQuantity={totalQuantity} />
    );

    const openDeleteCartModalButton = screen.getByRole('button', {
      name: /Delete Cart/i,
    });

    await userEvent.click(openDeleteCartModalButton);

    const deleteModalText = screen.queryByRole('heading', {
      name: /Are you sure you want to delete your cart?/i,
    });

    expect(deleteModalText).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', {
      name: /Cancel/i,
    });

    await userEvent.click(cancelButton);

    expect(deleteModalText).not.toBeInTheDocument();
  });

  test('handles a successful delete cart request correctly', async () => {
    renderWithProviders(
      <CartControl totalPrice={totalPrice} totalQuantity={totalQuantity} />
    );

    const openDeleteCartModalButton = screen.getByRole('button', {
      name: /Delete Cart/i,
    });

    await userEvent.click(openDeleteCartModalButton);

    const deleteModalText = screen.queryByRole('heading', {
      name: /Are you sure you want to delete your cart?/i,
    });

    expect(deleteModalText).toBeInTheDocument();

    const deleteCartModalConfirmButton = screen.getByRole('button', {
      name: /Confirm/i,
    });

    expect(deleteCartModalConfirmButton).toBeInTheDocument();
  });

  test('handles a failed delete cart request correctly', () => {
    renderWithProviders(
      <CartControl totalPrice={totalPrice} totalQuantity={totalQuantity} />
    );
  });

  test('navigates to checkout', async () => {
    renderWithProviders(
      <CartControl totalPrice={totalPrice} totalQuantity={totalQuantity} />
    );

    const checkOutButton = screen.getByRole('button', { name: /Check Out/i });

    expect(checkOutButton).toBeInTheDocument();

    await userEvent.click(checkOutButton);

    expect(mockedUsedNavigate).toHaveBeenCalled();

    mockedUsedNavigate.mockRestore();
  });
});

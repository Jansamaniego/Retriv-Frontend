import { renderWithProviders } from 'testUtils';
import { Categories } from '.';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('categories', () => {
  test('renders correctly', async () => {
    renderWithProviders(<Categories />);

    const CreateCategoryButton = screen.getByRole('button', {
      name: /Create a new category/i,
    });

    expect(CreateCategoryButton).toBeInTheDocument();

    await userEvent.click(CreateCategoryButton);

    expect(mockedUsedNavigate).toHaveBeenCalled();

    mockedUsedNavigate.mockRestore();
  });
});

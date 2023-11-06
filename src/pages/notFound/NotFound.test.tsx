import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NotFound } from '.';

describe('Not Found', () => {
  test('renders correctly', () => {
    render(<NotFound />);

    const notFoundHeader = screen.getByRole('heading');

    expect(notFoundHeader).toBeInTheDocument();
  });
});

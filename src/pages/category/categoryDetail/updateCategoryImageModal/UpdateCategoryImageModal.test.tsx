import { renderWithProviders } from 'testUtils';
import UpdateCategoryImageModal from '.';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from 'mocks/mockDb/mockDb';

describe('update category image modal', () => {
  global.URL.createObjectURL = jest.fn();
  db.category.create({ id: '123', image: '123' });
  test('renders correctly', async () => {
    renderWithProviders(
      <UpdateCategoryImageModal
        isModalOpen={true}
        closeModal={() => {}}
        id="12313"
      />
    );

    const FileInput = screen.getByLabelText('updateCategoryImage');

    expect(FileInput).toBeInTheDocument();

    const SubmitButton = screen.getByRole('button', { name: /submit/i });

    expect(SubmitButton).toBeInTheDocument();
  });

  test('updates category image correctly', async () => {
    let file;

    file = new File(['hello'], 'hello.png', { type: 'image/png' });

    renderWithProviders(
      <UpdateCategoryImageModal
        isModalOpen={true}
        closeModal={() => {}}
        id="12313"
      />
    );

    const FileInput = screen.getByLabelText('updateCategoryImage');

    expect(FileInput).toBeInTheDocument();

    await userEvent.upload(FileInput, file);

    //@ts-ignore
    expect(FileInput.files.length).toBe(1);

    const SubmitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.click(SubmitButton);

    await new Promise((resolve) => setTimeout(resolve, 10));

    const updatedCategory = db.category.findFirst({
      where: { id: { equals: '123' } },
    });

    expect(updatedCategory?.image).toBe('456');
  });
});

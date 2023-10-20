import { DevTool } from '@hookform/devtools';
import { forwardRef, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';

import { useProductPagination } from 'context/ProductPaginationContext';
import { SearchIcon } from 'assets/icons';
import { Button } from 'components/common';

interface IMobileSearchProps {
  isMobileSearchOpen: boolean;
}

type FormValues = {
  search: string;
};

interface IStyledFormProps {
  isMobileSearchOpen: boolean;
}

const StyledForm = styled.form<IStyledFormProps>`
  display: none;

  @media (max-width: 600px) {
    display: ${(props) => (props.isMobileSearchOpen ? 'flex' : 'none')};
    transition: width 0.3s ease-in-out;
    align-items: center;
    margin: auto;
    width: 60%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;

  background-color: ${(props) => props.theme.neutral[900]};
  border-radius: 0.5rem;
  font-size: 2rem;
  width: 100%;
`;

const MobileSearchInput = styled.input`
  @media (max-width: 600px) {
    min-height: 4rem;
    padding: 0 1.6rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #f1f1f1;
    width: 100%;
  }
`;

const SearchIconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 4rem;
  height: 4rem;
`;

const MobileSearch = forwardRef<HTMLFormElement, IMobileSearchProps>(
  ({ isMobileSearchOpen }, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { setCurrentPage } = useProductPagination();

    const searchQuerySchema = z.object({
      search: z.string(),
    });

    const methods = useForm<FormValues>({
      resolver: zodResolver(searchQuerySchema),
    });

    const { handleSubmit, control, register, setValue } = methods;

    useEffect(() => {
      const searchString = searchParams.get('search');
      if (typeof searchString === 'string') {
        setValue('search', searchString);
      }
    }, [searchParams, setValue]);

    const onSubmitSearchQueryHandler: (data: FormValues) => void = (data) => {
      setSearchParams((params) => {
        params.set('search', data.search);
        params.set('sortBy', 'relevance');
        params.set('sort', '-1');
        return params;
      });
      setCurrentPage(1);
    };
    return (
      <FormProvider {...methods}>
        <StyledForm
          onSubmit={handleSubmit(onSubmitSearchQueryHandler)}
          isMobileSearchOpen={isMobileSearchOpen}
          ref={ref}
        >
          <SearchBar>
            <MobileSearchInput {...register('search')} />
            <SearchIconButton type="submit">
              <SearchIcon width="2rem" />
            </SearchIconButton>
          </SearchBar>
        </StyledForm>
        <DevTool control={control} />
      </FormProvider>
    );
  }
);

export default MobileSearch;

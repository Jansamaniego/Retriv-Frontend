import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { useSearchParams } from 'react-router-dom';

import { useProductPagination } from 'context/ProductPaginationContext';
import { Button } from 'components/common';
import { SearchIcon } from 'assets/icons';

type FormValues = {
  search: string;
};

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  margin: auto;
  width: 45%;

  @media (max-width: 600px) {
    display: none;
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

const SearchInput = styled.input`
  width: 95%;
  border: none;
  padding: 0 1.6rem;
  border-radius: 0.5rem;
  min-height: 4rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const SearchIconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.secondary.main};

  &:hover {
    background-color: ${(props) => props.theme.secondary[400]};
  }
`;

const Search = () => {
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
  }, [searchParams]);

  const onSubmitSearchQueryHandler: (data: FormValues) => void = (data) => {
    setSearchParams((params) => {
      if (params.get('googleSignIn') !== undefined) {
        params.delete('googleSignIn');
      }
      params.set('search', data.search);
      params.set('sortBy', 'relevance');
      params.set('sort', '-1');
      return params;
    });
    setCurrentPage(1);
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmitSearchQueryHandler)}>
        <SearchBar>
          <SearchInput {...register('search')} />
          <SearchIconButton type="submit">
            <SearchIcon width="2rem" />
          </SearchIconButton>
        </SearchBar>
      </StyledForm>
      <DevTool control={control} />
    </FormProvider>
  );
};

export default Search;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { useSearchParams } from 'react-router-dom';

import { Button } from '../../../common';
import { SearchIcon } from '../../../../assets/icons';
import { useProductPagination } from '../../../../context/ProductPaginationContext';

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
`;

const SearchIconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const formatQueryParams = (params) => {
  const obj = {};
  for (const [key, value] of params.entries()) {
    if (value !== '') obj[key] = value;
  }
  return obj;
};

const formatData = (data, searchParams) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== '') {
      acc[key] = value;
    } else {
      searchParams.delete(key);
    }
    return acc;
  }, {});
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { currentPage, setCurrentPage } = useProductPagination();

  const searchQuerySchema = z.object({
    search: z.string(),
  });

  const methods = useForm({
    resolver: zodResolver(searchQuerySchema),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  const onSubmitSearchQueryHandler = (data) => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        ...formatData(data, searchParams),
        sortBy: 'relevance',
        sort: -1,
      };
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

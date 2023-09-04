import { DevTool } from '@hookform/devtools';
import React, { forwardRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useProductPagination } from '../../../../context/ProductPaginationContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { SearchIcon } from '../../../../assets/icons';
import { useState } from 'react';
import { useEffect } from 'react';

const StyledForm = styled.form`
  display: none;

  @media (max-width: 600px) {
    display: ${({ isMobileSearchOpen }) =>
      isMobileSearchOpen ? 'flex' : 'none'};

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

const MobileSearch = forwardRef(({ isMobileSearchOpen }, ref) => {
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
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setValue('search', searchParams.get('search'));
  }, [searchParams]);

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
});

export default MobileSearch;

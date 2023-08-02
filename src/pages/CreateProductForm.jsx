import React from 'react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import {
  Card,
  Form,
  StyledInput,
  PasswordInput,
  Button,
  Select,
  StyledLink,
  ImageUploader,
} from '../components/common';
import { useCreateProductMutation } from '../redux/services/productApi';
import { useGetCategoriesQuery } from '../redux/services/categoryApi';
import { useSelector } from 'react-redux';

const MB_BYTES = 1000000;

const CreateProductForm = () => {
  const { currentShop } = useSelector((state) => state.shopState);
  const [createProduct, { isLoading: productIsLoading }] =
    useCreateProductMutation();
  const { categories, isLoading: categoryIsLoading } = useGetCategoriesQuery(
    undefined,
    {
      selectFromResult: ({ data }) => {
        return {
          categories: data?.results,
        };
      },
    }
  );

  const createProductSchema = z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    quantityInStock: z.string(),
    category: z.string(),
    images: z
      .any()
      .optional()
      .superRefine((f, ctx) => {
        if (f.size > 5 * MB_BYTES) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            type: 'array',
            message: `The file must not be larger than ${5 * MB_BYTES} bytes: ${
              f.size
            }`,
            maximum: 5 * MB_BYTES,
            inclusive: true,
          });
        }
      })
      .superRefine((f, ctx) => {
        if (f[0] instanceof File) {
        } else {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            message: `Given value does not hold a file type`,
          });
        }
      }),
    mainImage: z
      .any()
      .optional()
      .superRefine((f, ctx) => {
        if (f.size > 5 * MB_BYTES) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            type: 'array',
            message: `The file must not be larger than ${5 * MB_BYTES} bytes: ${
              f.size
            }`,
            maximum: 5 * MB_BYTES,
            inclusive: true,
          });
        }
      })
      .superRefine((f, ctx) => {
        if (f[0] instanceof File) {
        } else {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            message: `Given value does not hold a file type`,
          });
        }
      }),
  });

  const methods = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    const mutatedData = {
      ...data,
      mainImage: data.mainImage[0],
      images: data.images,
    };

    const formData = new FormData();

    for (const key in mutatedData) {
      if (key === 'images') {
        for (let i = 0; i < mutatedData[key].length; i++) {
          formData.append('images', mutatedData[key][i]);
        }
      }
      formData.append(key, mutatedData[key]);
    }

    createProduct({ shopId: currentShop._id, formData });
  };

  if (categoryIsLoading)
    return (
      <Card>
        <h1>Loading...</h1>
      </Card>
    );

  return (
    <Card>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput placeholder="name" type="text" {...register('name')} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <StyledInput
            placeholder="Price"
            type="number"
            {...register('price')}
          />
          {errors.price?.message && <p>{errors.price?.message}</p>}
          <StyledInput
            placeholder="Description"
            type="text"
            {...register('description')}
          />
          {errors.description?.message && <p>{errors.description?.message}</p>}
          <StyledInput
            placeholder="Quantity in stock"
            type="number"
            {...register('quantityInStock')}
          />
          {errors.quantityInStock?.message && (
            <p>{errors.quantityInStock?.message}</p>
          )}
          <Select placeholder="Category" {...register('category')}>
            <option value="" disabled selected>
              Select category
            </option>
            {categories
              ? categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))
              : null}
          </Select>
          {errors.category?.message && <p>{errors.category?.message}</p>}
          <ImageUploader name="mainImage" />
          <ImageUploader name="images" multiple />
          <Button type="submit" disabled={productIsLoading}>
            Add Product
          </Button>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </Card>
  );
};

export default CreateProductForm;

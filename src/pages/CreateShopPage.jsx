import React from 'react';
import z from 'zod';
import {
  Form,
  StyledInput,
  PasswordInput,
  Button,
  Select,
  StyledLink,
  ImageUploader,
  Card,
} from '../components/common';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useCreateShopMutation } from '../redux/services/shopApi';

const MB_BYTES = 1000000;

const CreateShopPage = () => {
  const [createShop, { isLoading }] = useCreateShopMutation();

  const createShopSchema = z.object({
    name: z.string(),
    address: z.string(),
    description: z.string(),
    image: z
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
      }),
  });

  const methods = useForm({
    resolver: zodResolver(createShopSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    const mutatedData = { ...data, image: data.image[0] };
    const formData = new FormData();

    for (const key in mutatedData) {
      formData.append(key, mutatedData[key]);
    }
    createShop(formData);
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput placeholder="Name" type="text" {...register('name')} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <StyledInput
            placeholder="Address"
            type="text"
            {...register('address')}
          />
          {errors.address?.message && <p>{errors.address?.message}</p>}
          <StyledInput
            placeholder="Description"
            type="text"
            {...register('description')}
          />
          {errors.description?.message && <p>{errors.description?.message}</p>}
          <ImageUploader name="image" />
          <Button type="submit" disabled={isLoading}>
            Create Shop
          </Button>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </Card>
  );
};

export default CreateShopPage;

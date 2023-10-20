import { useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { RootState } from 'redux/store';
import { useCreateProductMutation } from 'redux/services/productApi/productApi';
import { useGetCategoriesQuery } from 'redux/services/categoryApi/categoryApi';
import {
  Card,
  Form,
  StyledInput,
  Button,
  Select,
  ImageUpload,
  StyledModal,
} from 'components/common';

interface ITitle {
  [props: string]: string;
}

interface FormValues {
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  category: string;
}

interface IMutatedData {
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  category: string;
  mainImage: File;
  images: File[];
}

type EmptyString = '' | null | undefined;

const CreateProductFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const FormFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
`;

const MB_BYTES = 1000000;

const TITLE: ITitle = {
  0: 'Product Info',
  1: 'Product Details',
  2: 'Product Images',
  3: 'Congratulations for completing the form, please press the create product button to publish your product',
};

export const CreateProduct = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const [mainImage, setMainImage] = useState<File | EmptyString>(null);
  const [mainImageError, setMainImageError] = useState<{
    isError: boolean;
    message: string;
  } | null>({
    isError: false,
    message: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagesError, setImagesError] = useState<{
    isError: boolean;
    message: string;
  } | null>({
    isError: false,
    message: '',
  });
  const { currentShop } = useSelector((state: RootState) => state.shopState);
  const [createProduct, { isLoading: productIsLoading }] =
    useCreateProductMutation();
  const { categories, isLoading: categoryIsLoading } = useGetCategoriesQuery(
    null,
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          categories: data?.results,
          isLoading: isLoading,
        };
      },
    }
  );

  const createProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.coerce.number().min(1),
    quantityInStock: z.coerce.number(),
    category: z.string(),
  });

  const productInfoSchema = createProductSchema.pick({
    name: true,
    description: true,
  });

  const productDetailsSchema = createProductSchema.pick({
    price: true,
    quantityInStock: true,
    category: true,
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(createProductSchema),
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    if (images.length === 0 || !mainImage) return;

    const mutatedData: IMutatedData = {
      ...data,
      mainImage,
      images,
    };

    const formData = new FormData();

    for (const key in mutatedData) {
      if (key === 'images') {
        for (let i = 0; i < mutatedData[key].length; i++) {
          formData.append('images', mutatedData[key][i]);
        }
      }
      formData.append(
        key,
        JSON.stringify(mutatedData[key as keyof IMutatedData])
      );
    }

    const { _id: shopId } = currentShop || {};

    await createProduct({ shopId: shopId || '', formData });

    navigate('/my-shop');
  };

  const nextFormStep = () => {
    if (formStep === 0) {
      try {
        const canNext = productInfoSchema.parse({
          name: watch('name'),
          description: watch('description'),
        });

        if (canNext) {
          setFormStep((curr) => curr + 1);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }

    if (formStep === 1) {
      try {
        const canNext = productDetailsSchema.parse({
          price: watch('price'),
          quantityInStock: watch('quantityInStock'),
          category: watch('category'),
        });

        if (canNext) {
          setFormStep((curr) => curr + 1);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }

    if (formStep === 2) {
      if (mainImage && images.length !== 0) {
        setFormStep((curr) => curr + 1);
      }

      return;
    }
  };

  const changeMainImage: (image: File | EmptyString) => void = (image) => {
    setMainImage(image);
  };

  const changeImages: (image: File[]) => void = (images) => {
    setImages(images);
  };

  const applyMainImageError: (
    error: { isError: boolean; message: string } | null
  ) => void = (error) => {
    setMainImageError(error);
  };

  const applyImagesError: (
    error: { isError: boolean; message: string } | null
  ) => void = (error) => {
    setImagesError(error);
  };

  const prevFormStep = () => {
    setFormStep((curr) => curr - 1);
  };

  const openCreateProductModal = () => {
    setIsCreateProductModalOpen(true);
  };
  const closeCreateProductModal = () => {
    setIsCreateProductModalOpen(false);
  };

  if (categoryIsLoading)
    return (
      <Card>
        <h1>Loading...</h1>
      </Card>
    );
  console.log(errors);

  return (
    <CreateProductFlexWrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFlexWrapper>
            <div>
              <ButtonFlexWrapper>
                {formStep !== 0 && (
                  <Button onClick={prevFormStep} type="button">
                    prev
                  </Button>
                )}
                {formStep !== 3 && (
                  <Button type="button" onClick={nextFormStep}>
                    next
                  </Button>
                )}
              </ButtonFlexWrapper>
            </div>
            <h5>{TITLE[formStep as keyof ITitle]}</h5>
            {formStep === 0 && (
              <>
                <StyledInput placeholder="name" name="name" />
                <StyledInput placeholder="Description" name="description" />
              </>
            )}
            {formStep === 1 && (
              <>
                <StyledInput placeholder="Price" type="number" name="price" />
                <StyledInput
                  placeholder="Quantity in stock"
                  type="number"
                  name="quantityInStock"
                />
                <Select
                  placeholder="Category"
                  {...register('category')}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                </Select>
                {errors.category?.message && (
                  <p>{errors.category?.message.toString()}</p>
                )}
              </>
            )}
            {formStep === 2 && (
              <>
                <ImageUpload
                  name="mainImage"
                  image={mainImage}
                  changeImage={changeMainImage}
                  error={mainImageError}
                  applyError={applyMainImageError}
                  fileSizeLimit={5 * MB_BYTES}
                />
                <ImageUpload
                  name="images"
                  multiple
                  images={images}
                  changeImages={changeImages}
                  error={imagesError}
                  applyError={applyImagesError}
                  fileSizeLimit={5 * MB_BYTES}
                />
              </>
            )}
            {formStep === 3 && (
              <Button
                onClick={openCreateProductModal}
                disabled={productIsLoading}
                type="button"
              >
                Add Product
              </Button>
            )}
            {isCreateProductModalOpen && (
              <StyledModal
                isModalOpen={isCreateProductModalOpen}
                closeModal={closeCreateProductModal}
                isLoading={productIsLoading}
              >
                Are you sure you want to create this product?
              </StyledModal>
            )}
          </FormFlexWrapper>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </CreateProductFlexWrapper>
  );
};

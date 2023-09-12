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
  StyledModal,
  ImageUpload,
} from '../../components/common';
import { useCreateProductMutation } from '../../redux/services/productApi';
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from '../../redux/services/categoryApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

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

const TITLE = {
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
  const [mainImage, setMainImage] = useState('');
  const [mainImageError, setMainImageError] = useState({
    isError: false,
    message: '',
  });
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState({
    isError: false,
    message: '',
  });
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

  const methods = useForm({
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

  const onSubmit = async (data) => {
    console.log(data);
    if (images.length === 0 || !mainImage) return;

    const mutatedData = {
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
      formData.append(key, mutatedData[key]);
    }

    await createProduct({ shopId: currentShop._id, formData });

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

  const prevFormStep = () => {
    setFormStep((curr) => curr - 1);
  };

  const setImagesErrorMessage = (message) => {
    setImagesError(message);
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
    <Card>
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
            <h5>{TITLE[formStep]}</h5>
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
                {errors.category?.message && <p>{errors.category?.message}</p>}
              </>
            )}
            {formStep === 2 && (
              <>
                <ImageUpload
                  name="mainImage"
                  image={mainImage}
                  setImage={setMainImage}
                  error={mainImageError}
                  setError={setMainImageError}
                  fileSizeLimit={5 * MB_BYTES}
                />
                <ImageUpload
                  name="images"
                  multiple
                  images={images}
                  setImages={setImages}
                  error={imagesError}
                  setError={setImagesErrorMessage}
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
                showModal={openCreateProductModal}
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
    </Card>
  );
};

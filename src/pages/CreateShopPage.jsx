import React, { useEffect } from 'react';
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
  StyledModal,
  ImageUpload,
} from '../components/common';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useCreateShopMutation } from '../redux/services/shopApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { myProfileApi } from '../redux/services/myProfileApi';
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
  0: 'Shop Info',
  1: 'Shop Contact Info',
  2: 'Shop Logo',
  3: 'Congratulations for completing the form, please press the create shop button to complete the process.',
};

const CreateShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [isCreateShopModalOpen, setIsCreateShopModalOpen] = useState(false);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');
  const [createShop, { isLoading, isSuccess }] = useCreateShopMutation();

  const createShopSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10).max(100),
    address: z.string().min(10),
    phone: z.coerce.string().min(6),
  });

  const shopInfoSchema = createShopSchema.pick({
    name: true,
    description: true,
  });

  const shopContactInfoSchema = createShopSchema.pick({
    address: true,
    phone: true,
  });

  const methods = useForm({
    resolver: zodResolver(createShopSchema),
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    if (!image) {
      return;
    }

    const mutatedData = { ...data, image };
    const formData = new FormData();

    for (const key in mutatedData) {
      formData.append(key, mutatedData[key]);
    }

    await createShop(formData);

    if (!isLoading) {
      dispatch(
        myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
      );
      navigate('/my-shop');
    }
  };

  const nextFormStep = () => {
    if (formStep === 0) {
      try {
        const canNext = shopInfoSchema.parse({
          name: watch('name'),
          description: watch('description'),
        });

        if (canNext) {
          setFormStep((curr) => curr + 1);
        }

        return;
      } catch (error) {
        console.log(error);
      }
    }

    if (formStep === 1) {
      try {
        const canNext = shopContactInfoSchema.parse({
          address: watch('address'),
          phone: watch('phone'),
        });

        if (canNext) {
          setFormStep((curr) => curr + 1);
        }

        return;
      } catch (error) {
        console.log(error);
      }
    }

    if (formStep === 2) {
      if (image) {
        setFormStep((curr) => curr + 1);
      }

      return;
    }
  };

  const prevFormStep = () => {
    setFormStep((curr) => curr - 1);
  };

  const openCreateShopModal = () => {
    setIsCreateShopModalOpen(true);
  };

  const closeCreateShopModal = () => {
    setIsCreateShopModalOpen(false);
  };

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
                <StyledInput placeholder="Name" name="name" />
                <StyledInput placeholder="Description" name="description" />
              </>
            )}
            {formStep === 1 && (
              <>
                <StyledInput placeholder="Address" name="address" />
                <StyledInput placeholder="phone" type="number" name="phone" />
              </>
            )}
            {formStep === 2 && (
              <ImageUpload
                name="image"
                fileSizeLimit={5 * MB_BYTES}
                image={image}
                setImage={setImage}
                error={imageError}
                setError={setImageError}
              />
            )}
            {formStep === 3 && (
              <Button
                onClick={openCreateShopModal}
                type="button"
                disabled={isLoading}
              >
                Create Shop
              </Button>
            )}

            {isCreateShopModalOpen && (
              <StyledModal
                showModal={openCreateShopModal}
                closeModal={closeCreateShopModal}
                isLoading={isLoading}
              >
                Are you sure you want to create this Shop?
              </StyledModal>
            )}
          </FormFlexWrapper>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </Card>
  );
};

export default CreateShopPage;

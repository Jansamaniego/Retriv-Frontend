import { useState } from 'react';
import styled from 'styled-components';
import z from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useCreateShopMutation } from 'redux/services/shopApi/shopApi';
import { myProfileApi } from 'redux/services/myProfileApi/myProfileApi';
import {
  Form,
  StyledInput,
  Button,
  StyledModal,
  ImageUpload,
} from 'components/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/store';
import CreateShopStepTracker from './createShopStepTracker';

interface FormValues {
  name: string;
  description: string;
  address: string;
  phone: string;
}

interface IMutatedData {
  image: File;
  name: string;
  description: string;
  address: string;
  phone: string;
}

interface ITitle {
  [props: string]: string;
}

type EmptyString = '' | null | undefined;

const CreateShopFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const FormFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MB_BYTES = 1000000;

const TITLE: ITitle = {
  0: 'Shop Info',
  1: 'Shop Contact Info',
  2: 'Shop Logo',
  3: 'Congratulations for completing the form, please press the create shop button to complete the process.',
};

export const CreateShop = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [isCreateShopModalOpen, setIsCreateShopModalOpen] = useState(false);
  const [image, setImage] = useState<File | EmptyString>(null);
  const [imageError, setImageError] = useState<{
    isError: boolean;
    message: string;
  } | null>(null);
  const [createShop, { isLoading }] = useCreateShopMutation();

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

  const methods = useForm<FormValues>({
    resolver: zodResolver(createShopSchema),
    mode: 'onBlur',
  });

  const { handleSubmit, control, watch } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!image) {
      return;
    }

    const mutatedData: IMutatedData = { ...data, image };
    const formData = new FormData();

    for (const key in mutatedData) {
      formData.append(key, mutatedData[key as keyof IMutatedData]);
    }

    await createShop(formData);

    if (!isLoading) {
      dispatch(
        myProfileApi.endpoints.getMe.initiate(null, {
          forceRefetch: true,
        })
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

  const changeImage: (image: File | EmptyString) => void = (image) => {
    setImage(image);
  };

  const applyError: (
    error: { isError: boolean; message: string } | null
  ) => void = (error) => {
    setImageError(error);
  };

  return (
    <>
      <CreateShopFlexWrapper>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormFlexWrapper>
              <CreateShopStepTracker formStep={formStep} />
              <h5>{TITLE[formStep as keyof ITitle]}</h5>
              {formStep === 0 && (
                <FlexWrapper>
                  <StyledInput placeholder="Name" name="name" />
                  <StyledInput placeholder="Description" name="description" />
                </FlexWrapper>
              )}
              {formStep === 1 && (
                <FlexWrapper>
                  <StyledInput placeholder="Address" name="address" />
                  <StyledInput placeholder="phone" type="number" name="phone" />
                </FlexWrapper>
              )}
              {formStep === 2 && (
                <ImageUploadWrapper>
                  <ImageUpload
                    name="image"
                    fileSizeLimit={5 * MB_BYTES}
                    image={image}
                    changeImage={changeImage}
                    error={imageError}
                    applyError={applyError}
                  />
                </ImageUploadWrapper>
              )}

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
                {formStep === 3 && (
                  <Button
                    onClick={openCreateShopModal}
                    type="button"
                    disabled={isLoading}
                  >
                    Create Shop
                  </Button>
                )}
              </ButtonFlexWrapper>
            </FormFlexWrapper>
            {isCreateShopModalOpen && (
              <StyledModal
                isModalOpen={isCreateShopModalOpen}
                closeModal={closeCreateShopModal}
                isLoading={isLoading}
              >
                Are you sure you want to create this Shop?
              </StyledModal>
            )}
          </Form>
          <DevTool control={control} />
        </FormProvider>
      </CreateShopFlexWrapper>
    </>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import styled from 'styled-components';

import { useCreateCategoryMutation } from '../../redux/services/categoryApi/categoryApi';
import {
  Form,
  StyledInput,
  StyledModal,
  Button,
  ImageUpload,
} from '../../components/common';
import CreateCategoryStepTracker from './createCategoryStepTracker';

interface FormValues {
  name: string;
  description: string;
}

interface IMutatedData {
  name: string;
  description: string;
  image: File;
}

interface ITitle {
  [props: string]: string;
}

type EmptyString = '' | null | undefined;

const CreateCategoryFlexWrapper = styled.div`
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

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
`;

const CreateCategoryTitle = styled.h5`
  color: ${(props) => props.theme.neutral.text};
`;

const MB_BYTES = 1000000;

const TITLE: ITitle = {
  0: 'Category Info',
  1: 'Category Image',
  2: 'Congratulations for completing the form, please press the create category button to complete the process',
};

export const CreateCategory = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [image, setImage] = useState<File | EmptyString>(null);
  const [imageError, setImageError] = useState<{
    isError: boolean;
    message: string;
  } | null>(null);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const createCategorySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(createCategorySchema),
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

    await createCategory(formData);

    if (!isLoading) {
      navigate('/category');
    }
  };

  const nextFormStep = () => {
    if (formStep === 0) {
      try {
        const canNext = createCategorySchema.parse({
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
      if (image) {
        setFormStep((curr) => curr + 1);
      }

      return;
    }
  };

  const prevFormStep = () => {
    setFormStep((curr) => curr - 1);
  };

  const openCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(true);
  };

  const closeCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(false);
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
    <CreateCategoryFlexWrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFlexWrapper>
            <CreateCategoryStepTracker formStep={formStep} />
            <CreateCategoryTitle>
              {TITLE[formStep as keyof ITitle]}
            </CreateCategoryTitle>
            {formStep === 0 && (
              <FlexWrapper>
                <StyledInput placeholder="Name" name="name" />
                <StyledInput placeholder="Description" name="description" />
              </FlexWrapper>
            )}
            {formStep === 1 && (
              <ImageUpload
                name="image"
                fileSizeLimit={5 * MB_BYTES}
                image={image}
                changeImage={changeImage}
                error={imageError}
                applyError={applyError}
              />
            )}
            <ButtonFlexWrapper>
              {formStep !== 0 && (
                <Button onClick={prevFormStep} type="button">
                  prev
                </Button>
              )}
              {formStep !== 2 && (
                <Button type="button" onClick={nextFormStep}>
                  next
                </Button>
              )}
              {formStep === 2 && (
                <Button type="button" onClick={openCreateCategoryModal} large>
                  create category
                </Button>
              )}
            </ButtonFlexWrapper>
          </FormFlexWrapper>
          {isCreateCategoryModalOpen && (
            <StyledModal
              isModalOpen={isCreateCategoryModalOpen}
              closeModal={closeCreateCategoryModal}
              isLoading={isLoading}
            >
              Are you sure you want to create this category?
            </StyledModal>
          )}
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </CreateCategoryFlexWrapper>
  );
};

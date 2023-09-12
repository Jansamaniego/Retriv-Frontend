import React from 'react';
import {
  Card,
  Form,
  StyledInput,
  StyledModal,
  Button,
  ImageUpload,
} from '../../components/common';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCreateCategoryMutation } from '../../redux/services/categoryApi';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
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
  0: 'Category Info',
  1: 'Category Image',
  2: 'Congratulations for completing the form, please press the create category button to complete the process',
};

export const CreateCategory = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const createCategorySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
  });

  const methods = useForm({
    resolver: zodResolver(createCategorySchema),
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    if (!image) {
      return;
    }

    const mutatedData = { ...data, image };
    const formData = new FormData();

    for (const key in mutatedData) {
      formData.append(key, mutatedData[key]);
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
                {formStep !== 2 && (
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
              <ImageUpload
                name="image"
                fileSizeLimit={5 * MB_BYTES}
                image={image}
                setImage={setImage}
                error={imageError}
                setError={setImageError}
              />
            )}
            {formStep === 2 && (
              <Button type="button" onClick={openCreateCategoryModal} large>
                create category
              </Button>
            )}
            {isCreateCategoryModalOpen && (
              <StyledModal
                showModal={openCreateCategoryModal}
                closeModal={closeCreateCategoryModal}
                isLoading={isLoading}
              >
                Are you sure you want to create this category?
              </StyledModal>
            )}
          </FormFlexWrapper>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </Card>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';

import { StyledModal } from '../../../../components/common';
import DisplayImageModalCarousel from './displayImageModalCarousel';
import DisplayImageModalMenu from './displayImageModalMenu';

interface IDisplayImageModal {
  displayImage: string;
  productImages: string[];
  name: string;
  isModalOpen: boolean;
  closeModal: () => void;
  imageSlide: number;
}

const ModalContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DisplayImageModal: React.FC<IDisplayImageModal> = ({
  productImages,
  name,
  isModalOpen,
  closeModal,
  imageSlide,
}) => {
  const [slide, setSlide] = useState(imageSlide);
  return (
    <StyledModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      withButtons={false}
      withCloseButton={false}
    >
      <ModalContentContainer>
        <DisplayImageModalCarousel
          productImages={productImages}
          slide={slide}
          setSlide={setSlide}
        />
        <DisplayImageModalMenu
          name={name}
          productImages={productImages}
          slide={slide}
          setSlide={setSlide}
        />
      </ModalContentContainer>
    </StyledModal>
  );
};

export default DisplayImageModal;

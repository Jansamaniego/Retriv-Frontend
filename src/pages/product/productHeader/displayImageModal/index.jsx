import { useState } from 'react';
import styled from 'styled-components';

import { StyledModal } from '../../../../components/common';
import DisplayImageModalCarousel from './displayImageModalCarousel';
import DisplayImageModalMenu from './displayImageModalMenu';

const ModalContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DisplayImageModal = ({
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

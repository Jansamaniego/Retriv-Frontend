import { useState } from 'react';
import styled from 'styled-components';
import { StyledModal } from '../common';
import DisplayImageModalCarousel from './DisplayImageModalCarousel';

const ModalContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DisplayImageModalMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  gap: 1.6rem;
  margin: 0 2.4rem;
`;

const ProductNameContainer = styled.div`
  width: 100%;
  padding: 1.6rem;
`;

const ProductName = styled.h5`
  width: 100%;
  word-wrap: break-word;
`;

const DisplayImageModalMenuImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const DisplayImageModalMenuImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  outline: ${(props) => (props.setOutline ? '1px solid red' : 'none')};
`;

const DisplayImageModalMenuImage = styled.img`
  width: 8rem;
  object-fit: cover;
  cursor: pointer;
`;

const DisplayImageModalMenu = ({ name, productImages, slide, setSlide }) => {
  return (
    <DisplayImageModalMenuContainer>
      <ProductNameContainer>
        <ProductName>{name}</ProductName>
      </ProductNameContainer>
      <DisplayImageModalMenuImagesContainer>
        {productImages.map((image, idx) => (
          <DisplayImageModalMenuImageWrapper
            key={idx}
            setOutline={slide === idx ? true : false}
          >
            <DisplayImageModalMenuImage
              onClick={() => {
                setSlide(idx);
              }}
              src={image}
              alt="product image"
            />
          </DisplayImageModalMenuImageWrapper>
        ))}
      </DisplayImageModalMenuImagesContainer>
    </DisplayImageModalMenuContainer>
  );
};

const DisplayImageModal = ({
  productImages,
  name,
  showModal,
  closeModal,
  imageSlide,
}) => {
  const [slide, setSlide] = useState(imageSlide);
  return (
    <StyledModal
      showModal={showModal}
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

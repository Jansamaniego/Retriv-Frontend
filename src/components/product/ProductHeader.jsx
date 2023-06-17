import React, { useState } from 'react';
import { Card } from '../common';
import styled from 'styled-components';
import StyledModal from '../common/StyledModal';

const ProductHeaderCard = styled(Card)`
  display: flex;
`;

const ImagesWrapper = styled.section`
  width: 40%;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImagesFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const DisplayImageContainer = styled.div`
  display: flex;
  justify-content: center;
  outline: 1px solid ${(props) => props.theme.primary.main};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 45rem;

  &:hover {
    cursor: pointer;
  }
`;

const DisplayImage = styled.img`
  object-fit: cover;
  height: 45rem;
`;

const ImagesPickerContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const SmallImage = styled.img`
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  width: 8rem;
  outline: ${(props) => (props.setOutline ? '1px solid red' : 'none')};
  border-radius: 0.5rem;
  object-fit: cover;
`;

const ProductInfo = styled.main``;

const ModalFlexWrapper = styled.div`
  display: flex;
`;

const ModalMainImageContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 45rem;
`;

const ModalMainImage = styled.img`
  object-fit: cover;
  width: 100%;
`;

const ModalProductNameAndImagesContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const ModalProductName = styled.h4``;

const ModalImagesPickerContainer = styled.div`
  display: flex;
`;

const ModalSmallImage = styled.img``;

const DisplayImageModal = ({
  mainImage,
  images,
  name,
  showModal,
  closeModal,
}) => {
  return (
    <StyledModal
      showModal={showModal}
      closeModal={closeModal}
      withButtons={false}
      withCloseButton={false}
    >
      <ModalFlexWrapper>
        <ModalMainImageContainer>
          <ModalMainImage />
        </ModalMainImageContainer>
        <ModalProductNameAndImagesContainer>
          <ModalProductName>{name}</ModalProductName>
          <ModalImagesPickerContainer>
            <ModalSmallImage src={mainImage} />
            {images.map((image) => (
              <ModalSmallImage src={image} />
            ))}
          </ModalImagesPickerContainer>
        </ModalProductNameAndImagesContainer>
      </ModalFlexWrapper>
    </StyledModal>
  );
};

const ProductHeader = ({ product, productRatings }) => {
  const [displayImage, setDisplayImage] = useState(product.mainImage);
  const [isDisplayImageModalOpen, setIsDisplayImageModalOpen] = useState(false);

  console.log(product, productRatings);
  if (!product && !productRatings) {
    return <h1>Loading..</h1>;
  }

  const { mainImage, images, name } = product;

  const onMouseEnter = (e) => {
    setDisplayImage(e.target.currentSrc);
  };

  const showDisplayImageModal = () => {
    setIsDisplayImageModalOpen(true);
  };

  const closeDisplayImageModal = () => {
    setIsDisplayImageModalOpen(false);
  };

  return (
    <ProductHeaderCard>
      <ImagesWrapper>
        <ImagesContainer>
          <ImagesFlex>
            <DisplayImageContainer
              onClick={() => {
                setIsDisplayImageModalOpen(true);
              }}
            >
              <DisplayImage src={displayImage} />
            </DisplayImageContainer>
            <ImagesPickerContainer>
              <SmallImage
                src={mainImage}
                onMouseEnter={onMouseEnter}
                setOutline={displayImage === mainImage ? true : false}
              />
              {images.map((image) => (
                <SmallImage
                  src={image}
                  onMouseEnter={onMouseEnter}
                  setOutline={image === displayImage ? true : false}
                />
              ))}
            </ImagesPickerContainer>
          </ImagesFlex>
        </ImagesContainer>
      </ImagesWrapper>
      <ProductInfo></ProductInfo>
      {isDisplayImageModalOpen ? (
        <DisplayImageModal
          showModal={showDisplayImageModal}
          closeModal={closeDisplayImageModal}
          name={name}
          mainImage={mainImage}
          images={images}
        />
      ) : null}
    </ProductHeaderCard>
  );
};

export default ProductHeader;

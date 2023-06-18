import React, { useEffect, useState } from 'react';
import { Card } from '../common';
import styled from 'styled-components';
import DisplayImageModal from './DisplayImageModal';

const ProductHeaderCard = styled(Card)``;

const ProductHeaderContentContainer = styled.div`
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

const SmallImageContainer = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  outline: ${(props) => (props.setOutline ? '1px solid red' : 'none')};
  border-radius: 0.5rem;
  width: 8rem;
`;

const SmallImage = styled.img`
  object-fit: cover;
`;

const ProductInfo = styled.main``;

const ProductHeader = ({ product, productRatings }) => {
  const [displayImage, setDisplayImage] = useState();
  const [isDisplayImageModalOpen, setIsDisplayImageModalOpen] = useState(false);

  const { mainImage, images, name } = product;

  useEffect(() => {
    setDisplayImage(mainImage);
  }, [mainImage, images]);

  const productImages = [mainImage, ...images];

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
      <ProductHeaderContentContainer>
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
                {productImages.map((image, idx) => (
                  <SmallImageContainer
                    setOutline={image === displayImage ? true : false}
                  >
                    <SmallImage
                      key={idx}
                      src={image}
                      alt="product image"
                      onMouseEnter={onMouseEnter}
                    />
                  </SmallImageContainer>
                ))}
              </ImagesPickerContainer>
            </ImagesFlex>
          </ImagesContainer>
        </ImagesWrapper>
        <ProductInfo>
          <ProductInfoName>{name}</ProductInfoName>
          <ProductInfoStatsContainer>
            <ProductInfoStatsAvgRating></ProductInfoStatsAvgRating>
            <ProductInfoStatsRatingQuantity></ProductInfoStatsRatingQuantity>
            <ProductInfoStatsProductsSold></ProductInfoStatsProductsSold>
          </ProductInfoStatsContainer>
        </ProductInfo>
      </ProductHeaderContentContainer>
      {isDisplayImageModalOpen ? (
        <DisplayImageModal
          showModal={showDisplayImageModal}
          closeModal={closeDisplayImageModal}
          name={name}
          productImages={productImages}
        />
      ) : null}
    </ProductHeaderCard>
  );
};

export default ProductHeader;

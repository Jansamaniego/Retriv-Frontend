import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { useRef } from 'react';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
`;

const ModalWrapper = styled.div`
  max-width: 140rem;
  /* width: 30%; */
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.neutral[900]};
  color: ${(props) => props.theme.neutral[10]};
  position: relative;
  border-radius: 0.5rem;
  z-index: 1000;
  display: flex;
  padding: 1.6rem;
  gap: 2.4rem;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 3rem;
  cursor: pointer;
  position: absolute;
  right: 0.2rem;
  top: 0;
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
  font-size: 2.5rem;
`;

const ControlContainer = styled.div`
  flex: 0 0 auto;
  align-self: flex-end;
`;

export const StyledModal = ({
  isModalOpen,
  closeModal,
  children,
  isLoading,
  onClick,
  productId,
  shopId,
  body,
  withButtons = true,
  withCloseButton = true,
  ...props
}) => {
  const backgroundRef = useRef();

  const onBackgroundClick = (e) => {
    if (backgroundRef.current === e.target) {
      closeModal();
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    },
    [closeModal, isModalOpen]
  );

  const onClickHandler = async () => {
    await onClick();
    if (!isLoading) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    isModalOpen && (
      <Background onClick={onBackgroundClick} ref={backgroundRef}>
        <ModalWrapper>
          <ContentContainer>{children}</ContentContainer>
          {withButtons ? (
            <ControlContainer>
              <Button type="button" onClick={closeModal} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type={onClick ? 'button' : 'submit'}
                disabled={isLoading}
                onClick={onClick ? onClickHandler : null}
              >
                {onClick ? 'Confirm' : 'Submit'}
              </Button>
            </ControlContainer>
          ) : null}
          {withCloseButton ? (
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          ) : null}
        </ModalWrapper>
      </Background>
    )
  );
};

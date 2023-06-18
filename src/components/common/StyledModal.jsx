import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
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
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
  font-size: 2.5rem;
`;

const ControlContainer = styled.div`
  flex: 0 0 auto;
  align-self: flex-end;
`;

const StyledModal = ({
  showModal,
  closeModal,
  children,
  isLoading,
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
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    },
    [showModal, closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    showModal && (
      <Background onClick={onBackgroundClick} ref={backgroundRef}>
        <ModalWrapper>
          <ContentContainer>{children}</ContentContainer>
          {withButtons ? (
            <ControlContainer>
              <Button type="button" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Submit
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

export default StyledModal;

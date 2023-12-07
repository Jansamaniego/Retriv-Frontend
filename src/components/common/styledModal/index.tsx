import React, { MouseEvent, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { useRef } from 'react';

interface KeyboardEvent {
  key: string;
}

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  withButtons?: boolean;
  withCloseButton?: boolean;
  onClick?: () => void | Promise<void> | undefined;
}

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
  padding: 3.2rem;
  gap: 2.4rem;
  flex-direction: column;

  animation: pop-up 0.3s ease;

  @keyframes pop-up {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(100%);
    }
  }
`;

const CloseButtonContainer = styled.div``;

const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 3rem;
  cursor: pointer;
  position: absolute;
  right: 0.6rem;
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

export const StyledModal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  children,
  isLoading,
  onClick,
  withButtons = true,
  withCloseButton = true,
  ...props
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const onBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current === event.target) {
      closeModal();
    }
  };

  const keyPress = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    },
    [closeModal, isModalOpen]
  );

  const onClickHandler = async () => {
    if (!onClick) {
      return;
    }
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
          {withCloseButton && (
            <CloseButtonContainer>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </CloseButtonContainer>
          )}
          <ContentContainer>{children}</ContentContainer>
          {withButtons && (
            <ControlContainer>
              <Button type="button" onClick={closeModal} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type={onClick ? 'button' : 'submit'}
                disabled={isLoading}
                onClick={onClick && onClickHandler}
              >
                {onClick ? 'Confirm' : 'Submit'}
              </Button>
            </ControlContainer>
          )}
        </ModalWrapper>
      </Background>
    )
  );
};

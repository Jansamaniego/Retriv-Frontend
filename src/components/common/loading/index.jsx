import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingElement = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin: auto;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 34px;
    height: 34px;
    margin: 4px;
    border: 4px solid #1a91eb;
    border-radius: 50%;
    animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #1a91eb transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  animation: ${rotate} 4s linear infinite;
`;

export const Loading = () => (
  <LoadingContainer>
    <LoadingElement>
      <div />
      <div />
      <div />
      <div />
    </LoadingElement>
  </LoadingContainer>
);

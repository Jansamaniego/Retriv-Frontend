import React from 'react';
import styled from 'styled-components';

interface ITrackerPointProps {
  active: boolean;
  label?: string;
  odd?: boolean;
}

interface ITrackerLineProps {
  active: boolean;
}

interface IOrderTrackerProps {
  formStep: number;
}

const PlacedOrderTrackerFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
`;

const TrackerFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 2rem 0 2rem;
  width: 100%;
  gap: 1rem;

  @media (max-width: 1000px) {
    gap: 0.8rem;
  }

  @media (max-width: 800px) {
    gap: 0.6rem;
  }

  @media (max-width: 700px) {
    gap: 0.4rem;
  }

  @media (max-width: 650px) {
    gap: 0.3rem;
    padding-bottom: 2rem;
  }

  @media (max-width: 600px) {
    gap: 0.6rem;
    padding-bottom: 0;
  }

  @media (max-width: 500px) {
    gap: 0.4rem;
    padding-bottom: 2rem;
  }

  @media (max-width: 450px) {
    gap: 0.3rem;
  }

  @media (max-width: 425px) {
    gap: 0.2rem;
  }
`;

const TrackerPoint = styled.div<ITrackerPointProps>`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.primary.main};
  background-color: ${(props) =>
    props.active ? props.theme.primary[800] : props.theme.neutral[700]};
  min-width: 10rem;
  height: 10rem;

  @media (max-width: 2560px) {
    min-width: 8rem;
    height: 8rem;
  }

  @media (max-width: 1920px) {
    min-width: 8rem;
    height: 8rem;
  }
  @media (max-width: 900px) {
    min-width: 6rem;
    height: 6rem;
  }

  @media (max-width: 800px) {
    min-width: 5rem;
    height: 5rem;
  }

  @media (max-width: 700px) {
    min-width: 4rem;
    height: 4rem;
  }

  @media (max-width: 600px) {
    min-width: 5rem;
    height: 5rem;
  }
  @media (max-width: 470px) {
    min-width: 4rem;
    height: 4rem;
  }
`;

const TrackerLine = styled.div<ITrackerLineProps>`
  background-color: ${(props) =>
    props.active ? props.theme.primary.main : props.theme.neutral[700]};
  height: 0.4rem;
  min-width: 1rem;
  width: 100%;
  max-width: 4rem;
`;

const CreateUserStepTracker: React.FC<IOrderTrackerProps> = ({ formStep }) => {
  return (
    <PlacedOrderTrackerFlexWrapper>
      <TrackerFlexWrapper>
        <TrackerPoint active={true}>1</TrackerPoint>
        <TrackerLine active={true} />
        <TrackerLine active={formStep !== 0} />
        <TrackerPoint active={formStep !== 0}>2</TrackerPoint>
        <TrackerLine active={formStep !== 0} />
        <TrackerLine active={formStep !== 0 && formStep !== 1} />
        <TrackerPoint active={formStep !== 0 && formStep !== 1}>3</TrackerPoint>
        <TrackerLine active={formStep !== 0 && formStep !== 1} />
        <TrackerLine active={formStep === 3 || formStep === 4} />
        <TrackerPoint active={formStep === 3 || formStep === 4}>4</TrackerPoint>
        <TrackerLine active={formStep === 3 || formStep === 4} />
        <TrackerLine active={formStep === 4} />
        <TrackerPoint active={formStep === 4}>5</TrackerPoint>
      </TrackerFlexWrapper>
    </PlacedOrderTrackerFlexWrapper>
  );
};

export default CreateUserStepTracker;

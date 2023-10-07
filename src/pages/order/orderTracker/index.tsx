import React from 'react';
import { Card } from '../../../components/common';
import styled from 'styled-components';
import {
  Delivered,
  NotProcessed,
  OutForDelivery,
  Processing,
  Shipped,
} from '../../../assets/icons';

interface ITrackerPointProps {
  active: boolean;
  label: string;
  odd?: boolean;
}

interface ITrackerLineProps {
  active: boolean;
}

interface IOrderTrackerProps {
  orderStatus: string;
}

const PlacedOrderTrackerFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
`;

const PlacedOrderTrackerHeader = styled.div`
  color: ${(props) => props.theme.neutral[900]};
`;

const TrackerFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  /* align-content: center;  */
  /* justify-content: center; */
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.primary.main : props.theme.neutral[700]};
  min-width: 10rem;
  height: 10rem;

  &::after {
    content: '${(props) => props.label}';
    color: ${(props) => props.theme.neutral[900]};
    position: absolute;
    top: -3rem;
    left: -1rem;
    white-space: nowrap;

    @media (max-width: 650px) {
      top: ${(props) => (props.odd ? '5rem' : '-3rem')};
    }

    @media (max-width: 600px) {
      top: -3rem;
    }

    @media (max-width: 500px) {
      top: ${(props) => (props.odd ? '6rem' : '-3rem')};
    }

    @media (max-width: 470px) {
      top: ${(props) => (props.odd ? '5rem' : '-3rem')};
    }
  }

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
  /* min-width: 1rem;
  max-width: 30rem; */
  width: 100%;
`;

const OrderTracker: React.FC<IOrderTrackerProps> = ({ orderStatus }) => {
  return (
    <Card backgroundColor="green">
      <PlacedOrderTrackerFlexWrapper>
        <PlacedOrderTrackerHeader>
          <h4>{orderStatus}</h4>
        </PlacedOrderTrackerHeader>
        <TrackerFlexWrapper>
          <TrackerPoint
            label={'Not Processed'}
            active={orderStatus !== 'Cancelled'}
          >
            <NotProcessed width="4rem" />
          </TrackerPoint>
          <TrackerLine active={orderStatus !== 'Cancelled'} />
          <TrackerLine
            active={
              orderStatus !== 'Cancelled' && orderStatus !== 'Not Processed'
            }
          />
          <TrackerPoint
            label={'Processing'}
            active={
              orderStatus !== 'Cancelled' && orderStatus !== 'Not Processed'
            }
            odd
          >
            <Processing width="4rem" />
          </TrackerPoint>
          <TrackerLine
            active={
              orderStatus !== 'Cancelled' && orderStatus !== 'Not Processed'
            }
          />
          <TrackerLine
            active={
              orderStatus === 'Shipped' ||
              orderStatus === 'Out for Delivery' ||
              orderStatus === 'Delivered'
            }
          />
          <TrackerPoint
            label={'Shipped'}
            active={
              orderStatus === 'Shipped' ||
              orderStatus === 'Out for Delivery' ||
              orderStatus === 'Delivered'
            }
          >
            <Shipped width="4rem" />
          </TrackerPoint>
          <TrackerLine
            active={
              orderStatus === 'Shipped' ||
              orderStatus === 'Out for Delivery' ||
              orderStatus === 'Delivered'
            }
          />
          <TrackerLine
            active={
              orderStatus === 'Out for Delivery' || orderStatus === 'Delivered'
            }
          />
          <TrackerPoint
            label={'Out for Delivery'}
            active={
              orderStatus === 'Out for Delivery' || orderStatus === 'Delivered'
            }
            odd
          >
            <OutForDelivery width="4rem" />
          </TrackerPoint>
          <TrackerLine
            active={
              orderStatus === 'Out for Delivery' || orderStatus === 'Delivered'
            }
          />
          <TrackerLine active={orderStatus === 'Delivered'} />
          <TrackerPoint
            label={'Delivered'}
            active={orderStatus === 'Delivered'}
          >
            <Delivered width="4rem" />
          </TrackerPoint>
        </TrackerFlexWrapper>
      </PlacedOrderTrackerFlexWrapper>
    </Card>
  );
};

export default OrderTracker;

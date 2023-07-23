import React from 'react';
import { Card } from '../common';
import styled from 'styled-components';

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
  align-content: center;
  justify-content: center;
  padding: 3rem 2rem 0 2rem;
  width: 100%;
`;

const TrackerPoint = styled.div`
  position: relative;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.primary.main : props.theme.neutral[700]};
  width: 30rem;
  height: 3rem;

  &::after {
    content: '${(props) => props.label}';
    color: ${(props) => props.theme.neutral[900]};
    position: absolute;
    top: -3rem;
    left: -1rem;
    white-space: nowrap;
  }
`;

const TrackerLine = styled.div`
  background-color: ${(props) =>
    props.active ? props.theme.primary.main : props.theme.neutral[700]};
  height: 0.4rem;
  width: 100%;
`;

const PlacedOrderTracker = ({ orderStatus }) => {
  return (
    <Card backgroundColor="green">
      <PlacedOrderTrackerFlexWrapper>
        <PlacedOrderTrackerHeader>
          <h4>{orderStatus}</h4>
          <h6>order text</h6>
        </PlacedOrderTrackerHeader>
        <TrackerFlexWrapper>
          <TrackerPoint
            label={'Not Processed'}
            active={orderStatus !== 'Cancelled'}
          />
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
          />
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
          />
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
          />
          <TrackerLine
            active={
              orderStatus === 'Out for Delivery' || orderStatus === 'Delivered'
            }
          />
          <TrackerLine active={orderStatus === 'Delivered'} />
          <TrackerPoint
            label={'Delivered'}
            active={orderStatus === 'Delivered'}
          />
        </TrackerFlexWrapper>
      </PlacedOrderTrackerFlexWrapper>
    </Card>
  );
};

export default PlacedOrderTracker;

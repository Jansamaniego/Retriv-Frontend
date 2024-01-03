import { ring } from 'ldrs';
import styled from 'styled-components';

const LoadingRingFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = () => {
  ring.register();

  return (
    <LoadingRingFlexWrapper>
      <l-ring></l-ring>
    </LoadingRingFlexWrapper>
  );
};

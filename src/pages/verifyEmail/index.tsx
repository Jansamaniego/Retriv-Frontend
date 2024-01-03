import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RootState } from 'redux/store';
import { useVerifyEmailMutation } from 'redux/services/authApi/authApi';
import { Button, TransparentPopup, Card } from 'components/common';
import { CheckIcon } from 'assets/icons';
import styled from 'styled-components';

const VerifyEmailText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const [isEmailVerificationComplete, setIsEmailVerificationComplete] =
    useState(false);
  const [isTransparentPopupOpen] = useState(false);
  const [verifyEmail, { isLoading, isSuccess }] = useVerifyEmailMutation();

  const [searchParams] = useSearchParams();

  const emailToken = searchParams.get('token') || '';

  const verifyEmailOnClickHandler = async () => {
    await verifyEmail(emailToken);
  };

  useEffect(() => {
    if (!isLoading && currentUser && currentUser.isEmailVerified) {
      setIsEmailVerificationComplete(true);
      setTimeout(() => {
        navigate('/');
      }, 6000);
    }
  }, [isLoading, isSuccess, currentUser, navigate]);

  return (
    <Card>
      {isEmailVerificationComplete ? (
        <VerifyEmailText>
          Thank you for verifying your email address, enjoy your shopping in
          retriv! Navigating to the homepage...
        </VerifyEmailText>
      ) : (
        <VerifyEmailText>
          Please click the button below to complete the email verification
          process
        </VerifyEmailText>
      )}
      {!isEmailVerificationComplete && (
        <Button onClick={verifyEmailOnClickHandler} disabled={isLoading}>
          Verify Email
        </Button>
      )}
      {isTransparentPopupOpen && (
        <TransparentPopup>
          <CheckIcon width="3rem" />
          <VerifyEmailText>
            Your email address has been verified
          </VerifyEmailText>
        </TransparentPopup>
      )}
    </Card>
  );
};

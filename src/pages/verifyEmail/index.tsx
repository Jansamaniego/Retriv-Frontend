import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RootState } from 'redux/store';
import { useVerifyEmailMutation } from 'redux/services/authApi/authApi';
import { Button, TransparentPopup, Card } from 'components/common';
import { CheckIcon } from 'assets/icons';

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
        <h1>
          Thank you for verifying your email address, enjoy your shopping in
          retriv! Navigating to the homepage...
        </h1>
      ) : (
        <h1>
          Please click the button below to complete the email verification
          process
        </h1>
      )}
      {!isEmailVerificationComplete && (
        <Button onClick={verifyEmailOnClickHandler} disabled={isLoading}>
          Verify Email
        </Button>
      )}
      {isTransparentPopupOpen && (
        <TransparentPopup>
          <CheckIcon width="3rem" />
          <h3>Your email address has been verified</h3>
        </TransparentPopup>
      )}
    </Card>
  );
};

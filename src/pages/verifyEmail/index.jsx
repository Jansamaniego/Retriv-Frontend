import React from 'react';
import { useVerifyEmailMutation } from '../../redux/services/authApi';
import { Button, TransparentPopup, Card } from '../../components/common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { CheckIcon } from '../../assets/icons';
import { useSelector } from 'react-redux';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userState.user);
  const [isEmailVerificationComplete, setIsEmailVerificationComplete] =
    useState(false);
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [verifyEmail, { isLoading, isSuccess }] = useVerifyEmailMutation();

  const [searchParams, setSearchParams] = useSearchParams();

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

  console.log(isTransparentPopupOpen);

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

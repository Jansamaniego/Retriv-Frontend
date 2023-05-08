import React from 'react';
import { useVerifyEmailMutation } from '../redux/services/authApi';
import { Button } from '../components/common';
import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const [searchParams, setSearchParams] = useSearchParams();

  const emailToken = searchParams.get('token') || '';
  return (
    <div>
      <h1>
        Please click the button below to complete the emailverification process
      </h1>
      <Button onClick={verifyEmail(emailToken)} disabled={isLoading}>
        Verify Email
      </Button>
    </div>
  );
};

export default VerifyEmail;

import React, { useState } from 'react';
import { useSendVerificationEmailMutation } from '../../redux/services/authApi';
import { Button } from '../common';

const SendVerificationEmail = ({ user }) => {
  const [emailSent, setEmailSent] = useState(false);

  const [sendVerificationEmail, { isLoading }] =
    useSendVerificationEmailMutation();

  const { email } = user;

  const verificationEmailClickHandler = () => {
    setEmailSent(true);
    sendVerificationEmail();
  };

  return (
    <>
      {emailSent ? (
        <h3>
          An email was sent to {email}, please click the link on the message to
          complete the verification process.
        </h3>
      ) : (
        <h3>Click the button below to send a verification email to {email}.</h3>
      )}

      <Button onClick={verificationEmailClickHandler} disabled={isLoading}>
        Send Verification Email
      </Button>
    </>
  );
};

export default SendVerificationEmail;

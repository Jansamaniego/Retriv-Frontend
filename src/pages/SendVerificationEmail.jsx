import React, { useState } from 'react';
import { useSendVerificationEmailMutation } from '../redux/services/authApi';
import { Button, Card } from '../components/common';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

const SendVerificationEmailHeading = styled.h4`
  padding-bottom: 1.6rem;
`;

const SendVerificationEmailFlexBoxContainer = styled.main``;

const SendVerificationEmailFlexBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const SendVerificationEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [user] = useOutletContext();

  const [sendVerificationEmail, { isLoading, isSuccess }] =
    useSendVerificationEmailMutation();

  const { email } = user;

  const verificationEmailClickHandler = async () => {
    await sendVerificationEmail();
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setEmailSent(true);
    }
  }, [isLoading, isSuccess]);

  return (
    <Card>
      <SendVerificationEmailFlexBoxContainer>
        <SendVerificationEmailHeading>
          Please verify your email
        </SendVerificationEmailHeading>
        <SendVerificationEmailFlexBox>
          {emailSent ? (
            <h5>
              An email was sent to {email}, please click the link on the message
              to complete the verification process.
            </h5>
          ) : (
            <h5>
              Click the button below to send a verification email to {email}.
            </h5>
          )}

          {!emailSent && (
            <Button
              superLarge
              onClick={verificationEmailClickHandler}
              disabled={isLoading}
            >
              Send Verification Email
            </Button>
          )}
        </SendVerificationEmailFlexBox>
      </SendVerificationEmailFlexBoxContainer>
    </Card>
  );
};

export default SendVerificationEmail;

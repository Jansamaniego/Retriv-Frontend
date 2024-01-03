import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSendVerificationEmailMutation } from 'redux/services/authApi/authApi';
import { Button, Card } from 'components/common';
import { useUser } from 'pages/profileLayout';

const SendVerificationEmailHeading = styled.h4`
  color: ${(props) => props.theme.neutral.text};
  padding-bottom: 1.6rem;
`;

const SendVerificationEmailFlexBoxContainer = styled.main``;

const SendVerificationEmailFlexBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const SendVerificationEmailText = styled.h5`
  color: ${(props) => props.theme.neutral.text};
`;

export const SendVerificationEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { user } = useUser();

  const [sendVerificationEmail, { isLoading, isSuccess }] =
    useSendVerificationEmailMutation();

  const { email } = user || {};

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
            <SendVerificationEmailText>
              An email was sent to {email}, please click the link on the message
              to complete the verification process.
            </SendVerificationEmailText>
          ) : (
            <SendVerificationEmailText>
              Click the button below to send a verification email to {email}.
            </SendVerificationEmailText>
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

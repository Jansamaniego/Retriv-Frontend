import React from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';

const UserDataGridContainer = styled.main``;

const UserInfoHeading = styled.div`
  grid-column: 1 / span 3;
`;

const UserData = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 0.8rem;
  column-gap: 1.6rem;
  padding: 1.6rem;
`;

const Value = styled.h6`
  padding: 0.4rem 0.8rem;
`;

const UserProfileInfo = ({ user }) => {
  console.log(user);

  const {
    username,
    address,
    dateOfBirth,
    createdAt,
    gender,
    phone,
    email,
    name,
  } = user;
  return (
    <>
      <UserDataGridContainer>
        <UserInfoHeading>
          <h4>User Info</h4>
        </UserInfoHeading>
        <UserData>
          <div>
            <h5>name:</h5>

            <Value>{name}</Value>
          </div>
          <div>
            <h5>username:</h5>

            <Value>{username}</Value>
          </div>
          <div>
            <h5>email:</h5>

            <Value>{email}</Value>
          </div>
          <div>
            <h5>phone:</h5>

            <Value>{phone ? phone : 'N/A'}</Value>
          </div>
          <div>
            <h5>Date of birth:</h5>

            <Value>
              {dateOfBirth ? moment(dateOfBirth).format('DD/MM/yyyy') : 'N/A'}
            </Value>
          </div>
          <div>
            <h5>gender:</h5>

            <Value>{gender}</Value>
          </div>
          <div>
            <h5>address:</h5>

            <Value>{address ? address : 'N/A'}</Value>
          </div>
        </UserData>
      </UserDataGridContainer>
    </>
  );
};

export default UserProfileInfo;

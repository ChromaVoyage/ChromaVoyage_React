import React from 'react';
import styled from 'styled-components';
import GoogleLoginButton from './GoogleLoginButton';
import LogoBox from './LogoBox';
import SimpleKakaoMap from './SimpleKakaoMap';

const StyledLoginPage = styled.div`
  background-color: rgb(252, 226, 219, 0.2); /* 배경색 지정 */
  height: 100vh;
`;

const LoginPage = () => {
  return (
    <StyledLoginPage>
      <LogoBox />
      <GoogleLoginButton />
      <SimpleKakaoMap />
    </StyledLoginPage>
  );
};

export default LoginPage;

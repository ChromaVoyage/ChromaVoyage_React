import React from 'react';
import styled from 'styled-components';

const StyledGoogleLoginButton = styled.button`
background-color: #fff; /* 흰색 배경색 */
text-align: center;
justify-content: center;
color: #333333; /* 진한 회색 글자 색 */
width: 400px;
border: none;
padding: 10px 20px;
border-radius: 2px;
cursor: pointer;
font-size: 1rem;
transition: background-color 0.3s, transform 0.1s;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
display: flex;
align-items: center;
margin-left: 70px;



&:hover {
  background-color: #e0e0e0; /* 마우스 호버 시 배경색 변화 */
  transform: scale(1.02);
}
`;

const LogoImage = styled.img`
background-color:transparent;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID; // 추후 env 파일로 설정
    const redirectUri = process.env.REACT_APP_REDIRECT_URI; // 환경변수로
    const scope = 'profile email';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <StyledGoogleLoginButton onClick={handleGoogleLogin}>
        <LogoImage src="/GoogleLogo2.png" />
      Google 로그인
    </StyledGoogleLoginButton>
  );
};

export default GoogleLoginButton;
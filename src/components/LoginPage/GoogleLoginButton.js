import React, {useState} from 'react';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
//import {GoogleOAuthProvider} from '@react-oauth/google';
//<GoogleOAuthProvider clientId="<358944958109-oerg41tntb169a49be1115qtn75hetoj.apps.googleusercontent.com>">...</GoogleOAuthProvider>;
const GoogleLoginButton = () => {
    
   
    const handleGoogleLogin = () => {
        const clientId = process.env.REACT_APP_CLIENT_ID; //추후 env 파일로 설정
        const redirectUri = process.env.REACT_APP_REDIRECT_URI; //환경변수로
        const scope = 'profile email'
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}`;
        window.location.href = authUrl;
    };    
    return (
        <button onClick={handleGoogleLogin}>Google 로그인</button>
            
    );
};

export default GoogleLoginButton

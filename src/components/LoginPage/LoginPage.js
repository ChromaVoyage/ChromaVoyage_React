//import styled from 'styled-components';
import GoogleLoginButton from './GoogleLoginButton';
import LogoBox from './LogoBox';
//import axios from "axios"; //백엔드랑 통신할 때 필요한 라이브러리

function LoginPage () {
    /*
    const GOOGLE_CLIENT_ID = ;
    const GOOGLE_REDIRECT_URI = ;

    const onGoogleSocialLogin = () => {
        window.location.href=
    }
    <button onClick={onGoogleSocialLogin}>
                구글 소셜 로그인
            </button>
    */
    return(
        <div>
            <LogoBox />
            <GoogleLoginButton />
        </div>
    );

};


export default LoginPage
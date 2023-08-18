//import styled from 'styled-components';
import GoogleLoginButton from './GoogleLoginButton';
import LogoBox from './LogoBox';
//import axios from "axios"; //백엔드랑 통신할 때 필요한 라이브러리

function LoginPage () {

    return(
        <div>
            <LogoBox />
            <GoogleLoginButton />
        </div>
    );

};


export default LoginPage
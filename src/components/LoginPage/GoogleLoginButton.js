import React, {useEffect} from 'react';
import { GoogleLogin } from "@react-oauth/google";
import {GoogleOAuthProvider} from '@react-oauth/google';
//<GoogleOAuthProvider clientId="<358944958109-oerg41tntb169a49be1115qtn75hetoj.apps.googleusercontent.com>">...</GoogleOAuthProvider>;

const GoogleLoginButton = () => {
    const clientId = '358944958109-oerg41tntb169a49be1115qtn75hetoj.apps.googleusercontent.com'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    buttonText = "google login"
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onFailure={() => {
                        console.log('Login failed');
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton
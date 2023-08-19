import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginCallback = () => { //왜 props?
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    useEffect(() => {
        const googleLogin = async () => {
            await axios({
                method: "GET",
                url: `/login?code=${code}`,
            }).then((res) => {
                    console.log(res); //잘 받아오는지 테스트
                //로그인 성공후 localstorage에 저장로직 구현 필요 => localstorage에 뭘 저장해야할까..? 일단 id랑 각종유저정보 저장, 로그인 중인지 아닌지 상태 저장하면 좋을듯
                    localStorage.setItem('userId',res.data.result.userId);
                    localStorage.setItem('email',res.data.result.email);
                    localStorage.setItem('picture',res.data.result.picture);
                    localStorage.setItem('name', res.data.result.name);
                    navigate("/");
            }).catch((err) => {
                console.log(err.response.data);
            });
        };
        googleLogin();
    });

    return(
        <div>
            로그인중입니다. 잠시만 기다려주세요
        </div>
    ) 
}


export default LoginCallback;
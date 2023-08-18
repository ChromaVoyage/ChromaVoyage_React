import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try{
            //로그아웃 api 호출
            await axios.get('/logout');
            //로그아웃 후 localstorage 삭제
            //로그인페이지로 돌아가기
            localStorage.clear();
            navigate("/login"); 

        } catch(error){
            console.error('Error logging out : ', error);
        }
    };

    return (
        <button onClick={handleLogout}>로그아웃</button>
    );
}

export default LogoutButton;
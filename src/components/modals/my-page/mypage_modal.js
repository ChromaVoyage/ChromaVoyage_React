import React, { useState, useEffect } from 'react';
import './mypage_modal.css';
//import axios from 'axios';
import userImg from '../../NavBar/user.png'; //기본프로필 이미지를 위함
import UploadImage from './UploadImage';

function Modal({ isOpen, onClose, inputNicknameValue, inputUserEmailValue, handleUserEmailChange, handleNicknameChange, handleMypageSubmit }) {
  if (!isOpen) return null;
  const [profileData, setProfileData] = useState({ /*더미데이터 값*/
    nickname : 'jj',
    image : 'urlurlurlurl',
    email: 'jj@example.com'
  })

  /*백엔드로부터 프로필 조회하는 로직 추가 - useeffect 사용해서 기존값 가져오기 */
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('서버APIURL'); // 실제 서버 API URL로 대체
      const userData = response.data;
      setProfileData(userData);
    } catch (error) {
      console.error('프로필 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleImageChange = (e) => { //업로드 및 기본이미지 대체
    // 이미지를 업로드 및 상태 업데이트
    const uploadedImage = e.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
  };

  const handleImageDelete = () => { /*백엔드로 프로필 삭제하는 것 보내는 로직 추가*/
    setProfileData({...profileData, image: userImg })
  }
  const handleProfileUpdate = (newProfileData) => { /*추후 백엔드로 update된 프로필 정보 추가*/
    setProfileData(newProfileData);
    onClose();
  }

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <h2>프로필 수정</h2>
        <div>
          <p>프로필 이미지</p>
          <div>
            <img className="ProfileImage" alt="profileimgae" src={profileData.image} />
          </div>
          {/*파일 업로드 버튼*/}
          <UploadImage />
          <p>
            확장자: png,jpg,jpeg/용량:1MB 이하
          </p>
          ({/*조건부 렌더링*/}
          {profileData.image ? (
            <div>
              <img src={profileData.image} alt="프로필 이미지" />
              <button onClick={handleImageDelete}>삭제</button>
            </div>
          ) : (
            <div>
              <img src={userImg} alt="기본 이미지" />
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          )}
        </div>
        <div>
            <p>닉네임</p>
            <p>한글,영문(대소문자),숫자 조합/2~18자 이하</p>
            <input
              type="text"
              value={profileData.nickname}
              onChange={handleNicknameChange}
            />
        </div>
        <div>
          <p>연동 e-mail</p> 
          {/*서버측에서 받아오는 걸로 수정, 연동이메일도 수정 가능?*/}
          <input 
              type="text"
              value={profileData.email}
              onChange={handleUserEmailChange}
            />
        </div>
        <button onClick={handleProfileUpdate}>저장</button>
      </div>
    </div>
  );
}

export default Modal;

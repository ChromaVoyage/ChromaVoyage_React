import React,{useState, useEffect} from 'react';
import './mypage_modal.css';
import axios from 'axios';
import userImg from './mypage_user.png'; //기본프로필 이미지를 위함
import { upload } from '@testing-library/user-event/dist/upload';

function Modal({ isOpen, onClose}) {
  const [profileData, setProfileData] = useState({ /*프로필 조회시 받아올 profile data*/
    nickname : '',
    image : '', 
    email: ''
  })
  const [uploadImage, setUploadImage] = useState(null); //업로드할 파일객체

  /*임시로 프로필 조회 - 벡엔드로부터 받아오는 거 구현하면 삭제할부분*/
  useEffect(() => {
    let nickname = localStorage.getItem('name');
    let image = localStorage.getItem('picture')?localStorage.getItem('picture'):userImg;
    let email = localStorage.getItem('email');
    setProfileData({
      ...profileData,
      "nickname": nickname,
      "image": image,
      "email": email
    });
  }, []);

  //userId 받아오기
  // const userId = localStorage.getItem('userId');

  /* 백엔드로부터 프로필 조회 */

  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    console.log(userId);
  fetchUserProfile();
}, []);

const fetchUserProfile = async () => {
  try {
    const response = await axios.get('/profiles', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: localStorage.getItem('userId').toString() // 사용자 ID를 명세서에 따라 하드코딩 또는 로컬 스토리지에서 가져오기
      }
    });

    

    // 나머지 코드는 동일합니다
    console.log("프로필 조회 성공");
    setProfileData({
      ...profileData,
      "nickname": response.data.user_name,
      "image": response.data.profileImg_path ? response.data.profileImg_path : userImg,
      "email": response.data.email
    });
  } catch (error) {
    console.error('프로필 정보를 가져오는 중 오류 발생:', error);
  }
};
  
  if (!isOpen) return null;
  
  //userId 받아오기
  
  if (!isOpen) return null;

  /* 백엔드로부터 프로필 조회 */
  /* useEffect(() => {
    fetchUserProfile();
  }, []);
  //userid localstorage로부터 가져오는 로직추가
  const fetchUserProfile = async () => {
    try {
      //userid넘기기로직 추가 -body
      const response = await axios.get(`/profiles/${userId}`); 
      setProfileData({
        ...profileData,
        "nickname": response.data.user_name,
        "image": response.data.profileImg_path?response.data.profileImg_path:userImg, //유저이미지값이 null이면 기본이미지로 대체
        "email": response.data.email
      });
    } catch (error) {
      console.error('프로필 정보를 가져오는 중 오류 발생:', error);
    }
  }; */

  const handleImageChange = (e) => { //업로드
    // 이미지를 업로드 및 상태 업데이트
    const uploadedImage = e.target.files[0];
    setUploadImage(uploadedImage); //파일객체로 저장
    setProfileData({...profileData, image: URL.createObjectURL(uploadedImage)});//미리보기 이미지 저장
  };

  const handleImageDelete = () => { 
    setProfileData(prevprofileData => ({
      ...prevprofileData,
      image: userImg
    }));
    /*백엔드로 프로필 삭제하는 것 보내는 로직*/
    
    axios.delete('/profiles',{data : {
      user_id : userId
    },}) //delete 요청은 보통 body에 있는 내용을 무시해서 path variable로 넘기는  걸로 바꿀필요 있을듯
      .then(res => {
        console.log("삭제 성공");
      }).catch(err => {
        console.log(err.respnse.data);
      });
  } 

  //닉네임 변경
  const handleNicknameChange = (event) => {
    setProfileData({...profileData, "nickname" : event.target.value});
  };

  const handleProfileUpdate =  () => { 
    //확인용
    const updateProfile = {
      user_id: userId,
      name: profileData.nickname,
      file: uploadImage,
    };
    //백엔드로 전송
    
    const formData = new FormData();
    formData.append("image",uploadImage);
    axios.post(`/profiles?user_id=${userId}&name=${profileData.nickname}`,formData, {
      headers: {
        "Content-Type" : "multipart/form-data",
      },
    }).then(res => {
      console.log('성공');
    }).catch(err=>{
      console.log(err.response.data);
    });
    onClose();//모달 닫기
  }

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <h2 className='ProfileModify'>프로필 수정</h2>
        <hr className="line" />
        <div>
          <p className='imageline'>프로필 이미지</p> 
          <div className='ProfileImage'>
            {profileData.image && (<img className='ProfileImagevalue' alt="profileimage" src={profileData.image}/>)}
          </div>
          {/*이미지 업로드 버튼*/}
          <input type="file" accept="image/*" onChange={handleImageChange}/>
          <p>
            확장자: png,jpg,jpeg/용량:1MB 이하
          </p>
          {/*이미지 삭제*/}
          <button onClick={handleImageDelete}>
            이미지 삭제
          </button>
        </div>
        <div>
            <p className='NickName'>닉네임</p>
            <p>한글,영문(대소문자),숫자 조합/2~18자 이하</p>
            <input
              type="text"
              value={profileData.nickname}
              onChange={handleNicknameChange}
            />
        </div>
        <p>연동 e-mail</p>
        <div>   
          <p>{profileData.email}</p>
        </div>
        <button onClick={handleProfileUpdate}>저장</button>
      </div>
    </div>
  );
}

export default Modal;
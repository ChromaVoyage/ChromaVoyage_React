import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import './Nav.css';
import CreategroupModal from '../modals/create-group/creategroup_modal';
import MypageModal from '../modals/my-page/mypage_modal';
//JSX에서 컴포넌트 이름은 항상 대문자로 시작해야 함. (ex. CreatgroupModal / MypageModal)

//로고 이미지 파일 경로
import logoImage from './logo.png';
import creategroupImage from './creategroupImage.png';
import userImage from './user.png';


function Nav() {
  const [isCreategroupModalOpen, setIsCreategroupModalOpen] = useState(false);
  const [isMypageModalOpen, setIsMypageModalOpen] = useState(false);
  const [inputGroupValue, setGroupInputValue] = useState('');
  const [inputEmailValue, setEmailInputValue] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [inputNicknameValue, setNicknameInputValue] = useState('');
  const [inputUserEmailValue, setUserEmailInputValue] = useState('');

  const handleOpenCreategroupModal = () => {
    setIsCreategroupModalOpen(true);
  };

  const handleCloseCreategroupModal = () => {
    setIsCreategroupModalOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmailInputValue(event.target.value);
  }

  const handleChange = (event) => {
    setGroupInputValue(event.target.value);
  };

  const handleEmailSubmit = () => { //서버 전달 로직 필요?
    if(inputEmailValue) {
      setEmailList([...emailList,inputEmailValue]);
      setEmailInputValue('');
    }
  };
  const handleRemoveEmail = (index) => {
    const updatedList = emailList.filter((_, i) => i !== index);
    setEmailList(updatedList);
  };
  const handleSubmit = () => { //서버 전달 로직 구현 필요
    // 입력한 값을 처리하거나 저장하는 로직을 작성합니다.
    console.log('Input Value:', inputGroupValue);
    setIsCreategroupModalOpen(false);
  };

  const handleOpenMypageModal = () => {
    setIsMypageModalOpen(true);
  };

  const handleCloseMypageModal = () => {
    setIsMypageModalOpen(false);
  };
  const handleNicknameChange = (event) => {
    setNicknameInputValue(event.target.value);
  };
  const handleUserEmailChange = (event) => {
    setUserEmailInputValue(event.target.value);
  };
  const handleMypageSubmit = () => {
    /*서버 전달 로직 수정 필요*/
    console.log('Input Value:', inputNicknameValue);
    setIsMypageModalOpen(false);

  }


  return (
    <div className="navContainer">
      <div className="navbar">

        {/* 로고 이미지를 추가 */}
        <img src={logoImage} alt="Logo" className="navbarImage" />

        {/* 선을 추가 */}
        <hr className="navbarLine" />

        <div className="navBottomContent">
        
          {/* 그룹 생성하기 */}
          {/* 이미지를 클릭하면 팝업이 열리도록 이벤트를 추가 */}
          <img src={creategroupImage} alt='CreateGroup' className="navbarImage" onClick={handleOpenCreategroupModal} />
          {/* 팝업 모달 */}
          <CreategroupModal isOpen={isCreategroupModalOpen} onClose={handleCloseCreategroupModal} inputGroupValue={inputGroupValue} inputEmailValue={inputEmailValue} emailList={emailList} handleEmailChange={handleEmailChange} handleChange={handleChange} handleEmailSubmit={handleEmailSubmit} handleRemoveEmail={handleRemoveEmail} handleSubmit={handleSubmit} />
          <span onClick={handleOpenCreategroupModal} className="navbarMenu">그룹<br/>생성하기</span>

          {/* 메뉴들 */}
          {/* <Link className="navbarMenu" to={'/'}>Main</Link>
          <Link className="navbarMenu" to={'/login'}>Login</Link> */}

          {/* 선을 추가 */}
          <hr className="navbarLine" />

          {/* 마이페이지 */}
          <img src={userImage} alt='User' className="navbarImage" onClick={handleOpenMypageModal} />
          <MypageModal isOpen={isMypageModalOpen} onClose={handleCloseMypageModal} inputNicknameValue={inputNicknameValue} inputUserEmailValue={inputUserEmailValue} handleUserEmailChange={handleUserEmailChange} handleNicknameChange={handleNicknameChange} handleMypageSubmit={handleMypageSubmit}  />
        </div>
      </div>
    </div>
  )
}

export default Nav;

// import {Link} from 'react-router-dom';
// import React, { useState } from 'react';
// import './Nav.css';
// import CreategroupModal from '../modals/create-group/creategroup_modal';
// import MypageModal from '../modals/my-page/mypage_modal';
// //JSX에서 컴포넌트 이름은 항상 대문자로 시작해야 함. (ex. CreatgroupModal / MypageModal)

// //로고 이미지 파일 경로
// import logoImage from './logo.png';
// import creategroupImage from './creategroupImage.png';
// import userImage from './user.png';


// function Nav() {
//   const [isCreategroupModalOpen, setIsCreategroupModalOpen] = useState(false);
//   const [isMypageModalOpen, setIsMypageModalOpen] = useState(false);

//   const handleOpenCreategroupModal = () => {
//     setIsCreategroupModalOpen(true);
//   };

//   const handleCloseCreategroupModal = () => {
//     setIsCreategroupModalOpen(false);
//   };

//   const handleOpenMypageModal = () => {
//     setIsMypageModalOpen(true);
//   };

//   const handleCloseMypageModal = () => {
//     setIsMypageModalOpen(false);
//   };

//   return (
//     <div className="navContainer">
//       <div className="navbar">

//         {/* 로고 이미지를 추가 */}
//         <img src={logoImage} alt="Logo" className="navbarImage" />

//         {/* 선을 추가 */}
//         <hr className="navbarLine" />

//         <div className="navBottomContent">
//           {/* 그룹 생성하기 */}
//           {/* 이미지를 클릭하면 팝업이 열리도록 이벤트를 추가 */}
//           <img src={creategroupImage} alt='CreateGroup' className="navbarImage" onClick={handleOpenCreategroupModal} />
//           {/* 팝업 모달 */}
//           <CreategroupModal isOpen={isCreategroupModalOpen} onClose={handleCloseCreategroupModal} />
//           <span onClick={handleOpenCreategroupModal} className="navbarMenu">그룹<br/>생성하기</span>

//           {/* 메뉴들 */}
//           <Link className="navbarMenu" to={'/'}>Main</Link>
//           <Link className="navbarMenu" to={'/login'}>Login</Link>

//           {/* 선을 추가 */}
//           <hr className="navbarLine" />

//           {/* 마이페이지 */}
//           <img src={userImage} alt='User' className="navbarImage" onClick={handleOpenMypageModal} />
//           <MypageModal isOpen={isMypageModalOpen} onClose={handleCloseMypageModal} />
//         </div>
        
//       </div>
//     </div>
//   )
// }

// export default Nav;
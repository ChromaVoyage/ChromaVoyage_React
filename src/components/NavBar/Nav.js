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

  const handleOpenCreategroupModal = () => {
    setIsCreategroupModalOpen(true);
  };

  const handleCloseCreategroupModal = () => {
    setIsCreategroupModalOpen(false);
  };

  const handleOpenMypageModal = () => {
    setIsMypageModalOpen(true);
  };

  const handleCloseMypageModal = () => {
    setIsMypageModalOpen(false);
  };

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
          <CreategroupModal isOpen={isCreategroupModalOpen} onClose={handleCloseCreategroupModal} />
          <span onClick={handleOpenCreategroupModal} className="navbarMenu">그룹<br/>생성하기</span>

          {/* 메뉴들 */}
          <Link className="navbarMenu" to={'/'}>Main</Link>
          <Link className="navbarMenu" to={'/login'}>Login</Link>

          {/* 선을 추가 */}
          <hr className="navbarLine" />

          {/* 마이페이지 */}
          <img src={userImage} alt='User' className="navbarImage" onClick={handleOpenMypageModal} />
          <MypageModal isOpen={isMypageModalOpen} onClose={handleCloseMypageModal} />
        </div>
        
      </div>
    </div>
  )
}

export default Nav;
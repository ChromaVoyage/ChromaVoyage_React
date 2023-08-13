// Tab1.js
import React, { useState, useEffect, useContext } from 'react';
import './Tab1.css'; // CSS 파일을 추가해줍니다.
import Tab2 from '../Tab2/Tab2'; // Tab2 컴포넌트를 불러옵니다.
import { MyContext } from '../../MyContextProvider';

import groupmembersImage from './group_members.png'


function Tab1({ openTab2, isTab2Open }) {
  const [showTab2] = useState(false); // showTab2 상태를 설정합니다.
  const { activeGroupBoxIndex, setActiveGroupBoxIndex } = useContext(MyContext);

  // Tab2가 닫혔을 때 active 상태 해제
  useEffect(() => {
    if (!isTab2Open) {
      setActiveGroupBoxIndex(-1);
    }
  }, [isTab2Open]);

  const handleShowTab2 = () => {
    openTab2(); // Tab2를 열기 위해 opneTab2 함수 호출
  };

  const handleGroupBoxClick = (index) => {
    if (showTab2 && activeGroupBoxIndex === index) {
      setActiveGroupBoxIndex(-1); // Tab2가 닫혔으므로 activeGroupBoxIndex를 -1로 설정
    } else {
      setActiveGroupBoxIndex(index);
    }
  };


  // 동적으로 생성될 그룹 박스의 데이터 배열
  const groupData = [
    {
      name: 'Group 1',
      member: 'Eun',
      memberCount: 9,
    },
    {
      name: 'Group 2',
      member: 'Boo',
      memberCount: 7,
    },
    {
      name: 'Group 3',
      member: 'Boo',
      memberCount: 7,
    },
    {
      name: 'Group 4',
      member: 'Boo',
      memberCount: 7,
    },
    {
      name: 'Group 5',
      member: 'Boo',
      memberCount: 7,
    },
    {
      name: 'Group 6',
      member: 'Boo',
      memberCount: 7,
    },
    {
      name: 'Group 7',
      member: 'Boo',
      memberCount: 7,
    },
    // 다른 그룹 박스 데이터도 추가할 수 있습니다.
  ];

  return (
    <div>
      <div className="Tab1">
        {/* 사이드 메뉴 아이템들을 추가합니다 */}
        <div className="Tab1Item"><b>내 그룹</b></div>
        {/* 필요한 만큼 메뉴를 추가할 수 있습니다 */}
        <div className="Tab1Contents">
          {/* 스크롤 가능한 내용을 추가해주세요 */}
          <div className="GroupBoxesContainer">
            {/* 그룹 박스들을 동적으로 생성 */}
            {groupData.map((group, index) => (
              <div
                key={index}
                className={`GroupBox ${index === activeGroupBoxIndex ? 'active' : ''}`}
                onClick={() => handleGroupBoxClick(index)} // 그룹 박스 클릭 이벤트 핸들러에 인덱스 전달
              >
                <div className="LeftContent">
                  <span className="GroupName"><b>{group.name}</b></span>
                  <span className="GroupMembers">
                    <img src={groupmembersImage} alt="GroupMembers" className="groupmembersImage" />
                    <span className="groupmembersText"> <b>{group.member}</b> 외 {group.memberCount - 1}명</span>
                  </span>
                </div>
                <div className="RightContent">
                  <button className="showTab2Button" onClick={handleShowTab2}><b>+</b></button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tab2 보여주기 여부에 따라 렌더링 */}
      {showTab2 && <Tab2 />}
    </div>

  )
}

export default Tab1

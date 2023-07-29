/* Tab1_DS.js (DS for District Selected) */
import React, { useState, useEffect } from 'react';
import './Tab1_DS.css'; // CSS 파일을 추가해줍니다.
import Tab2_DS from '../Tab2_DS/Tab2_DS'; // Tab2 컴포넌트를 불러옵니다.

import groupmembersImage from './group_members.png'


function Tab1_DS({ openTab2_DS, isTab2_DSOpen }) {
  const [showTab2_DS] = useState(false); // showTab2_DS 상태를 설정합니다.
  const [activeGroupBox_DSIndex, setActiveGroupBox_DSIndex] = useState(-1); // 클릭한 그룹 박스의 인덱스를 저장

  // Tab2가 닫혔을 때 active 상태 해제
  useEffect(() => {
    if (!isTab2_DSOpen) {
      setActiveGroupBox_DSIndex(-1);
    }
  }, [isTab2_DSOpen]);

  const handleShowTab2_DS = () => {
    openTab2_DS(); // Tab2_DS를 열기 위해 opneTab2_DS 함수 호출
  };

  const handleGroupBoxClick = (index) => {
    if (showTab2_DS && activeGroupBox_DSIndex === index) {
      setActiveGroupBox_DSIndex(-1); // Tab2가 닫혔으므로 activeGroupBoxIndex를 -1로 설정
    } else {
      setActiveGroupBox_DSIndex(index);
    }
  };


  // 동적으로 생성될 그룹 박스의 데이터 배열
  const groupData = [
    {
      name: 'Group 1',
      member: 'Eun',
      memberCount: 9,
      duration: '7월 nn일 - 8월 nn일',
    },
    {
        name: 'Group 2',
        member: 'Boo',
        memberCount: 7,
        duration: '7월 nn일 - 8월 nn일',
      },
    // 다른 그룹 박스 데이터도 추가할 수 있습니다.
  ];

  return (
    <div>
      <div className="Tab1_DS">
      {/* 사이드 메뉴 아이템들을 추가합니다 */}
      <div className="Tab1_DSItem"><b>OO에 함께한 그룹</b></div>
      {/* 필요한 만큼 메뉴를 추가할 수 있습니다 */}
      <div className="Tab1_DSContents">
        {/* 스크롤 가능한 내용을 추가해주세요 */}
          <div className="GroupBoxesContainer_DS">
            {/* 그룹 박스들을 동적으로 생성 */}
            {groupData.map((group, index) => (
              <div
                key={index}
                className={`GroupBox_DS ${index === activeGroupBox_DSIndex ? 'active' : ''}`}
                onClick={() => handleGroupBoxClick(index)} // 그룹 박스 클릭 이벤트 핸들러에 인덱스 전달
              >
                <div className="LeftContent_DS">
                  <span className="GroupName_DS"><b>{group.name}</b></span>
                  <span className="GroupMembers_DS">
                    <img src={groupmembersImage} alt="GroupMembers_DS" className="groupmembersImage_DS" />
                    <span className="groupmembersText_DS"> <b>{group.member}</b> 외 {group.memberCount - 1}명</span>
                  </span>
                </div>
                <div className="RightContent_DS">
                  <span className="Duration_DS">{group.duration}</span>
                  {/* showTab2_DS 상태에 따라 버튼 스타일을 변경 */}
                  <button className={`showTab2Button_DS ${showTab2_DS ? 'active' : ''}`} onClick={handleShowTab2_DS}>
                    <b>{'>'}</b>
                  </button>
                </div>

                {/* Tab2 보여주기 여부에 따라 렌더링 */}
                {showTab2_DS && <Tab2_DS />}
              </div>
            ))}
          </div>
      </div>
    </div>
    </div>
  )
}

export default Tab1_DS

import React, { useState, useEffect, useContext } from 'react';
import './Tab1.css';
import Tab2 from '../Tab2/Tab2';
import groupmembersImage from './group_members.png';
import axios from 'axios';
import { MyContext } from '../../MyContextProvider';

function Tab1({ openTab2, isTab2Open }) {
  const [showTab2, setShowTab2] = useState(false);
  const [activeGroupBoxIndex, setActiveGroupBoxIndex] = useState(-1);
  const [groupData, setGroupData] = useState([]);
  const {groupId, setGroupId, clickGroupId, setClickGroupId } = useContext(MyContext);

  useEffect(() => {
    axios.post('/groups/my', {
      userId: 3
    })
    .then(response => {
      setGroupData(response.data);
    })
    .catch(error => {
      console.error('그룹 데이터 가져오기 오류:', error);
    });
  }, []);

  useEffect(() => {
    if (!isTab2Open) {
      setActiveGroupBoxIndex(-1);
      setClickGroupId(-1)
    }
  }, [isTab2Open]);

  const handleShowTab2 = (groupId) => {
    setGroupId(groupId);
    setShowTab2(true); // Tab2 렌더링을 허용
    openTab2()
  };

  const handleGroupBoxClick = (index) => {
    if (activeGroupBoxIndex === index) {
      setClickGroupId(-1)
      setActiveGroupBoxIndex(-1);
    }
    else if (showTab2 && activeGroupBoxIndex === index) {
      setShowTab2(false); // 그룹 박스 클릭 시 Tab2 렌더링 해제
    } else {
      const clickedGroup = groupData[index]; // 클릭한 그룹의 정보를 가져옴
      console.log("클릭한 그룹 ID:", clickedGroup.groupId); // 그룹 ID를 콘솔에 출력
      setClickGroupId(clickedGroup.groupId);
      setActiveGroupBoxIndex(index);
    }
  };
  

  return (
    <div>
      <div className="Tab1">
        <div className="Tab1Item"><b>내 그룹</b></div>
        <div className="Tab1Contents">
          <div className="GroupBoxesContainer">
            {groupData.map((group, index) => (
              <div
                key={index}
                className={`GroupBox ${index === activeGroupBoxIndex ? 'active' : ''}`}
                onClick={() => handleGroupBoxClick(index)}
              >
                <div className="LeftContent">
                  <span className="GroupName"><b>{group.groupName}</b></span>
                  <span className="GroupMembers">
                    <img src={groupmembersImage} alt="GroupMembers" className="groupmembersImage" />
                    <span className="groupmembersText">
                      <b>{group.groupMembers[0]}</b> 외 {group.groupMembers.length - 1}명
                    </span>
                  </span>
                </div>
                <div className="RightContent">
                  <button className="showTab2Button" onClick={() => handleShowTab2(group.groupId)}><b>+</b></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showTab2 && <Tab2 />}
    </div>
  );
}

export default Tab1;

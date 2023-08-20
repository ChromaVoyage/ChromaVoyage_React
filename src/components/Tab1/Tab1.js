import React, { useState, useEffect, useContext } from 'react';
import './Tab1.css';
import Tab2 from '../Tab2/Tab2';
import groupmembersImage from './group_members.png';
import coloredstar from './coloredstar.png';
import emptystar from './star.png';
import axios from 'axios';
import { MyContext } from '../../MyContextProvider';

function Tab1({ openTab2, isTab2Open }) {
  const [showTab2, setShowTab2] = useState(false);
  // const [activeGroupBoxIndex, setActiveGroupBoxIndex] = useState(-1);
  const [groupData, setGroupData] = useState([]);
  const {groupId, setGroupId, clickGroupId, setClickGroupId, creategroup, setcreategroup, activeGroupBoxIndex, setActiveGroupBoxIndex } = useContext(MyContext);


  useEffect(() => {
    axios.post('/groups/my', {
      userId: localStorage.getItem('userId')
    })
    .then(response => {
      // 서버에서 가져온 그룹 데이터를 즐겨찾기 상태에 따라 정렬
      const sortedGroupData = response.data.sort((a, b) => {
        // 즐겨찾기 된 그룹을 먼저 오도록 정렬 (pin이 true인 경우)
        if (a.pin && !b.pin) {
          return -1;
        }
        if (!a.pin && b.pin) {
          return 1;
        }
        // 즐겨찾기 여부가 같을 경우, 원래 순서 유지
        return 0;
      });

      setGroupData(sortedGroupData);
    })
    .catch(error => {
      console.error('그룹 데이터 가져오기 오류:', error);
    });
  }, [creategroup]);

  useEffect(() => {
    if (!isTab2Open) {
      setActiveGroupBoxIndex(-1);
      setClickGroupId(-1)
    }
  }, [isTab2Open]);

  const handleDeleteGroup = (groupId) => {
    // const accessToken = '[Your Access Token]'; // 사용자의 엑세스 토큰을 여기에 넣어야 합니다.
    const confirmed = window.confirm('이 그룹을 삭제하시겠습니까?');
  
    if (confirmed) {
      axios.delete(`/groups/delete?group_id=${groupId}`)
      .then(response => {
        if (response.data.ResponseCode === '204') {
          // 그룹이 성공적으로 삭제되었으므로, 해당 그룹을 제외한 새로운 groupData를 설정
          console.log(response.data.description);
          const updatedGroupData = groupData.filter(group => group.groupId !== groupId);
          setGroupData(updatedGroupData);
        } else {
          console.error('그룹 삭제 오류:', response.data.description);
        }
      })
      .catch(error => {
        console.error('그룹 삭제 오류:', error);
      });
    }
  };

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
  

  // --------- 그룹 즐겨찾기 -----------
  // 그룹 즐겨찾기 여부 변경 시 순서 조정 함수
  const adjustGroupOrder = (groupId, newPinValue) => {
    const updatedGroupData = groupData.map(group => {
      if (group.groupId === groupId) {
        return {
          ...group,
          pin: newPinValue
        };
      }
      return group;
    });

    // 변경된 즐겨찾기 여부에 따라 데이터 재정렬
    const sortedGroupData = updatedGroupData.sort((a, b) => {
      if (a.pin && !b.pin) {
        return -1;
      }
      if (!a.pin && b.pin) {
        return 1;
      }
      return 0;
    });

    setGroupData(sortedGroupData);
  };

  const handleTogglePin = (groupId) => {
    const groupToUpdate = groupData.find(group => group.groupId === groupId);
    if (!groupToUpdate) {
      return;
    }

    const newPinValue = !groupToUpdate.pin;

    axios.patch(`/groups/pin?group_id=${groupId}`, {
      pin: newPinValue
    })
    .then(response => {
      if (response.data.ResponseCode === '200') {
        setActiveGroupBoxIndex(-1);
        adjustGroupOrder(groupId, newPinValue); // 순서 조정
      } else {
        console.error('즐겨찾기 업데이트 오류:', response.data.description);
      }
    })
    .catch(error => {
      console.error('즐겨찾기 업데이트 오류:', error);
    });
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
                      <b>{group.groupMembers[1]}</b> 외 {group.groupMembers.length - 1}명
                    </span>
                  </span>
                </div>
                <div className="RightContent">
                  <button className="DeleteBtn" onClick={() => handleDeleteGroup(group.groupId)}><b>x</b></button>
                  <img src={group.pin ? coloredstar : emptystar} alt="Pin" className="pinImage" onClick={() => handleTogglePin(group.groupId)}/>
                  <button className="showTab2Button" onClick={() => handleShowTab2(group.groupId)}><b>+</b></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {showTab2 && <Tab2 />} */}
    </div>
  );
}

export default Tab1;
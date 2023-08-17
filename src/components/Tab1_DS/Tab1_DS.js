import React, { useState, useEffect, useContext } from 'react';
import './Tab1_DS.css';
import Tab2_DS from '../Tab2_DS/Tab2_DS';
import groupmembersImage from './group_members.png';
import { MyContext } from '../../MyContextProvider';

function Tab1_DS({ openTab2_DS, isTab2_DSOpen }) {
  const [showTab2_DS] = useState(false);
  const [activeGroupBox_DSIndex, setActiveGroupBox_DSIndex] = useState(-1);
  const { clickLocationName, setClickLocationName, setStartDate, setEndDate, setColoringLocationId, setLocationId, setGroupId } = useContext(MyContext);
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    if (clickLocationName) {
      // HTTP 요청을 보내서 데이터를 가져옵니다.
      fetch('/groups/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 3,
          locationName: clickLocationName,
        }),
      })
        .then(response => response.json())
        .then(data => {
          // startDate와 endDate 값을 분리하여 저장합니다.
          const modifiedData = data.map(group => ({
            ...group,
            startDate: group.startDate.split('T')[0],
            endDate: group.endDate.split('T')[0],
          }));
          setGroupData(modifiedData);

          // 첫 번째 그룹 데이터의 startDate와 endDate를 Context에 저장합니다.
          if (modifiedData.length > 0) {
            setStartDate(modifiedData[0].startDate);
            setEndDate(modifiedData[0].endDate);
            setColoringLocationId(modifiedData[0].coloringLocationId);
            setLocationId(modifiedData[0].locationId);
            setGroupId(modifiedData[0].groupId);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [clickLocationName]);

  useEffect(() => {
    if (!isTab2_DSOpen) {
      setActiveGroupBox_DSIndex(-1);
    }
  }, [isTab2_DSOpen]);

  const handleShowTab2_DS = (startDate, endDate, coloringLocationId, locationId, groupId) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setColoringLocationId(coloringLocationId);
    setLocationId(locationId);
    setGroupId(groupId);
    console.log("일정 정보:", startDate, endDate, coloringLocationId, locationId, groupId  );
    openTab2_DS();
  };

  const handleGroupBoxClick = (index) => {
    if (showTab2_DS && activeGroupBox_DSIndex === index) {
      setActiveGroupBox_DSIndex(-1);
    } else {
      setActiveGroupBox_DSIndex(index);
    }
  };

  return (
    <div>
      <div className="Tab1_DS">
        <div className="Tab1_DSItem"><b> {clickLocationName}에 함께한 그룹</b></div>
        <div className="Tab1_DSContents">
          <div className="GroupBoxesContainer_DS">
            {groupData.map((group, index) => (
              <div
                key={index}
                className={`GroupBox_DS ${index === activeGroupBox_DSIndex ? 'active' : ''}`}
                onClick={() => handleGroupBoxClick(index)}
              >
                <div className="LeftContent_DS">
                  <span className="GroupName_DS"><b>{group.groupName}</b></span>
                  <span className="GroupMembers_DS">
                    <img src={groupmembersImage} alt="GroupMembers_DS" className="groupmembersImage_DS" />
                    <span className="groupmembersText_DS"> <b>{group.groupMembers[0]}</b> 외 {group.groupMembers.length - 1}명</span>
                  </span>
                </div>
                <div className="RightContent_DS">
                  <span className="Duration_DS">
                    {/* {group.startDate} - {group.endDate} */}
                    {group.startDate.slice(2).replace(/-/g, '')} <br /> - {group.endDate.slice(2).replace(/-/g, '')}
                  </span>
                  <button className={`showTab2Button_DS ${showTab2_DS ? 'active' : ''}`} onClick={() => handleShowTab2_DS(group.startDate, group.endDate, group.coloringLocationId, group.locationId, group.groupId)}>
                    <b>{'>'}</b>
                  </button>
                </div>
                {showTab2_DS && <Tab2_DS />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tab1_DS;

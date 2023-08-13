/* Tab2_DS.js (DS for District Selected) */
// Tab2.js
import React, { useState, useContext } from 'react';
import './Tab2_DS.css'; // CSS 파일을 추가해줍니다.
import { MyContext } from '../../MyContextProvider';

function Tab2_DS() {
  const [isEditMode, setIsEditMode] = useState(false); // 상태 변수로 수정 모드 여부를 관리합니다.
  const [textValue, setTextValue] = useState('일정 추가'); // 상태 변수로 텍스트 박스의 내용을 관리합니다.
  const { activeGroupBox_DSIndex } = useContext(MyContext);

  console.log("activeGroupBox_DSIndex : ", activeGroupBox_DSIndex)

  const handleTextboxClick = () => {
    setIsEditMode(true); // 텍스트 박스를 클릭하면 수정 모드로 변경합니다.
  };

  const handleTextboxBlur = () => {
    setIsEditMode(false); // 텍스트 박스가 포커스를 잃으면 수정 모드를 해제합니다.
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value); // 입력 값이 변경될 때마다 상태를 업데이트합니다.
  };

  return (
    <div>
      <div className="Tab2_DS">
        {/* 사이드 메뉴 아이템들을 추가합니다 */}
        <div className="Tab2_DSItem"><b>일정 추가</b></div>

        <div className="Tab2_DSContents">
          {/* 수정 가능한 텍스트 박스를 추가합니다. */}
          {isEditMode ? (
            <input
              className="Tab2_DSTextbox"
              type="text"
              value={textValue}
              onChange={handleTextChange}
              onBlur={handleTextboxBlur}
              autoFocus
            />
          ) : (
            <div className="Tab2_DSContents">
              <span className="Tab2_DSTextbox" onClick={handleTextboxClick}>{textValue}</span>
            </div>
          )}
        </div>

        <div className="Tab2_DSItem"><b>지역</b></div>
        <span className="Tab2_DSText">지도에서 선택 or 도로명 주소를 입력하세요.</span>


        <div className="Tab2_DSItem"><b>장소</b></div>

        <div className="Tab2_DSItem"><b>이미지</b></div>
      </div>
    </div>
  )
}

export default Tab2_DS

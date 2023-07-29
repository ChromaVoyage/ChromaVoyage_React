// Tab2.js
import React, { useState } from 'react';
import './Tab2.css'; // CSS 파일을 추가해줍니다.
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css'; 

function Tab2() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className="Tab2">
      {/* 사이드 메뉴 아이템들을 추가합니다 */}
      <div className="Tab2Item"><b>일정 추가</b></div>
      
      <div className="Tab2Contents">
        <span className="Tab2Text">방문 일정을 선택하세요.</span>
        {/* <input type="text" className="Tab2Textbox" placeholder="YYMMDD 형식으로 입력 (ex. 230713)" /> */}

        {/* 달력 컴포넌트 */}
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="YYMMDD 형식으로 입력 (ex. 230713)"
            dateFormat="yyMMdd"
            className="Tab2Textbox" // 텍스트 박스와 같은 스타일을 공유하기 위해 className 설정
          />

      </div>

      <div className="Tab2Item"><b>지역 추가</b></div>
      <span className="Tab2Text">지도에서 선택 or 도로명 주소를 입력하세요.</span>
    </div>
    </div>
  )
}

export default Tab2

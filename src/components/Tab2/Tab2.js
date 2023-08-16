import React, { useState, useContext, useEffect, useRef } from 'react';
import './Tab2.css';
import { DateRange, Calendar } from 'react-date-range';
import { addDays } from "date-fns"
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import DaumPostcode from 'react-daum-postcode';
import { MyContext } from '../../MyContextProvider';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function Tab2() {
  const { name, setName, selectedLocations, setSelectedLocations, searchAddress, setSearchAddress, groupId, setGroupId } = useContext(MyContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showDaumPostcode, setShowDaumPostcode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);

  const calendarRef = useRef(null);


  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleAddress = (data) => {
    setShowDaumPostcode(false);
    const fullAddress = data.address;
    const addressArray = fullAddress.split(' ');
    const guAddress = addressArray[0] + " " + addressArray[1];
    const searchAddress = addressArray[0] + " " + addressArray[1];
    setSelectedAddress(guAddress);
    setSearchAddress(searchAddress);
    setSelectedLocations((prev) => [...prev, guAddress]);
  };

  const handleAddressInputClick = () => {
    setShowDaumPostcode(true);
  };

  const handleDaumPostcodeClose = () => {
    setShowDaumPostcode(false);
  };

  // const handleMapButtonClick = () => {
  //   console.log("선택된 지역:", [selectedLocations]);
  //   console.log('지역이 추가됨');
  // };

  const handleMapButtonClick = () => {
    
    if (groupId !== undefined && groupId !== null) {
      const startDate = state[0].startDate;
      const endDate = state[0].endDate;
      const requestBody = {
        userId: 3, // 추후 바꾸어야 함
        locationName: selectedLocations,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };

      console.log("요청", requestBody);
      console.log("요청", groupId);
  
      axios.post(`/locations/add?group_id=${groupId}`, requestBody)
        .then(response => {
          console.log("일정 추가 요청 성공:", response.data);
          // 요청이 성공한 경우 추가적인 작업 수행
        })
        .catch(error => {
          console.error("일정 추가 요청 실패:", error);
          // 요청이 실패한 경우 에러 처리
        });
    } else {
      console.error("groupId is invalid"); // groupId가 유효하지 않을 경우에 대한 처리
    }
  };

  const handleDateRangeChange = (ranges) => {
    setState([ranges.selection]);
    setSelectedDate(`${ranges.selection.startDate.toLocaleDateString()} - ${ranges.selection.endDate.toLocaleDateString()}`);
  };

  useEffect(() => {
    console.log('선택된 모든 지역:', selectedLocations);
  }, [selectedLocations]);

  useEffect(() => {
    console.log('그룹__ID:', groupId); // 그룹 ID 출력
  }, [groupId]);



  return (
    <div>
      <div className="Tab2">
        <div className="Tab2Item"><b>일정 추가</b></div>

        <div className="Tab2Contents">
          <span className="Tab2Text">방문 일정을 선택하세요.</span>
          <input
            type="text"
            className="Tab2Textbox"
            value={selectedDate}
            onClick={() => {
              setShowCalendar(true);
              if (calendarRef.current) {
                calendarRef.current.click();
              }
            }}
          />
          {showCalendar && (
            <div className="CalendarOverlay">
              <DateRange
                ref={calendarRef}
                editableDateInputs={false}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
                style={{
                  position: 'absolute',
                  zIndex: '999',
                  width: '300px',
                }}
                inputRanges={[
                  {
                    startDate: new Date(),
                    endDate: addDays(new Date(), 1),
                    key: 'selection'
                  }
                ]}
                calendar={<Calendar style={{ width: '200px', height: '200px' }} />}
              />
              <button className="CloseButton" onClick={() => setShowCalendar(false)}>x</button>
            </div>
          )}
        </div>

        <div className="Tab2Item"><b>지역 추가</b></div>
        <span className="Tab2Text">지도에서 선택 or 도로명 주소를 입력하세요.</span>
        <input
          type="text"
          className="Tab2Textbox"
          value={selectedAddress}
          onChange={handleAddressChange}
          onClick={handleAddressInputClick}
        />

        {/* Daum Postcode component */}
        {showDaumPostcode && (
          <div>
            <DaumPostcode
              onComplete={handleAddress}
            />
            <button onClick={handleDaumPostcodeClose}>x</button>
          </div>
        )}

        <div className="Tab2Text" style={{ paddingTop: '10px' }}>
          선택된 지역:
          <ul>
            {selectedLocations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>

        <button onClick={handleMapButtonClick} className="MapSelectButton">
          일정 추가하기
        </button>

      </div>
    </div>
  )
}

export default Tab2;

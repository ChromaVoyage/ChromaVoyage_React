// MyContextProvider.js
// MyContextProvider.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [name, setName] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [activeGroupBoxIndex, setActiveGroupBoxIndex] = useState(-1); // 클릭한 그룹 박스의 인덱스를 저장
  const [activeGroupBox_DSIndex, setActiveGroupBox_DSIndex] = useState(-1); // 클릭한 그룹 박스의 인덱스를 저장

  return (
    <MyContext.Provider value =
    {{ 
      name, setName, 
      selectedLocations, setSelectedLocations, 
      activeGroupBoxIndex, setActiveGroupBoxIndex, 
      activeGroupBox_DSIndex, setActiveGroupBox_DSIndex 
      }}>
      {children}
    </MyContext.Provider>
  );
};

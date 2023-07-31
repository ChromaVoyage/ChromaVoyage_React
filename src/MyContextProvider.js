// MyContextProvider.js
// MyContextProvider.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [name, setName] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
  const [selectedLocations, setSelectedLocations] = useState([]);

  return (
    <MyContext.Provider value={{ name, setName, selectedLocations, setSelectedLocations }}>
      {children}
    </MyContext.Provider>
  );
};

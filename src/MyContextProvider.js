// MyContextProvider.js
// MyContextProvider.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [name, setName] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [groupId, setGroupId] = useState('');
  const [apiPlaces, setApiPlaces] = useState([]);
  const [apiPlacesClick, setApiPlacesClick] = useState(false);

  return (
    <MyContext.Provider value={{ name, setName, selectedLocations, 
    setSelectedLocations, searchAddress, setSearchAddress, selectedPlaces, setSelectedPlaces
    , groupId, setGroupId, apiPlaces, setApiPlaces, apiPlacesClick, setApiPlacesClick}}>
      {children}
    </MyContext.Provider>
  );
};

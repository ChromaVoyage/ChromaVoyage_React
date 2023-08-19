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
  const [clickLocationName, setClickLocationName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coloringLocationId, setColoringLocationId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [clickGroupId, setClickGroupId] = useState(-1);
  const [creategroup, setcreategroup] = useState([])
  const [mapDisplayMarker, setMapDisplayMarker] = useState([])
  const [isTab2_DSOpen, setIsTab2_DSOpen] = useState(false);
  const [activeGroupBoxIndex, setActiveGroupBoxIndex] = useState(-1);
  

  return (
    <MyContext.Provider value={{ name, setName, selectedLocations, 
    setSelectedLocations, searchAddress, setSearchAddress, selectedPlaces, setSelectedPlaces
    , groupId, setGroupId, apiPlaces, setApiPlaces, 
    apiPlacesClick, setApiPlacesClick, clickLocationName, 
    setClickLocationName, startDate, setStartDate , endDate, setEndDate,
    coloringLocationId, setColoringLocationId,
    locationId, setLocationId,
    clickGroupId, setClickGroupId,
    creategroup, setcreategroup,
    mapDisplayMarker, setMapDisplayMarker,
    isTab2_DSOpen, setIsTab2_DSOpen,
    activeGroupBoxIndex, setActiveGroupBoxIndex

    }}>
      {children}
    </MyContext.Provider>
  );
};

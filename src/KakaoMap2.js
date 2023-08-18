import React, { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from './MyContextProvider';

const { kakao } = window;

const KakaoMap2 = () => {
  const {
    selectedPlaces,
    setName,
    selectedLocations,
    setSelectedLocations,
    apiPlaces,
    setApiPlaces,
    apiPlacesClick,
    setApiPlacesClick,
    clickLocationName,
    setClickLocationName,
    clickGroupId,
    setClickGroupId,
    groupId, coloringLocationId, locationId,
    isTab2_DSOpen,
    activeGroupBoxIndex, setActiveGroupBoxIndex

  } = useContext(MyContext);

  const geojson = require('./TL_SCCO_SIG.json');
  const mapRef = useRef(null);
  const [selectedPolygons, setSelectedPolygons] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  useEffect(() => {
    // 그룹의 위치를 가져와서 apiPlaces 상태 업데이트
    const fetchData = async () => {
      try {
        const response = await fetch('/locations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 3, // 사용자 아이디를 적절히 설정해주세요
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setApiPlaces(data);
        } else {
          console.error('지역 데이터를 가져오는데 오류 발생:', response.status);
        }
      } catch (error) {
        console.error('지역 데이터를 가져오는데 오류 발생:', error);
      }
    };
  
    if (clickGroupId === -1 || activeGroupBoxIndex === -1 ) {
      fetchData();
    }
  }, [clickGroupId, activeGroupBoxIndex]);

  useEffect(() => {
    // 지도 초기화 및 폴리곤 표시
    const data = geojson.features;
    const mapContainer = document.getElementById('pollution-map');
    const mapOption = {
      center: new kakao.maps.LatLng(36.266826, 125.9786567),
      level: 13,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = map;
    const customOverlay = new kakao.maps.CustomOverlay({
      content: '<div class="area-tooltip"></div>',
      map: map,
      yAnchor: 1,
      zIndex: 2,
    });

    const displayArea = (coordinates, name, isApiPlace) => {
      const path = coordinates[0].map(
        (coordinate) => new kakao.maps.LatLng(coordinate[1], coordinate[0])
      );

      const polygon = new kakao.maps.Polygon({
        map: map,
        path: path,
        strokeWeight: 2,
        strokeColor: '#7A4495',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: isApiPlace ? '#7A4495' : '#fff',
        fillOpacity: 0.5,
      });

      let isTemporaryFilled = false;

      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        if (!isTemporaryFilled && !polygon.isFilled) {
          polygon.setOptions({ fillColor: '#09f' });
          isTemporaryFilled = true;
        }

        customOverlay.setContent('<div class="area-tooltip">' + name + '</div>');
        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        if (!polygon.isFilled && !selectedLocations.includes(name)) {
          polygon.setOptions({
            fillColor: isApiPlace ? '#7A4495' : '#fff',
          });
          isTemporaryFilled = false;
        }
        customOverlay.setMap(null);
      });

      kakao.maps.event.addListener(polygon, 'click', function () {
        if (!isApiPlace) {
          if (!polygon.isFilled) {
            polygon.setOptions({ fillColor: '#7A4495' });
            polygon.isFilled = true;
            console.log('선택한 지역:', name);
            setName(name);
            setSelectedLocations((prev) => [...prev, name]);

            if (isTab2_DSOpen) {
              // Tab2_DS가 열려 있고 clickLocationName이 null이 아닌 경우에 확대
              const bounds = new kakao.maps.LatLngBounds();
              path.forEach((point) => bounds.extend(point));
              mapRef.current.setBounds(bounds);
            }



          } else {
            polygon.setOptions({
              fillColor: selectedLocations.includes(name) ? '#7A4495' : '#fff',
            });
            polygon.isFilled = false;
            setSelectedLocations((prev) =>
              prev.filter((location) => location !== name)
            );
          }
        } else if (!polygon.isFilled) {
          setName(name);
          setSelectedLocations((prev) => [...prev, name]);
          polygon.isFilled = true;
          setApiPlacesClick(true);
          setClickLocationName(name);
        } else {
          polygon.isFilled = false;
          setSelectedLocations((prev) =>
            prev.filter((location) => location !== name)
          );
          setApiPlacesClick(true);
          setClickLocationName(name);
        }
      });

      polygon.isFilled = selectedLocations.includes(name);
      setSelectedPolygons((prev) => [...prev, { name, polygon }]);
    };

    data.forEach((val) => {
      const coordinates = val.geometry.coordinates;
      const name = val.properties.SIG_KOR_NM;
      const isApiPlace = apiPlaces.includes(name);
      displayArea(coordinates, name, isApiPlace);
    });
  }, [setName, setSelectedLocations, selectedPlaces, apiPlaces]);

  useEffect(() => {
    const displayGroupLocations = async () => {
      if (clickGroupId !== -1 && activeGroupBoxIndex !== -1) {
        setApiPlaces([]);
        try {
          const response = await fetch(`/locations/group?group_id=${clickGroupId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 3, // 사용자 ID에 맞게 변경해주세요
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            setSelectedPolygons((prevPolygons) => {
              if (prevPolygons === null) {
                return [];
              }
  
              const updatedPolygons = prevPolygons.map((item) => {
                const isYellow = data.includes(item.name);
                item.polygon.setOptions({
                  fillColor: isYellow ? '#7A4495' : (selectedLocations.includes(item.name) ? '#7A4495' : '#fff'),
                });
                
                return item;
              });
              return updatedPolygons;
            });
          } else {
            console.error('지역 데이터를 가져오는데 오류 발생:', response.status);
          }
        } catch (error) {
          console.error('지역 데이터를 가져오는데 오류 발생:', error);
        }
      }
    };
  
    displayGroupLocations();
  }, [clickGroupId, setSelectedPolygons, activeGroupBoxIndex]);


  useEffect(() => {
    // ...

    const displayMarkers = () => {
      selectedMarkers.forEach((marker) => {
        marker.setMap(null);
      });

      selectedPlaces.forEach((place) => {
        const { placeName, latitude, longitude } = place;
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(longitude, latitude),
          title: placeName,
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          console.log('선택한 장소:', marker.getTitle());
        });

        console.log(longitude, latitude);

        marker.setMap(mapRef.current);
        setSelectedMarkers((prev) => [...prev, marker]);
      });
    };

    displayMarkers();
  }, [selectedPlaces]);

  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <div id="pollution-map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default KakaoMap2;

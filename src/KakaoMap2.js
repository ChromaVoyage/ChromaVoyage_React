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
    setApiPlacesClick
  } = useContext(MyContext);

  const geojson = require('./TL_SCCO_SIG.json');
  const mapRef = useRef(null);
  const [selectedPolygons, setSelectedPolygons] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  useEffect(() => {
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
          } else {
            polygon.setOptions({
              fillColor: selectedLocations.includes(name) ? '#7A4495' : '#fff',
            });
            polygon.isFilled = false;
            setSelectedLocations((prev) =>
              prev.filter((location) => location !== name)
            );
          }
        }

        else if (!polygon.isFilled){
          setName(name);
          setSelectedLocations((prev) => [...prev, name]);
          polygon.isFilled = true;
          setApiPlacesClick(true);
        }

        else {
          polygon.isFilled = false;
            setSelectedLocations((prev) =>
              prev.filter((location) => location !== name)
            );
            setApiPlacesClick(true);

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
    const map = mapRef.current;
    if (!map) return;

    selectedPolygons.forEach((item) => {
      const { name, polygon } = item;
      const isApiPlace = apiPlaces.includes(name);
      polygon.setOptions({ fillColor: isApiPlace ? '#7A4495' : '#fff' });

      if (selectedLocations.includes(name)) {
        polygon.setOptions({ fillColor: '#7A4495' });
      }
    });
  }, [selectedLocations, selectedPolygons, apiPlaces]);

  useEffect(() => {
    selectedMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    const displayPlace = (address, x, y) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(y, x),
        title: address,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        console.log('선택한 장소:', marker.getTitle());
      });

      marker.setMap(mapRef.current);
      setSelectedMarkers((prev) => [...prev, marker]);
    };

    selectedPlaces.forEach((place) => {
      const { address, x, y } = place;
      displayPlace(address, x, y);
    });
  }, [selectedPlaces, selectedMarkers]);

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

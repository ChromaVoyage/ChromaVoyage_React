import React, { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from './MyContextProvider';

const { kakao } = window;

const KakaoMap2 = () => {
  const { selectedPlaces, setName, selectedLocations, setSelectedLocations, searchAddress } = useContext(MyContext);
  const geojson = require('./TL_SCCO_SIG.json'); // GeoJSON 데이터를 가져옵니다.
  const mapRef = useRef(null); // 지도를 담을 ref
  const [selectedPolygons, setSelectedPolygons] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]); // 선택된 다각형들을 관리할 상태

  const markerImageSrc = './user.png';
  const markerSize = new kakao.maps.Size(30, 30);
  const markerOffset = new kakao.maps.Point(15, 15);
 

  useEffect(() => {
    const data = geojson.features;
    const mapContainer = document.getElementById('pollution-map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(36.266826, 125.9786567), // 지도의 중심좌표
      level: 13, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = map; // mapRef에 map 객체 저장
    const customOverlay = new kakao.maps.CustomOverlay({
      content: '<div class="area-tooltip"></div>',
      map: map,
      yAnchor: 1,
      zIndex: 2,
    });

    
    const displayArea = (coordinates, name) => {
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
        fillColor: searchAddress === name ? '#7A4495' : '#fff', // 선택한 지역이면 색칠, 아니면 기본 색상
        fillOpacity: 0.5,
      });

      // 임시 색칠을 위한 변수
      let isTemporaryFilled = false;

      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 임시로 색칠합니다.
      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        if (!isTemporaryFilled && !polygon.isFilled) {
          polygon.setOptions({ fillColor: '#09f' });
          isTemporaryFilled = true;
        }
        customOverlay.setContent('<div class="area-tooltip">' + name + '</div>');
        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 임시 색칠을 초기화합니다.
      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        if (!polygon.isFilled) {
          polygon.setOptions({ fillColor: searchAddress === name ? '#7A4495' : '#fff' });
          isTemporaryFilled = false;
        }
        customOverlay.setMap(null);
      });

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 완전한 색으로 변경합니다.
      kakao.maps.event.addListener(polygon, 'click', function () {
        if (!polygon.isFilled) {
          polygon.setOptions({ fillColor: '#7A4495' });
          polygon.isFilled = true;
          console.log('선택한 지역:', name);
          setName(name);
          setSelectedLocations((prev) => [...prev, name]);
        } else {
          polygon.setOptions({ fillColor: searchAddress === name ? '#7A4495' : '#fff' });
          polygon.isFilled = false;
          setSelectedLocations((prev) => prev.filter((location) => location !== name));
        }
      });

      polygon.isFilled = selectedLocations.includes(name); // 선택된 지역인 경우에만 isFilled를 true로 설정
      setSelectedPolygons((prev) => [...prev, { name, polygon }]);
    };

    data.forEach((val) => {
      const coordinates = val.geometry.coordinates;
      const name = val.properties.SIG_KOR_NM;
      displayArea(coordinates, name);
    });
  }, [setName, setSelectedLocations, searchAddress, selectedPlaces]);

  useEffect(() => {
    // selectedLocations가 변경될 때마다 선택된 지역들을 색칠합니다.
    const map = mapRef.current;
    if (!map) return;

    // 모든 다각형의 색상을 원래 색으로 초기화합니다.
    selectedPolygons.forEach((item) => {
      const { name, polygon } = item;
      polygon.setOptions({ fillColor: searchAddress === name ? '#7A4495' : '#fff' });
    });

    // 선택된 지역들만 색칠합니다.
    selectedPolygons.forEach((item) => {
      const { name, polygon } = item;
      if (selectedLocations.includes(name)) {
        polygon.setOptions({ fillColor: '#7A4495' });
      }
    });

    


  }, [selectedLocations, selectedPolygons, searchAddress]);

  useEffect(() => {
    // 기존에 표시된 마커들을 모두 지도에서 제거하는 함수
    
    const displayPlace = (address, x, y) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(y, x),
        title: address // 장소의 주소를 마커의 타이틀로 설정
        // image: new kakao.maps.MarkerImage(markerImageSrc, markerSize, { offset: markerOffset }),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        console.log('선택한 장소:', marker.getTitle());
      });

      marker.setMap(mapRef.current);
      setSelectedMarkers((prev) => [...prev, marker]);
    };

    // 선택된 장소들의 마커를 표시하기 위해 기존에 표시된 마커들을 제거

    // 선택된 장소들의 마커를 표시
    selectedPlaces.forEach((place) => {
      const { address, x, y } = place;
      displayPlace(address, x, y);
    });
  }, [selectedPlaces, setSelectedMarkers]);

  return (
    <div style={{ display: 'flex', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
      <div id="pollution-map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default KakaoMap2;

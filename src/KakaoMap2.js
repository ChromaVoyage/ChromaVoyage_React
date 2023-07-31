import React, { useContext, useEffect } from 'react';
import { MyContext } from './MyContextProvider';

const { kakao } = window;

const KakaoMap2 = () => {
  const { setName, setSelectedLocations } = useContext(MyContext);
  const geojson = require('./TL_SCCO_SIG.json'); // GeoJSON 데이터를 가져옵니다.

  useEffect(() => {
    const data = geojson.features;

    const mapContainer = document.getElementById('pollution-map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(36.266826, 125.9786567), // 지도의 중심좌표
      level: 13, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({
      content: '<div class="area-tooltip"></div>',
      map: map,
      yAnchor: 1,
      zIndex: 2,
    });

    const displayArea = (coordinates, name) => {
      const path = coordinates[0].map((coordinate) => new kakao.maps.LatLng(coordinate[1], coordinate[0]));

      const polygon = new kakao.maps.Polygon({
        map: map,
        path: path,
        strokeWeight: 2,
        strokeColor: '#7A4495',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#fff',
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
          polygon.setOptions({ fillColor: '#fff' });
          isTemporaryFilled = false;
        }
        customOverlay.setMap(null);
      });

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 완전한 색으로 변경합니다.
      kakao.maps.event.addListener(polygon, 'click', function () {
        if (!polygon.isFilled) {
          polygon.setOptions({ fillColor: '#7A4495' });
          isTemporaryFilled = false;
          polygon.isFilled = true;
          console.log('선택한 지역:', name);
          setName(name);
          setSelectedLocations((prev) => [...prev, name]);
        } else {
          polygon.setOptions({ fillColor: '#fff' });
          isTemporaryFilled = false;
          polygon.isFilled = false;
          setSelectedLocations((prev) => prev.filter((location) => location !== name));
        }
      });
    };

    data.forEach((val) => {
      const coordinates = val.geometry.coordinates;
      const name = val.properties.SIG_KOR_NM;
      displayArea(coordinates, name);
    });
  }, [setName, setSelectedLocations]);

  return (
    <div style={{ display: 'flex', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
      <div id="pollution-map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default KakaoMap2;
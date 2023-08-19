import React, { useRef, useEffect } from 'react';

const { kakao } = window;

const SimpleKakaoMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // 지도 초기화 및 확대 설정
    const mapContainer = document.getElementById('simple-map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
      level:11, // 원하는 확대 레벨 설정
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = map;
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 530,
      }}
    >
      <div id="simple-map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default SimpleKakaoMap;
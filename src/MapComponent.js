import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Font Awesome 검색 아이콘 가져오기
import { MyContext } from "./MyContextProvider";


const MapComponent = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showResults, setShowResults] = useState(false); // 초기값을 false로 설정
  const { selectedPlaces, setSelectedPlaces } = useContext(MyContext);

 
  const {groupId, coloringLocationId, locationId} = useContext(MyContext);

  const handlePlaceClick = (index) => {
    // 이미 선택한 장소인지 확인
    const isAlreadySelected = selectedPlaces.some((place) => place.placename === searchResults[index].place_name);
    
    // 이미 선택한 장소라면 추가하지 않음
    if (!isAlreadySelected) {
      setSelectedPlace(index);
      setQuery(searchResults[index].place_name);
  
      const place = {
        coloringLocationId: coloringLocationId,
        groupId: groupId,
        locationId: locationId,
        placeName: searchResults[index].place_name,
        address: searchResults[index].address_name,
        latitude: searchResults[index].x,
        longitude: searchResults[index].y,
      };
  
      console.log(place);
  
      axios.post("/places/save", place)
        .then(response => {
            console.log("성공");
            setSelectedPlaces((prev) => [...prev, place]);
        })
        .catch(error => {
          // console.error("Error saving place:", error);
        });
    }
  };
  

  const handleClosePlace = (index) => {
    const selectedPlaceToDelete = selectedPlaces[index];
  
    // HTTP DELETE 요청 보내기
    axios.delete("/places/delete", {
      data: {
        coloringLocationId: selectedPlaceToDelete.coloringLocationId,
        placeName: selectedPlaceToDelete.placeName,
      },
    })
    .then(response => {
      console.log("장소 삭제 성공");
      setSelectedPlaces((prev) => prev.filter((_, i) => i !== index));
    })
    .catch(error => {
      console.error("Error deleting place:", error);
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
        {
          headers: {
            Authorization: "KakaoAK 62ad4e433b4604f6eaedd92a110b5550", // 발급받은 API 키로 대체
          },
        }
      );

      if (response.data.documents) {
        setSearchResults(response.data.documents);
        setShowResults(true); // 검색 결과가 있을 때에만 보여주도록 설정
      }
    } catch (error) {
      console.error("Error fetching data from Kakao API:", error);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  useEffect(() => {
    const fetchPlacesList = async () => {
      try {
        const response = await axios.get(
          `/places/list?group_id=${groupId}&coloring_location_id=${coloringLocationId}`
        );
  
        if (Array.isArray(response.data)) {
          setSelectedPlaces(response.data);
        }
      } catch (error) {
        console.error("Error fetching places list:", error);
        setSelectedPlaces([]); // 에러 발생 시에 빈 리스트로 초기화
      }
    };
  
    fetchPlacesList();
  }, [groupId, coloringLocationId]);

  return (
    <div className="map-container">
      <div className="search-input-container">
        <input
          type="text"
          className="mapsearchinput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      {showResults && (
        <div className="popup-container">
          <button className="close-button" onClick={handleCloseResults}>
            x
          </button>
          <div className="place-list">
                {searchResults.map((result, index) => (
                    <li
                    key={index}
                    className={index === selectedPlace ? "selected" : ""}
                    onClick={() => handlePlaceClick(index)}
                    style={{ fontSize: "12px", textAlign: 'left' }} // 원하는 크기로 조정
                    >
                    <strong>{result.place_name}</strong>
                    <br />
                    <span className="address-name" style={{ fontSize: "12px" }}>{result.address_name}</span>
                    </li>
                ))}
                </div>
        </div>
      )}
      <div className="selected-places">
        <ul className="no-bullet-list">
            {selectedPlaces.map((place, index) => (
            <li key={index} className="no-bullet">
                <div className="selected-place">
                <strong>{place.placeName}</strong>
                <button className="remove-button" onClick={() => handleClosePlace(index)}>x</button>
                </div>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
};

export default MapComponent;

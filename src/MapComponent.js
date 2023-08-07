import React, { useState, useContext } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Font Awesome 검색 아이콘 가져오기
import { MyContext } from "./MyContextProvider";

const MapComponent = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showResults, setShowResults] = useState(false); // 초기값을 false로 설정
  const { selectedPlaces, setSelectedPlaces } = useContext(MyContext);

  const handlePlaceClick = (index) => {
    setSelectedPlace(index);
    setQuery(searchResults[index].place_name);

    const place = {
      address: searchResults[index].place_name,
      x: searchResults[index].x,
      y: searchResults[index].y,
    };
    setSelectedPlaces((prev) => [...prev, place]);
  };

  const handleClosePlace = (index) => {
    setSelectedPlaces((prev) => prev.filter((_, i) => i !== index));
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
        <ul>
            {selectedPlaces.map((place, index) => (
            <li key={index}>
                <div className="selected-place">
                <strong>{place.address}</strong>
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

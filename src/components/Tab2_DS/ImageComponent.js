import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../../MyContextProvider';

function ImageComponent() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [tempSelectedImages, setTempSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달창 노출 여부
  const {groupId, coloringLocationId, locationId} = useContext(MyContext);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selectedImageArray = Array.from(files).map((file) => {
        const imageURL = URL.createObjectURL(file);
        const imageName = file.name;
        return { url: imageURL, name: imageName };
      });
      setTempSelectedImages((prevImages) => [...prevImages, ...selectedImageArray]);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
    setTempSelectedImages(selectedImages); // 탭에 있는 이미지들도 모달에 미리 표시
  };

  const handleModalClose = async () => {
    setShowModal(false);
  
    // 선택한 이미지 업로드
    for (const image of tempSelectedImages) {
      const formData = new FormData();
      formData.append("file", image);
      
      try {
        await axios.post(`/images/${coloringLocationId}?group_id=${groupId}&location_id=${locationId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
  
        console.log("이미지 업로드 성공");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  
    setSelectedImages(tempSelectedImages); // 모달에서 선택한 사진들을 탭에 추가
    setTempSelectedImages([]); // 임시 선택 사진 배열 초기화
  };

  const handleImageDelete = (index) => {
    const newTempImages = tempSelectedImages.slice();
    newTempImages.splice(index, 1);
    setTempSelectedImages(newTempImages);
  };

  return (
    <div>
      <div className="Tab2_DSItem"><b>이미지</b></div>
      <button onClick={handleModalOpen}>수정</button>

      <div className="image-list">
        {selectedImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.url} alt={`Uploaded ${index}`} />
            <p className="image-name">{image.name}</p>
          </div>
        ))}
      </div>

      {/* 모달창 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>이미지 선택</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} multiple />
            <div className="modal-image-list">
              {tempSelectedImages.map((image, index) => (
                <div key={index} className="modal-image-item">
                  <img src={image.url} alt={`Uploaded ${index}`} />
                  <p className="modal-image-name">{image.name}</p>
                  <button onClick={() => handleImageDelete(index)}>삭제</button>
                </div>
              ))}
            </div>
            <button onClick={handleModalClose}>완료</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageComponent;


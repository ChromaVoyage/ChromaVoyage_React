import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../../MyContextProvider';

function ImageComponent() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [tempSelectedImages, setTempSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달창 노출 여부
  const { groupId, coloringLocationId, locationId } = useContext(MyContext);

  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selectedImageArray = Array.from(files).map((file) => {
        const imageURL = URL.createObjectURL(file);
        const imageName = file.name;
        return { url: imageURL, name: imageName, file: file }; // 파일 데이터 추가
      });
      setTempSelectedImages((prevImages) => [...prevImages, ...selectedImageArray]);
  
      // 선택한 이미지 업로드
      for (const image of selectedImageArray) {
        const formData = new FormData();
        formData.append("file", image.file); // 파일 데이터 추가
  
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
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
    setTempSelectedImages(selectedImages);
  };

  const handleModalClose = async () => {
    setShowModal(false);
    setSelectedImages(tempSelectedImages);
    setTempSelectedImages([]);
  };

  const handleImageDelete = (index) => {
    const newTempImages = tempSelectedImages.slice();
    newTempImages.splice(index, 1);
    setTempSelectedImages(newTempImages);
  };

  return (
    <div className="image-component">
      <div className="tab-header">
        <div className="Tab2_DSItem"><b>이미지</b></div>
        <button className="edit-button" onClick={handleModalOpen}>수정</button>
      </div>

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
            <div className="modal-header">
              <h2 className="modal-title">이미지 선택</h2>
              <button className="modal-close" onClick={handleModalClose}>×</button>
            </div>
            {/* 모달창의 파일 선택 버튼 */}
            <div className="file-input-container">
              <label htmlFor="file-input" className="file-input-label">
                파일 선택
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                style={{ display: "none" }}
              />
            </div>

            <div className="modal-image-list">
              {tempSelectedImages.map((image, index) => (
                <div key={index} className="modal-image-item">
                  <img src={image.url} alt={`Uploaded ${index}`} />
                  <button className="modal-image-delete" onClick={() => handleImageDelete(index)}>×</button>
                  <p className="modal-image-name">{image.name}</p>
                </div>
              ))}
            </div>
            <button className="confirmodal"onClick={handleModalClose}>완료</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageComponent;
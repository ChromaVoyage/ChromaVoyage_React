import React, { useState } from 'react';

function ImageComponent() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [tempSelectedImages, setTempSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달창 노출 여부

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

  const handleModalClose = () => {
    setShowModal(false);
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


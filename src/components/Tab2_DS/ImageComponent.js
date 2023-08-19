import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { MyContext } from '../../MyContextProvider';

function ImageComponent() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [tempSelectedImages, setTempSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달창 노출 여부
  const { groupId, coloringLocationId, locationId } = useContext(MyContext);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    async function fetchSavedImages() {
      try {
        const queryParams = new URLSearchParams({
          group_id: groupId,
          location_id: locationId
        });
  
        const response = await axios.get(`/images/${coloringLocationId}?${queryParams.toString()}`);
        
        
        const selectedImageArray = response.data.map((image) => {
          const imageURL = image.image_path.trim(); // 이미지 경로에서 공백 제거
          const imageName = image.file_name;
          const imageId = image.imageId;
         
            
          return { url: imageURL, name: imageName, id: imageId };
        });

        

        setSelectedImages(selectedImageArray);
  
        setTempSelectedImages(selectedImageArray);
      } catch (error) {
        console.error("Error fetching saved images:", error);
        setSelectedImages([]);
  
        setTempSelectedImages([]);
      }
    }
  
    fetchSavedImages();
  }, [groupId, coloringLocationId, locationId, temp]);


  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selectedImageArray = Array.from(files).map((file) => {
        const imageURL = URL.createObjectURL(file);
        const imageName = file.name;
        return { url: imageURL, name: imageName, file: file };
      });
  
      // setTempSelectedImages((prevImages) => [...prevImages, ...selectedImageArray]);
      setTemp(selectedImageArray);
  
      // 선택한 이미지 업로드
      const formData = new FormData(); // FormData 객체를 한 번만 생성하도록 변경
  
      formData.append("group_id", groupId);
      formData.append("location_id", locationId);
  
      for (const image of selectedImageArray) {
        formData.append("images", image.file); // "images" 키로 이미지 파일 추가
      }
  
      try {
        const response = await axios.post(`/images/${coloringLocationId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("이미지 업로드 성공");
        console.log("응답 데이터:", response); // 응답 객체 출력
  
      } catch (error) {
        console.error("Error uploading image:", error);
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


  const handleImageDelete = async (imageId) => {
    console.log(imageId);  
    try {
      const queryParams = new URLSearchParams({
        group_id: groupId,
        location_id: locationId,
      });
  
      const requestData = {
        images: [
          { image_id: imageId.toString() }, // 삭제하고자 하는 이미지의 image_id를 넣어줍니다.
        ],
      };

      console.log(requestData)
  
      const response = await axios.delete(
        `/images/${coloringLocationId}?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: requestData, // 요청 본문을 바로 넣어줍니다.
        }
      );
  
      console.log(response);
  
      // 선택한 이미지 목록에서 삭제한 이미지를 제외합니다.
      const newSelectedImages = selectedImages.filter(
        (image) => image.id !== imageId
      );
      setSelectedImages(newSelectedImages);
  
      const newTempSelectedImages = tempSelectedImages.filter(
        (image) => image.id !== imageId
      );
      setTempSelectedImages(newTempSelectedImages);
  
      console.log("이미지 삭제 성공");
    } catch (error) {
      console.error("이미지 삭제 오류:", error);
    }
  };

  return (
    <div className="image-component">
      <div className="tab-header">
        <div className="Tab2_DSItem"><b>이미지</b></div>
        <button className="edit-button" onClick={handleModalOpen}>수정</button>
      </div>

      <div className="image-list">
  {selectedImages && selectedImages.length > 0
    ? selectedImages.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.url} alt={`Uploaded ${index}`} />
          <p className="image-name">{image.name}</p>
        </div>
      ))
    : <span className="Tab2Text"> 이미지를 업로드하세요 </span>
  }
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
                <button
                  className="modal-image-delete"
                  onClick={() => handleImageDelete(image.id)} // image_id를 전달하여 삭제 함수 호출
                >
                  ×
                </button>
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
import React, { useState } from 'react';

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        setUploading(true);

        const formData = new FormData();
        formData.append('image', selectedImage);

        const response = await fetch('/uploadImage', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={uploading || !selectedImage}>
        {uploading ? 'Uploading...' : 'Upload Image'}
        변경
      </button>
    </div>
  );
}

export default UploadImage;

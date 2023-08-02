import React, { useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';

const ImageUpload = () => {
  const inputRef = useRef();
  const [image, setImage] = useState('');

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };
  return (
    <>
      <div onClick={handleImageClick}>
        {image ? (
          <img src={image} alt="" />
        ) : (
          <MdCloudUpload color="#1475cf" size={30} width={75} height={75} />
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
};

export default ImageUpload;

import React, { useState, useEffect } from 'react';
import {
  fetchPhotos,
  openUploadWidget,
} from '../../services/cloudinary-service';
import {
  Image,
  CloudinaryContext,
} from 'cloudinary-react';

const List = () => {
  const [images, setImages] = useState([]);

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: 'dfyamkucg',
      tags: [tag, 'anImage'],
      uploadPreset: 'upload',
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if (photos.event === 'success') {
          setImages([...images, photos.info.public_id]);
        }
      } else {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    fetchPhotos('image', setImages);
  }, []);
  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <div className="App">
        <button onClick={() => beginUpload('image')}>Upload Image</button>
        <section>
          {images.map((i) => (
            <Image key={i} publicId={i} fetch-format="auto" quality="auto" />
          ))}
        </section>
      </div>
    </CloudinaryContext>
  );
};

export default List;

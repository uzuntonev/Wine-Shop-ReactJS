import React, { useState, useEffect, useContext } from 'react';
import { fetchPhotos } from '../../services/cloudinary-service';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { StoreContext } from '../../App/ContextStore';

const List = () => {
  const { images, setImages } = useContext(StoreContext);

console.log(images)
  // useEffect(() => {
  //   fetchPhotos('image', setImages);
  // }, []);

  return (
      <CloudinaryContext cloudName="dfyamkucg">
        <div className="App">
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

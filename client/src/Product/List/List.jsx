import React, { useState, useEffect, useContext } from 'react';
import { fetchPhotos } from '../../services/cloudinary-service';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { StoreContext } from '../../Store/Store';

const List = () => {
  // const { images, setImages } = useContext(StoreContext);
  const { state, dispatch } = useContext(StoreContext);


  // useEffect(() => {
  //   fetchPhotos('image', setImages);
  // }, []);

  return (
      <CloudinaryContext cloudName="dfyamkucg">
        <div className="App">
          <section>
            {state.images.map((i) => (
              <Image key={i} publicId={i} fetch-format="auto" quality="auto" />
            ))}
          </section>
        </div>
      </CloudinaryContext>
  );
};

export default List;

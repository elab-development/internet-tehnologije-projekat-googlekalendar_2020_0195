import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
 

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
          params: {
            query: 'office work',
            per_page: 10,
          },
          headers: {
            Authorization: 'Eq0BySeqgPkM9Mr53o34Ti539aCRZfg2EsxX7znxyRStBnbG7PyAhJ3E',   
          },
        });
        setImages(response.data.photos);
      } catch (error) {
        console.error('Error fetching images from Pexels', error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.src.medium} alt={image.alt} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;

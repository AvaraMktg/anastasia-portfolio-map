
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, Autoplay } from 'swiper/modules';
import { PropertyImage } from '@/lib/propertyData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface GalleryProps {
  images: PropertyImage[];
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, className = '' }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className={`property-gallery ${className}`}>
      {/* Main gallery */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs, Autoplay]}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="rounded-lg overflow-hidden shadow-lg mb-3 aspect-[4/3]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img 
                src={image.url} 
                alt={image.alt || 'Property image'} 
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={8}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        className="thumbnails-swiper"
        breakpoints={{
          0: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div className="relative h-16 md:h-20 rounded-md overflow-hidden">
              <img 
                src={image.url} 
                alt={image.alt || 'Property thumbnail'} 
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;

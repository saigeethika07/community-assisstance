import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const LandingSlideshow = () => {
  // Using images from your public/images/ folder
  const slides = [
    {
      id: 1,
      image: '/images/slide1.jpg',
      title: 'Help Elderly in Need',
      description: 'Provide care and companionship to senior citizens'
    },
    {
      id: 2,
      image: '/images/slide2.jpg',
      title: 'Support Local Children',
      description: 'Make a difference in a child\'s life through education'
    },
    {
      id: 3,
      image: '/images/slide3.jpg',
      title: 'Home Assistance Services',
      description: 'From cleaning to repairs, we\'ve got you covered'
    },
    {
      id: 4,
      image: '/images/slide4.jpg',
      title: 'Medical Support at Home',
      description: 'Professional medical assistance for your loved ones'
    },
    {
      id: 5,
      image: '/images/slide5.jpg',
      title: 'Tutoring for Success',
      description: 'Quality education support for students'
    },
    {
      id: 6,
      image: '/images/elderly-care.jpg',
      title: 'Elder Care Services',
      description: 'Compassionate care for elderly family members'
    },
    {
      id: 7,
      image: '/images/child-care.jpg',
      title: 'Child Care',
      description: 'Safe and nurturing care for your children'
    },
    {
      id: 8,
      image: '/images/cleaning.jpg',
      title: 'House Cleaning',
      description: 'Professional cleaning services for your home'
    }
  ];

  return (
    <div className="landing-slideshow-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="landing-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="landing-slide">
              <img src={slide.image} alt={slide.title} className="landing-slide-image" />
              <div className="landing-slide-overlay">
                <div className="landing-slide-content">
                  <h2 className="landing-slide-title">{slide.title}</h2>
                  <p className="landing-slide-description">{slide.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingSlideshow;
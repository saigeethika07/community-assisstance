import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Slideshow = () => {
  const slides = [
    {
      id: 1,
      image: '/images/elderly-care.jpg',
      title: 'Help Elderly in Need',
      description: 'Provide care and companionship to senior citizens in your community',
      buttonText: 'Join as Volunteer'
    },
    {
      id: 2,
      image: '/images/child-care.jpg',
      title: 'Support Local Children',
      description: 'Make a difference in a child\'s life through education and care',
      buttonText: 'Become a Mentor'
    },
    {
      id: 3,
      image: '/images/repair.jpg',
      title: 'Home Assistance Services',
      description: 'From cleaning to repairs, find trusted help for your home',
      buttonText: 'Find Help'
    },
    {
      id: 4,
      image: '/images/medical.jpg',
      title: 'Medical Support at Home',
      description: 'Professional medical assistance for your loved ones',
      buttonText: 'Request Service'
    },
    {
      id: 5,
      image: '/images/tutoring.jpg',
      title: 'Tutoring for Success',
      description: 'Quality education support for students of all ages',
      buttonText: 'Find Tutor'
    }
  ];

  return (
    <div className="slideshow-wrapper">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="slideshow-container"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-item">
              <img src={slide.image} alt={slide.title} className="slide-image" />
              <div className="slide-overlay">
                <div className="slide-content">
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                  <button className="slide-button">{slide.buttonText}</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;
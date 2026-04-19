import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import CategoryCard from '../components/CategoryCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../styles/Home.css';

const Home = ({ userData }) => {
  const navigate = useNavigate();

  const slides = [
    { id: 1, image: '/images/elderly-care.jpg', title: 'Elder Care Services', description: 'Compassionate care for senior citizens in your community' },
    { id: 2, image: '/images/child-care.jpg', title: 'Child Care Support', description: 'Safe and nurturing care for your little ones' },
    { id: 3, image: '/images/cleaning.jpg', title: 'House Cleaning', description: 'Professional cleaning services for your home' },
    { id: 4, image: '/images/repair.jpg', title: 'Home Repairs', description: 'Expert repairs and maintenance for your home' },
    { id: 5, image: '/images/tutoring.jpg', title: 'Tutoring Services', description: 'Quality education support for all subjects' },
    { id: 6, image: '/images/cooking.jpg', title: 'Cooking Help', description: 'Delicious home-cooked meals prepared with love' },
    { id: 7, image: '/images/medical.jpg', title: 'Medical Assistance', description: 'Health support and medication reminders' },
    { id: 8, image: '/images/grocery.jpg', title: 'Grocery Shopping', description: 'Fresh groceries delivered to your doorstep' }
  ];

  const categories = [
    { icon: '👴', title: 'Elder Care', description: 'Compassionate care and companionship for senior citizens', color: 'linear-gradient(135deg, #FF9933, #FFB347)', image: '/images/elderly-care.jpg' },
    { icon: '👶', title: 'Child Care', description: 'Safe and nurturing care for your little ones', color: 'linear-gradient(135deg, #10b981, #34d399)', image: '/images/child-care.jpg' },
    { icon: '🧹', title: 'House Cleaning', description: 'Professional cleaning services for your home', color: 'linear-gradient(135deg, #3b82f6, #60a5fa)', image: '/images/cleaning.jpg' },
    { icon: '🔧', title: 'House Repairs', description: 'Expert repairs and maintenance for your home', color: 'linear-gradient(135deg, #ef4444, #f87171)', image: '/images/repair.jpg' },
    { icon: '📚', title: 'Tutoring', description: 'Quality education support for all subjects', color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', image: '/images/tutoring.jpg' },
    { icon: '🍳', title: 'Cooking Help', description: 'Delicious home-cooked meals prepared with love', color: 'linear-gradient(135deg, #f59e0b, #fbbf24)', image: '/images/cooking.jpg' },
    { icon: '🏥', title: 'Medical Assistance', description: 'Health support and medication reminders', color: 'linear-gradient(135deg, #06b6d4, #22d3ee)', image: '/images/medical.jpg' },
    { icon: '🛒', title: 'Grocery Shopping', description: 'Fresh groceries delivered to your doorstep', color: 'linear-gradient(135deg, #84cc16, #a3e635)', image: '/images/grocery.jpg' }
  ];

  return (
    <div className="home-container">
      {/* Slideshow */}
      <div className="slideshow-wrapper">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="home-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="slide-item">
                <img src={slide.image} alt={slide.title} className="slide-image" />
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h2 className="slide-title">{slide.title}</h2>
                    <p className="slide-description">{slide.description}</p>
                    <button className="slide-button" onClick={() => navigate('/find-volunteers')}>Find Help Now →</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome{userData?.name ? `, ${userData.name}` : ''}!</h2>
        <p>Your community is here to help you. Find trusted volunteers for any assistance you need.</p>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-item"><h2>200+</h2><p>Active Volunteers</p></div>
          <div className="stat-item"><h2>1000+</h2><p>Services Completed</p></div>
          <div className="stat-item"><h2>15+</h2><p>Local Areas</p></div>
          <div className="stat-item"><h2>4.9</h2><p>Average Rating</p></div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <h2 className="section-title">What Help Do You Need?</h2>
        <p className="section-subtitle">Choose from a wide range of assistance categories</p>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
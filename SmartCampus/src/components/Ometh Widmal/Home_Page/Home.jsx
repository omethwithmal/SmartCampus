import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaFileAlt, FaQuestionCircle, FaVideo, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaPlus, FaRobot, FaChalkboard, FaFlask, FaChair, FaVideo as FaVideoCamera } from 'react-icons/fa';
import NavBar from "../NavBar/NavBar";
import Footer from "../footer/Footer";
import videoBg from '../../../assets/Hv.mp4';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFabMenu, setShowFabMenu] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: 'Pass Papers',
      description: 'Access past examination papers and model papers to enhance your preparation.',
      icon: FaFileAlt,
      path: '/passpapers',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'E-Books',
      description: 'Explore our collection of digital textbooks and study materials.',
      icon: FaBook,
      path: '/EBook',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Quizzes',
      description: 'Test your knowledge with interactive quizzes and assessments.',
      icon: FaQuestionCircle,
      path: '/quizzes',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Videos',
      description: 'Watch educational videos and tutorials to learn at your own pace.',
      icon: FaVideo,
      path: '/videos',
      color: 'from-red-500 to-red-600'
    }
  ];

  const resourceCategories = [
    {
      title: 'Lecture Halls',
      description: 'Book spacious lecture halls equipped with modern teaching facilities for your classes and seminars.',
      icon: FaChalkboard,
      path: '/resources/lecture-halls',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Labs',
      description: 'Access well-equipped science and computer labs for practical sessions and research work.',
      icon: FaFlask,
      path: '/resources/labs',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'Meeting Rooms',
      description: 'Reserve comfortable meeting rooms for group discussions, project meetings, and study sessions.',
      icon: FaChair,
      path: '/resources/meeting-rooms',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Equipment',
      description: 'Borrow professional equipment including projectors, cameras, audio systems, and more for your academic needs.',
      icon: FaVideoCamera,
      path: '/resources/equipment',
      color: 'from-rose-500 to-rose-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {isLoading ? (
        <div className="fixed inset-0 bg-gradient-to-br from-[#2800aa] to-[#8600b2] flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-white rounded-lg transform rotate-45"></div>
              <div className="absolute inset-0 bg-white rounded-lg transform -rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaBook className="w-16 h-16 text-[#2800aa]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">
              Welcome to Smart Campus
            </h2>
            <p className="text-white/80 animate-pulse">
              Opening your learning journey...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Floating Action Button */}
          <div className="fixed bottom-8 right-8 z-50">
            {/* Main FAB Button */}
            <button
              onClick={() => setShowFabMenu(!showFabMenu)}
              className="w-14 h-14 bg-gradient-to-r from-[#2800aa] to-[#8600b2] rounded-full shadow-lg flex items-center justify-center text-white relative z-10 hover:scale-110 transition-transform duration-200"
            >
              <div style={{ transform: `rotate(${showFabMenu ? 45 : 0}deg)`, transition: 'transform 0.3s' }}>
                <FaPlus className="w-6 h-6" />
              </div>
            </button>

            {/* FAB Menu - AI Chatbot */}
            {showFabMenu && (
              <div className="absolute bottom-16 right-0 animate-slideUp">
                <div className="bg-white rounded-2xl shadow-xl p-4 w-64">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#2800aa] to-[#8600b2] rounded-full flex items-center justify-center">
                      <FaRobot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Smart Campus AI</h3>
                      <p className="text-sm text-gray-500">Your Learning Assistant</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Ask me anything about your studies! I'm here to help you learn better.
                  </p>
                  <Link
                    to="/chat"
                    className="block w-full bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white text-center py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Start Chat
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Hero Section with Video Background */}
          <div className="relative h-[87vh]">
            <div className="absolute inset-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
              >
                <source src={videoBg} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2800aa]/70 to-[#8600b2]/70" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="text-center md:text-left order-2 md:order-1">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                      Welcome to Smart Campus
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8">
                      Your comprehensive platform for educational resources and interactive learning
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Link
                        to="/about"
                        className="inline-block bg-white text-[#2800aa] px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                      >
                        Learn More
                      </Link>
                      <Link
                        to="/chat"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
                      >
                        <FaRobot className="text-xl" />
                        Try Smart Campus GPT
                      </Link>
                    </div>
                  </div>

                  <div className="relative order-1 md:order-2">
                    <div className="relative w-full h-[300px] sm:h-[400px]">
                      {/* Dot Pattern Animation */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-white/40 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`
                            }}
                          />
                        ))}
                        {[...Array(15)].map((_, i) => (
                          <div
                            key={`small-${i}`}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animation: `floatSmall ${2 + Math.random() * 2}s infinite ease-in-out`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Explore Our Resources
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Access a wide range of educational materials to support your learning journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Link to={feature.path} key={feature.title} className="block h-full transform hover:-translate-y-1 transition-transform duration-300">
                    <div className={`bg-gradient-to-br ${feature.color} rounded-xl p-6 h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                      <div className="text-white mb-4">
                        <feature.icon className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/90 flex-grow">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Resource Categories Section */}
          <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Resource Categories
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#2800aa] to-[#8600b2] mx-auto mb-8"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Book available resources including lecture halls, labs, meeting rooms, and equipment for your academic needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {resourceCategories.map((category, index) => (
                  <Link to={category.path} key={category.title} className="block h-full transform hover:-translate-y-1 transition-transform duration-300">
                    <div className={`bg-gradient-to-br ${category.color} rounded-xl p-6 h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                      <div className="text-white mb-4">
                        <category.icon className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-white/90 flex-grow">
                        {category.description}
                      </p>
                      <div className="mt-4 text-white/80 text-sm font-medium">
                        Book Now →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div id="about" className="bg-gradient-to-br from-[#2800aa] to-[#8600b2] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  About Smart Campus
                </h2>
                <div className="w-24 h-1 bg-white/30 mx-auto mb-8"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Empowering Education Through Technology
                  </h3>
                  <p className="text-white/90 mb-6">
                    Smart Campus is dedicated to providing comprehensive educational resources and facility management to students across Sri Lanka. Our platform combines traditional learning materials with modern technology to create an engaging and effective learning experience.
                  </p>
                  <p className="text-white/90 mb-6">
                    We believe in making quality education accessible to everyone, regardless of their location or background. Our team of experienced educators and technology experts work together to create content that is both informative and engaging.
                  </p>
                  <Link
                    to="/about"
                    className="inline-block bg-white text-[#2800aa] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    Learn More About Us
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Years Experience', value: '10+' },
                    { title: 'Active Students', value: '50K+' },
                    { title: 'Resources', value: '1000+' },
                    { title: 'Expert Teachers', value: '100+' }
                  ].map((stat, index) => (
                    <div
                      key={stat.title}
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center border border-white/20"
                    >
                      <h4 className="text-3xl font-bold text-white mb-2">{stat.value}</h4>
                      <p className="text-white/80">{stat.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Contact Us
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#2800aa] to-[#8600b2] mx-auto mb-8"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: FaEnvelope,
                    title: 'Email Us',
                    content: 'info@smartcampus.lk',
                    link: 'mailto:info@smartcampus.lk'
                  },
                  {
                    icon: FaPhone,
                    title: 'Call Us',
                    content: '+94 11 234 5678',
                    link: 'tel:+94112345678'
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: 'Visit Us',
                    content: '123 Education Street, Colombo 03, Sri Lanka',
                    link: 'https://maps.google.com'
                  }
                ].map((contact, index) => (
                  <div
                    key={contact.title}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                  >
                    <div className="text-[#2800aa] mb-4 flex justify-center">
                      <contact.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
                    <a
                      href={contact.link}
                      className="text-gray-600 hover:text-[#2800aa] transition-colors duration-300"
                    >
                      {contact.content}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                <div className="flex justify-center space-x-6">
                  {[
                    { icon: FaFacebook, link: 'https://facebook.com' },
                    { icon: FaTwitter, link: 'https://twitter.com' },
                    { icon: FaInstagram, link: 'https://instagram.com' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#2800aa] transition-colors duration-300"
                    >
                      <social.icon className="h-8 w-8" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-gradient-to-br from-[#2800aa] to-[#8600b2] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Share Your Feedback
                </h2>
                <div className="w-24 h-1 bg-white/30 mx-auto mb-8"></div>
                <p className="text-white/90 max-w-2xl mx-auto">
                  Your feedback helps us improve and provide better educational resources. Share your thoughts with us!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Feedback Form */}
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="feedback" className="block text-white mb-2">Feedback</label>
                      <textarea
                        id="feedback"
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Share your thoughts..."
                      ></textarea>
                    </div>
                    <button
                      className="w-full bg-white text-[#2800aa] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      Submit Feedback
                    </button>
                  </form>
                </div>

                {/* Testimonials */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Kamal Perera",
                      role: "Grade 10 Student",
                      text: "Smart Campus has been a great help in my studies. The past papers and quizzes are very useful for exam preparation."
                    },
                    {
                      name: "Nimali Fernando",
                      role: "Parent",
                      text: "My children love using this platform. The educational videos are engaging and the content is well-organized."
                    },
                    {
                      name: "Sunil De Silva",
                      role: "Teacher",
                      text: "As an educator, I find this platform very valuable. The resources are comprehensive and the interface is user-friendly."
                    }
                  ].map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                    >
                      <p className="text-white/90 mb-4">"{testimonial.text}"</p>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-white/70 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.5);
            opacity: 0.8;
          }
        }
        
        @keyframes floatSmall {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-15px) scale(1.3);
            opacity: 0.6;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
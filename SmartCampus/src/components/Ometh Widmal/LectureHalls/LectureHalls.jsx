import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaChalkboard, FaUsers, FaMapMarkerAlt, FaSnowflake, FaVideo, 
  FaChalkboardTeacher, FaVolumeUp, FaCheckCircle, FaTimesCircle, 
  FaSearch, FaStar, FaStarHalfAlt, FaCalendarAlt, FaClock, 
  FaWifi, FaDesktop, FaMicrophone, FaLightbulb, FaChair, 
  FaWindowMaximize, FaThermometerHalf, FaPlug, FaRegBuilding,
  FaBookmark, FaShare, FaInfoCircle, FaArrowRight
} from 'react-icons/fa';
import { MdOutlineMeetingRoom, MdOutlineScreenShare } from 'react-icons/md';
import { GiWhiteBook } from 'react-icons/gi';
import NavBar from "../NavBar/NavBar";
import Footer from "../footer/Footer";

const LectureHalls = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState('all');

  const lectureHalls = [
    {
      id: 1,
      name: 'Hall A',
      type: 'LECTURE_HALL',
      capacity: 200,
      location: 'Main Building, 2nd Floor',
      status: 'AVAILABLE',
      rating: 4.8,
      reviews: 124,
      coverImage: 'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: true,
        wifi: true,
        smartBoard: true,
        recordingSystem: true,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true
      },
      description: 'State-of-the-art lecture hall equipped with modern technology, perfect for large classes and seminars. Features excellent acoustics and comfortable seating arrangements.',
      timeSlots: [
        { day: 'Monday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Tuesday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Wednesday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Thursday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Friday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] }
      ]
    },
    {
      id: 2,
      name: 'Hall B',
      type: 'LECTURE_HALL',
      capacity: 150,
      location: 'Science Building, 1st Floor',
      status: 'BOOKED',
      rating: 4.6,
      reviews: 98,
      coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: false,
        wifi: true,
        smartBoard: false,
        recordingSystem: false,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true
      },
      description: 'Modern lecture hall ideal for interactive sessions and group discussions. Well-lit with comfortable seating and excellent viewing angles.',
      timeSlots: [
        { day: 'Monday', slots: ['08:00 - 10:00', '13:00 - 15:00'] },
        { day: 'Tuesday', slots: ['10:00 - 12:00', '15:00 - 17:00'] },
        { day: 'Wednesday', slots: ['08:00 - 10:00', '13:00 - 15:00'] },
        { day: 'Thursday', slots: ['10:00 - 12:00', '15:00 - 17:00'] },
        { day: 'Friday', slots: ['08:00 - 10:00'] }
      ]
    },
    {
      id: 3,
      name: 'Hall C',
      type: 'SEMINAR_HALL',
      capacity: 80,
      location: 'Arts Building, Ground Floor',
      status: 'AVAILABLE',
      rating: 4.9,
      reviews: 156,
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: true,
        wifi: true,
        smartBoard: true,
        recordingSystem: true,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true
      },
      description: 'Premium seminar hall with cutting-edge audio-visual equipment. Perfect for workshops, presentations, and small group sessions.',
      timeSlots: [
        { day: 'Monday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Tuesday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Wednesday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Thursday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Friday', slots: ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'] }
      ]
    },
    {
      id: 4,
      name: 'Hall D',
      type: 'LECTURE_HALL',
      capacity: 300,
      location: 'Engineering Building, 3rd Floor',
      status: 'AVAILABLE',
      rating: 4.7,
      reviews: 112,
      coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: true,
        wifi: true,
        smartBoard: false,
        recordingSystem: true,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true
      },
      description: 'Spacious auditorium-style lecture hall designed for maximum comfort and visibility. Ideal for large classes, conferences, and special events.',
      timeSlots: [
        { day: 'Monday', slots: ['13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Tuesday', slots: ['08:00 - 10:00', '13:00 - 15:00'] },
        { day: 'Wednesday', slots: ['10:00 - 12:00', '15:00 - 17:00'] },
        { day: 'Thursday', slots: ['08:00 - 10:00', '13:00 - 15:00'] },
        { day: 'Friday', slots: ['10:00 - 12:00', '15:00 - 17:00'] }
      ]
    }
  ];

  const filteredHalls = lectureHalls.filter(hall => {
    const matchesSearch = hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hall.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || hall.type === selectedType;
    const matchesCapacity = selectedCapacity === 'all' || 
                           (selectedCapacity === 'small' && hall.capacity <= 100) ||
                           (selectedCapacity === 'medium' && hall.capacity > 100 && hall.capacity <= 200) ||
                           (selectedCapacity === 'large' && hall.capacity > 200);
    
    let matchesFacility = true;
    if (selectedFacility !== 'all') {
      matchesFacility = hall.facilities[selectedFacility];
    }
    
    return matchesSearch && matchesType && matchesCapacity && matchesFacility;
  });

  const handleBookNow = (hall) => {
    // Navigate to booking page with hall data
    navigate('/booking', { state: { hall } });
  };

  const getFacilityIcon = (facility) => {
    const icons = {
      airConditioning: <FaSnowflake className="text-blue-500" />,
      projector: <FaVideo className="text-purple-500" />,
      whiteboard: <GiWhiteBook className="text-green-500" />,
      soundSystem: <FaVolumeUp className="text-orange-500" />,
      wifi: <FaWifi className="text-indigo-500" />,
      smartBoard: <MdOutlineScreenShare className="text-pink-500" />,
      recordingSystem: <FaVideo className="text-red-500" />,
      lighting: <FaLightbulb className="text-yellow-500" />,
      powerOutlets: <FaPlug className="text-gray-500" />,
      comfortableSeating: <FaChair className="text-teal-500" />
    };
    return icons[facility] || null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      
      {/* Hero Section with Online Cover Image */}
      <div className="relative h-[450px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2800aa]/90 to-[#8600b2]/90"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="flex justify-center mb-6 animate-bounce">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                <MdOutlineMeetingRoom className="text-6xl" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInDown">
              Lecture Halls
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp">
              Discover and book premium lecture halls equipped with world-class facilities
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative group">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2800aa] transition-colors" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent transition-all"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent cursor-pointer hover:border-[#2800aa] transition-colors"
            >
              <option value="all">All Types</option>
              <option value="LECTURE_HALL">Lecture Hall</option>
              <option value="SEMINAR_HALL">Seminar Hall</option>
            </select>
            
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent cursor-pointer hover:border-[#2800aa] transition-colors"
            >
              <option value="all">All Capacities</option>
              <option value="small">Small (≤ 100)</option>
              <option value="medium">Medium (101-200)</option>
              <option value="large">Large (200+)</option>
            </select>
            
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent cursor-pointer hover:border-[#2800aa] transition-colors"
            >
              <option value="all">All Facilities</option>
              <option value="airConditioning">Air Conditioning</option>
              <option value="projector">Projector</option>
              <option value="whiteboard">Whiteboard</option>
              <option value="soundSystem">Sound System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Halls Grid */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHalls.map((hall, index) => (
              <div 
                key={hall.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Card Header with Cover Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={hall.coverImage} 
                    alt={hall.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg ${
                      hall.status === 'AVAILABLE' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {hall.status === 'AVAILABLE' ? (
                        <><FaCheckCircle className="text-sm" /> Available</>
                      ) : (
                        <><FaTimesCircle className="text-sm" /> Booked</>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-white font-semibold text-sm">{hall.rating}</span>
                      <span className="text-white/80 text-xs">({hall.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Hall Name Overlay */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full">
                      <span className="font-bold text-[#2800aa] text-lg">{hall.name}</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MdOutlineMeetingRoom className="text-xs" />
                      {hall.type.replace('_', ' ')}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">Capacity: <strong className="text-gray-900">{hall.capacity}</strong> students</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">{hall.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaClock className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">Available: Mon-Fri, 8:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                  
                  {/* Facilities Grid */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Premium Facilities</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(hall.facilities).slice(0, 6).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5">
                            {getFacilityIcon(key)}
                            <span className="capitalize">
                              {key === 'airConditioning' ? 'AC' : 
                               key === 'soundSystem' ? 'Sound' :
                               key === 'smartBoard' ? 'Smart Board' :
                               key === 'recordingSystem' ? 'Recording' :
                               key === 'powerOutlets' ? 'Power' :
                               key === 'comfortableSeating' ? 'Seating' :
                               key}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                    {hall.description}
                  </p>
                  
                  <button
                    onClick={() => handleBookNow(hall)}
                    disabled={hall.status === 'BOOKED'}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      hall.status === 'AVAILABLE'
                        ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {hall.status === 'AVAILABLE' ? (
                      <>Book Now <FaArrowRight className="text-sm" /></>
                    ) : (
                      <>Currently Unavailable</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredHalls.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No lecture halls found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedCapacity('all');
                    setSelectedFacility('all');
                  }}
                  className="mt-4 text-[#2800aa] hover:text-[#8600b2] font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LectureHalls;
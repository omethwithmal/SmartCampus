import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaArrowRight, FaCheckCircle, FaTimesCircle, 
  FaStar, FaMapMarkerAlt, FaBoxes, FaClipboardList,
  FaProjectDiagram, FaVideo, FaMicrophone, FaLaptop, FaVolumeUp,
  FaInfoCircle, FaPlus, FaMinus, FaShoppingCart, FaEye,
  FaCog, FaCalendarAlt, FaFilter, FaThLarge, FaList
} from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';
import NavBar from "../NavBar/NavBar";
import Footer from "../footer/Footer";

const Equipment = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingQuantity, setBookingQuantity] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'Projector', name: 'Projector', icon: <FaProjectDiagram className="text-4xl" />, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', count: 15 },
    { id: 'Camera', name: 'Camera', icon: <FaCamera className="text-4xl" />, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', count: 18 },
    { id: 'Microphone', name: 'Microphone', icon: <FaMicrophone className="text-4xl" />, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50', count: 20 },
    { id: 'Laptop', name: 'Laptop', icon: <FaLaptop className="text-4xl" />, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', count: 25 },
    { id: 'Speaker', name: 'Speaker', icon: <FaVolumeUp className="text-4xl" />, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', count: 12 }
  ];

  const equipmentData = {
    Projector: [
      {
        id: 1,
        name: 'Epson Projector X500',
        category: 'Projector',
        quantity: { total: 15, available: 8, booked: 5, maintenance: 2 },
        location: 'Main Store, Building A',
        status: 'AVAILABLE',
        rating: 4.8,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { resolution: '1080p Full HD', brightness: '3500 Lumens', connectivity: 'HDMI, VGA, USB' },
        description: 'High-quality portable projector perfect for presentations and lectures.'
      },
      {
        id: 2,
        name: 'BenQ Smart Projector',
        category: 'Projector',
        quantity: { total: 10, available: 6, booked: 3, maintenance: 1 },
        location: 'AV Room, Building B',
        status: 'AVAILABLE',
        rating: 4.9,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1593789823392-2b0d7f16a0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { resolution: '4K UHD', brightness: '3000 Lumens', connectivity: 'Wireless, HDMI, USB-C' },
        description: 'Smart projector with wireless connectivity and built-in streaming apps.'
      },
      {
        id: 3,
        name: 'Sony Portable Projector',
        category: 'Projector',
        quantity: { total: 8, available: 4, booked: 3, maintenance: 1 },
        location: 'Media Store, Building C',
        status: 'AVAILABLE',
        rating: 4.7,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { resolution: '1080p', brightness: '2500 Lumens', connectivity: 'HDMI, USB, Bluetooth' },
        description: 'Compact portable projector ideal for business presentations.'
      }
    ],
    Camera: [
      {
        id: 4,
        name: 'Logitech Conference Cam',
        category: 'Camera',
        quantity: { total: 10, available: 6, booked: 3, maintenance: 1 },
        location: 'AV Room, Building B',
        status: 'AVAILABLE',
        rating: 4.7,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { resolution: '4K Ultra HD', zoom: '5x Digital', connectivity: 'USB-C, Bluetooth' },
        description: 'Professional 4K conference camera with auto-framing technology.'
      },
      {
        id: 5,
        name: 'Sony 4K Camera',
        category: 'Camera',
        quantity: { total: 8, available: 5, booked: 2, maintenance: 1 },
        location: 'Media Store, Building E',
        status: 'AVAILABLE',
        rating: 4.9,
        reviews: 198,
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { resolution: '4K UHD', sensor: 'Full-frame', video: '4K 60fps' },
        description: 'Professional 4K camera for recording lectures and events.'
      },
      {
        id: 6,
        name: 'Canon DSLR Camera',
        category: 'Camera',
        quantity: { total: 12, available: 8, booked: 3, maintenance: 1 },
        location: 'Photography Studio, Building D',
        status: 'AVAILABLE',
        rating: 4.8,
        reviews: 267,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { resolution: '24.1 MP', sensor: 'APS-C', video: '1080p 60fps' },
        description: 'High-quality DSLR camera for photography and video recording.'
      }
    ],
    Microphone: [
      {
        id: 7,
        name: 'Shure Wireless Mic',
        category: 'Microphone',
        quantity: { total: 20, available: 12, booked: 6, maintenance: 2 },
        location: 'Audio Store, Building C',
        status: 'AVAILABLE',
        rating: 4.9,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { type: 'Wireless Lavalier', range: '100 meters', batteryLife: '8 hours' },
        description: 'Professional wireless microphone system for lectures and events.'
      },
      {
        id: 8,
        name: 'Blue Yeti USB Mic',
        category: 'Microphone',
        quantity: { total: 15, available: 10, booked: 4, maintenance: 1 },
        location: 'Recording Studio, Building B',
        status: 'AVAILABLE',
        rating: 4.8,
        reviews: 456,
        image: 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { type: 'USB Condenser', patterns: 'Cardioid, Stereo', connectivity: 'USB' },
        description: 'High-quality USB microphone perfect for podcasting and recording.'
      },
      {
        id: 9,
        name: 'Rode Wireless GO',
        category: 'Microphone',
        quantity: { total: 10, available: 7, booked: 2, maintenance: 1 },
        location: 'Audio Store, Building C',
        status: 'AVAILABLE',
        rating: 4.9,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { type: 'Compact Wireless', range: '70 meters', batteryLife: '7 hours' },
        description: 'Ultra-compact wireless microphone system for content creators.'
      }
    ],
    Laptop: [
      {
        id: 10,
        name: 'Dell XPS Laptop',
        category: 'Laptop',
        quantity: { total: 25, available: 15, booked: 8, maintenance: 2 },
        location: 'IT Store, Building D',
        status: 'AVAILABLE',
        rating: 4.9,
        reviews: 456,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { processor: 'Intel Core i7', ram: '16GB', storage: '512GB SSD' },
        description: 'High-performance laptop for presentations and development tasks.'
      },
      {
        id: 11,
        name: 'MacBook Pro',
        category: 'Laptop',
        quantity: { total: 15, available: 9, booked: 5, maintenance: 1 },
        location: 'Creative Studio, Building E',
        status: 'AVAILABLE',
        rating: 5.0,
        reviews: 389,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { processor: 'Apple M2', ram: '16GB', storage: '512GB SSD' },
        description: 'Powerful MacBook Pro for creative professionals and developers.'
      },
      {
        id: 12,
        name: 'HP Spectre',
        category: 'Laptop',
        quantity: { total: 12, available: 8, booked: 3, maintenance: 1 },
        location: 'IT Store, Building D',
        status: 'AVAILABLE',
        rating: 4.7,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { processor: 'Intel Core i7', ram: '16GB', storage: '1TB SSD' },
        description: 'Premium ultrabook with stunning display and long battery life.'
      }
    ],
    Speaker: [
      {
        id: 13,
        name: 'JBL Professional Speaker',
        category: 'Speaker',
        quantity: { total: 12, available: 7, booked: 4, maintenance: 1 },
        location: 'Audio Store, Building C',
        status: 'AVAILABLE',
        rating: 4.8,
        reviews: 278,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { power: '200W RMS', connectivity: 'Bluetooth 5.0', battery: '12 hours' },
        description: 'Portable powerful speaker with excellent sound quality.'
      },
      {
        id: 14,
        name: 'Bose SoundLink',
        category: 'Speaker',
        quantity: { total: 10, available: 6, booked: 3, maintenance: 1 },
        location: 'Audio Store, Building C',
        status: 'AVAILABLE',
        rating: 4.9,
        reviews: 345,
        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { power: '50W', connectivity: 'Bluetooth, AUX', battery: '15 hours' },
        description: 'Premium portable speaker with exceptional clarity and bass.'
      },
      {
        id: 15,
        name: 'Sony Party Speaker',
        category: 'Speaker',
        quantity: { total: 8, available: 5, booked: 2, maintenance: 1 },
        location: 'Event Store, Building A',
        status: 'AVAILABLE',
        rating: 4.7,
        reviews: 198,
        image: 'https://images.unsplash.com/photo-1563089145-5990f5b3b8e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        specifications: { power: '300W', connectivity: 'Bluetooth, USB', features: 'LED lights' },
        description: 'High-power party speaker with LED light show.'
      }
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedEquipment(null);
  };

  const handleBookNow = (equipment) => {
    setSelectedEquipment(equipment);
    setBookingQuantity(1);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (selectedEquipment && bookingQuantity <= selectedEquipment.quantity.available) {
      alert(`✅ Booking Confirmed!\n\nEquipment: ${selectedEquipment.name}\nQuantity: ${bookingQuantity}\n\nPlease visit the location to collect your equipment.`);
      setShowBookingModal(false);
      setBookingQuantity(1);
      setSelectedEquipment(null);
    } else {
      alert(`❌ Only ${selectedEquipment?.quantity.available} units available!`);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'AVAILABLE') {
      return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaCheckCircle className="text-xs" /> Available</span>;
    }
    return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaTimesCircle className="text-xs" /> Booked</span>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
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
                <FaBoxes className="text-6xl" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInDown">
              Equipment Rental
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp">
              Browse and book professional equipment for your events and presentations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories Section - Show only when no category selected */}
          {!selectedCategory && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Equipment Category</h2>
                <p className="text-gray-600">Select a category to browse available equipment</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all`}>
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-4 bg-white/20 rounded-full backdrop-blur-sm">
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                        <p className="text-white/80 text-sm">{category.count} items available</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Equipment List Section - Show when category selected */}
          {selectedCategory && (
            <>
              {/* Header with back button */}
              <div className="mb-8">
                <button
                  onClick={handleBackToCategories}
                  className="mb-6 flex items-center gap-2 text-[#2800aa] hover:text-[#8600b2] font-semibold"
                >
                  ← Back to Categories
                </button>
                
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedCategory}</h2>
                    <p className="text-gray-600 mt-1">Browse and book available {selectedCategory.toLowerCase()} equipment</p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${selectedCategory}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Equipment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipmentData[selectedCategory]
                  ?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          {getStatusBadge(item.status)}
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span className="text-white text-xs font-semibold">{item.rating}</span>
                            <span className="text-white/70 text-xs">({item.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaBoxes className="text-[#2800aa] text-xs" />
                            <span>Available: <strong className="text-green-600">{item.quantity.available}</strong> / {item.quantity.total} units</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaMapMarkerAlt className="text-[#2800aa] text-xs" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCog className="text-[#2800aa] text-xs" />
                            <span>{item.specifications.resolution || item.specifications.processor || item.specifications.type || item.specifications.power}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <button
                          onClick={() => handleBookNow(item)}
                          disabled={item.status !== 'AVAILABLE' || item.quantity.available === 0}
                          className={`w-full py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                            item.status === 'AVAILABLE' && item.quantity.available > 0
                              ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white hover:shadow-lg transform hover:scale-105'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {item.status === 'AVAILABLE' && item.quantity.available > 0 ? (
                            <>Book Now <FaArrowRight className="text-sm" /></>
                          ) : (
                            <>Currently Unavailable</>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {equipmentData[selectedCategory]?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                    <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No {selectedCategory.toLowerCase()} found matching your search.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Book {selectedEquipment.name}</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <p className="text-sm text-gray-700 flex items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-[#2800aa]" /> {selectedEquipment.location}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <FaBoxes className="text-[#2800aa]" /> Available: {selectedEquipment.quantity.available} units
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaBoxes className="text-[#2800aa]" /> Select Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBookingQuantity(Math.max(1, bookingQuantity - 1))}
                    className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    value={bookingQuantity}
                    onChange={(e) => setBookingQuantity(Math.min(selectedEquipment.quantity.available, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-20 text-center px-2 py-1 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={() => setBookingQuantity(Math.min(selectedEquipment.quantity.available, bookingQuantity + 1))}
                    className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Max: {selectedEquipment.quantity.available} units
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
      
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
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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
        
        .animate-bounce {
          animation: bounce 2s infinite;
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

export default Equipment;
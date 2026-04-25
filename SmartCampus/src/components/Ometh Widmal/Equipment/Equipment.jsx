import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaArrowRight, FaCheckCircle, FaTimesCircle, 
  FaStar, FaMapMarkerAlt, FaBoxes, FaClipboardList,
  FaProjectDiagram, FaVideo, FaMicrophone, FaLaptop, FaVolumeUp,
  FaInfoCircle, FaPlus, FaMinus, FaShoppingCart, FaEye,
  FaCog, FaCalendarAlt, FaFilter, FaThLarge, FaList,
  FaSpinner
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
  const [loading, setLoading] = useState(false);
  const [equipmentData, setEquipmentData] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [popupMessage, setPopupMessage] = useState({ show: false, message: '', type: '' });

  // API Base URL
  const API_BASE_URL = 'http://localhost:8080/api/equipment';

  // Show popup message
  const showPopup = (message, type = 'success') => {
    setPopupMessage({ show: true, message, type });
    setTimeout(() => {
      setPopupMessage({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Fetch all equipment from backend
  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        organizeEquipmentByCategory(data);
      } else {
        showPopup('Failed to fetch equipment', 'error');
      }
    } catch (error) {
      console.error('Error fetching equipment:', error);
      showPopup('Cannot connect to backend server', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Organize equipment by category
  const organizeEquipmentByCategory = (equipmentList) => {
    const organized = {};
    const counts = {};
    
    equipmentList.forEach(item => {
      const category = item.category;
      if (!organized[category]) {
        organized[category] = [];
      }
      organized[category].push(item);
      
      // Count available items per category
      if (!counts[category]) {
        counts[category] = 0;
      }
      if (item.status === 'AVAILABLE') {
        counts[category]++;
      }
    });
    
    setEquipmentData(organized);
    setCategoryCounts(counts);
    
    // Update categories list
    const categoryList = Object.keys(organized).map(cat => ({
      id: cat,
      name: cat,
      icon: getCategoryIcon(cat),
      color: getCategoryColor(cat),
      bgColor: getCategoryBgColor(cat),
      count: counts[cat] || 0
    }));
    setCategories(categoryList);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Projector': return <FaProjectDiagram className="text-4xl" />;
      case 'Camera': return <FaCamera className="text-4xl" />;
      case 'Microphone': return <FaMicrophone className="text-4xl" />;
      case 'Laptop': return <FaLaptop className="text-4xl" />;
      case 'Speaker': return <FaVolumeUp className="text-4xl" />;
      default: return <FaBoxes className="text-4xl" />;
    }
  };

  // Get category color gradient
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Projector': return 'from-purple-500 to-pink-500';
      case 'Camera': return 'from-blue-500 to-cyan-500';
      case 'Microphone': return 'from-pink-500 to-rose-500';
      case 'Laptop': return 'from-green-500 to-emerald-500';
      case 'Speaker': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  // Get category background color
  const getCategoryBgColor = (category) => {
    switch(category) {
      case 'Projector': return 'bg-purple-50';
      case 'Camera': return 'bg-blue-50';
      case 'Microphone': return 'bg-pink-50';
      case 'Laptop': return 'bg-green-50';
      case 'Speaker': return 'bg-orange-50';
      default: return 'bg-gray-50';
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedEquipment(null);
  };

  const handleBookNow = (equipment) => {
    if (equipment.status !== 'AVAILABLE') {
      showPopup('This equipment is not available for booking', 'warning');
      return;
    }
    setSelectedEquipment(equipment);
    setBookingQuantity(1);
    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    if (!selectedEquipment) return;
    
    setLoading(true);
    try {
      // Update equipment status to Booked
      const response = await fetch(`${API_BASE_URL}/${selectedEquipment.id}/status?status=Booked`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        showPopup(`✅ Booking Confirmed!\n\nEquipment: ${selectedEquipment.name}\nQuantity: ${bookingQuantity}\n\nThank you for booking with us!`, 'success');
        setShowBookingModal(false);
        setBookingQuantity(1);
        setSelectedEquipment(null);
        // Refresh equipment list
        fetchEquipment();
      } else {
        showPopup('Booking failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error booking equipment:', error);
      showPopup('Cannot connect to backend server', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'AVAILABLE') {
      return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaCheckCircle className="text-xs" /> Available</span>;
    }
    return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaTimesCircle className="text-xs" /> Booked</span>;
  };

  // Get equipment for selected category with search filter
  const getFilteredEquipment = () => {
    if (!selectedCategory || !equipmentData[selectedCategory]) return [];
    return equipmentData[selectedCategory].filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      
      {/* Popup Message */}
      {popupMessage.show && (
        <div className="fixed top-5 right-5 z-50 animate-slide-in-right">
          <div className={`
            flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg
            ${popupMessage.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${popupMessage.type === 'warning' ? 'bg-amber-500 text-white' : ''}
            ${popupMessage.type === 'error' ? 'bg-red-500 text-white' : ''}
            min-w-[300px] max-w-md
          `}>
            <div className="flex-1">
              <p className="font-medium text-sm whitespace-pre-line">{popupMessage.message}</p>
            </div>
            <button 
              onClick={() => setPopupMessage({ show: false, message: '', type: '' })}
              className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
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

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <FaSpinner className="animate-spin text-[#2800aa]" size={24} />
            <span className="text-gray-700">Processing...</span>
          </div>
        </div>
      )}

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
              
              {categories.length === 0 && !loading ? (
                <div className="text-center py-16">
                  <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                    <FaBoxes className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No equipment available at the moment.</p>
                    <p className="text-gray-400 text-sm mt-2">Please check back later.</p>
                  </div>
                </div>
              ) : (
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
              )}
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
                {getFilteredEquipment().map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.description || 'No description available'}
                      </p>
                      
                      {/* Additional info */}
                      <div className="mb-4 text-xs text-gray-400">
                        Added: {item.addedDate ? new Date(item.addedDate).toLocaleDateString() : 'N/A'}
                      </div>
                      
                      <button
                        onClick={() => handleBookNow(item)}
                        disabled={item.status !== 'AVAILABLE'}
                        className={`w-full py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                          item.status === 'AVAILABLE'
                            ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {item.status === 'AVAILABLE' ? (
                          <>Book Now <FaArrowRight className="text-sm" /></>
                        ) : (
                          <>Currently Unavailable</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredEquipment().length === 0 && (
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
              <p className="text-sm text-gray-700 mb-2">{selectedEquipment.description || 'Professional quality equipment for your needs.'}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <FaInfoCircle />
                <span>Inspection required before handover</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaBoxes className="text-[#2800aa]" /> Select Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBookingQuantity(Math.max(1, bookingQuantity - 1))}
                    className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    value={bookingQuantity}
                    onChange={(e) => setBookingQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2800aa]"
                  />
                  <button
                    onClick={() => setBookingQuantity(bookingQuantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Equipment:</span>
                <span className="font-semibold">{selectedEquipment.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">{bookingQuantity}</span>
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
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50"
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Confirm Booking'}
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
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
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
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Equipment;
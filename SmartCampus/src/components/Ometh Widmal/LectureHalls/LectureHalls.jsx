import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaChalkboard, FaUsers, FaMapMarkerAlt, FaSnowflake, FaVideo, 
  FaChalkboardTeacher, FaVolumeUp, FaCheckCircle, FaTimesCircle, 
  FaSearch, FaStar, FaCalendarAlt, FaClock, 
  FaWifi, FaDesktop, FaMicrophone, FaLightbulb, FaChair, 
  FaWindowMaximize, FaThermometerHalf, FaPlug, FaRegBuilding,
  FaBookmark, FaShare, FaInfoCircle, FaArrowRight, FaFlask,
  FaLaptopCode, FaClipboardList, FaCouch, FaRegSun,
  FaRegSnowflake, FaServer, FaDoorOpen, FaCode, FaShieldAlt,
  FaWind, FaMicrochip, FaCoffee, FaSpinner
} from 'react-icons/fa';
import { MdOutlineMeetingRoom, MdOutlineScreenShare, MdOutlineScience } from 'react-icons/md';
import { GiWhiteBook, GiMechanicalArm } from 'react-icons/gi';
import NavBar from "../NavBar/NavBar";
import Footer from "../footer/Footer";

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api/halls';

const LectureHalls = () => {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState('all');

  // Capacity mapping for backend values
  const capacityMap = {
    'small': { label: 'Small (≤ 100)', max: 100 },
    'medium': { label: 'Medium (101-200)', min: 101, max: 200 },
    'large': { label: 'Large (200+)', min: 201 }
  };

  // Fetch halls from backend
  const fetchHalls = async () => {
    setLoading(true);
    try {
      console.log('Fetching halls from:', API_BASE_URL);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch halls');
      const data = await response.json();
      console.log('Fetched halls:', data);
      setHalls(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching halls:', err);
      setError('Failed to connect to server. Please make sure backend is running on http://localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  // Search halls by name/location
  const searchHalls = async (query) => {
    if (!query.trim()) {
      fetchHalls();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setHalls(data);
    } catch (err) {
      console.error('Search error:', err);
      // Fallback to client-side filtering
      const response = await fetch(API_BASE_URL);
      const allHalls = await response.json();
      const filtered = allHalls.filter(hall => 
        hall.name.toLowerCase().includes(query.toLowerCase()) ||
        hall.location.toLowerCase().includes(query.toLowerCase())
      );
      setHalls(filtered);
    } finally {
      setLoading(false);
    }
  };

  // Filter by type
  const filterByType = async (type) => {
    if (type === 'all') {
      fetchHalls();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/type/${type}`);
      if (!response.ok) throw new Error('Filter failed');
      const data = await response.json();
      setHalls(data);
    } catch (err) {
      console.error('Filter error:', err);
      // Fallback to client-side filtering
      const response = await fetch(API_BASE_URL);
      const allHalls = await response.json();
      const filtered = allHalls.filter(hall => hall.type === type);
      setHalls(filtered);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchHalls();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchHalls(searchTerm);
      } else if (selectedType === 'all') {
        fetchHalls();
      } else {
        filterByType(selectedType);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle type filter
  useEffect(() => {
    if (!searchTerm) {
      filterByType(selectedType);
    }
  }, [selectedType]);

  // Client-side filtering for capacity and facilities (since backend may not support these directly)
  const getFilteredHalls = () => {
    let filtered = halls;

    // Capacity filter (client-side)
    if (selectedCapacity !== 'all') {
      filtered = filtered.filter(hall => {
        const capacityValue = getCapacityNumber(hall.capacity);
        if (selectedCapacity === 'small') return capacityValue <= 100;
        if (selectedCapacity === 'medium') return capacityValue >= 101 && capacityValue <= 200;
        if (selectedCapacity === 'large') return capacityValue >= 201;
        return true;
      });
    }

    // Facility filter (client-side)
    if (selectedFacility !== 'all') {
      filtered = filtered.filter(hall => {
        return hall.facilities && hall.facilities[selectedFacility] === true;
      });
    }

    return filtered;
  };

  // Helper to convert capacity value to number
  const getCapacityNumber = (capacity) => {
    if (typeof capacity === 'number') return capacity;
    if (capacity === 'small') return 50;
    if (capacity === 'medium') return 150;
    if (capacity === 'large') return 250;
    return 100;
  };

  // Get display capacity label
  const getCapacityLabel = (capacity) => {
    if (typeof capacity === 'number') return capacity;
    if (capacity === 'small') return '≤ 100';
    if (capacity === 'medium') return '101-200';
    if (capacity === 'large') return '200+';
    return capacity;
  };

  const filteredHalls = getFilteredHalls();

  const handleBookNow = (hall) => {
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
      comfortableSeating: <FaChair className="text-teal-500" />,
      computers: <FaLaptopCode className="text-blue-600" />,
      softwareIDE: <FaCode className="text-green-600" />,
      highSpeedInternet: <FaServer className="text-gray-700" />,
      microscopes: <MdOutlineScience className="text-emerald-600" />,
      safetyEquipment: <FaShieldAlt className="text-red-600" />,
      ventilation: <FaWind className="text-cyan-600" />,
      oscilloscopes: <FaMicrochip className="text-purple-600" />,
      solderingStations: <GiMechanicalArm className="text-orange-600" />,
      components: <FaMicrochip className="text-gray-600" />,
      conferenceCall: <FaVideo className="text-indigo-600" />,
      tvScreen: <FaDesktop className="text-gray-700" />,
      whiteboardMarkers: <GiWhiteBook className="text-green-600" />,
      catering: <FaCoffee className="text-amber-700" />,
      podium: <FaChalkboardTeacher className="text-blue-700" />,
      whiteboardWall: <GiWhiteBook className="text-emerald-600" />,
      beanBags: <FaCouch className="text-purple-600" />
    };
    return icons[facility] || <FaCheckCircle className="text-gray-400" />;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'lecture hall':
        return <FaChalkboard className="text-xl" />;
      case 'seminar room':
        return <FaChalkboardTeacher className="text-xl" />;
      case 'laboratory':
        return <FaFlask className="text-xl" />;
      case 'meeting room':
        return <MdOutlineMeetingRoom className="text-xl" />;
      default:
        return <MdOutlineMeetingRoom className="text-xl" />;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch(type) {
      case 'lecture hall':
        return 'bg-blue-100 text-blue-700';
      case 'seminar room':
        return 'bg-purple-100 text-purple-700';
      case 'laboratory':
        return 'bg-green-100 text-green-700';
      case 'meeting room':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeDisplayName = (type) => {
    switch(type) {
      case 'lecture hall':
        return 'Lecture Hall';
      case 'seminar room':
        return 'Seminar Hall';
      case 'laboratory':
        return 'Laboratory';
      case 'meeting room':
        return 'Meeting Room';
      default:
        return type;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-500 text-white';
      case 'booked': return 'bg-red-500 text-white';
      case 'maintenance': return 'bg-amber-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Loading state
  if (loading && halls.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-6xl text-[#2800aa] mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading lecture halls...</p>
            <p className="text-sm text-gray-400 mt-2">Connecting to server at http://localhost:8080</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error && halls.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTimesCircle className="text-4xl text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchHalls}
              className="px-6 py-2 bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white rounded-xl hover:shadow-lg transition-all"
            >
              Retry Connection
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Make sure backend is running on <strong>http://localhost:8080</strong>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      
      {/* Hero Section */}
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
              Lecture Halls & Spaces
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp">
              Discover and book premium lecture halls, labs, and meeting rooms equipped with world-class facilities
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
              <option value="lecture hall">Lecture Hall</option>
              <option value="seminar room">Seminar Hall</option>
              <option value="laboratory">Laboratory</option>
              <option value="meeting room">Meeting Room</option>
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
              <option value="computers">Computers</option>
              <option value="conferenceCall">Video Conferencing</option>
              <option value="wifi">WiFi</option>
              <option value="smartBoard">Smart Board</option>
            </select>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            Found <span className="font-semibold text-[#2800aa]">{filteredHalls.length}</span> spaces
            {filteredHalls.length !== halls.length && ` (filtered from ${halls.length} total)`}
          </div>
        </div>
      </div>

      {/* Halls Grid */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHalls.map((hall) => (
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
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg ${getStatusColor(hall.status)}`}>
                      {hall.status === 'available' ? (
                        <><FaCheckCircle className="text-sm" /> Available</>
                      ) : hall.status === 'maintenance' ? (
                        <><FaTools className="text-sm" /> Maintenance</>
                      ) : (
                        <><FaTimesCircle className="text-sm" /> Booked</>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating Badge (from analytics data or default) */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-white font-semibold text-sm">{(hall.rating || 4.5).toFixed(1)}</span>
                      <span className="text-white/80 text-xs">({hall.reviews || 0})</span>
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
                  <div className="mb-4 flex justify-between items-center">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${getTypeBadgeColor(hall.type)}`}>
                      {getTypeIcon(hall.type)}
                      <span>{getTypeDisplayName(hall.type)}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: {hall.id}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">Capacity: <strong className="text-gray-900">{getCapacityLabel(hall.capacity)}</strong> people</span>
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
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Facilities</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {hall.facilities && Object.entries(hall.facilities)
                        .filter(([, value]) => value === true)
                        .slice(0, 6)
                        .map(([key]) => (
                          <div key={key} className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5">
                            {getFacilityIcon(key)}
                            <span className="capitalize truncate">
                              {key === 'airConditioning' ? 'AC' : 
                               key === 'soundSystem' ? 'Sound' :
                               key === 'smartBoard' ? 'Smart Board' :
                               key === 'recordingSystem' ? 'Recording' :
                               key === 'powerOutlets' ? 'Power' :
                               key === 'comfortableSeating' ? 'Seating' :
                               key === 'highSpeedInternet' ? 'High-Speed Net' :
                               key === 'conferenceCall' ? 'Video Conf' :
                               key === 'whiteboardMarkers' ? 'Markers' :
                               key === 'beanBags' ? 'Bean Bags' :
                               key === 'solderingStations' ? 'Soldering' :
                               key.slice(0, 8)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                    {hall.description || 'Modern facility equipped with all necessary amenities for a productive learning environment.'}
                  </p>
                  
                  <button
                    onClick={() => handleBookNow(hall)}
                    disabled={hall.status !== 'available'}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      hall.status === 'available'
                        ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {hall.status === 'available' ? (
                      <>Book Now <FaArrowRight className="text-sm" /></>
                    ) : hall.status === 'maintenance' ? (
                      <>Under Maintenance</>
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
                <p className="text-gray-500 text-lg">No spaces found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedCapacity('all');
                    setSelectedFacility('all');
                    fetchHalls();
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
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
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
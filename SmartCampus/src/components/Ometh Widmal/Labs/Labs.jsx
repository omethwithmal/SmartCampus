import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChalkboard, FaUsers, FaMapMarkerAlt, FaSnowflake, FaVideo, 
  FaChalkboardTeacher, FaVolumeUp, FaCheckCircle, FaTimesCircle, 
  FaSearch, FaStar, FaStarHalfAlt, FaCalendarAlt, FaClock, 
  FaWifi, FaDesktop, FaMicrophone, FaLightbulb, FaChair, 
  FaWindowMaximize, FaThermometerHalf, FaPlug, FaRegBuilding,
  FaBookmark, FaShare, FaInfoCircle, FaArrowRight, FaLaptopCode,
  FaCode, FaNetworkWired, FaPaintBrush, FaDatabase, FaShieldAlt,
  FaCloud, FaRobot, FaWindows, FaApple, FaLinux, FaServer
} from 'react-icons/fa';
import { MdOutlineMeetingRoom, MdOutlineScreenShare, MdComputer } from 'react-icons/md';
import { GiWhiteBook, GiProcessor } from 'react-icons/gi';
import NavBar from "../NavBar/NavBar";
import Footer from "../footer/Footer";

const Labs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [selectedSoftware, setSelectedSoftware] = useState('all');

  const labs = [
    {
      id: 1,
      name: 'Computer Lab 1',
      type: 'LAB',
      labCategory: 'Computer Lab',
      capacity: 40,
      location: 'IT Building, 2nd Floor',
      status: 'AVAILABLE',
      rating: 4.9,
      reviews: 156,
      coverImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
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
      equipment: {
        numberOfComputers: 40,
        computerSpecs: 'Intel Core i7, 16GB RAM, 512GB SSD',
        internetAvailability: '1 Gbps Fiber',
        projector: true,
        smartBoard: false,
        printer: true,
        scanner: true
      },
      software: {
        java: true,
        python: true,
        cpp: true,
        javascript: true,
        eclipse: true,
        vsCode: true,
        pycharm: true,
        androidStudio: false,
        mysql: true,
        mongodb: true
      },
      os: ['Windows 11 Pro', 'Ubuntu 22.04 LTS'],
      description: 'State-of-the-art computer lab equipped with high-performance workstations. Perfect for programming classes, software development, and IT workshops. Features dual monitors and ergonomic seating.',
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
      name: 'Networking Lab',
      type: 'LAB',
      labCategory: 'Networking Lab',
      capacity: 25,
      location: 'Engineering Building, 3rd Floor',
      status: 'AVAILABLE',
      rating: 4.8,
      reviews: 89,
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
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
      equipment: {
        numberOfComputers: 25,
        computerSpecs: 'Intel Core i5, 8GB RAM, 256GB SSD',
        internetAvailability: '10 Gbps Fiber',
        projector: true,
        smartBoard: false,
        printer: false,
        scanner: false,
        networkingGear: 'Cisco Routers, Switches, Firewalls'
      },
      software: {
        java: false,
        python: true,
        cpp: true,
        javascript: false,
        eclipse: false,
        vsCode: true,
        pycharm: false,
        androidStudio: false,
        mysql: false,
        mongodb: false,
        wireshark: true,
        ciscoPacketTracer: true,
        gns3: true
      },
      os: ['Windows 11 Pro', 'Ubuntu 22.04 LTS'],
      description: 'Specialized networking lab with enterprise-grade networking equipment. Ideal for CCNA, CCNP, and network security courses. Includes Cisco routers, switches, and firewall appliances.',
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
      name: 'Multimedia Lab',
      type: 'LAB',
      labCategory: 'Multimedia Lab',
      capacity: 30,
      location: 'Arts Building, 1st Floor',
      status: 'AVAILABLE',
      rating: 4.7,
      reviews: 112,
      coverImage: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
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
      equipment: {
        numberOfComputers: 30,
        computerSpecs: 'Apple iMac, M2 Chip, 16GB RAM, 512GB SSD',
        internetAvailability: '1 Gbps Fiber',
        projector: true,
        smartBoard: false,
        printer: true,
        scanner: true,
        audioEquipment: 'Studio Monitors, Audio Interface'
      },
      software: {
        java: false,
        python: true,
        cpp: false,
        javascript: false,
        eclipse: false,
        vsCode: true,
        pycharm: false,
        androidStudio: false,
        mysql: false,
        mongodb: false,
        adobePhotoshop: true,
        adobePremiere: true,
        adobeAfterEffects: true,
        blender: true,
        figma: true
      },
      os: ['macOS Sonoma'],
      description: 'Creative multimedia lab equipped with Apple iMacs and professional creative software. Perfect for graphic design, video editing, 3D modeling, and animation courses.',
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
      name: 'Research Lab',
      type: 'LAB',
      labCategory: 'Computer Lab',
      capacity: 20,
      location: 'Research Center, 4th Floor',
      status: 'BOOKED',
      rating: 5.0,
      reviews: 45,
      coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: false,
        wifi: true,
        smartBoard: true,
        recordingSystem: true,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true
      },
      equipment: {
        numberOfComputers: 20,
        computerSpecs: 'AMD Ryzen 9, 32GB RAM, 1TB NVMe SSD, RTX 4080',
        internetAvailability: '10 Gbps Fiber',
        projector: true,
        smartBoard: true,
        printer: true,
        scanner: true,
        specialEquipment: 'GPU Computing Cluster'
      },
      software: {
        java: true,
        python: true,
        cpp: true,
        javascript: true,
        eclipse: true,
        vsCode: true,
        pycharm: true,
        androidStudio: true,
        mysql: true,
        mongodb: true,
        tensorflow: true,
        pytorch: true,
        matlab: true,
        rstudio: true
      },
      os: ['Windows 11 Pro', 'Ubuntu 22.04 LTS', 'Pop!_OS'],
      description: 'High-performance computing lab for advanced research and AI/ML projects. Equipped with GPU workstations and specialized software for data science and deep learning.',
      timeSlots: [
        { day: 'Monday', slots: ['13:00 - 15:00', '15:00 - 17:00'] },
        { day: 'Tuesday', slots: ['08:00 - 10:00', '13:00 - 15:00'] },
        { day: 'Wednesday', slots: ['10:00 - 12:00', '15:00 - 17:00'] },
        { day: 'Thursday', slots: ['08:00 - 10:00'] },
        { day: 'Friday', slots: ['10:00 - 12:00'] }
      ]
    }
  ];

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lab.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || lab.labCategory === selectedType;
    const matchesCapacity = selectedCapacity === 'all' || 
                           (selectedCapacity === 'small' && lab.capacity <= 20) ||
                           (selectedCapacity === 'medium' && lab.capacity > 20 && lab.capacity <= 35) ||
                           (selectedCapacity === 'large' && lab.capacity > 35);
    
    let matchesSoftware = true;
    if (selectedSoftware !== 'all') {
      matchesSoftware = lab.software[selectedSoftware] === true;
    }
    
    return matchesSearch && matchesType && matchesCapacity && matchesSoftware;
  });

  const handleBookNow = (lab) => {
    navigate('/booking', { state: { hall: lab } });
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

  const getSoftwareIcon = (software) => {
    const icons = {
      java: <FaCode className="text-red-600" />,
      python: <FaCode className="text-blue-500" />,
      cpp: <FaCode className="text-purple-600" />,
      javascript: <FaCode className="text-yellow-500" />,
      tensorflow: <FaRobot className="text-blue-500" />,
      pytorch: <FaRobot className="text-orange-500" />,
      matlab: <FaLaptopCode className="text-red-500" />,
      wireshark: <FaNetworkWired className="text-green-500" />,
      adobePhotoshop: <FaPaintBrush className="text-blue-600" />,
      adobePremiere: <FaVideo className="text-purple-600" />,
      adobeAfterEffects: <FaVideo className="text-pink-600" />,
      blender: <FaCube className="text-orange-600" />,
      figma: <FaPaintBrush className="text-purple-600" />,
      eclipse: <FaCode className="text-purple-600" />,
      vsCode: <FaCode className="text-blue-600" />,
      pycharm: <FaCode className="text-green-600" />,
      mysql: <FaDatabase className="text-blue-600" />,
      mongodb: <FaDatabase className="text-green-600" />,
      ciscoPacketTracer: <FaNetworkWired className="text-blue-600" />,
      gns3: <FaServer className="text-gray-600" />,
      rstudio: <FaCode className="text-blue-600" />
    };
    return icons[software] || <FaCode className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative h-[450px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
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
                <MdComputer className="text-6xl" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInDown">
              Computer Labs
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp">
              Discover state-of-the-art computer labs equipped with modern technology and professional software
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
              <option value="all">All Lab Types</option>
              <option value="Computer Lab">Computer Lab</option>
              <option value="Networking Lab">Networking Lab</option>
              <option value="Multimedia Lab">Multimedia Lab</option>
            </select>
            
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent cursor-pointer hover:border-[#2800aa] transition-colors"
            >
              <option value="all">All Capacities</option>
              <option value="small">Small (≤ 20)</option>
              <option value="medium">Medium (21-35)</option>
              <option value="large">Large (35+)</option>
            </select>
            
            <select
              value={selectedSoftware}
              onChange={(e) => setSelectedSoftware(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent cursor-pointer hover:border-[#2800aa] transition-colors"
            >
              <option value="all">All Software</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="tensorflow">TensorFlow</option>
              <option value="adobePhotoshop">Adobe Photoshop</option>
            </select>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLabs.map((lab) => (
              <div 
                key={lab.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Card Header with Cover Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={lab.coverImage} 
                    alt={lab.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg ${
                      lab.status === 'AVAILABLE' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {lab.status === 'AVAILABLE' ? (
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
                      <span className="text-white font-semibold text-sm">{lab.rating}</span>
                      <span className="text-white/80 text-xs">({lab.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Lab Name Overlay */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full">
                      <span className="font-bold text-[#2800aa] text-lg">{lab.name}</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MdOutlineMeetingRoom className="text-xs" />
                      {lab.labCategory}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">Capacity: <strong className="text-gray-900">{lab.capacity}</strong> students</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">{lab.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaDesktop className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">Computers: <strong className="text-gray-900">{lab.equipment.numberOfComputers}</strong> PCs</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FaWifi className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">Internet: <strong className="text-gray-900">{lab.equipment.internetAvailability}</strong></span>
                    </div>
                  </div>
                  
                  {/* Key Software Tags */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Software Available</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(lab.software).slice(0, 6).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-2 py-1.5 border border-gray-200">
                            {getSoftwareIcon(key)}
                            <span className="capitalize text-gray-700">
                              {key === 'adobePhotoshop' ? 'Photoshop' :
                               key === 'adobePremiere' ? 'Premiere' :
                               key === 'adobeAfterEffects' ? 'After Effects' :
                               key === 'ciscoPacketTracer' ? 'Packet Tracer' :
                               key === 'vsCode' ? 'VS Code' :
                               key === 'tensorflow' ? 'TensorFlow' :
                               key === 'pytorch' ? 'PyTorch' :
                               key === 'rstudio' ? 'R Studio' :
                               key}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                  
                  {/* Facilities Grid */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Facilities</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(lab.facilities).slice(0, 6).map(([key, value]) => (
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
                    {lab.description}
                  </p>
                  
                  <button
                    onClick={() => handleBookNow(lab)}
                    disabled={lab.status === 'BOOKED'}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      lab.status === 'AVAILABLE'
                        ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {lab.status === 'AVAILABLE' ? (
                      <>Book Now <FaArrowRight className="text-sm" /></>
                    ) : (
                      <>Currently Unavailable</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredLabs.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No labs found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedCapacity('all');
                    setSelectedSoftware('all');
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

// Add FaCube if not imported
const FaCube = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44c-.32-.17-.53-.5-.53-.88v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15l-6.7 3.77L12 11.68l6.7-3.77L12 4.15z"/></svg>;

export default Labs;
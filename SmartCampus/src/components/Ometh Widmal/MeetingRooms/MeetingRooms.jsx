import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaMapMarkerAlt, FaSnowflake, FaVideo, 
  FaCheckCircle, FaTimesCircle, FaSearch, FaStar, 
  FaCalendarAlt, FaClock, FaWifi, FaDesktop, FaMicrophone, 
  FaLightbulb, FaChair, FaPlug, FaArrowRight, FaTv,
  FaRegBuilding, FaClipboardList, FaCoffee, FaParking,
  FaPrint, FaRegClock, FaShieldAlt, FaBell, FaVolumeUp,
  FaChalkboard
} from 'react-icons/fa';
import { MdOutlineMeetingRoom, MdOutlineScreenShare, MdPresentToAll } from 'react-icons/md';
import { BiVideoRecording } from 'react-icons/bi';
import NavBar from "../NavBar/NavBar";
import Footer from "../footer/Footer";

const MeetingRooms = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState('all');

  const meetingRooms = [
    {
      id: 1,
      name: 'Meeting Room A',
      type: 'MEETING_ROOM',
      capacity: 8,
      location: 'Main Building, 1st Floor',
      status: 'AVAILABLE',
      rating: 4.7,
      reviews: 45,
      coverImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        projector: true,
        tvScreen: true,
        whiteboard: true,
        wifi: true,
        airConditioning: true,
        conferenceTable: true,
        comfortableChairs: true,
        powerOutlets: true,
        naturalLighting: true
      },
      equipment: {
        videoConferencing: true,
        microphone: true,
        speakers: true,
        smartBoard: false,
        recordingSystem: false,
        phone: true
      },
      description: 'Modern meeting room perfect for small team discussions and client meetings. Equipped with smart TV and video conferencing capabilities.',
      workingHours: '8:00 AM - 8:00 PM (Monday - Friday)',
      timeSlots: [
        { day: 'Monday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Tuesday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Wednesday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Thursday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Friday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] }
      ]
    },
    {
      id: 2,
      name: 'Meeting Room B',
      type: 'MEETING_ROOM',
      capacity: 12,
      location: 'Main Building, 2nd Floor',
      status: 'AVAILABLE',
      rating: 4.9,
      reviews: 78,
      coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        projector: true,
        tvScreen: true,
        whiteboard: true,
        wifi: true,
        airConditioning: true,
        conferenceTable: true,
        comfortableChairs: true,
        powerOutlets: true,
        naturalLighting: true
      },
      equipment: {
        videoConferencing: true,
        microphone: true,
        speakers: true,
        smartBoard: true,
        recordingSystem: true,
        phone: true,
        wirelessPresentation: true
      },
      description: 'Spacious meeting room ideal for larger team meetings and presentations. Features a smart board and advanced video conferencing system.',
      workingHours: '8:00 AM - 8:00 PM (Monday - Friday)',
      timeSlots: [
        { day: 'Monday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00'] },
        { day: 'Tuesday', slots: ['09:00 - 11:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Wednesday', slots: ['11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Thursday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00'] },
        { day: 'Friday', slots: ['09:00 - 11:00', '14:00 - 16:00', '16:00 - 18:00'] }
      ]
    },
    {
      id: 3,
      name: 'Board Room',
      type: 'MEETING_ROOM',
      capacity: 20,
      location: 'Executive Building, 3rd Floor',
      status: 'BOOKED',
      rating: 5.0,
      reviews: 112,
      coverImage: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        projector: true,
        tvScreen: true,
        whiteboard: true,
        wifi: true,
        airConditioning: true,
        conferenceTable: true,
        comfortableChairs: true,
        powerOutlets: true,
        naturalLighting: true,
        refreshments: true
      },
      equipment: {
        videoConferencing: true,
        microphone: true,
        speakers: true,
        smartBoard: true,
        recordingSystem: true,
        phone: true,
        wirelessPresentation: true,
        multipleScreens: true
      },
      description: 'Executive board room with premium amenities. Perfect for board meetings, important presentations, and high-level discussions.',
      workingHours: '9:00 AM - 6:00 PM (Monday - Friday)',
      timeSlots: [
        { day: 'Monday', slots: ['10:00 - 12:00', '14:00 - 16:00'] },
        { day: 'Tuesday', slots: ['09:00 - 11:00', '14:00 - 16:00'] },
        { day: 'Wednesday', slots: ['11:00 - 13:00', '15:00 - 17:00'] },
        { day: 'Thursday', slots: ['09:00 - 11:00', '14:00 - 16:00'] },
        { day: 'Friday', slots: ['10:00 - 12:00'] }
      ]
    },
    {
      id: 4,
      name: 'Meeting Room C',
      type: 'MEETING_ROOM',
      capacity: 6,
      location: 'Innovation Hub, Ground Floor',
      status: 'AVAILABLE',
      rating: 4.6,
      reviews: 34,
      coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        projector: false,
        tvScreen: true,
        whiteboard: true,
        wifi: true,
        airConditioning: true,
        conferenceTable: true,
        comfortableChairs: true,
        powerOutlets: true,
        naturalLighting: true
      },
      equipment: {
        videoConferencing: true,
        microphone: false,
        speakers: true,
        smartBoard: false,
        recordingSystem: false,
        phone: false
      },
      description: 'Cozy meeting room perfect for small team huddles and brainstorming sessions. Features a large TV screen for presentations.',
      workingHours: '8:00 AM - 10:00 PM (Monday - Friday), 9:00 AM - 6:00 PM (Saturday)',
      timeSlots: [
        { day: 'Monday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        { day: 'Tuesday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Wednesday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        { day: 'Thursday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Friday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Saturday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00'] }
      ]
    },
    {
      id: 5,
      name: 'Conference Room D',
      type: 'MEETING_ROOM',
      capacity: 15,
      location: 'Business Tower, 5th Floor',
      status: 'AVAILABLE',
      rating: 4.8,
      reviews: 67,
      coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        projector: true,
        tvScreen: true,
        whiteboard: true,
        wifi: true,
        airConditioning: true,
        conferenceTable: true,
        comfortableChairs: true,
        powerOutlets: true,
        naturalLighting: true,
        coffeeMachine: true
      },
      equipment: {
        videoConferencing: true,
        microphone: true,
        speakers: true,
        smartBoard: true,
        recordingSystem: true,
        phone: true,
        wirelessPresentation: true
      },
      description: 'Professional conference room with panoramic city views. Ideal for client meetings, training sessions, and team workshops.',
      workingHours: '8:00 AM - 8:00 PM (Monday - Friday)',
      timeSlots: [
        { day: 'Monday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Tuesday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00'] },
        { day: 'Wednesday', slots: ['09:00 - 11:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Thursday', slots: ['11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Friday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00'] }
      ]
    },
    {
      id: 6,
      name: 'Huddle Room',
      type: 'MEETING_ROOM',
      capacity: 5,
      location: 'Innovation Hub, 2nd Floor',
      status: 'AVAILABLE',
      rating: 4.5,
      reviews: 28,
      coverImage: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      facilities: {
        projector: false,
        tvScreen: true,
        whiteboard: true,
        wifi: true,
        airConditioning: true,
        conferenceTable: true,
        comfortableChairs: true,
        powerOutlets: true,
        naturalLighting: false
      },
      equipment: {
        videoConferencing: true,
        microphone: false,
        speakers: true,
        smartBoard: false,
        recordingSystem: false,
        phone: false
      },
      description: 'Small huddle room for quick team sync-ups and informal meetings. Perfect for 2-5 people discussions.',
      workingHours: '8:00 AM - 10:00 PM (Monday - Friday), 9:00 AM - 8:00 PM (Saturday - Sunday)',
      timeSlots: [
        { day: 'Monday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        { day: 'Tuesday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        { day: 'Wednesday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Thursday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'] },
        { day: 'Friday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Saturday', slots: ['10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'] },
        { day: 'Sunday', slots: ['10:00 - 12:00', '14:00 - 16:00'] }
      ]
    }
  ];

  const filteredRooms = meetingRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCapacity = selectedCapacity === 'all' || 
                           (selectedCapacity === 'small' && room.capacity <= 8) ||
                           (selectedCapacity === 'medium' && room.capacity > 8 && room.capacity <= 15) ||
                           (selectedCapacity === 'large' && room.capacity > 15);
    
    let matchesFacility = true;
    if (selectedFacility !== 'all') {
      matchesFacility = room.facilities[selectedFacility] === true || room.equipment[selectedFacility] === true;
    }
    
    return matchesSearch && matchesCapacity && matchesFacility;
  });

  const handleBookNow = (room) => {
    navigate('/booking', { state: { hall: room } });
  };

  const getFacilityIcon = (facility) => {
    const icons = {
      projector: <FaVideo className="text-purple-500" />,
      tvScreen: <FaTv className="text-blue-500" />,
      whiteboard: <FaChalkboard className="text-green-500" />,
      wifi: <FaWifi className="text-indigo-500" />,
      airConditioning: <FaSnowflake className="text-blue-400" />,
      conferenceTable: <FaClipboardList className="text-orange-500" />,
      comfortableChairs: <FaChair className="text-teal-500" />,
      powerOutlets: <FaPlug className="text-gray-500" />,
      naturalLighting: <FaLightbulb className="text-yellow-500" />,
      videoConferencing: <BiVideoRecording className="text-red-500" />,
      microphone: <FaMicrophone className="text-pink-500" />,
      speakers: <FaVolumeUp className="text-purple-500" />,
      smartBoard: <MdOutlineScreenShare className="text-green-600" />,
      recordingSystem: <FaVideo className="text-red-600" />,
      wirelessPresentation: <MdPresentToAll className="text-blue-600" />
    };
    return icons[facility] || <FaClipboardList className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative h-[450px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
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
              Meeting Rooms
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp">
              Professional meeting spaces equipped with modern technology for productive discussions
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent cursor-pointer hover:border-[#2800aa] transition-colors"
            >
              <option value="all">All Capacities</option>
              <option value="small">Small (≤ 8 people)</option>
              <option value="medium">Medium (9-15 people)</option>
              <option value="large">Large (16+ people)</option>
            </select>
            
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent cursor-pointer hover:border-[#2800aa] transition-colors"
            >
              <option value="all">All Facilities</option>
              <option value="projector">Projector</option>
              <option value="tvScreen">TV Screen</option>
              <option value="whiteboard">Whiteboard</option>
              <option value="videoConferencing">Video Conferencing</option>
              <option value="wifi">Wi-Fi</option>
              <option value="airConditioning">Air Conditioning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meeting Rooms Grid */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div 
                key={room.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Card Header with Cover Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={room.coverImage} 
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg ${
                      room.status === 'AVAILABLE' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {room.status === 'AVAILABLE' ? (
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
                      <span className="text-white font-semibold text-sm">{room.rating}</span>
                      <span className="text-white/80 text-xs">({room.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Room Name Overlay */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full">
                      <span className="font-bold text-[#2800aa] text-lg">{room.name}</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MdOutlineMeetingRoom className="text-xs" />
                      Meeting Room • {room.capacity} Seats
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">Capacity: <strong className="text-gray-900">{room.capacity}</strong> people</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-sm">{room.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaRegClock className="text-[#2800aa] text-sm" />
                      </div>
                      <span className="text-xs">{room.workingHours}</span>
                    </div>
                  </div>
                  
                  {/* Key Facilities Tags */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.facilities.projector && (
                        <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-2 py-1.5 border border-gray-200">
                          <FaVideo className="text-purple-500" />
                          <span>Projector</span>
                        </div>
                      )}
                      {room.facilities.tvScreen && (
                        <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-2 py-1.5 border border-gray-200">
                          <FaTv className="text-blue-500" />
                          <span>TV Screen</span>
                        </div>
                      )}
                      {room.facilities.whiteboard && (
                        <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-2 py-1.5 border border-gray-200">
                          <FaChalkboard className="text-green-500" />
                          <span>Whiteboard</span>
                        </div>
                      )}
                      {room.facilities.wifi && (
                        <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-2 py-1.5 border border-gray-200">
                          <FaWifi className="text-indigo-500" />
                          <span>Wi-Fi</span>
                        </div>
                      )}
                      {room.equipment.videoConferencing && (
                        <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-2 py-1.5 border border-gray-200">
                          <BiVideoRecording className="text-red-500" />
                          <span>Video Conf</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Additional Equipment */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Equipment</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.equipment.videoConferencing && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5">
                          <BiVideoRecording className="text-red-500" />
                          <span>Video Conferencing</span>
                        </div>
                      )}
                      {room.equipment.microphone && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5">
                          <FaMicrophone className="text-pink-500" />
                          <span>Microphone</span>
                        </div>
                      )}
                      {room.equipment.speakers && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5">
                          <FaVolumeUp className="text-purple-500" />
                          <span>Speakers</span>
                        </div>
                      )}
                      {room.equipment.smartBoard && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5">
                          <MdOutlineScreenShare className="text-green-600" />
                          <span>Smart Board</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                    {room.description}
                  </p>
                  
                  <button
                    onClick={() => handleBookNow(room)}
                    disabled={room.status === 'BOOKED'}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      room.status === 'AVAILABLE'
                        ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {room.status === 'AVAILABLE' ? (
                      <>Book Now <FaArrowRight className="text-sm" /></>
                    ) : (
                      <>Currently Unavailable</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No meeting rooms found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
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

export default MeetingRooms;
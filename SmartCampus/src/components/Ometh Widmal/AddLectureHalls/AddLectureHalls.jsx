import React, { useState, useRef } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Eye, X, Check, 
  Wifi, Wind, Video, Mic, PenTool, Power, Coffee, 
  MapPin, Calendar, ChevronDown, ChevronUp, LayoutDashboard,
  Users, Home, Info, Upload, Image as ImageIcon
} from 'lucide-react';

// Sample initial data
const initialRooms = [
  {
    id: 10,
    name: "Grand Lecture Hall",
    type: "lecture hall",
    capacity: "large",
    location: "Block A, Floor 2",
    status: "available",
    coverImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop",
    facilities: {
      airConditioning: true, projector: true, whiteboard: true, soundSystem: true,
      wifi: true, smartBoard: true, recordingSystem: false, powerOutlets: true,
      comfortableSeating: true, whiteboardWall: false, beanBags: false
    },
    description: "Spacious lecture hall with modern audio-visual equipment",
    timeSlots: [
      { day: 'Monday', slots: ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00'] },
      { day: 'Tuesday', slots: ['09:00 - 11:00', '13:00 - 15:00', '15:00 - 17:00'] },
      { day: 'Wednesday', slots: ['10:00 - 12:00', '14:00 - 16:00'] },
      { day: 'Thursday', slots: ['09:00 - 11:00', '13:00 - 15:00'] },
      { day: 'Friday', slots: ['09:00 - 12:00'] }
    ]
  },
  {
    id: 11,
    name: "Executive Meeting Room",
    type: "meeting room",
    capacity: "small",
    location: "Block B, Floor 1",
    status: "booked",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
    facilities: {
      airConditioning: true, projector: true, whiteboard: true, soundSystem: false,
      wifi: true, smartBoard: false, recordingSystem: true, powerOutlets: true,
      comfortableSeating: true, whiteboardWall: true, beanBags: false
    },
    description: "Premium meeting room for executive discussions",
    timeSlots: [
      { day: 'Monday', slots: ['10:00 - 12:00', '14:00 - 16:00'] },
      { day: 'Wednesday', slots: ['09:00 - 11:00', '13:00 - 15:00'] },
      { day: 'Friday', slots: ['11:00 - 13:00'] }
    ]
  },
  {
    id: 12,
    name: "Innovation Lab",
    type: "laboratory",
    capacity: "medium",
    location: "Block C, Ground Floor",
    status: "maintenance",
    coverImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=400&fit=crop",
    facilities: {
      airConditioning: true, projector: false, whiteboard: true, soundSystem: false,
      wifi: true, smartBoard: false, recordingSystem: false, powerOutlets: true,
      comfortableSeating: false, whiteboardWall: true, beanBags: true
    },
    description: "State-of-the-art laboratory for research and innovation",
    timeSlots: [
      { day: 'Tuesday', slots: ['09:00 - 12:00', '13:00 - 16:00'] },
      { day: 'Thursday', slots: ['10:00 - 13:00'] }
    ]
  }
];

const capacityOptions = [
  { value: 'small', label: 'Small (<100)', range: '<100' },
  { value: 'medium', label: 'Medium (101-200)', range: '101-200' },
  { value: 'large', label: 'Large (200+)', range: '200+' }
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const LectureHallsDashboard = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [viewingRoom, setViewingRoom] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'lecture hall',
    capacity: 'small',
    location: '',
    status: 'available',
    coverImage: '',
    description: '',
    facilities: {
      airConditioning: false, projector: false, whiteboard: false, soundSystem: false,
      wifi: false, smartBoard: false, recordingSystem: false, powerOutlets: false,
      comfortableSeating: false, whiteboardWall: false, beanBags: false
    },
    timeSlots: []
  });

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || room.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getCapacityLabel = (capacity) => {
    const option = capacityOptions.find(opt => opt.value === capacity);
    return option?.label || capacity;
  };

  const getCapacityRange = (capacity) => {
    const option = capacityOptions.find(opt => opt.value === capacity);
    return option?.range || capacity;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'booked': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'lecture hall': return <Users size={16} />;
      case 'meeting room': return <Home size={16} />;
      case 'seminar room': return <Users size={16} />;
      case 'laboratory': return <Video size={16} />;
      default: return <Home size={16} />;
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData(room);
    setImagePreview(room.coverImage);
    setIsModalOpen(true);
  };

  const handleView = (room) => {
    setViewingRoom(room);
    setIsViewModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      type: 'lecture hall',
      capacity: 'small',
      location: '',
      status: 'available',
      coverImage: '',
      description: '',
      facilities: {
        airConditioning: false, projector: false, whiteboard: false, soundSystem: false,
        wifi: false, smartBoard: false, recordingSystem: false, powerOutlets: false,
        comfortableSeating: false, whiteboardWall: false, beanBags: false
      },
      timeSlots: []
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Please upload an image smaller than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData({ ...formData, coverImage: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.location) {
      alert('Please fill in required fields');
      return;
    }

    if (!formData.coverImage) {
      alert('Please upload a cover image');
      return;
    }

    if (editingRoom) {
      setRooms(rooms.map(room => room.id === editingRoom.id ? { ...formData, id: editingRoom.id } : room));
    } else {
      const newId = Math.max(...rooms.map(r => r.id), 0) + 1;
      setRooms([...rooms, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
    setEditingRoom(null);
    setImagePreview(null);
  };

  const handleTimeSlotChange = (dayIndex, slotsString) => {
    const slots = slotsString.split(',').map(s => s.trim()).filter(s => s);
    const newTimeSlots = [...(formData.timeSlots || [])];
    const day = daysOfWeek[dayIndex];
    const existingIndex = newTimeSlots.findIndex(ts => ts.day === day);
    
    if (existingIndex >= 0) {
      newTimeSlots[existingIndex] = { day, slots };
    } else if (slots.length > 0) {
      newTimeSlots.push({ day, slots });
    }
    
    setFormData({ ...formData, timeSlots: newTimeSlots });
  };

  const getTimeSlotsForDay = (day) => {
    return formData.timeSlots?.find(ts => ts.day === day)?.slots.join(', ') || '';
  };

  const FacilityCheckbox = ({ label, field, icon: Icon }) => (
    <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={formData.facilities?.[field] || false}
        onChange={(e) => setFormData({
          ...formData,
          facilities: { ...formData.facilities, [field]: e.target.checked }
        })}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      {Icon && <Icon size={16} className="text-gray-500" />}
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  const FacilityBadge = ({ label, available }) => (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
      {label}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Room Management Dashboard</h1>
                <p className="text-sm text-gray-500">Manage lecture halls, meeting rooms, and laboratories</p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              Add New Room
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'lecture hall', 'meeting room', 'seminar room', 'laboratory'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-xl capitalize transition-all ${
                    selectedType === type
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All' : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">Total Rooms</p>
            <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-bold text-green-600">{rooms.filter(r => r.status === 'available').length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500">Maintenance</p>
            <p className="text-2xl font-bold text-yellow-600">{rooms.filter(r => r.status === 'maintenance').length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-red-500">
            <p className="text-sm text-gray-500">Booked</p>
            <p className="text-2xl font-bold text-red-600">{rooms.filter(r => r.status === 'booked').length}</p>
          </div>
        </div>

        {/* Table View - Scrollbar Hidden */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto" style={{ 
            scrollbarWidth: 'none',  /* Firefox */
            msOverflowStyle: 'none',  /* IE and Edge */
            WebkitOverflowScrolling: 'touch'
          }}>
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;  /* Chrome, Safari, Opera */
              }
            `}</style>
            <table className="min-w-[1200px] w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[60px]">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">Facilities</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={room.coverImage} alt={room.name} className="h-10 w-10 rounded-lg object-cover mr-3 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">{room.name}</div>
                          <div className="text-xs text-gray-500 truncate">{room.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {getTypeIcon(room.type)}
                        <span className="text-sm text-gray-900 capitalize">{room.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{getCapacityLabel(room.capacity)}</div>
                        <div className="text-xs text-gray-500">{getCapacityRange(room.capacity)} seats</div>
                      </div>
                     </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900 truncate">{room.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(room.status)}`}>
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(room.facilities).filter(([, val]) => val).slice(0, 3).map(([key]) => (
                          <span key={key} className="px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        ))}
                        {Object.entries(room.facilities).filter(([, val]) => val).length > 3 && (
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                            +{Object.entries(room.facilities).filter(([, val]) => val).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(room)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(room)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Update"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500">No rooms found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* View Modal - Scrollbar Hidden */}
      {isViewModalOpen && viewingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>
              {`
                .fixed.inset-0 .overflow-y-auto::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Info size={20} />
                Room Details
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                <img src={viewingRoom.coverImage} alt={viewingRoom.name} className="w-full h-full object-cover" />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingRoom.status)}`}>
                  {viewingRoom.status.charAt(0).toUpperCase() + viewingRoom.status.slice(1)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{viewingRoom.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm capitalize flex items-center gap-1">
                      {getTypeIcon(viewingRoom.type)} {viewingRoom.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      {getCapacityLabel(viewingRoom.capacity)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={16} />
                    <span>{viewingRoom.location}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{viewingRoom.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <FacilityBadge label="Air Conditioning" available={viewingRoom.facilities.airConditioning} />
                    <FacilityBadge label="Projector" available={viewingRoom.facilities.projector} />
                    <FacilityBadge label="Whiteboard" available={viewingRoom.facilities.whiteboard} />
                    <FacilityBadge label="Sound System" available={viewingRoom.facilities.soundSystem} />
                    <FacilityBadge label="WiFi" available={viewingRoom.facilities.wifi} />
                    <FacilityBadge label="Smart Board" available={viewingRoom.facilities.smartBoard} />
                    <FacilityBadge label="Recording System" available={viewingRoom.facilities.recordingSystem} />
                    <FacilityBadge label="Power Outlets" available={viewingRoom.facilities.powerOutlets} />
                    <FacilityBadge label="Comfortable Seating" available={viewingRoom.facilities.comfortableSeating} />
                    <FacilityBadge label="Whiteboard Wall" available={viewingRoom.facilities.whiteboardWall} />
                    <FacilityBadge label="Bean Bags" available={viewingRoom.facilities.beanBags} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Time Slots</h4>
                <div className="space-y-2">
                  {viewingRoom.timeSlots.map((ts, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-700">{ts.day}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {ts.slots.map((slot, slotIdx) => (
                          <span key={slotIdx} className="text-sm bg-white px-3 py-1 rounded-lg border border-gray-200">{slot}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal - Scrollbar Hidden */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>
              {`
                .fixed.inset-0 .overflow-y-auto::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 pb-2 border-b">Basic Information</h3>
                  
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
                    <div 
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="relative">
                            <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto rounded-lg object-cover" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setImagePreview(null);
                                setFormData({ ...formData, coverImage: '' });
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                              className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                Upload a file
                              </span>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Name *</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Grand Lecture Hall"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="lecture hall">Lecture Hall</option>
                      <option value="meeting room">Meeting Room</option>
                      <option value="seminar room">Seminar Room</option>
                      <option value="laboratory">Laboratory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <select
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {capacityOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Block A, Floor 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="available">Available</option>
                      <option value="booked">Booked</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Room description..."
                    />
                  </div>
                </div>
                
                {/* Facilities & Time Slots */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 pb-2 border-b mb-3">Facilities</h3>
                    <div className="grid grid-cols-2 gap-1">
                      <FacilityCheckbox label="Air Conditioning" field="airConditioning" icon={Wind} />
                      <FacilityCheckbox label="Projector" field="projector" />
                      <FacilityCheckbox label="Whiteboard" field="whiteboard" icon={PenTool} />
                      <FacilityCheckbox label="Sound System" field="soundSystem" icon={Mic} />
                      <FacilityCheckbox label="WiFi" field="wifi" icon={Wifi} />
                      <FacilityCheckbox label="Smart Board" field="smartBoard" />
                      <FacilityCheckbox label="Recording System" field="recordingSystem" icon={Video} />
                      <FacilityCheckbox label="Power Outlets" field="powerOutlets" icon={Power} />
                      <FacilityCheckbox label="Comfortable Seating" field="comfortableSeating" icon={Coffee} />
                      <FacilityCheckbox label="Whiteboard Wall" field="whiteboardWall" />
                      <FacilityCheckbox label="Bean Bags" field="beanBags" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 pb-2 border-b mb-3">Time Slots</h3>
                    <p className="text-xs text-gray-500 mb-3">Enter time slots as comma-separated values (e.g., 09:00-11:00, 14:00-16:00)</p>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                      {daysOfWeek.map((day, idx) => (
                        <div key={day}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{day}</label>
                          <input
                            type="text"
                            value={getTimeSlotsForDay(day)}
                            onChange={(e) => handleTimeSlotChange(idx, e.target.value)}
                            placeholder="09:00-11:00, 13:00-15:00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                {editingRoom ? 'Update Room' : 'Add Room'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureHallsDashboard;
// components/EquipmentManager.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  Monitor, 
  Video, 
  Mic, 
  Speaker, 
  Laptop,
  CheckCircle,
  XCircle,
  Upload,
  X,
  Calendar,
  Package,
  AlertTriangle,
  Info
} from 'lucide-react';

const EquipmentManager = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: 'Projector',
    status: 'AVAILABLE',
    image: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [popupMessage, setPopupMessage] = useState({ show: false, message: '', type: '' });
  const fileInputRef = useRef(null);

  // English bad words list
  const badWords = [
    'fuck', 'shit', 'damn', 'bitch', 'asshole', 'bastard', 'cock', 'pussy', 'dick', 'whore',
    'slut', 'cunt', 'motherfucker', 'hell', 'fucking', 'bloody', 'arse', 'balls', 'wanker',
    'ass', 'fag', 'nigger', 'retard', 'twat', 'piss', 'crap', 'douche', 'gunter'
  ];

  // Function to check for profanity
  const containsProfanity = (text) => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return badWords.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(lowerText);
    });
  };

  // Function to show popup message
  const showPopup = (message, type = 'error') => {
    setPopupMessage({ show: true, message, type });
    setTimeout(() => {
      setPopupMessage({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Handle input change with profanity detection
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if ((name === 'name' || name === 'description') && containsProfanity(value)) {
      showPopup(`⚠️ Please remove inappropriate words from ${name === 'name' ? 'Equipment Name' : 'Description'}`, 'warning');
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  // Handle textarea with real-time profanity detection
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    
    if (containsProfanity(value)) {
      showPopup('⚠️ Please remove inappropriate words from Description', 'warning');
      return;
    }
    
    setFormData({ ...formData, description: value });
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('equipmentList');
    if (savedData) {
      setEquipmentList(JSON.parse(savedData));
    } else {
      // Demo data
      const demoData = [
        {
          id: 1,
          name: 'Epson EB-695Wi',
          category: 'Projector',
          status: 'AVAILABLE',
          image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b80?w=150&h=150&fit=crop',
          description: 'Ultra short throw interactive projector, 3500 lumens',
          addedDate: '2024-01-15',
          lastUpdated: '2024-01-15'
        },
        {
          id: 2,
          name: 'Sony A7III',
          category: 'Camera',
          status: 'Booked',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&h=150&fit=crop',
          description: 'Full-frame mirrorless camera with 24.2MP sensor',
          addedDate: '2024-02-10',
          lastUpdated: '2024-02-10'
        },
        {
          id: 3,
          name: 'Shure SM58',
          category: 'Microphone',
          status: 'AVAILABLE',
          image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=150&h=150&fit=crop',
          description: 'Dynamic vocal microphone with cardioid pattern',
          addedDate: '2024-03-05',
          lastUpdated: '2024-03-05'
        }
      ];
      setEquipmentList(demoData);
      localStorage.setItem('equipmentList', JSON.stringify(demoData));
    }
  }, []);

  // Save to localStorage whenever equipmentList changes
  useEffect(() => {
    localStorage.setItem('equipmentList', JSON.stringify(equipmentList));
  }, [equipmentList]);

  // Handle local image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (containsProfanity(formData.name)) {
      showPopup('Please remove inappropriate words from Equipment Name', 'warning');
      return;
    }
    
    if (containsProfanity(formData.description)) {
      showPopup('Please remove inappropriate words from Description', 'warning');
      return;
    }
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (isEditing) {
      setEquipmentList(equipmentList.map(item => 
        item.id === formData.id ? { ...formData, lastUpdated: currentDate } : item
      ));
      showPopup('Equipment updated successfully!', 'success');
      setIsEditing(false);
    } else {
      const newId = equipmentList.length > 0 ? Math.max(...equipmentList.map(i => i.id)) + 1 : 1;
      setEquipmentList([...equipmentList, { 
        ...formData, 
        id: newId, 
        addedDate: currentDate,
        lastUpdated: currentDate
      }]);
      showPopup('Equipment added successfully!', 'success');
    }
    setFormData({
      id: null,
      name: '',
      category: 'Projector',
      status: 'AVAILABLE',
      image: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleEdit = (equipment) => {
    setFormData(equipment);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      setEquipmentList(equipmentList.filter(item => item.id !== id));
      showPopup('Equipment deleted successfully!', 'success');
    }
  };

  const handleView = (equipment) => {
    setViewModal(equipment);
  };

  // Dashboard statistics
  const totalItems = equipmentList.length;
  const availableItems = equipmentList.filter(item => item.status === 'AVAILABLE').length;
  const bookedItems = equipmentList.filter(item => item.status === 'Booked').length;
  const availablePercentage = totalItems > 0 ? ((availableItems / totalItems) * 100).toFixed(1) : 0;
  const bookedPercentage = totalItems > 0 ? ((bookedItems / totalItems) * 100).toFixed(1) : 0;
  
  const categoryCount = {
    Projector: equipmentList.filter(item => item.category === 'Projector').length,
    Camera: equipmentList.filter(item => item.category === 'Camera').length,
    Microphone: equipmentList.filter(item => item.category === 'Microphone').length,
    Laptop: equipmentList.filter(item => item.category === 'Laptop').length,
    Speaker: equipmentList.filter(item => item.category === 'Speaker').length
  };

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentAdditions = equipmentList.filter(item => new Date(item.addedDate) >= thirtyDaysAgo).length;

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Projector': return <Video size={20} className="text-blue-500" />;
      case 'Camera': return <Monitor size={20} className="text-blue-500" />;
      case 'Microphone': return <Mic size={20} className="text-blue-500" />;
      case 'Laptop': return <Laptop size={20} className="text-blue-500" />;
      case 'Speaker': return <Speaker size={20} className="text-blue-500" />;
      default: return <Monitor size={20} className="text-blue-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen relative">
      {/* Modern Popup Message */}
      {popupMessage.show && (
        <div className="fixed top-5 right-5 z-50 animate-slide-in-right">
          <div className={`
            flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm
            ${popupMessage.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : ''}
            ${popupMessage.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' : ''}
            ${popupMessage.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : ''}
            ${popupMessage.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : ''}
            min-w-[300px] max-w-md border-l-4 border-white
          `}>
            <div className="flex-shrink-0">
              {popupMessage.type === 'success' && <CheckCircle size={22} className="text-white" />}
              {popupMessage.type === 'warning' && <AlertTriangle size={22} className="text-white" />}
              {popupMessage.type === 'error' && <XCircle size={22} className="text-white" />}
              {popupMessage.type === 'info' && <Info size={22} className="text-white" />}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{popupMessage.message}</p>
            </div>
            <button 
              onClick={() => setPopupMessage({ show: false, message: '', type: '' })}
              className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header with navigation button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Equipment Management
          </h1>
          <p className="text-gray-500 mt-1">Manage and track all your equipment inventory</p>
        </div>
        <Link 
          to="/AddLectureHalls"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <PlusCircle size={18} />
          Go to Add Lecture Halls
        </Link>
      </div>

      {/* Dashboard Cards - same as before */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Total Equipment</h3>
          <p className="text-3xl font-bold text-gray-800">{totalItems}</p>
          <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <span className="text-sm font-semibold text-green-600">{availablePercentage}%</span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Available</h3>
          <p className="text-3xl font-bold text-green-600">{availableItems}</p>
          <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: `${availablePercentage}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl">
              <XCircle className="text-red-600" size={24} />
            </div>
            <span className="text-sm font-semibold text-red-600">{bookedPercentage}%</span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Booked</h3>
          <p className="text-3xl font-bold text-red-600">{bookedItems}</p>
          <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full" style={{ width: `${bookedPercentage}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Recent Additions</h3>
          <p className="text-3xl font-bold text-purple-600">{recentAdditions}</p>
          <p className="text-xs text-gray-400 mt-2">Last 30 days</p>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Equipment by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(categoryCount).map(([category, count]) => {
            const percentage = totalItems > 0 ? (count / totalItems * 100).toFixed(1) : 0;
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <span className="font-medium text-gray-700">{category}</span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">{count}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{percentage}% of total</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Equipment Button */}
      <div className="mb-6">
        <button
          onClick={() => { setShowForm(!showForm); setIsEditing(false); setFormData({ id: null, name: '', category: 'Projector', status: 'AVAILABLE', image: '', description: '' }); }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <PlusCircle size={18} />
          Add New Equipment
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {isEditing ? 'Edit Equipment' : 'Add New Equipment'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter equipment name"
              />
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Info size={12} /> No inappropriate words allowed
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Projector">Projector</option>
                <option value="Camera">Camera</option>
                <option value="Microphone">Microphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Speaker">Speaker</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex items-center gap-2"
                >
                  <Upload size={16} />
                  Upload
                </button>
                <span className="text-sm text-gray-500">or</span>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Image URL"
                />
              </div>
              {formData.image && (
                <div className="mt-2 relative inline-block">
                  <img src={formData.image} alt="Preview" className="w-16 h-16 rounded object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleDescriptionChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter equipment description"
              ></textarea>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Info size={12} /> No inappropriate words allowed
              </p>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg transition shadow-md"
              >
                {isEditing ? 'Update Equipment' : 'Save Equipment'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setIsEditing(false); }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Equipment Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipmentList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        {getCategoryIcon(item.category)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      item.status === 'AVAILABLE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-gray-600">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {equipmentList.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No equipment found. Click "Add New Equipment" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewModal(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Equipment Details</h2>
              <button
                onClick={() => setViewModal(null)}
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {viewModal.image && (
                <div className="mb-4">
                  <img 
                    src={viewModal.image} 
                    alt={viewModal.name} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Equipment Name</label>
                  <p className="text-lg font-bold text-gray-900">{viewModal.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                    <div className="flex items-center gap-2 mt-1">
                      {getCategoryIcon(viewModal.category)}
                      <p className="text-gray-800 font-medium">{viewModal.category}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                    <p className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      viewModal.status === 'AVAILABLE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {viewModal.status}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                  <p className="mt-1 text-gray-700">{viewModal.description || 'No description provided'}</p>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <div>
                      <label className="text-xs text-gray-500">Added Date</label>
                      <p className="text-gray-700">{viewModal.addedDate || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Last Updated</label>
                      <p className="text-gray-700">{viewModal.lastUpdated || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-3 flex justify-end gap-3 border-t">
              <button
                onClick={() => {
                  handleEdit(viewModal);
                  setViewModal(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition"
              >
                Edit Equipment
              </button>
              <button
                onClick={() => setViewModal(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style>{`
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
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EquipmentManager;
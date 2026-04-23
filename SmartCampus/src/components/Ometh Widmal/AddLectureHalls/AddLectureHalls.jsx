import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Eye, X, Check, 
  Wifi, Wind, Video, Mic, PenTool, Power, Coffee, 
  MapPin, Calendar, ChevronDown, ChevronUp, LayoutDashboard,
  Users, Home, Info, Upload, Image as ImageIcon,
  TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon,
  Activity, Clock, Building2, CalendarDays, Sparkles
} from 'lucide-react';

// Import recharts components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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
    ],
    usageCount: 145,
    weeklyUsage: [28, 32, 30, 25, 30, 0, 0]
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
    ],
    usageCount: 89,
    weeklyUsage: [18, 15, 20, 12, 24, 0, 0]
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
    ],
    usageCount: 67,
    weeklyUsage: [12, 14, 10, 18, 13, 0, 0]
  },
  {
    id: 13,
    name: "Seminar Room Alpha",
    type: "seminar room",
    capacity: "small",
    location: "Block D, Floor 1",
    status: "available",
    coverImage: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=400&fit=crop",
    facilities: {
      airConditioning: true, projector: true, whiteboard: true, soundSystem: true,
      wifi: true, smartBoard: false, recordingSystem: false, powerOutlets: true,
      comfortableSeating: true, whiteboardWall: false, beanBags: false
    },
    description: "Perfect for workshops and group discussions",
    timeSlots: [
      { day: 'Monday', slots: ['09:00 - 11:00', '13:00 - 15:00'] },
      { day: 'Wednesday', slots: ['11:00 - 13:00', '15:00 - 17:00'] },
      { day: 'Friday', slots: ['10:00 - 12:00'] }
    ],
    usageCount: 112,
    weeklyUsage: [22, 18, 25, 20, 27, 0, 0]
  },
  {
    id: 14,
    name: "Conference Hall B",
    type: "meeting room",
    capacity: "medium",
    location: "Block A, Floor 3",
    status: "booked",
    coverImage: "https://images.unsplash.com/photo-1517502474097-f9b30659dad3?w=800&h=400&fit=crop",
    facilities: {
      airConditioning: true, projector: true, whiteboard: true, soundSystem: true,
      wifi: true, smartBoard: true, recordingSystem: true, powerOutlets: true,
      comfortableSeating: true, whiteboardWall: false, beanBags: false
    },
    description: "Large conference space with advanced AV systems",
    timeSlots: [
      { day: 'Tuesday', slots: ['10:00 - 13:00', '14:00 - 17:00'] },
      { day: 'Thursday', slots: ['09:00 - 12:00'] }
    ],
    usageCount: 78,
    weeklyUsage: [15, 20, 12, 18, 13, 0, 0]
  }
];

const capacityOptions = [
  { value: 'small', label: 'Small (<100)', range: '<100' },
  { value: 'medium', label: 'Medium (101-200)', range: '101-200' },
  { value: 'large', label: 'Large (200+)', range: '200+' }
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Modern 2026 color palette - Blue theme with medium-dark blue accents
const COLORS = ['#1E3A8A', '#3B82F6', '#60A5FA', '#2563EB', '#1D4ED8', '#2E4A8E', '#0F2B5C'];
const CHART_COLORS = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];

const LectureHallsDashboard = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [viewingRoom, setViewingRoom] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dashboardTimeframe, setDashboardTimeframe] = useState('week');
  const fileInputRef = useRef(null);
  
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

  const analyticsData = useMemo(() => {
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.status === 'available').length;
    const bookedRooms = rooms.filter(r => r.status === 'booked').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
    
    const availabilityRate = totalRooms > 0 ? (availableRooms / totalRooms * 100).toFixed(1) : 0;
    const utilizationRate = totalRooms > 0 ? ((totalRooms - availableRooms - maintenanceRooms) / totalRooms * 100).toFixed(1) : 0;
    
    const totalUsage = rooms.reduce((sum, room) => sum + (room.usageCount || 0), 0);
    const avgUsagePerRoom = totalRooms > 0 ? (totalUsage / totalRooms).toFixed(0) : 0;
    
    const typeBreakdown = {};
    rooms.forEach(room => {
      const type = room.type;
      if (!typeBreakdown[type]) {
        typeBreakdown[type] = { count: 0, usage: 0, available: 0, booked: 0 };
      }
      typeBreakdown[type].count++;
      typeBreakdown[type].usage += (room.usageCount || 0);
      if (room.status === 'available') typeBreakdown[type].available++;
      if (room.status === 'booked') typeBreakdown[type].booked++;
    });
    
    const typeChartData = Object.entries(typeBreakdown).map(([type, data]) => ({
      name: type.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      count: data.count,
      usage: data.usage,
      available: data.available,
      booked: data.booked
    }));
    
    const weeklyData = daysOfWeek.slice(0, 5).map((day, idx) => {
      const dayUsage = rooms.reduce((sum, room) => sum + (room.weeklyUsage?.[idx] || 0), 0);
      return {
        day: day.substring(0, 3),
        fullDay: day,
        usage: dayUsage,
        average: rooms.length > 0 ? (dayUsage / rooms.length).toFixed(1) : 0
      };
    });
    
    const statusData = [
      { name: 'Available', value: availableRooms, color: '#10B981' },
      { name: 'Booked', value: bookedRooms, color: '#EF4444' },
      { name: 'Maintenance', value: maintenanceRooms, color: '#F59E0B' }
    ];
    
    const topRooms = [...rooms].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 5);
    
    const capacityDistribution = {
      small: rooms.filter(r => r.capacity === 'small').length,
      medium: rooms.filter(r => r.capacity === 'medium').length,
      large: rooms.filter(r => r.capacity === 'large').length
    };
    const capacityChartData = Object.entries(capacityDistribution).map(([cap, count]) => ({
      name: cap.charAt(0).toUpperCase() + cap.slice(1),
      count: count,
      percentage: totalRooms > 0 ? (count / totalRooms * 100).toFixed(0) : 0
    }));
    
    const monthlyTrend = [
      { month: 'Jan', usage: 42, bookings: 38 },
      { month: 'Feb', usage: 48, bookings: 45 },
      { month: 'Mar', usage: 55, bookings: 52 },
      { month: 'Apr', usage: 62, bookings: 58 },
      { month: 'May', usage: 58, bookings: 60 },
      { month: 'Jun', usage: 65, bookings: 62 }
    ];
    
    return {
      summary: { totalRooms, availableRooms, bookedRooms, maintenanceRooms, availabilityRate, utilizationRate, totalUsage, avgUsagePerRoom },
      typeChartData,
      weeklyData,
      statusData,
      topRooms,
      capacityChartData,
      monthlyTrend
    };
  }, [rooms]);

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
      case 'available': return 'bg-emerald-50 text-emerald-700';
      case 'booked': return 'bg-rose-50 text-rose-700';
      case 'maintenance': return 'bg-amber-50 text-amber-700';
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

  const getTypeColor = (type) => {
    switch(type) {
      case 'lecture hall': return 'bg-blue-50 text-blue-700';
      case 'meeting room': return 'bg-indigo-50 text-indigo-700';
      case 'seminar room': return 'bg-cyan-50 text-cyan-700';
      case 'laboratory': return 'bg-sky-50 text-sky-700';
      default: return 'bg-gray-100 text-gray-700';
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

    const newRoom = {
      ...formData,
      usageCount: editingRoom ? (editingRoom.usageCount || 0) : 0,
      weeklyUsage: editingRoom ? (editingRoom.weeklyUsage || [0,0,0,0,0,0,0]) : [0,0,0,0,0,0,0]
    };

    if (editingRoom) {
      setRooms(rooms.map(room => room.id === editingRoom.id ? { ...newRoom, id: editingRoom.id } : room));
    } else {
      const newId = Math.max(...rooms.map(r => r.id), 0) + 1;
      setRooms([...rooms, { ...newRoom, id: newId }]);
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
    <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
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
    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${available ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-400'}`}>
      {label}
    </span>
  );

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color }) => (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="p-2 rounded-xl bg-blue-50">
          <Icon size={20} className="text-blue-600" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3 text-xs">
          {trend > 0 ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-rose-500" />}
          <span className={trend > 0 ? 'text-emerald-600' : 'text-rose-600'}>{Math.abs(trend)}%</span>
          <span className="text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl shadow-md">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Room Management Dashboard</h1>
                <p className="text-sm text-gray-500">Manage lecture halls, meeting rooms, and laboratories</p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              Add New Room
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ANALYTICS DASHBOARD SECTION */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Analytics Dashboard</h2>
            </div>
            <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
              <button
                onClick={() => setDashboardTimeframe('week')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  dashboardTimeframe === 'week' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setDashboardTimeframe('month')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  dashboardTimeframe === 'month' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Total Rooms" 
              value={analyticsData.summary.totalRooms} 
              subtitle={`${analyticsData.summary.availableRooms} available`}
              icon={Building2} 
              color="#1E3A8A" 
              trend={5}
            />
            <StatCard 
              title="Availability Rate" 
              value={`${analyticsData.summary.availabilityRate}%`} 
              subtitle={`${analyticsData.summary.bookedRooms} booked, ${analyticsData.summary.maintenanceRooms} maintenance`}
              icon={Activity} 
              color="#2563EB" 
              trend={-2}
            />
            <StatCard 
              title="Total Usage" 
              value={analyticsData.summary.totalUsage} 
              subtitle={`Avg ${analyticsData.summary.avgUsagePerRoom} per room`}
              icon={CalendarDays} 
              color="#3B82F6" 
              trend={12}
            />
            <StatCard 
              title="Utilization Rate" 
              value={`${analyticsData.summary.utilizationRate}%`} 
              subtitle="Based on current status"
              icon={TrendingUp} 
              color="#60A5FA" 
              trend={8}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weekly Usage Trend */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-600" />
                  Weekly Usage Trend
                </h3>
                <span className="text-xs text-gray-400">Last 5 days</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={analyticsData.weeklyData}>
                  <defs>
                    <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`${value} bookings`, 'Usage']}
                  />
                  <Area type="monotone" dataKey="usage" stroke="#1E3A8A" fill="url(#usageGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Room Type Distribution */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <PieChartIcon size={18} className="text-blue-600" />
                  Room Type Distribution
                </h3>
                <span className="text-xs text-gray-400">By count</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={analyticsData.typeChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {analyticsData.typeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {analyticsData.typeChartData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
                    <span className="text-xs text-gray-600 capitalize">{item.name}</span>
                    <span className="text-xs font-semibold text-gray-800">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Status Distribution */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <Activity size={18} className="text-blue-600" />
                Room Status
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analyticsData.statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {analyticsData.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Capacity Distribution */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <Users size={18} className="text-blue-600" />
                Capacity Distribution
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.capacityChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <Tooltip formatter={(value) => [`${value} rooms`, 'Count']} />
                  <Bar dataKey="count" fill="#2563EB" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Used Rooms */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-blue-600" />
                Most Used Rooms
              </h3>
              <div className="space-y-3">
                {analyticsData.topRooms.map((room, idx) => (
                  <div key={room.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 w-5">#{idx+1}</span>
                      <img src={room.coverImage} alt={room.name} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">{room.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(room.type)}`}>
                        {room.type.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{room.usageCount || 0} uses</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Trend Chart */}
          {dashboardTimeframe === 'month' && (
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-blue-600" />
                Monthly Usage Trend
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={analyticsData.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="usage" stroke="#1E3A8A" strokeWidth={2} dot={{ fill: '#1E3A8A', r: 4 }} />
                  <Line type="monotone" dataKey="bookings" stroke="#60A5FA" strokeWidth={2} dot={{ fill: '#60A5FA', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

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

        {/* Table View */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto" style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
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
                  <tr key={room.id} className="hover:bg-blue-50/30 transition-colors">
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
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Update"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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

      {/* View Modal */}
      {isViewModalOpen && viewingRoom && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                Room Details
              </h2>
              <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                <img src={viewingRoom.coverImage} alt={viewingRoom.name} className="w-full h-full object-cover" />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getStatusColor(viewingRoom.status)}`}>
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 pb-2 border-b">Basic Information</h3>
                  
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
                              className="absolute top-0 right-0 -mt-2 -mr-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600"
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
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Name *</label>
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Grand Lecture Hall" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="lecture hall">Lecture Hall</option>
                      <option value="meeting room">Meeting Room</option>
                      <option value="seminar room">Seminar Room</option>
                      <option value="laboratory">Laboratory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <select value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      {capacityOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input type="text" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Block A, Floor 2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="available">Available</option>
                      <option value="booked">Booked</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Room description..." />
                  </div>
                </div>
                
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
                          <input type="text" value={getTimeSlotsForDay(day)} onChange={(e) => handleTimeSlotChange(idx, e.target.value)} placeholder="09:00-11:00, 13:00-15:00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 transition-colors shadow-sm">{editingRoom ? 'Update Room' : 'Add Room'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureHallsDashboard;
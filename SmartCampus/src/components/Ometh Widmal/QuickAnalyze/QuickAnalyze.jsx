import React, { useState } from 'react';
import {
  Home,
  FlaskConical,
  Users,
  Package,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Brain,
  CheckCircle,
  Wifi,
  Wind,
  Video,
  FileText,
  Lightbulb,
  Zap,
  Armchair,
  Presentation,
  Mic,
  Monitor,
  Calendar,
  Clock,
  PieChart,
  LineChart,
  Database,
  Target,
  Wrench,
  MonitorSmartphone,
  FlaskRound,
  Coffee,
  Laptop,
  Projector,
  Shield,
  Speaker,
  AudioWaveform
} from 'lucide-react';

const QuickAnalyze = () => {
  // State for active category
  const [activeCategory, setActiveCategory] = useState('lecture-halls');

  // Complete data for all categories with proper structure
  const data = {
    'lecture-halls': {
      name: 'Lecture Halls',
      icon: Home,
      total: 12,
      available: 5,
      booked: 4,
      maintenance: 3,
      types: [
        { name: 'Standard Hall', count: 7, percentage: 58 },
        { name: 'Seminar Hall', count: 3, percentage: 25 },
        { name: 'Auditorium', count: 2, percentage: 17 }
      ],
      facilities: {
        'Air Conditioning': 10,
        'Projector': 9,
        'Smart Board': 6,
        'WiFi': 12,
        'Sound System': 8
      },
      utilization: {
        current: 42,
        trend: '+8%',
        peakHours: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM']
      },
      recommendations: [
        'Increase smart board availability to 75% for better learning experience',
        'Schedule maintenance during off-peak hours (12 PM - 2 PM)',
        'Consider adding 2 more halls for growing student population',
        'Optimize booking system to reduce conflicts'
      ]
    },
    'labs': {
      name: 'Labs',
      icon: FlaskConical,
      total: 8,
      available: 3,
      booked: 4,
      maintenance: 1,
      types: [
        { name: 'Computer Lab', count: 4, percentage: 50 },
        { name: 'Science Lab', count: 3, percentage: 37.5 },
        { name: 'Research Lab', count: 1, percentage: 12.5 }
      ],
      facilities: {
        'Computers': 120,
        'Microscopes': 25,
        'Ventilation': 7,
        'Safety Equipment': 8,
        'Internet': 8
      },
      utilization: {
        current: 55,
        trend: '+15%',
        peakHours: ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM']
      },
      recommendations: [
        'Upgrade computer labs with latest hardware by next semester',
        'Increase ventilation systems in science labs',
        'Add more safety equipment stations',
        'Implement lab booking automation system'
      ]
    },
    'meeting-rooms': {
      name: 'Meeting Rooms',
      icon: Users,
      total: 6,
      available: 2,
      booked: 3,
      maintenance: 1,
      types: [
        { name: 'Small Room', count: 3, percentage: 50 },
        { name: 'Medium Room', count: 2, percentage: 33.3 },
        { name: 'Large Conference', count: 1, percentage: 16.7 }
      ],
      facilities: {
        'Video Conference': 5,
        'Whiteboard': 6,
        'Projector': 4,
        'Catering': 3,
        'WiFi': 6
      },
      utilization: {
        current: 48,
        trend: '+12%',
        peakHours: ['11:00 AM - 1:00 PM', '3:00 PM - 5:00 PM']
      },
      recommendations: [
        'Install video conferencing in all meeting rooms',
        'Add booking kiosks outside each room',
        'Implement room occupancy sensors for better utilization',
        'Create quiet zones for focused meetings'
      ]
    },
    'equipment': {
      name: 'Equipment',
      icon: Package,
      total: 45,
      available: 28,
      booked: 12,
      maintenance: 5,
      types: [
        { name: 'Projectors', count: 15, percentage: 33.3 },
        { name: 'Laptops', count: 20, percentage: 44.4 },
        { name: 'Audio Systems', count: 10, percentage: 22.2 }
      ],
      facilities: {
        'Laptops': 20,
        'Projectors': 15,
        'Speakers': 10,
        'Microphones': 12,
        'Cameras': 8
      },
      utilization: {
        current: 38,
        trend: '+5%',
        peakHours: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM']
      },
      recommendations: [
        'Schedule regular maintenance for all equipment',
        'Create equipment reservation system with QR codes',
        'Add tracking system for high-value items',
        'Implement preventive maintenance schedule'
      ]
    }
  };

  // Get current data with safe fallback
  const currentData = data[activeCategory] || data['lecture-halls'];
  const Icon = currentData.icon;
  
  // Safe calculation of rates
  const utilizationRate = currentData.total > 0 ? ((currentData.booked / currentData.total) * 100).toFixed(1) : 0;
  const availableRate = currentData.total > 0 ? ((currentData.available / currentData.total) * 100).toFixed(1) : 0;
  const maintenanceRate = currentData.total > 0 ? ((currentData.maintenance / currentData.total) * 100).toFixed(1) : 0;

  // Sidebar navigation items
  const navItems = [
    { id: 'lecture-halls', label: 'Lecture Halls', icon: Home },
    { id: 'labs', label: 'Labs', icon: FlaskConical },
    { id: 'meeting-rooms', label: 'Meeting Rooms', icon: Users },
    { id: 'equipment', label: 'Equipment', icon: Package }
  ];

  // Facility icons mapping for better visualization
  const getFacilityIcon = (facilityName) => {
    const icons = {
      'Air Conditioning': Wind,
      'Projector': Presentation,
      'Smart Board': MonitorSmartphone,
      'WiFi': Wifi,
      'Sound System': AudioWaveform,
      'Computers': Laptop,
      'Microscopes': FlaskRound,
      'Ventilation': Wind,
      'Safety Equipment': Shield,
      'Internet': Wifi,
      'Video Conference': Video,
      'Whiteboard': FileText,
      'Catering': Coffee,
      'Laptops': Laptop,
      'Speakers': Speaker,
      'Microphones': Mic,
      'Cameras': Video
    };
    return icons[facilityName] || Package;
  };

  return (
    <div className="flex min-h-screen bg-[#020b08]">
      {/* Fixed Left Sidebar - Glassmorphism */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-[#041915]/80 backdrop-blur-xl border-r border-emerald-500/20 z-20">
        <div className="p-8 border-b border-emerald-500/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Campus Nexus
          </h1>
          <p className="text-sm text-emerald-300/60 mt-2">AI Resource Intelligence</p>
        </div>
        
        <nav className="p-6 space-y-2">
          {navItems.map(item => {
            const NavIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
                  activeCategory === item.id 
                    ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10 border border-emerald-500/30' 
                    : 'text-emerald-300/60 hover:bg-emerald-500/10 hover:text-emerald-300'
                }`}
              >
                <NavIcon size={20} />
                <span className="font-medium">{item.label}</span>
                {activeCategory === item.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-80 flex-1 p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Icon size={32} className="text-emerald-400" />
                {currentData.name} Analysis
              </h2>
              <p className="text-emerald-300/50 mt-1">AI-powered insights and analytics</p>
            </div>
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-emerald-500/20">
              <div className="text-sm text-emerald-300/60 font-medium">AI Analysis Score</div>
              <div className="text-4xl font-bold text-emerald-400 mt-1">94.2</div>
              <div className="text-xs text-emerald-400/70 flex items-center justify-end gap-1 mt-1">
                <TrendingUp size={12} />
                +8% vs last month
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Database size={20} className="text-emerald-400" />
                </div>
                <span className="text-2xl font-bold text-white">{currentData.total}</span>
              </div>
              <p className="text-emerald-300/50 text-sm">Total {currentData.name}</p>
            </div>
            
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle size={20} className="text-green-400" />
                </div>
                <span className="text-2xl font-bold text-white">{currentData.available}</span>
              </div>
              <p className="text-emerald-300/50 text-sm">Available</p>
            </div>
            
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar size={20} className="text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-white">{currentData.booked}</span>
              </div>
              <p className="text-emerald-300/50 text-sm">Booked</p>
            </div>
            
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wrench size={20} className="text-rose-400" />
                </div>
                <span className="text-2xl font-bold text-white">{currentData.maintenance}</span>
              </div>
              <p className="text-emerald-300/50 text-sm">Maintenance</p>
            </div>
          </div>

          {/* Charts and Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Resource Distribution */}
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <PieChart size={18} className="text-emerald-400" />
                Resource Distribution
              </h3>
              <div className="space-y-4">
                {currentData.types && currentData.types.map((type, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-emerald-300/70">{type.name}</span>
                      <span className="text-emerald-400">{type.count} ({type.percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Utilization Metrics */}
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <LineChart size={18} className="text-emerald-400" />
                Utilization Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300/70">Utilization Rate</span>
                    <span className="text-emerald-400">{utilizationRate}%</span>
                  </div>
                  <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: `${utilizationRate}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300/70">Availability Rate</span>
                    <span className="text-emerald-400">{availableRate}%</span>
                  </div>
                  <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" style={{ width: `${availableRate}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300/70">Maintenance Rate</span>
                    <span className="text-emerald-400">{maintenanceRate}%</span>
                  </div>
                  <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full" style={{ width: `${maintenanceRate}%` }}></div>
                  </div>
                </div>
                <div className="pt-3 mt-2 border-t border-emerald-500/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-300/70">Trend vs Last Month</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <TrendingUp size={14} />
                      {currentData.utilization.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Facility Coverage */}
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Database size={18} className="text-emerald-400" />
                Facility Coverage
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {currentData.facilities && Object.entries(currentData.facilities).map(([key, value]) => {
                  const FacilityIcon = getFacilityIcon(key);
                  const maxValue = Math.max(...Object.values(currentData.facilities));
                  return (
                    <div key={key} className="p-3 bg-black/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <FacilityIcon size={14} className="text-emerald-400" />
                        <p className="text-emerald-300/60 text-xs capitalize">{key}</p>
                      </div>
                      <p className="text-xl font-bold text-white">{value}</p>
                      <div className="h-1.5 bg-emerald-500/20 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${(value / maxValue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Peak Hours & Insights */}
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock size={18} className="text-emerald-400" />
                Peak Usage Hours
              </h3>
              <div className="space-y-3">
                {currentData.utilization.peakHours && currentData.utilization.peakHours.map((hour, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Clock size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{hour}</p>
                      <p className="text-emerald-300/50 text-xs">High demand period</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-2xl p-6 border border-emerald-500/20 mb-8">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Brain size={18} className="text-emerald-400" />
              AI-Powered Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentData.recommendations && currentData.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-black/30 rounded-xl hover:bg-black/40 transition-all">
                  <Sparkles size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-emerald-300/80 text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics Card */}
          <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Target size={18} className="text-emerald-400" />
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-black/30 rounded-xl">
                <div className="text-3xl font-bold text-emerald-400">{utilizationRate}%</div>
                <p className="text-emerald-300/60 text-sm mt-1">Current Utilization</p>
                <div className="mt-2 text-xs text-emerald-400/70">Target: 75%</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-xl">
                <div className="text-3xl font-bold text-emerald-400">{currentData.available}</div>
                <p className="text-emerald-300/60 text-sm mt-1">Available Resources</p>
                <div className="mt-2 text-xs text-emerald-400/70">Ready for booking</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-xl">
                <div className="text-3xl font-bold text-emerald-400">{currentData.maintenance}</div>
                <p className="text-emerald-300/60 text-sm mt-1">Under Maintenance</p>
                <div className="mt-2 text-xs text-emerald-400/70">Needs attention</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuickAnalyze;
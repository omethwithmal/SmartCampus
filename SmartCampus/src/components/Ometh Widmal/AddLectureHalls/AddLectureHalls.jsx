import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  FlaskConical, 
  Users, 
  Package, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus, 
  Wifi,
  Wind,
  Video,
  FileText,
  Building,
  Lightbulb,
  Zap,
  Armchair,
  Presentation,
  TrendingUp,
  Target,
  Sparkles,
  Brain,
  Rocket,
  CircleCheck,
  CircleDot,
  CircleDashed,
  Wrench,
  Mic,
  Monitor,
  ChevronRight,
  BarChart3,
  Activity,
  Cpu,
  Filter,
  Download,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  X,
  Zap as QuickIcon,
  RefreshCw,
  Clock,
  Gauge
} from 'lucide-react';

const LectureHallsAnalyzeDashboard = () => {
  // State for sidebar active tab
  const [activeTab, setActiveTab] = useState('lecture-halls');
  
  // State for filtering
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for toxic warning
  const [showToxicWarning, setShowToxicWarning] = useState(false);
  const [toxicWordsFound, setToxicWordsFound] = useState([]);
  const [tempDescription, setTempDescription] = useState('');
  
  // State for lecture halls data with local images
  const [lectureHalls, setLectureHalls] = useState([
    {
      id: 1,
      name: 'Hall A-101',
      type: 'LECTURE_HALL',
      capacity: '50 - 100',
      location: { building: 'Main Building', floor: 1 },
      status: 'available',
      coverImage: null,
      localImage: null,
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: true,
        wifi: true,
        smartBoard: false,
        recordingSystem: false,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true,
      },
      description: 'Spacious lecture hall with modern amenities, perfect for large classes and presentations.',
      lastBooked: null,
      utilizationRate: 65
    },
    {
      id: 2,
      name: 'Seminar Room B-205',
      type: 'SEMINAR HALL',
      capacity: '0 - 50',
      location: { building: 'New Building', floor: 2 },
      status: 'maintenance',
      coverImage: null,
      localImage: null,
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
        comfortableSeating: true,
      },
      description: 'Intimate seminar room with smart board and recording capabilities.',
      lastBooked: '2026-03-28',
      utilizationRate: 45
    },
    {
      id: 3,
      name: 'Hall C-301',
      type: 'LECTURE_HALL',
      capacity: '100 - 150',
      location: { building: 'Engineering Building', floor: 3 },
      status: 'booked',
      coverImage: null,
      localImage: null,
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: true,
        wifi: true,
        smartBoard: false,
        recordingSystem: false,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true,
      },
      description: 'Large capacity hall ideal for conferences and workshops.',
      lastBooked: '2026-03-31',
      utilizationRate: 85
    }
  ]);

  // Real-time analytics state
  const [realTimeStats, setRealTimeStats] = useState({
    lectureHallsUsage: 68,
    labEquipmentAvailability: 82,
    meetingRoomBooking: 45,
    overallEfficiency: 76,
    peakHour: '2-4 PM',
    bookingTrend: '+12%',
    lastUpdated: new Date()
  });
  
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds default
  const [animationKey, setAnimationKey] = useState(0);
  
  // Weekly schedule data with real-time updates
  const [weekDays, setWeekDays] = useState(['Mon 22', 'Tue 23', 'Wed 24', 'Thu 25', 'Fri 26', 'Sat 27']);
  const timeSlots = ['9:00 am', '10:00 am', '11:00 am', '12:00 pm'];
  const [scheduleEvents, setScheduleEvents] = useState({
    'Mon 22': { '9:00 am': 'Design Sync', '10:00 am': '', '11:00 am': 'Design workshop', '12:00 pm': '' },
    'Tue 23': { '9:00 am': '', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
    'Wed 24': { '9:00 am': 'Team Building', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
    'Thu 25': { '9:00 am': '', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
    'Fri 26': { '9:00 am': '', '10:00 am': '', '11:00 am': 'Project update', '12:00 pm': '' },
    'Sat 27': { '9:00 am': '', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
  });

  // State for form
  const [showForm, setShowForm] = useState(false);
  const [editingHall, setEditingHall] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'LECTURE_HALL',
    capacity: '50 - 100',
    building: 'Main Building',
    floor: 1,
    status: 'available',
    localImage: null,
    facilities: {
      airConditioning: false,
      projector: false,
      whiteboard: false,
      soundSystem: false,
      wifi: false,
      smartBoard: false,
      recordingSystem: false,
      lighting: false,
      powerOutlets: false,
      comfortableSeating: false,
    },
    description: ''
  });

  // Function to update real-time stats based on current data
  const updateRealTimeStats = () => {
    setAnimationKey(prev => prev + 1);
    
    const totalHalls = lectureHalls.length;
    const availableHalls = lectureHalls.filter(h => h.status === 'available').length;
    const bookedHalls = lectureHalls.filter(h => h.status === 'booked').length;
    const maintenanceHalls = lectureHalls.filter(h => h.status === 'maintenance').length;
    
    // Calculate dynamic usage percentages
    const lectureHallUsage = totalHalls > 0 ? ((bookedHalls / totalHalls) * 100).toFixed(1) : 0;
    const lectureHallsCount = lectureHalls.filter(h => h.type === 'LECTURE_HALL').length;
    const seminarHallsCount = lectureHalls.filter(h => h.type === 'SEMINAR HALL').length;
    
    // Calculate facility availability
    const totalFacilities = lectureHalls.length * 10; // 10 facilities per hall
    const availableFacilities = lectureHalls.reduce((sum, hall) => {
      return sum + Object.values(hall.facilities).filter(v => v).length;
    }, 0);
    const labEquipmentAvailability = totalFacilities > 0 ? ((availableFacilities / totalFacilities) * 100).toFixed(1) : 0;
    
    // Calculate meeting room booking rate
    const meetingRoomBooking = seminarHallsCount > 0 
      ? ((lectureHalls.filter(h => h.type === 'SEMINAR HALL' && h.status === 'booked').length / seminarHallsCount) * 100).toFixed(1)
      : 0;
    
    // Calculate overall efficiency (weighted average)
    const overallEfficiency = (
      (parseFloat(lectureHallUsage) * 0.4) + 
      (parseFloat(labEquipmentAvailability) * 0.3) + 
      (parseFloat(meetingRoomBooking) * 0.3)
    ).toFixed(1);
    
    // Determine peak hour based on booking patterns (simulated with time-based logic)
    const currentHour = new Date().getHours();
    let peakHour = '2-4 PM';
    if (currentHour >= 9 && currentHour <= 11) peakHour = '9-11 AM';
    else if (currentHour >= 14 && currentHour <= 16) peakHour = '2-4 PM';
    else if (currentHour >= 18 && currentHour <= 20) peakHour = '6-8 PM';
    
    // Calculate booking trend
    const previousBookingRate = realTimeStats.lectureHallsUsage;
    const trend = (parseFloat(lectureHallUsage) - previousBookingRate).toFixed(1);
    const bookingTrend = trend > 0 ? `+${trend}%` : `${trend}%`;
    
    setRealTimeStats({
      lectureHallsUsage: parseFloat(lectureHallUsage),
      labEquipmentAvailability: parseFloat(labEquipmentAvailability),
      meetingRoomBooking: parseFloat(meetingRoomBooking),
      overallEfficiency: parseFloat(overallEfficiency),
      peakHour: peakHour,
      bookingTrend: bookingTrend,
      lastUpdated: new Date()
    });
  };
  
  // Auto-refresh timer
  useEffect(() => {
    let interval;
    if (isAutoRefresh && lectureHalls.length > 0) {
      interval = setInterval(() => {
        updateRealTimeStats();
      }, refreshInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoRefresh, refreshInterval, lectureHalls.length]);
  
  // Update schedule based on bookings
  useEffect(() => {
    if (lectureHalls.length > 0) {
      const today = new Date();
      const newSchedule = { ...scheduleEvents };
      
      // Simulate real-time booking updates
      const bookedHalls = lectureHalls.filter(h => h.status === 'booked');
      if (bookedHalls.length > 2 && newSchedule['Wed 24']) {
        newSchedule['Wed 24']['12:00 pm'] = 'Workshop Session';
      }
      
      setScheduleEvents(newSchedule);
    }
  }, [lectureHalls]);
  
  // Manual refresh
  const handleManualRefresh = () => {
    updateRealTimeStats();
    // Add visual feedback
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
      refreshBtn.classList.add('animate-spin');
      setTimeout(() => {
        refreshBtn.classList.remove('animate-spin');
      }, 500);
    }
  };
  
  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
  };
  
  // Change refresh interval
  const changeRefreshInterval = (seconds) => {
    setRefreshInterval(seconds * 1000);
  };

  // Quick Analysis Function - Shows alert with insights
  const performQuickAnalysis = () => {
    const totalHalls = lectureHalls.length;
    const availableHalls = lectureHalls.filter(h => h.status === 'available').length;
    const bookedHalls = lectureHalls.filter(h => h.status === 'booked').length;
    const maintenanceHalls = lectureHalls.filter(h => h.status === 'maintenance').length;
    
    const lectureHallsCount = lectureHalls.filter(h => h.type === 'LECTURE_HALL').length;
    const seminarHallsCount = lectureHalls.filter(h => h.type === 'SEMINAR HALL').length;
    
    const avgCapacity = lectureHalls.reduce((sum, hall) => {
      const capacityRange = hall.capacity.split(' - ');
      const avgCap = (parseInt(capacityRange[0]) + parseInt(capacityRange[1])) / 2;
      return sum + avgCap;
    }, 0) / totalHalls;
    
    const facilityStats = {
      airConditioning: lectureHalls.filter(h => h.facilities.airConditioning).length,
      projector: lectureHalls.filter(h => h.facilities.projector).length,
      wifi: lectureHalls.filter(h => h.facilities.wifi).length,
      smartBoard: lectureHalls.filter(h => h.facilities.smartBoard).length,
    };
    
    const utilizationRate = ((bookedHalls / totalHalls) * 100).toFixed(1);
    const availableRate = ((availableHalls / totalHalls) * 100).toFixed(1);
    const maintenanceRate = ((maintenanceHalls / totalHalls) * 100).toFixed(1);
    
    let recommendations = '';
    if (maintenanceHalls > totalHalls * 0.2) {
      recommendations += '\n⚠️ High maintenance rate detected. Schedule regular inspections.';
    }
    if (bookedHalls > totalHalls * 0.7) {
      recommendations += '\n📊 High booking rate. Consider adding more halls during peak hours.';
    }
    if (facilityStats.smartBoard < totalHalls * 0.5) {
      recommendations += '\n💡 Low smart board adoption. Consider upgrading facilities.';
    }
    if (availableHalls === 0) {
      recommendations += '\n🚨 No halls available! Urgent resource allocation needed.';
    } else if (availableHalls < totalHalls * 0.2) {
      recommendations += '\n⚠️ Low availability. Optimize booking schedules.';
    }
    
    if (recommendations === '') {
      recommendations = '\n✅ All metrics look good! Keep up the efficient management.';
    }
    
    // Create formatted alert message
    const analysisMessage = `
╔══════════════════════════════════════════════════════════╗
║                    📊 LECTURE HALLS ANALYSIS REPORT       ║
╚══════════════════════════════════════════════════════════╝

📈 SUMMARY STATISTICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total Lecture Halls: ${totalHalls}
• Available: ${availableHalls} (${availableRate}%)
• Booked: ${bookedHalls} (${utilizationRate}%)
• Maintenance: ${maintenanceHalls} (${maintenanceRate}%)

🏛️ HALL DISTRIBUTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Lecture Halls: ${lectureHallsCount}
• Seminar Halls: ${seminarHallsCount}
• Average Capacity: ${Math.round(avgCapacity)} seats

🔧 FACILITY COVERAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Air Conditioning: ${facilityStats.airConditioning}/${totalHalls} (${Math.round((facilityStats.airConditioning/totalHalls)*100)}%)
• Projector: ${facilityStats.projector}/${totalHalls} (${Math.round((facilityStats.projector/totalHalls)*100)}%)
• WiFi: ${facilityStats.wifi}/${totalHalls} (${Math.round((facilityStats.wifi/totalHalls)*100)}%)
• Smart Board: ${facilityStats.smartBoard}/${totalHalls} (${Math.round((facilityStats.smartBoard/totalHalls)*100)}%)

💡 AI RECOMMENDATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${recommendations}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Analysis generated by AI Campus Assistant
    `;
    
    alert(analysisMessage);
  };

  // Toxic words list with categories
  const toxicWordsList = {
    profanity: ['hate', 'stupid', 'idiot', 'dumb', 'crazy', 'foolish', 'ignorant'],
    violence: ['kill', 'death', 'abuse', 'violent', 'attack', 'destroy', 'damage'],
    harassment: ['harassment', 'bullying', 'threat', 'intimidate', 'pressure'],
    negative: ['useless', 'terrible', 'awful', 'bad', 'worst', 'horrible', 'disgusting']
  };

  const allToxicWords = [...toxicWordsList.profanity, ...toxicWordsList.violence, ...toxicWordsList.harassment, ...toxicWordsList.negative];

  // Function to detect toxic content with category
  const detectToxicContent = (text) => {
    const lowerText = text.toLowerCase();
    const foundWords = [];
    
    for (const word of allToxicWords) {
      if (lowerText.includes(word)) {
        let category = '';
        if (toxicWordsList.profanity.includes(word)) category = 'Profanity';
        else if (toxicWordsList.violence.includes(word)) category = 'Violence';
        else if (toxicWordsList.harassment.includes(word)) category = 'Harassment';
        else if (toxicWordsList.negative.includes(word)) category = 'Negative Language';
        
        foundWords.push({ word, category });
      }
    }
    
    return foundWords.length > 0 ? foundWords : null;
  };

  // Handle description change with toxic detection
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setTempDescription(value);
    
    // Check for toxic content
    const toxicWords = detectToxicContent(value);
    if (toxicWords && toxicWords.length > 0) {
      setToxicWordsFound(toxicWords);
      setShowToxicWarning(true);
    } else {
      setShowToxicWarning(false);
      setToxicWordsFound([]);
    }
    
    setFormData(prev => ({ ...prev, description: value }));
  };

  // Close toxic warning
  const closeToxicWarning = () => {
    setShowToxicWarning(false);
  };

  // Clear toxic content
  const clearToxicContent = () => {
    const cleanText = tempDescription;
    let cleanedText = cleanText;
    
    // Remove toxic words
    for (const item of toxicWordsFound) {
      const regex = new RegExp(item.word, 'gi');
      cleanedText = cleanedText.replace(regex, '***');
    }
    
    setTempDescription(cleanedText);
    setFormData(prev => ({ ...prev, description: cleanedText }));
    setShowToxicWarning(false);
    setToxicWordsFound([]);
    alert('✅ Inappropriate language has been removed. Please review your description before submitting.');
  };

  // Handle image selection from computer
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, localImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, localImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle facility toggle
  const handleFacilityToggle = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.description) {
      const toxicWords = detectToxicContent(formData.description);
      if (toxicWords) {
        alert(`⚠️ Cannot save: Your description contains inappropriate language.\n\nFound: ${toxicWords.map(t => t.word).join(', ')}\n\nPlease remove these words before submitting.`);
        return;
      }
    }
    
    if (editingHall) {
      setLectureHalls(prev => prev.map(hall => 
        hall.id === editingHall.id 
          ? { 
              ...hall, 
              ...formData,
              location: { building: formData.building, floor: parseInt(formData.floor) },
              capacity: formData.capacity,
              type: formData.type,
              status: formData.status,
              localImage: formData.localImage || hall.localImage,
              lastBooked: formData.status === 'booked' ? new Date().toISOString().split('T')[0] : hall.lastBooked
            }
          : hall
      ));
    } else {
      const newHall = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        capacity: formData.capacity,
        location: { building: formData.building, floor: parseInt(formData.floor) },
        status: formData.status,
        localImage: formData.localImage,
        facilities: formData.facilities,
        description: formData.description,
        lastBooked: formData.status === 'booked' ? new Date().toISOString().split('T')[0] : null,
        utilizationRate: 0
      };
      setLectureHalls(prev => [...prev, newHall]);
    }
    
    resetForm();
    // Update real-time stats after data change
    setTimeout(() => updateRealTimeStats(), 100);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      type: 'LECTURE_HALL',
      capacity: '50 - 100',
      building: 'Main Building',
      floor: 1,
      status: 'available',
      localImage: null,
      facilities: {
        airConditioning: false,
        projector: false,
        whiteboard: false,
        soundSystem: false,
        wifi: false,
        smartBoard: false,
        recordingSystem: false,
        lighting: false,
        powerOutlets: false,
        comfortableSeating: false,
      },
      description: ''
    });
    setSelectedImageFile(null);
    setImagePreview(null);
    setTempDescription('');
    setShowToxicWarning(false);
    setToxicWordsFound([]);
    setEditingHall(null);
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle edit
  const handleEdit = (hall) => {
    setEditingHall(hall);
    setFormData({
      name: hall.name,
      type: hall.type,
      capacity: hall.capacity,
      building: hall.location.building,
      floor: hall.location.floor,
      status: hall.status,
      localImage: hall.localImage,
      facilities: { ...hall.facilities },
      description: hall.description
    });
    setTempDescription(hall.description);
    if (hall.localImage) {
      setImagePreview(hall.localImage);
    }
    setShowForm(true);
  };

  // Handle delete with confirmation
  const handleDelete = (id, hallName) => {
    if (window.confirm(`⚠️ Are you sure you want to delete "${hallName}"?\n\nThis action cannot be undone.`)) {
      setLectureHalls(prev => prev.filter(hall => hall.id !== id));
      setTimeout(() => updateRealTimeStats(), 100);
    }
  };

  // Function to download data as CSV
  const downloadCSV = () => {
    const headers = [
      'Hall Name', 'Type', 'Building', 'Floor', 'Capacity', 'Status', 'Description', 'Last Booked', 'Utilization Rate',
      'Air Conditioning', 'Projector', 'Whiteboard', 'Sound System', 'WiFi',
      'Smart Board', 'Recording System', 'Lighting', 'Power Outlets', 'Comfortable Seating'
    ];
    
    const rows = lectureHalls.map(hall => [
      hall.name,
      hall.type === 'LECTURE_HALL' ? 'Lecture Hall' : 'Seminar Hall',
      hall.location.building,
      hall.location.floor,
      hall.capacity,
      hall.status.charAt(0).toUpperCase() + hall.status.slice(1),
      hall.description,
      hall.lastBooked || 'Never',
      hall.utilizationRate || 0,
      hall.facilities.airConditioning ? 'Yes' : 'No',
      hall.facilities.projector ? 'Yes' : 'No',
      hall.facilities.whiteboard ? 'Yes' : 'No',
      hall.facilities.soundSystem ? 'Yes' : 'No',
      hall.facilities.wifi ? 'Yes' : 'No',
      hall.facilities.smartBoard ? 'Yes' : 'No',
      hall.facilities.recordingSystem ? 'Yes' : 'No',
      hall.facilities.lighting ? 'Yes' : 'No',
      hall.facilities.powerOutlets ? 'Yes' : 'No',
      hall.facilities.comfortableSeating ? 'Yes' : 'No'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `lecture_halls_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'available':
        return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: CheckCircle, label: 'Available' };
      case 'booked':
        return { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: Calendar, label: 'Booked' };
      case 'maintenance':
        return { bg: 'bg-rose-500/20', text: 'text-rose-400', icon: Wrench, label: 'Maintenance' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: Home, label: status };
    }
  };

  // Filter lecture halls
  const filteredHalls = lectureHalls.filter(hall => {
    const matchesStatus = filterStatus === 'all' || hall.status === filterStatus;
    const matchesType = filterType === 'all' || hall.type === filterType;
    const matchesSearch = hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hall.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hall.location.building.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  // Stats data based on filtered results
  const stats = {
    totalHalls: filteredHalls.length,
    availableHalls: filteredHalls.filter(h => h.status === 'available').length,
    bookedHalls: filteredHalls.filter(h => h.status === 'booked').length,
    maintenanceHalls: filteredHalls.filter(h => h.status === 'maintenance').length
  };

  // Facility icons mapping
  const facilityIcons = {
    airConditioning: Wind,
    projector: Presentation,
    whiteboard: FileText,
    soundSystem: Mic,
    wifi: Wifi,
    smartBoard: Monitor,
    recordingSystem: Video,
    lighting: Lightbulb,
    powerOutlets: Zap,
    comfortableSeating: Armchair
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'quick-analyze', label: 'Quick Analyze', icon: QuickIcon, highlight: true },
    { id: 'lecture-halls', label: 'Lecture Halls', icon: Home },
    { id: 'labs', label: 'Labs', icon: FlaskConical },
    { id: 'meeting-rooms', label: 'Meeting Rooms', icon: Users },
    { id: 'equipment', label: 'Equipment', icon: Package }
  ];

  // Goals data
  const goals = [
    { name: 'Scalable Design Ops', status: 'done', icon: CircleCheck },
    { name: 'Streamline Delivery', status: 'in progress', icon: CircleDot },
    { name: 'Cross-team Alignment', status: 'closed', icon: CircleDashed }
  ];

  return (
    <div className="flex min-h-screen bg-[#020b08]">
      {/* Toxic Warning Popup Modal */}
      {showToxicWarning && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-rose-900/90 to-rose-800/90 backdrop-blur-xl rounded-2xl border border-rose-500/30 p-6 max-w-md mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-rose-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Inappropriate Content Detected</h3>
            </div>
            
            <p className="text-rose-200/80 mb-3">The following inappropriate words were found in your description:</p>
            
            <div className="bg-black/30 rounded-xl p-3 mb-4 max-h-32 overflow-y-auto">
              {toxicWordsFound.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-rose-500/20 last:border-0">
                  <span className="text-rose-300 font-mono">"{item.word}"</span>
                  <span className="text-xs px-2 py-0.5 bg-rose-500/20 rounded-full text-rose-300">{item.category}</span>
                </div>
              ))}
            </div>
            
            <p className="text-rose-200/70 text-sm mb-5">
              Using inappropriate language is against our community guidelines. Please review and remove these words.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={clearToxicContent}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all"
              >
                Clear Inappropriate Words
              </button>
              <button
                onClick={closeToxicWarning}
                className="px-4 py-2 border border-rose-500/30 rounded-xl text-rose-300 hover:bg-rose-500/10 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Left Sidebar - Glassmorphism */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-[#041915]/80 backdrop-blur-xl border-r border-emerald-500/20 z-20">
        <div className="p-8 border-b border-emerald-500/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Smart Campus
          </h1>
          <p className="text-sm text-emerald-300/60 mt-2">AI Resource Intelligence</p>
        </div>
        
        <nav className="p-6 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isQuickAnalyze = item.id === 'quick-analyze';
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'quick-analyze') {
                    performQuickAnalysis();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
                  isQuickAnalyze 
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/50 hover:shadow-xl hover:scale-105' 
                    : activeTab === item.id 
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10 border border-emerald-500/30' 
                      : 'text-emerald-300/60 hover:bg-emerald-500/10 hover:text-emerald-300'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isQuickAnalyze && (
                  <span className="ml-auto text-xs px-2 py-0.5 bg-white/20 rounded-full animate-pulse">
                    AI
                  </span>
                )}
                {!isQuickAnalyze && activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-80 flex-1 p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header with Date and Score Analytics */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Lecture Halls Analyze Dashboard</h2>
              <p className="text-emerald-300/50 mt-1">Tuesday, March 31, 2026</p>
            </div>
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-emerald-500/20">
              <div className="text-sm text-emerald-300/60 font-medium">AI Performance Score</div>
              <div className="text-4xl font-bold text-emerald-400 mt-1">98.4</div>
              <div className="text-xs text-emerald-400/70 flex items-center justify-end gap-1 mt-1">
                <TrendingUp size={12} />
                +12% vs last week
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* KPI Cards with Glass Effect */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Lecture Halls', value: stats.totalHalls, icon: Home, color: 'emerald' },
                  { label: 'Available', value: stats.availableHalls, icon: CheckCircle, color: 'green' },
                  { label: 'Booked', value: stats.bookedHalls, icon: Calendar, color: 'amber' },
                  { label: 'Maintenance', value: stats.maintenanceHalls, icon: Wrench, color: 'rose' }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-[#041915]/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 bg-${kpi.color}-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <kpi.icon className={`text-${kpi.color}-400`} size={20} />
                      </div>
                      <span className="text-2xl font-bold text-white">{kpi.value}</span>
                    </div>
                    <p className="text-emerald-300/50 text-sm">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Analytics Section with Progress Bars and Circular Charts - REAL-TIME */}
              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="text-emerald-400" size={20} />
                    <h3 className="text-white font-semibold">Resource Utilization (Real-Time)</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-emerald-400" />
                      <span className="text-xs text-emerald-300/50">
                        Last updated: {realTimeStats.lastUpdated.toLocaleTimeString()}
                      </span>
                    </div>
                    <button
                      id="refresh-btn"
                      onClick={handleManualRefresh}
                      className="p-1.5 hover:bg-emerald-500/20 rounded-lg transition-all"
                      title="Manual Refresh"
                    >
                      <RefreshCw size={16} className="text-emerald-400" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleAutoRefresh}
                        className={`px-2 py-1 rounded-lg text-xs transition-all ${
                          isAutoRefresh 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        Auto {isAutoRefresh ? 'ON' : 'OFF'}
                      </button>
                      {isAutoRefresh && (
                        <select
                          value={refreshInterval / 1000}
                          onChange={(e) => changeRefreshInterval(parseInt(e.target.value))}
                          className="bg-black/30 border border-emerald-500/30 rounded-lg px-2 py-1 text-xs text-emerald-300"
                        >
                          <option value={3}>3s</option>
                          <option value={5}>5s</option>
                          <option value={10}>10s</option>
                          <option value={30}>30s</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div key={`usage-${animationKey}`} className="animate-slideIn">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-emerald-300/70">Lecture Halls Usage</span>
                        <span className="text-emerald-400 font-mono">{realTimeStats.lectureHallsUsage}%</span>
                      </div>
                      <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${realTimeStats.lectureHallsUsage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div key={`equipment-${animationKey}`} className="animate-slideIn">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-emerald-300/70">Lab Equipment Availability</span>
                        <span className="text-emerald-400 font-mono">{realTimeStats.labEquipmentAvailability}%</span>
                      </div>
                      <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${realTimeStats.labEquipmentAvailability}%` }}
                        ></div>
                      </div>
                    </div>
                    <div key={`booking-${animationKey}`} className="animate-slideIn">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-emerald-300/70">Meeting Room Booking</span>
                        <span className="text-emerald-400 font-mono">{realTimeStats.meetingRoomBooking}%</span>
                      </div>
                      <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${realTimeStats.meetingRoomBooking}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e20" strokeWidth="8" />
                        <circle 
                          cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="8" 
                          strokeDasharray={`${2 * Math.PI * 45 * (realTimeStats.overallEfficiency / 100)} ${2 * Math.PI * 45}`} 
                          strokeLinecap="round" 
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{realTimeStats.overallEfficiency}%</span>
                      </div>
                    </div>
                    <p className="text-emerald-300/70 text-sm mt-3">Overall Efficiency</p>
                    <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="text-xs text-emerald-300/80 flex items-center gap-1">
                        <Sparkles size={12} /> 
                        AI Insight: Peak usage {realTimeStats.peakHour} • {realTimeStats.bookingTrend} trend
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule/Calendar Widget with Real-Time Updates */}
              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 overflow-hidden">
                <div className="p-5 border-b border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-emerald-400" size={18} />
                    <h3 className="text-white font-semibold">Weekly Planner (Live)</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400/60">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Live updates from bookings</span>
                  </div>
                </div>
                <div className="overflow-x-auto p-4">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {weekDays.map(day => (
                        <div key={day} className="text-center text-emerald-300/60 text-sm font-medium py-2">{day}</div>
                      ))}
                    </div>
                    {timeSlots.map(time => (
                      <div key={time} className="grid grid-cols-7 gap-2 mb-2">
                        <div className="text-emerald-300/40 text-xs flex items-center">{time}</div>
                        {weekDays.map(day => {
                          const event = scheduleEvents[day]?.[time];
                          return (
                            <div key={`${day}-${time}`} className="h-12">
                              {event && (
                                <div className={`text-xs px-2 py-1 rounded-lg text-center ${
                                  event.includes('Design') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                  event.includes('Team') ? 'bg-green-500/20 text-green-300' :
                                  event.includes('Workshop') ? 'bg-purple-500/20 text-purple-300' :
                                  'bg-amber-500/20 text-amber-300'
                                }`}>
                                  {event}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - AI Assistant Card with Real-Time Stats */}
            <div className="space-y-6">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/40 via-emerald-800/20 to-black rounded-2xl p-6 border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Brain className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">AI Campus Assistant</h3>
                    <p className="text-emerald-300/50 text-xs">Smart Campus v2.4 • Live</p>
                  </div>
                </div>
                <p className="text-emerald-300/80 text-sm leading-relaxed mb-4">
                  Real-time analysis: {realTimeStats.lectureHallsUsage}% hall utilization. 
                  {realTimeStats.lectureHallsUsage > 70 
                    ? ' High demand detected. Consider adding more resources.' 
                    : ' Resource allocation is optimal.'}
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400/80 bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                  <Activity size={14} />
                  <span>Active learning: {Math.floor(realTimeStats.overallEfficiency / 10)} insights ready</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                    <Cpu size={14} className="text-emerald-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Sparkles size={14} className="text-emerald-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Gauge size={14} className="text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-emerald-400" />
                  <h3 className="text-white font-semibold">Performance Metrics (Real-Time)</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-emerald-300/70">Resource Efficiency</span>
                    <div className="w-32 h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${realTimeStats.lectureHallsUsage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-emerald-400 font-mono">{realTimeStats.lectureHallsUsage}%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-emerald-300/70">Booking Optimization</span>
                    <div className="w-32 h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${realTimeStats.meetingRoomBooking}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-emerald-400 font-mono">{realTimeStats.meetingRoomBooking}%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-emerald-300/70">Maintenance Uptime</span>
                    <div className="w-32 h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${realTimeStats.labEquipmentAvailability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-emerald-400 font-mono">{realTimeStats.labEquipmentAvailability}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Rocket size={18} className="text-emerald-400" />
                  <h3 className="text-white font-semibold">Strategic Goals</h3>
                </div>
                <p className="text-emerald-300/70 text-sm leading-relaxed mb-4">
                  AI-driven optimization targeting {Math.max(30, Math.floor(realTimeStats.overallEfficiency / 3))}% efficiency gain by Q3.
                </p>
                <div className="space-y-3 pt-3 border-t border-emerald-500/20">
                  {goals.map((goal, idx) => {
                    const Icon = goal.icon;
                    const statusColor = goal.status === 'done' ? 'text-emerald-400' : goal.status === 'in progress' ? 'text-amber-400' : 'text-gray-500';
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon size={14} className={statusColor} />
                          <span className="text-sm text-emerald-300/80">{goal.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          goal.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' :
                          goal.status === 'in progress' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Lecture Halls Management Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Lecture Halls Management</h3>
                <p className="text-emerald-300/50 text-sm mt-1">Manage all lecture halls and their facilities</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={downloadCSV}
                  className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-5 py-2.5 rounded-xl hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
                >
                  <Download size={18} />
                  Export CSV
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(!showForm);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-2.5 rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Plus size={18} />
                  Add Lecture Hall
                </button>
              </div>
            </div>

            {/* Filtering Options */}
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-4 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-emerald-400" />
                  <span className="text-emerald-300/70 text-sm">Filters:</span>
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-black/30 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-emerald-300 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-black/30 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-emerald-300 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Types</option>
                    <option value="LECTURE_HALL">Lecture Hall</option>
                    <option value="SEMINAR HALL">Seminar Hall</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder="Search by name, building..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black/30 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-emerald-300 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64"
                  />
                </div>
              </div>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-[#041915]/80 backdrop-blur-md rounded-2xl border border-emerald-500/20 mb-8 overflow-hidden">
                <div className="p-6 border-b border-emerald-500/20 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    {editingHall ? 'Edit Lecture Hall' : 'Add New Lecture Hall'}
                  </h3>
                  <button onClick={resetForm} className="text-emerald-300/50 hover:text-emerald-400">
                    <XCircle size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Hall Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="LECTURE_HALL">Lecture Hall</option>
                        <option value="SEMINAR HALL">Seminar Hall</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Capacity</label>
                      <select
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="0 - 50">0 - 50</option>
                        <option value="50 - 100">50 - 100</option>
                        <option value="100 - 150">100 - 150</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Building</label>
                      <select
                        name="building"
                        value={formData.building}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Main Building">Main Building</option>
                        <option value="New Building">New Building</option>
                        <option value="Engineering Building">Engineering Building</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Floor (1-10)</label>
                      <input
                        type="number"
                        name="floor"
                        min="1"
                        max="10"
                        value={formData.floor}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    
                    {/* Image Upload Section */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Cover Image (Upload from Computer)</label>
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                            id="imageUpload"
                          />
                          <label
                            htmlFor="imageUpload"
                            className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-emerald-500/30 rounded-xl cursor-pointer hover:border-emerald-500/60 transition-all bg-black/20"
                          >
                            <Upload size={20} className="text-emerald-400" />
                            <span className="text-emerald-300/70">Click to upload image</span>
                          </label>
                          <p className="text-xs text-emerald-300/40 mt-2">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                        </div>
                        
                        {imagePreview && (
                          <div className="relative">
                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl border border-emerald-500/30" />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition-all"
                            >
                              <X size={14} className="text-white" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Description with Toxic Detection */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-emerald-300/70 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={tempDescription}
                        onChange={handleDescriptionChange}
                        rows="4"
                        className={`w-full bg-black/30 border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          showToxicWarning ? 'border-rose-500/50 bg-rose-500/5' : 'border-emerald-500/30'
                        }`}
                        placeholder="Describe the hall facilities and features... (Avoid inappropriate language)"
                      />
                      {showToxicWarning && (
                        <div className="mt-2 flex items-center gap-2 text-rose-400 text-xs">
                          <AlertTriangle size={12} />
                          <span>Inappropriate content detected! Click the warning popup to clear.</span>
                        </div>
                      )}
                      <div className="mt-2 flex gap-2 text-xs text-emerald-300/40">
                        <span>✅ Professional language only</span>
                        <span>•</span>
                        <span>⚠️ Toxic words will be flagged</span>
                      </div>
                    </div>
                    
                    {/* Facilities Section */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-emerald-300/70 mb-3">Facilities</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {Object.keys(formData.facilities).map(facility => {
                          const FacilityIcon = facilityIcons[facility];
                          return (
                            <button
                              key={facility}
                              type="button"
                              onClick={() => handleFacilityToggle(facility)}
                              className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                                formData.facilities[facility] 
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                                  : 'border-emerald-500/20 text-emerald-300/40 hover:bg-emerald-500/10'
                              }`}
                            >
                              {FacilityIcon && <FacilityIcon size={16} />}
                              <span className="text-sm capitalize">{facility.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-emerald-500/20">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-emerald-500/30 rounded-xl text-emerald-300/70 hover:bg-emerald-500/10"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-500 hover:to-green-500"
                    >
                      {editingHall ? 'Update Hall' : 'Add Hall'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lecture Halls Table */}
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-500/20 bg-emerald-900/20">
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Cover</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Hall Name</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Type</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Location</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Capacity</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Status</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Facilities</th>
                      <th className="text-right py-4 px-6 text-emerald-300/60 font-medium text-sm">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                    {filteredHalls.map(hall => {
                      const statusBadge = getStatusBadge(hall.status);
                      const StatusIcon = statusBadge.icon;
                      const facilityCount = Object.values(hall.facilities).filter(v => v).length;
                      
                      return (
                        <tr key={hall.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition">
                          <td className="py-4 px-6">
                            {hall.localImage ? (
                              <img src={hall.localImage} alt={hall.name} className="w-16 h-12 object-cover rounded-lg" />
                            ) : (
                              <div className="w-16 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                <ImageIcon size={24} className="text-emerald-400/40" />
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-white">{hall.name}</p>
                              <p className="text-xs text-emerald-300/40 mt-0.5 line-clamp-1">{hall.description}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-emerald-300/70">
                              {hall.type === 'LECTURE_HALL' ? 'Lecture Hall' : 'Seminar Hall'}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1 text-sm text-emerald-300/70">
                              <Building size={14} className="text-emerald-400/50" />
                              <span>{hall.location.building}</span>
                              <span className="text-emerald-400/30">•</span>
                              <span>Floor {hall.location.floor}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-emerald-300/70">{hall.capacity}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                              <StatusIcon size={12} />
                              {statusBadge.label}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1">
                              <div className="flex -space-x-1">
                                {Object.entries(hall.facilities).filter(([_, value]) => value).slice(0, 3).map(([key]) => {
                                  const FacilityIcon = facilityIcons[key];
                                  return (
                                    <div key={key} className="w-7 h-7 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30">
                                      {FacilityIcon && <FacilityIcon size={12} className="text-emerald-400" />}
                                    </div>
                                  );
                                })}
                              </div>
                              {facilityCount > 3 && (
                                <span className="text-xs text-emerald-300/40 ml-1">+{facilityCount - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(hall)}
                                className="p-2 text-emerald-300/40 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(hall.id, hall.name)}
                                className="p-2 text-emerald-300/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredHalls.length === 0 && (
                  <div className="text-center py-12">
                    <Home className="mx-auto text-emerald-400/30" size={48} />
                    <p className="text-emerald-300/50 mt-2">No lecture halls found. Click "Add Lecture Hall" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 0.5s linear;
        }
      `}</style>
    </div>
  );
};

export default LectureHallsAnalyzeDashboard;
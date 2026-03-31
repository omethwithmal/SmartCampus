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
  Laptop,
  Server,
  Database,
  Code,
  Terminal,
  HardDrive,
  LayoutGrid,
  Settings,
  RefreshCw,
  Clock,
  Users as UsersIcon
} from 'lucide-react';

const LabsAnalyzeDashboard = () => {
  // State for sidebar active tab
  const [activeTab, setActiveTab] = useState('labs');
  
  // State for filtering
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Real-time utilization states
  const [utilizationData, setUtilizationData] = useState({
    labUsageRate: 72,
    computerAvailability: 85,
    softwareLicenseUsage: 68,
    overallEfficiency: 79,
    lastUpdated: new Date(),
    isRefreshing: false,
    activeSessions: 142,
    peakHour: '10:00 AM - 3:00 PM',
    networkLoad: 64,
    powerConsumption: 58
  });
  
  // Real-time lab status updates
  const [realtimeStatus, setRealtimeStatus] = useState({
    activeLabs: 0,
    totalComputersOnline: 0,
    avgResponseTime: '0ms',
    networkHealth: 'Excellent'
  });
  
  // State for toxic warning
  const [showToxicWarning, setShowToxicWarning] = useState(false);
  const [toxicWordsFound, setToxicWordsFound] = useState([]);
  const [tempDescription, setTempDescription] = useState('');
  
  // State for labs data
  const [labs, setLabs] = useState([
    {
      id: 1,
      name: 'Advanced Networking Lab',
      type: 'LECTURE_HALL',
      labCategory: 'Networking Lab',
      capacity: '50 - 100',
      location: { building: 'Engineering Building', floor: 2 },
      status: 'available',
      currentOccupancy: 23,
      onlineComputers: 28,
      coverImage: null,
      localImage: null,
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: true,
        wifi: true,
        smartBoard: true,
        recordingSystem: false,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true,
      },
      equipment: {
        numberOfComputers: 30,
        computerSpecs: 'Intel Core i7, 16GB RAM, 512GB SSD',
        internetAvailability: '1 Gbps Fiber',
        projector: true,
        smartBoard: true,
        printer: true,
        scanner: true,
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
      },
      os: ['Windows 11 Pro', 'Ubuntu 22.04 LTS'],
      timeSlots: ['9:00 AM - 12:00 PM', '1:00 PM - 4:00 PM'],
      description: 'State-of-the-art networking lab with Cisco equipment and high-speed internet connectivity.'
    },
    {
      id: 2,
      name: 'Creative Multimedia Studio',
      type: 'SEMINAR HALL',
      labCategory: 'Multimedia Lab',
      capacity: '0 - 50',
      location: { building: 'New Building', floor: 3 },
      status: 'booked',
      currentOccupancy: 15,
      onlineComputers: 18,
      coverImage: null,
      localImage: null,
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: false,
        soundSystem: true,
        wifi: true,
        smartBoard: false,
        recordingSystem: true,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true,
      },
      equipment: {
        numberOfComputers: 20,
        computerSpecs: 'Apple M2, 16GB RAM, 512GB SSD',
        internetAvailability: '1 Gbps Fiber',
        projector: true,
        smartBoard: false,
        printer: true,
        scanner: false,
      },
      software: {
        java: false,
        python: false,
        cpp: false,
        javascript: true,
        eclipse: false,
        vsCode: true,
        pycharm: false,
        androidStudio: false,
        mysql: false,
        mongodb: false,
      },
      os: ['macOS Ventura'],
      timeSlots: ['10:00 AM - 1:00 PM', '2:00 PM - 5:00 PM'],
      description: 'Professional multimedia lab with video editing and graphic design capabilities.'
    },
    {
      id: 3,
      name: 'Programming Lab',
      type: 'LECTURE_HALL',
      labCategory: 'Computer Lab',
      capacity: '100 - 150',
      location: { building: 'Main Building', floor: 1 },
      status: 'maintenance',
      currentOccupancy: 0,
      onlineComputers: 45,
      coverImage: null,
      localImage: null,
      facilities: {
        airConditioning: true,
        projector: true,
        whiteboard: true,
        soundSystem: false,
        wifi: true,
        smartBoard: true,
        recordingSystem: false,
        lighting: true,
        powerOutlets: true,
        comfortableSeating: true,
      },
      equipment: {
        numberOfComputers: 60,
        computerSpecs: 'Intel Core i5, 8GB RAM, 256GB SSD',
        internetAvailability: '500 Mbps Fiber',
        projector: true,
        smartBoard: true,
        printer: true,
        scanner: false,
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
      },
      os: ['Windows 11 Pro', 'Ubuntu 22.04 LTS'],
      timeSlots: ['8:00 AM - 11:00 AM', '11:30 AM - 2:30 PM', '3:00 PM - 6:00 PM'],
      description: 'Large programming lab with dual-boot systems and all major IDEs installed.'
    }
  ]);

  // Real-time data simulation function
  const simulateRealTimeData = () => {
    // Calculate real-time metrics from current lab data
    const totalComputers = labs.reduce((sum, lab) => sum + lab.equipment.numberOfComputers, 0);
    const onlineComputers = labs.reduce((sum, lab) => sum + (lab.onlineComputers || lab.equipment.numberOfComputers), 0);
    const totalOccupancy = labs.reduce((sum, lab) => sum + (lab.currentOccupancy || 0), 0);
    const activeLabsCount = labs.filter(lab => lab.status === 'available' && (lab.currentOccupancy || 0) > 0).length;
    
    // Calculate usage rates
    const labUsageRate = ((totalOccupancy / labs.reduce((sum, lab) => {
      const capRange = lab.capacity.split(' - ');
      return sum + (parseInt(capRange[0]) + parseInt(capRange[1])) / 2;
    }, 0)) * 100).toFixed(1);
    
    const computerAvailability = ((onlineComputers / totalComputers) * 100).toFixed(1);
    
    // Count software usage (simulated)
    const totalSoftware = labs.reduce((sum, lab) => sum + Object.values(lab.software).filter(v => v).length, 0);
    const maxSoftware = labs.length * 10;
    const softwareLicenseUsage = ((totalSoftware / maxSoftware) * 100).toFixed(1);
    
    // Calculate overall efficiency
    const overallEfficiency = ((parseFloat(labUsageRate) + parseFloat(computerAvailability) + parseFloat(softwareLicenseUsage)) / 3).toFixed(1);
    
    // Update utilization data
    setUtilizationData({
      labUsageRate: parseFloat(labUsageRate),
      computerAvailability: parseFloat(computerAvailability),
      softwareLicenseUsage: parseFloat(softwareLicenseUsage),
      overallEfficiency: parseFloat(overallEfficiency),
      lastUpdated: new Date(),
      isRefreshing: false,
      activeSessions: totalOccupancy,
      peakHour: getPeakHour(),
      networkLoad: Math.floor(Math.random() * 30) + 60,
      powerConsumption: Math.floor(Math.random() * 40) + 50
    });
    
    // Update realtime status
    setRealtimeStatus({
      activeLabs: activeLabsCount,
      totalComputersOnline: onlineComputers,
      avgResponseTime: `${Math.floor(Math.random() * 100) + 20}ms`,
      networkHealth: onlineComputers > totalComputers * 0.8 ? 'Excellent' : onlineComputers > totalComputers * 0.6 ? 'Good' : 'Fair'
    });
  };
  
  // Get peak hour based on current time simulation
  const getPeakHour = () => {
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 11) return '9:00 AM - 12:00 PM';
    if (hour >= 14 && hour <= 16) return '2:00 PM - 4:00 PM';
    return '10:00 AM - 3:00 PM';
  };
  
  // Real-time update interval
  useEffect(() => {
    // Initial data load
    simulateRealTimeData();
    
    // Set up interval to update every 5 seconds
    const interval = setInterval(() => {
      simulateRealTimeData();
    }, 5000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [labs]); // Re-run when labs data changes
  
  // Manual refresh function
  const handleManualRefresh = () => {
    setUtilizationData(prev => ({ ...prev, isRefreshing: true }));
    simulateRealTimeData();
    setTimeout(() => {
      setUtilizationData(prev => ({ ...prev, isRefreshing: false }));
    }, 500);
  };
  
  // Update computer occupancy simulation (real-time user activity)
  const simulateUserActivity = (labId) => {
    setLabs(prevLabs => prevLabs.map(lab => {
      if (lab.id === labId && lab.status === 'available') {
        const maxOccupancy = parseInt(lab.capacity.split(' - ')[1]);
        const currentOccupancy = lab.currentOccupancy || 0;
        const newOccupancy = Math.min(maxOccupancy, currentOccupancy + Math.floor(Math.random() * 5));
        return { ...lab, currentOccupancy: newOccupancy };
      }
      return lab;
    }));
  };
  
  // Update computer status simulation
  const simulateComputerStatus = (labId) => {
    setLabs(prevLabs => prevLabs.map(lab => {
      if (lab.id === labId) {
        const onlineChange = Math.floor(Math.random() * 5) - 2;
        const newOnline = Math.max(0, Math.min(lab.equipment.numberOfComputers, (lab.onlineComputers || lab.equipment.numberOfComputers) + onlineChange));
        return { ...lab, onlineComputers: newOnline };
      }
      return lab;
    }));
  };
  
  // State for form
  const [showForm, setShowForm] = useState(false);
  const [editingLab, setEditingLab] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'LECTURE_HALL',
    labCategory: 'Computer Lab',
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
    equipment: {
      numberOfComputers: 0,
      computerSpecs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      internetAvailability: '1 Gbps Fiber',
      projector: false,
      smartBoard: false,
      printer: false,
      scanner: false,
    },
    software: {
      java: false,
      python: false,
      cpp: false,
      javascript: false,
      eclipse: false,
      vsCode: false,
      pycharm: false,
      androidStudio: false,
      mysql: false,
      mongodb: false,
    },
    os: [],
    timeSlots: [],
    description: ''
  });

  // Quick Analysis Function
  const performQuickAnalysis = () => {
    const totalLabs = labs.length;
    const availableLabs = labs.filter(l => l.status === 'available').length;
    const bookedLabs = labs.filter(l => l.status === 'booked').length;
    const maintenanceLabs = labs.filter(l => l.status === 'maintenance').length;
    
    const networkingLabs = labs.filter(l => l.labCategory === 'Networking Lab').length;
    const multimediaLabs = labs.filter(l => l.labCategory === 'Multimedia Lab').length;
    const computerLabs = labs.filter(l => l.labCategory === 'Computer Lab').length;
    
    const totalComputers = labs.reduce((sum, lab) => sum + (lab.equipment?.numberOfComputers || 0), 0);
    const onlineComputers = labs.reduce((sum, lab) => sum + (lab.onlineComputers || lab.equipment.numberOfComputers), 0);
    const avgComputersPerLab = (totalComputers / totalLabs).toFixed(0);
    
    const facilityStats = {
      airConditioning: labs.filter(l => l.facilities.airConditioning).length,
      projector: labs.filter(l => l.facilities.projector).length,
      smartBoard: labs.filter(l => l.facilities.smartBoard).length,
    };
    
    const utilizationRate = ((bookedLabs / totalLabs) * 100).toFixed(1);
    const availableRate = ((availableLabs / totalLabs) * 100).toFixed(1);
    const maintenanceRate = ((maintenanceLabs / totalLabs) * 100).toFixed(1);
    const onlineRate = ((onlineComputers / totalComputers) * 100).toFixed(1);
    
    let recommendations = '';
    if (maintenanceLabs > totalLabs * 0.2) {
      recommendations += '\n⚠️ High maintenance rate detected. Schedule regular equipment inspections.';
    }
    if (parseFloat(utilizationRate) > 70) {
      recommendations += '\n📊 High booking rate. Consider extending lab hours.';
    }
    if (facilityStats.smartBoard < totalLabs * 0.5) {
      recommendations += '\n💡 Low smart board adoption. Consider upgrading facilities.';
    }
    if (onlineComputers < totalComputers * 0.8) {
      recommendations += '\n🖥️ Low computer availability. Check network connectivity and hardware status.';
    }
    
    if (recommendations === '') {
      recommendations = '\n✅ All metrics look good! Keep up the efficient lab management.';
    }
    
    const analysisMessage = `
╔══════════════════════════════════════════════════════════╗
║           📊 REAL-TIME LABS ANALYSIS REPORT              ║
╚══════════════════════════════════════════════════════════╝

📈 REAL-TIME STATISTICS (Updated: ${utilizationData.lastUpdated.toLocaleTimeString()}):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total Labs: ${totalLabs}
• Available: ${availableLabs} (${availableRate}%)
• Booked: ${bookedLabs} (${utilizationRate}%)
• Maintenance: ${maintenanceLabs} (${maintenanceRate}%)
• Active Sessions: ${utilizationData.activeSessions}
• Computers Online: ${onlineComputers}/${totalComputers} (${onlineRate}%)

🏛️ LAB DISTRIBUTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Networking Labs: ${networkingLabs}
• Multimedia Labs: ${multimediaLabs}
• Computer Labs: ${computerLabs}
• Total Workstations: ${totalComputers}
• Avg. Workstations/Lab: ${avgComputersPerLab}

🔧 REAL-TIME METRICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Lab Usage Rate: ${utilizationData.labUsageRate}%
• Computer Availability: ${utilizationData.computerAvailability}%
• Software License Usage: ${utilizationData.softwareLicenseUsage}%
• Overall Efficiency: ${utilizationData.overallEfficiency}%
• Network Load: ${utilizationData.networkLoad}%
• Power Consumption: ${utilizationData.powerConsumption}%

🌐 NETWORK STATUS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Active Labs: ${realtimeStatus.activeLabs}
• Avg Response Time: ${realtimeStatus.avgResponseTime}
• Network Health: ${realtimeStatus.networkHealth}

💡 AI RECOMMENDATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${recommendations}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Analysis generated in real-time by AI Campus Assistant
    `;
    
    alert(analysisMessage);
  };

  // Toxic words detection
  const toxicWordsList = {
    profanity: ['hate', 'stupid', 'idiot', 'dumb', 'crazy', 'foolish', 'ignorant'],
    violence: ['kill', 'death', 'abuse', 'violent', 'attack', 'destroy', 'damage'],
    harassment: ['harassment', 'bullying', 'threat', 'intimidate', 'pressure'],
    negative: ['useless', 'terrible', 'awful', 'bad', 'worst', 'horrible', 'disgusting']
  };

  const allToxicWords = [...toxicWordsList.profanity, ...toxicWordsList.violence, ...toxicWordsList.harassment, ...toxicWordsList.negative];

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

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setTempDescription(value);
    
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

  const closeToxicWarning = () => {
    setShowToxicWarning(false);
  };

  const clearToxicContent = () => {
    let cleanedText = tempDescription;
    
    for (const item of toxicWordsFound) {
      const regex = new RegExp(item.word, 'gi');
      cleanedText = cleanedText.replace(regex, '***');
    }
    
    setTempDescription(cleanedText);
    setFormData(prev => ({ ...prev, description: cleanedText }));
    setShowToxicWarning(false);
    setToxicWordsFound([]);
    alert('✅ Inappropriate language has been removed.');
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
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

  const removeImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, localImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEquipmentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleSoftwareToggle = (software) => {
    setFormData(prev => ({
      ...prev,
      software: {
        ...prev.software,
        [software]: !prev.software[software]
      }
    }));
  };

  const handleFacilityToggle = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
    }));
  };

  const handleOsToggle = (os) => {
    setFormData(prev => ({
      ...prev,
      os: prev.os.includes(os)
        ? prev.os.filter(o => o !== os)
        : [...prev.os, os]
    }));
  };

  const handleTimeSlotChange = (e) => {
    const slots = e.target.value.split(',').map(slot => slot.trim());
    setFormData(prev => ({ ...prev, timeSlots: slots }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.description) {
      const toxicWords = detectToxicContent(formData.description);
      if (toxicWords) {
        alert(`⚠️ Cannot save: Description contains inappropriate language.`);
        return;
      }
    }
    
    if (editingLab) {
      setLabs(prev => prev.map(lab => 
        lab.id === editingLab.id 
          ? { 
              ...lab, 
              ...formData,
              location: { building: formData.building, floor: parseInt(formData.floor) },
              capacity: formData.capacity,
              type: formData.type,
              status: formData.status,
              localImage: formData.localImage || lab.localImage,
              currentOccupancy: 0,
              onlineComputers: formData.equipment.numberOfComputers
            }
          : lab
      ));
    } else {
      const newLab = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        labCategory: formData.labCategory,
        capacity: formData.capacity,
        location: { building: formData.building, floor: parseInt(formData.floor) },
        status: formData.status,
        localImage: formData.localImage,
        currentOccupancy: 0,
        onlineComputers: formData.equipment.numberOfComputers,
        facilities: formData.facilities,
        equipment: formData.equipment,
        software: formData.software,
        os: formData.os,
        timeSlots: formData.timeSlots,
        description: formData.description
      };
      setLabs(prev => [...prev, newLab]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'LECTURE_HALL',
      labCategory: 'Computer Lab',
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
      equipment: {
        numberOfComputers: 0,
        computerSpecs: 'Intel Core i7, 16GB RAM, 512GB SSD',
        internetAvailability: '1 Gbps Fiber',
        projector: false,
        smartBoard: false,
        printer: false,
        scanner: false,
      },
      software: {
        java: false,
        python: false,
        cpp: false,
        javascript: false,
        eclipse: false,
        vsCode: false,
        pycharm: false,
        androidStudio: false,
        mysql: false,
        mongodb: false,
      },
      os: [],
      timeSlots: [],
      description: ''
    });
    setSelectedImageFile(null);
    setImagePreview(null);
    setTempDescription('');
    setShowToxicWarning(false);
    setToxicWordsFound([]);
    setEditingLab(null);
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (lab) => {
    setEditingLab(lab);
    setFormData({
      name: lab.name,
      type: lab.type,
      labCategory: lab.labCategory,
      capacity: lab.capacity,
      building: lab.location.building,
      floor: lab.location.floor,
      status: lab.status,
      localImage: lab.localImage,
      facilities: { ...lab.facilities },
      equipment: { ...lab.equipment },
      software: { ...lab.software },
      os: [...lab.os],
      timeSlots: [...lab.timeSlots],
      description: lab.description
    });
    setTempDescription(lab.description);
    if (lab.localImage) {
      setImagePreview(lab.localImage);
    }
    setShowForm(true);
  };

  const handleDelete = (id, labName) => {
    if (window.confirm(`⚠️ Are you sure you want to delete "${labName}"?\n\nThis action cannot be undone.`)) {
      setLabs(prev => prev.filter(lab => lab.id !== id));
    }
  };

  const downloadCSV = () => {
    const headers = [
      'Lab Name', 'Type', 'Category', 'Building', 'Floor', 'Capacity', 'Status',
      'Computers', 'Online Computers', 'Current Occupancy', 'Specs', 'Internet',
      'Air Conditioning', 'Projector', 'WiFi', 'Java', 'Python', 'C++', 'VS Code', 'OS', 'Description'
    ];
    
    const rows = labs.map(lab => [
      lab.name,
      lab.type === 'LECTURE_HALL' ? 'Lecture Hall' : 'Seminar Hall',
      lab.labCategory,
      lab.location.building,
      lab.location.floor,
      lab.capacity,
      lab.status,
      lab.equipment.numberOfComputers,
      lab.onlineComputers || lab.equipment.numberOfComputers,
      lab.currentOccupancy || 0,
      lab.equipment.computerSpecs,
      lab.equipment.internetAvailability,
      lab.facilities.airConditioning ? 'Yes' : 'No',
      lab.facilities.projector ? 'Yes' : 'No',
      lab.facilities.wifi ? 'Yes' : 'No',
      lab.software.java ? 'Yes' : 'No',
      lab.software.python ? 'Yes' : 'No',
      lab.software.cpp ? 'Yes' : 'No',
      lab.software.vsCode ? 'Yes' : 'No',
      lab.os.join(', '),
      lab.description
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `labs_realtime_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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

  const filteredLabs = labs.filter(lab => {
    const matchesStatus = filterStatus === 'all' || lab.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || lab.labCategory === filterCategory;
    const matchesSearch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lab.location.building.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const stats = {
    totalLabs: filteredLabs.length,
    availableLabs: filteredLabs.filter(l => l.status === 'available').length,
    bookedLabs: filteredLabs.filter(l => l.status === 'booked').length,
    maintenanceLabs: filteredLabs.filter(l => l.status === 'maintenance').length
  };

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

  const navItems = [
    { id: 'quick-analyze', label: 'Quick Analyze', icon: QuickIcon, highlight: true },
    { id: 'lecture-halls', label: 'Lecture Halls', icon: Home },
    { id: 'labs', label: 'Labs', icon: FlaskConical },
    { id: 'meeting-rooms', label: 'Meeting Rooms', icon: Users },
    { id: 'equipment', label: 'Equipment', icon: Package }
  ];

  const weekDays = ['Mon 22', 'Tue 23', 'Wed 24', 'Thu 25', 'Fri 26', 'Sat 27'];
  const timeSlots = ['9:00 am', '10:00 am', '11:00 am', '12:00 pm'];
  const scheduleEvents = {
    'Mon 22': { '9:00 am': 'Networking Lab', '10:00 am': '', '11:00 am': 'Programming', '12:00 pm': '' },
    'Tue 23': { '9:00 am': '', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
    'Wed 24': { '9:00 am': 'Multimedia', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
    'Thu 25': { '9:00 am': '', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
    'Fri 26': { '9:00 am': '', '10:00 am': '', '11:00 am': 'Database Lab', '12:00 pm': '' },
    'Sat 27': { '9:00 am': '', '10:00 am': '', '11:00 am': '', '12:00 pm': '' },
  };

  const goals = [
    { name: 'Upgrade Lab Equipment', status: 'in progress', icon: CircleDot },
    { name: 'Install Latest Software', status: 'done', icon: CircleCheck },
    { name: 'Expand Networking Lab', status: 'closed', icon: CircleDashed }
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
            
            <p className="text-rose-200/80 mb-3">The following inappropriate words were found:</p>
            
            <div className="bg-black/30 rounded-xl p-3 mb-4 max-h-32 overflow-y-auto">
              {toxicWordsFound.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-rose-500/20 last:border-0">
                  <span className="text-rose-300 font-mono">"{item.word}"</span>
                  <span className="text-xs px-2 py-0.5 bg-rose-500/20 rounded-full text-rose-300">{item.category}</span>
                </div>
              ))}
            </div>
            
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

      {/* Fixed Left Sidebar */}
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
          {/* Header with Real-time Status */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Labs Analyze Dashboard</h2>
              <p className="text-emerald-300/50 mt-1 flex items-center gap-2">
                <Clock size={14} className="animate-pulse" />
                Real-time updates every 5 seconds • Last updated: {utilizationData.lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <button
                onClick={handleManualRefresh}
                className={`bg-[#041915]/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-emerald-500/20 hover:border-emerald-500/40 transition-all ${utilizationData.isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw size={18} className="text-emerald-400" />
              </button>
              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-emerald-500/20">
                <div className="text-sm text-emerald-300/60 font-medium">AI Performance Score</div>
                <div className="text-4xl font-bold text-emerald-400 mt-1">{utilizationData.overallEfficiency}</div>
                <div className="text-xs text-emerald-400/70 flex items-center justify-end gap-1 mt-1">
                  <TrendingUp size={12} />
                  Real-time
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* KPI Cards with Real-time Values */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Labs', value: stats.totalLabs, icon: FlaskConical, color: 'emerald', suffix: '' },
                  { label: 'Available', value: stats.availableLabs, icon: CheckCircle, color: 'green', suffix: '' },
                  { label: 'Active Sessions', value: utilizationData.activeSessions, icon: UsersIcon, color: 'blue', suffix: '' },
                  { label: 'Computers Online', value: realtimeStatus.totalComputersOnline, icon: Laptop, color: 'purple', suffix: '' }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-[#041915]/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 bg-${kpi.color}-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <kpi.icon className={`text-${kpi.color}-400`} size={20} />
                      </div>
                      <span className="text-2xl font-bold text-white">{kpi.value}{kpi.suffix}</span>
                    </div>
                    <p className="text-emerald-300/50 text-sm">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Real-time Analytics Section with Animated Progress Bars */}
              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="text-emerald-400" size={20} />
                    <h3 className="text-white font-semibold">Real-time Lab Resource Utilization</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400/60">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Data</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-emerald-300/70">Lab Usage Rate</span>
                        <span className="text-emerald-400 font-mono">{utilizationData.labUsageRate}%</span>
                      </div>
                      <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${utilizationData.labUsageRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-emerald-300/70">Computer Availability</span>
                        <span className="text-emerald-400 font-mono">{utilizationData.computerAvailability}%</span>
                      </div>
                      <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${utilizationData.computerAvailability}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-emerald-300/70">Software License Usage</span>
                        <span className="text-emerald-400 font-mono">{utilizationData.softwareLicenseUsage}%</span>
                      </div>
                      <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${utilizationData.softwareLicenseUsage}%` }}
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
                          strokeDasharray={`${2 * Math.PI * 45 * (utilizationData.overallEfficiency / 100)} ${2 * Math.PI * 45}`} 
                          strokeLinecap="round" 
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-500 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{utilizationData.overallEfficiency}%</span>
                      </div>
                    </div>
                    <p className="text-emerald-300/70 text-sm mt-3">Overall Efficiency</p>
                    <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="text-xs text-emerald-300/80 flex items-center gap-1">
                        <Sparkles size={12} /> 
                        AI Insight: Peak usage {utilizationData.peakHour}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Additional Real-time Metrics */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-500/20">
                  <div className="text-center">
                    <div className="text-xs text-emerald-300/50">Network Load</div>
                    <div className="text-lg font-bold text-white mt-1">{utilizationData.networkLoad}%</div>
                    <div className="w-full h-1 bg-emerald-500/20 rounded-full mt-2">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${utilizationData.networkLoad}%` }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-emerald-300/50">Power Consumption</div>
                    <div className="text-lg font-bold text-white mt-1">{utilizationData.powerConsumption}%</div>
                    <div className="w-full h-1 bg-emerald-500/20 rounded-full mt-2">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${utilizationData.powerConsumption}%` }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-emerald-300/50">Response Time</div>
                    <div className="text-lg font-bold text-white mt-1">{realtimeStatus.avgResponseTime}</div>
                    <div className="text-xs text-emerald-400/60 mt-1">{realtimeStatus.networkHealth}</div>
                  </div>
                </div>
              </div>

              {/* Schedule Widget */}
              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 overflow-hidden">
                <div className="p-5 border-b border-emerald-500/20 flex items-center gap-2">
                  <Calendar className="text-emerald-400" size={18} />
                  <h3 className="text-white font-semibold">Lab Schedule</h3>
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
                                  event.includes('Networking') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                  event.includes('Programming') ? 'bg-blue-500/20 text-blue-300' :
                                  event.includes('Multimedia') ? 'bg-purple-500/20 text-purple-300' :
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

            {/* Right Column - Real-time Status */}
            <div className="space-y-6">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/40 via-emerald-800/20 to-black rounded-2xl p-6 border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Brain className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">AI Lab Assistant</h3>
                    <p className="text-emerald-300/50 text-xs">Real-time monitoring • Active</p>
                  </div>
                </div>
                <p className="text-emerald-300/80 text-sm leading-relaxed mb-4">
                  I'm monitoring {labs.length} labs in real-time. Currently {realtimeStatus.activeLabs} labs are active with {realtimeStatus.totalComputersOnline} computers online.
                  {utilizationData.labUsageRate > 70 ? ' High demand detected. Consider optimizing schedules.' : ' Resource distribution is optimal.'}
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400/80 bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                  <Activity size={14} className="animate-pulse" />
                  <span>Live monitoring: {labs.filter(l => l.status === 'available' && (l.currentOccupancy || 0) > 0).length} active labs • {realtimeStatus.totalComputersOnline} computers online</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                    <Cpu size={14} className="text-emerald-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Sparkles size={14} className="text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-emerald-400" />
                  <h3 className="text-white font-semibold">Real-time Performance</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-300/70 text-sm">Computer Utilization</span>
                      <span className="text-sm text-emerald-400">{utilizationData.computerAvailability}%</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${utilizationData.computerAvailability}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-300/70 text-sm">Software Compliance</span>
                      <span className="text-sm text-emerald-400">94%</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-300/70 text-sm">Network Health</span>
                      <span className="text-sm text-emerald-400">{realtimeStatus.networkHealth === 'Excellent' ? '99.9%' : '97.5%'}</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: realtimeStatus.networkHealth === 'Excellent' ? '99.9' : '97.5' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Rocket size={18} className="text-emerald-400" />
                  <h3 className="text-white font-semibold">Real-time Goals</h3>
                </div>
                <p className="text-emerald-300/70 text-sm leading-relaxed mb-4">
                  AI-driven optimization targeting {Math.min(95, Math.floor(utilizationData.overallEfficiency + 15))}% efficiency by next quarter.
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

          {/* Labs Management Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Labs Management</h3>
                <p className="text-emerald-300/50 text-sm mt-1">Real-time lab monitoring and management</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={downloadCSV}
                  className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-5 py-2.5 rounded-xl hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
                >
                  <Download size={18} />
                  Export Real-time Data
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(!showForm);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-2.5 rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Plus size={18} />
                  Add Lab
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
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-black/30 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-emerald-300 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Networking Lab">Networking Lab</option>
                    <option value="Multimedia Lab">Multimedia Lab</option>
                    <option value="Computer Lab">Computer Lab</option>
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
                    {editingLab ? 'Edit Lab' : 'Add New Lab'}
                  </h3>
                  <button onClick={resetForm} className="text-emerald-300/50 hover:text-emerald-400">
                    <XCircle size={20} />
                  </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <style>
                    {`
                      .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                      }
                    `}
                  </style>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-emerald-300/70 mb-2">Lab Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                        <label className="block text-sm font-medium text-emerald-300/70 mb-2">Lab Category</label>
                        <select
                          name="labCategory"
                          value={formData.labCategory}
                          onChange={handleInputChange}
                          className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Networking Lab">Networking Lab</option>
                          <option value="Multimedia Lab">Multimedia Lab</option>
                          <option value="Computer Lab">Computer Lab</option>
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
                      <div>
                        <label className="block text-sm font-medium text-emerald-300/70 mb-2">Number of Computers</label>
                        <input
                          type="number"
                          name="numberOfComputers"
                          value={formData.equipment.numberOfComputers}
                          onChange={handleEquipmentChange}
                          className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-emerald-300/70 mb-2">Computer Specs</label>
                        <select
                          name="computerSpecs"
                          value={formData.equipment.computerSpecs}
                          onChange={handleEquipmentChange}
                          className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Intel Core i5, 8GB RAM, 256GB SSD">Intel Core i5, 8GB RAM, 256GB SSD</option>
                          <option value="Intel Core i7, 16GB RAM, 512GB SSD">Intel Core i7, 16GB RAM, 512GB SSD</option>
                          <option value="Intel Core i9, 32GB RAM, 1TB SSD">Intel Core i9, 32GB RAM, 1TB SSD</option>
                          <option value="Apple M1, 8GB RAM, 256GB SSD">Apple M1, 8GB RAM, 256GB SSD</option>
                          <option value="Apple M2, 16GB RAM, 512GB SSD">Apple M2, 16GB RAM, 512GB SSD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-emerald-300/70 mb-2">Internet Availability</label>
                        <select
                          name="internetAvailability"
                          value={formData.equipment.internetAvailability}
                          onChange={handleEquipmentChange}
                          className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="100 Mbps">100 Mbps</option>
                          <option value="500 Mbps Fiber">500 Mbps Fiber</option>
                          <option value="1 Gbps Fiber">1 Gbps Fiber</option>
                          <option value="10 Gbps Fiber">10 Gbps Fiber</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-emerald-300/70 mb-2">Time Slots</label>
                        <input
                          type="text"
                          value={formData.timeSlots.join(', ')}
                          onChange={handleTimeSlotChange}
                          placeholder="e.g., 9:00 AM - 12:00 PM, 1:00 PM - 4:00 PM"
                          className="w-full bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <p className="text-xs text-emerald-300/40 mt-1">Separate multiple time slots with commas</p>
                      </div>
                      
                      {/* Image Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-emerald-300/70 mb-2">Cover Image</label>
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
                      
                      {/* Equipment Checkboxes */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-emerald-300/70 mb-3">Equipment</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['projector', 'smartBoard', 'printer', 'scanner'].map(equip => (
                            <label key={equip} className="flex items-center gap-2 p-2 rounded-lg border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/10">
                              <input
                                type="checkbox"
                                name={equip}
                                checked={formData.equipment[equip]}
                                onChange={handleEquipmentChange}
                                className="w-4 h-4 accent-emerald-500"
                              />
                              <span className="text-sm text-emerald-300/70 capitalize">{equip}</span>
                            </label>
                          ))}
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
                      
                      {/* Operating Systems */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-emerald-300/70 mb-3">Operating Systems</label>
                        <div className="flex gap-4 flex-wrap">
                          {['Windows 11 Pro', 'Ubuntu 22.04 LTS', 'macOS Ventura'].map(os => (
                            <label key={os} className="flex items-center gap-2 p-2 rounded-lg border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/10">
                              <input
                                type="checkbox"
                                checked={formData.os.includes(os)}
                                onChange={() => handleOsToggle(os)}
                                className="w-4 h-4 accent-emerald-500"
                              />
                              <span className="text-sm text-emerald-300/70">{os}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Software Section */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-emerald-300/70 mb-3">Software & IDEs</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {Object.keys(formData.software).map(software => (
                            <button
                              key={software}
                              type="button"
                              onClick={() => handleSoftwareToggle(software)}
                              className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                                formData.software[software] 
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                                  : 'border-emerald-500/20 text-emerald-300/40 hover:bg-emerald-500/10'
                              }`}
                            >
                              {software === 'java' && <Code size={14} />}
                              {software === 'python' && <Terminal size={14} />}
                              {software === 'cpp' && <Code size={14} />}
                              {software === 'javascript' && <Code size={14} />}
                              {software === 'eclipse' && <LayoutGrid size={14} />}
                              {software === 'vsCode' && <Code size={14} />}
                              {software === 'pycharm' && <Terminal size={14} />}
                              {software === 'androidStudio' && <LayoutGrid size={14} />}
                              {software === 'mysql' && <Database size={14} />}
                              {software === 'mongodb' && <Database size={14} />}
                              <span className="text-sm capitalize">{software}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Description */}
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
                          placeholder="Describe the lab facilities, equipment, and features..."
                        />
                        {showToxicWarning && (
                          <div className="mt-2 flex items-center gap-2 text-rose-400 text-xs">
                            <AlertTriangle size={12} />
                            <span>Inappropriate content detected!</span>
                          </div>
                        )}
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
                        {editingLab ? 'Update Lab' : 'Add Lab'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Labs Table with Real-time Indicators */}
            <div className="bg-[#041915]/60 backdrop-blur-md rounded-2xl border border-emerald-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-500/20 bg-emerald-900/20">
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Cover</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Lab Name</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Category</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Location</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Computers</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Status</th>
                      <th className="text-left py-4 px-6 text-emerald-300/60 font-medium text-sm">Real-time</th>
                      <th className="text-right py-4 px-6 text-emerald-300/60 font-medium text-sm">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                    {filteredLabs.map(lab => {
                      const statusBadge = getStatusBadge(lab.status);
                      const StatusIcon = statusBadge.icon;
                      const softwareCount = Object.values(lab.software).filter(v => v).length;
                      const occupancyRate = lab.currentOccupancy ? ((lab.currentOccupancy / parseInt(lab.capacity.split(' - ')[1])) * 100).toFixed(0) : 0;
                      
                      return (
                        <tr key={lab.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition">
                          <td className="py-4 px-6">
                            {lab.localImage ? (
                              <img src={lab.localImage} alt={lab.name} className="w-16 h-12 object-cover rounded-lg" />
                            ) : (
                              <div className="w-16 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                <Laptop size={24} className="text-emerald-400/40" />
                              </div>
                            )}
                           </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-white">{lab.name}</p>
                              <p className="text-xs text-emerald-300/40 mt-0.5 line-clamp-1">{lab.description}</p>
                            </div>
                           </td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              lab.labCategory === 'Networking Lab' ? 'bg-blue-500/20 text-blue-400' :
                              lab.labCategory === 'Multimedia Lab' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {lab.labCategory}
                            </span>
                           </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1 text-sm text-emerald-300/70">
                              <Building size={14} className="text-emerald-400/50" />
                              <span>{lab.location.building}</span>
                              <span className="text-emerald-400/30">•</span>
                              <span>Floor {lab.location.floor}</span>
                            </div>
                           </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1">
                              <Laptop size={14} className="text-emerald-400/50" />
                              <span className="text-sm text-emerald-300/70">{lab.onlineComputers || lab.equipment.numberOfComputers}/{lab.equipment.numberOfComputers}</span>
                            </div>
                           </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                              <StatusIcon size={12} />
                              {statusBadge.label}
                            </span>
                           </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <UsersIcon size={12} className="text-emerald-400/50" />
                                <span className="text-xs text-emerald-300/70">{lab.currentOccupancy || 0} active</span>
                              </div>
                              {lab.status === 'available' && (
                                <div className="w-20 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                    style={{ width: `${occupancyRate}%` }}
                                  ></div>
                                </div>
                              )}
                            </div>
                           </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(lab)}
                                className="p-2 text-emerald-300/40 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(lab.id, lab.name)}
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
                {filteredLabs.length === 0 && (
                  <div className="text-center py-12">
                    <FlaskConical className="mx-auto text-emerald-400/30" size={48} />
                    <p className="text-emerald-300/50 mt-2">No labs found. Click "Add Lab" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LabsAnalyzeDashboard;
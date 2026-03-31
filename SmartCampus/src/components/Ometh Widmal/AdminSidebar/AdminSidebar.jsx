import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaFlask,
  FaUsers,
  FaTools,
  FaBars,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [active, setActive] = useState("Lecture Halls");
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      name: "Lecture Halls",
      icon: <FaChalkboardTeacher />,
    },
    {
      name: "Labs",
      icon: <FaFlask />,
    },
    {
      name: "Meeting Rooms",
      icon: <FaUsers />,
    },
    {
      name: "Equipment",
      icon: <FaTools />,
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gradient-to-b from-black to-green-900 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } shadow-lg`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <h1 className="text-xl font-bold text-green-400">Dashboard</h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-400 text-xl"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-4 p-3 mx-3 rounded-lg cursor-pointer transition-all duration-300 
              ${
                active === item.name
                  ? "bg-green-500 text-black shadow-md"
                  : "hover:bg-green-600 hover:text-black"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-md">{item.name}</span>}
            </li>
          ))}
        </ul>

        {/* Bottom */}
        <div className="absolute bottom-5 w-full text-center">
          {isOpen && (
            <p className="text-sm text-green-400">Admin Panel</p>
          )}
        </div>
      </div>

      {/* Content Area (optional) */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold">
          {active}
        </h2>
      </div>
    </div>
  );
};

export default AdminSidebar;
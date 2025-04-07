import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCloudDownload, AiOutlineVideoCamera, AiOutlineSetting } from 'react-icons/ai';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <AiOutlineHome size={22} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/downloads" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <AiOutlineCloudDownload size={22} />
          <span>Downloads</span>
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <AiOutlineVideoCamera size={22} />
          <span>Library</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <AiOutlineSetting size={22} />
          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
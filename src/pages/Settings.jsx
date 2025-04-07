import React, { useState } from 'react';
import { useDownloadContext } from '@/context/DownloadContext';
import { AiOutlineClear, AiOutlineInfoCircle, AiOutlineLoading } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { getPlatforms } from '@/services/api';

const Settings = () => {
  const { clearAll } = useDownloadContext();
  const [isLoading, setIsLoading] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [showPlatforms, setShowPlatforms] = useState(false);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all download history and library data? This action cannot be undone.')) {
      clearAll();
      toast.success('All data cleared successfully');
    }
  };

  const loadPlatforms = async () => {
    if (platforms.length > 0) {
      setShowPlatforms(!showPlatforms);
      return;
    }
    
    setIsLoading(true);
    try {
      const platformsList = await getPlatforms();
      setPlatforms(platformsList);
      setShowPlatforms(true);
    } catch (error) {
      toast.error('Failed to load supported platforms');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="card mb-6">
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">Data Management</h3>
          <p className="text-sm text-gray-600 mb-4">
            Clear all download history and library data
          </p>
          <button 
            onClick={handleClearData}
            className="btn btn-danger w-full"
          >
            <AiOutlineClear />
            Clear All Data
          </button>
        </div>
      </div>
      
      <div className="card mb-6">
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">Supported Platforms</h3>
          <p className="text-sm text-gray-600 mb-4">
            View all supported video platforms
          </p>
          <button 
            onClick={loadPlatforms}
            className="btn btn-secondary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <AiOutlineLoading className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <AiOutlineInfoCircle />
                {showPlatforms ? 'Hide Platforms' : 'Show Platforms'}
              </>
            )}
          </button>
          
          {showPlatforms && platforms.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg max-h-60 overflow-y-auto">
              <ul className="space-y-1">
                {platforms.map((platform, index) => (
                  <li key={index} className="text-sm">
                    • {platform}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="card">
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">About VidDownloader</h3>
          <p className="text-sm text-gray-600">
            Version 1.0.0
          </p>
          <p className="text-sm text-gray-600 mt-2">
            VidDownloader is a free app that allows you to download videos from multiple platforms for offline viewing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
import React, { createContext, useContext, useEffect, useState } from 'react';

const DownloadContext = createContext(null);

export const useDownloadContext = () => {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownloadContext must be used within a DownloadProvider');
  }
  return context;
};

export const DownloadProvider = ({ children }) => {
  const [videoInfoList, setVideoInfoList] = useState([]);
  const [libraryList, setLibraryList] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedInfoList = localStorage.getItem('videoInfoList');
      const savedLibrary = localStorage.getItem('videoLibrary');
      
      if (savedInfoList) {
        setVideoInfoList(JSON.parse(savedInfoList));
      }
      
      if (savedLibrary) {
        setLibraryList(JSON.parse(savedLibrary));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever the lists change
  useEffect(() => {
    try {
      localStorage.setItem('videoInfoList', JSON.stringify(videoInfoList));
      localStorage.setItem('videoLibrary', JSON.stringify(libraryList));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [videoInfoList, libraryList]);

  const addVideoInfo = (videoInfo) => {
    setVideoInfoList(prev => {
      // Check if the video is already in the list
      const exists = prev.some(v => v.videoId === videoInfo.videoId);
      if (exists) {
        return prev.map(v => v.videoId === videoInfo.videoId ? videoInfo : v);
      }
      return [...prev, videoInfo];
    });
  };

  const removeFromInfo = (videoId) => {
    setVideoInfoList(prev => prev.filter(v => v.videoId !== videoId));
  };

  const addToLibrary = (videoData) => {
    setLibraryList(prev => {
      // Check if the video is already in the library
      const exists = prev.some(v => v.videoId === videoData.videoId);
      if (exists) {
        return prev.map(v => v.videoId === videoData.videoId ? videoData : v);
      }
      return [...prev, videoData];
    });
  };

  const removeFromLibrary = (videoId) => {
    setLibraryList(prev => prev.filter(v => v.videoId !== videoId));
  };

  const clearAll = () => {
    setVideoInfoList([]);
    setLibraryList([]);
    localStorage.removeItem('videoInfoList');
    localStorage.removeItem('videoLibrary');
  };

  return (
    <DownloadContext.Provider
      value={{
        videoInfoList,
        libraryList,
        addVideoInfo,
        removeFromInfo,
        addToLibrary,
        removeFromLibrary,
        clearAll,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};
import React from 'react';
import DownloadForm from '@/components/DownloadForm';

const Home = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">Download Videos</h2>
      <p className="text-gray-600 mb-6">
        Enter a video URL from YouTube, Vimeo, Facebook, or other supported platforms to download for offline viewing.
      </p>
      
      <DownloadForm />
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">How to use:</h3>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Copy a video URL from your browser</li>
          <li>Paste it into the input field above</li>
          <li>Click "Get Video Info" to see available formats</li>
          <li>Select your preferred quality</li>
          <li>Download and enjoy offline!</li>
        </ol>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-1">Supported Platforms</h3>
        <p className="text-blue-700 text-sm">
          YouTube, Vimeo, Facebook, Instagram, Twitter, TikTok, and many more!
        </p>
      </div>
    </div>
  );
};

export default Home;
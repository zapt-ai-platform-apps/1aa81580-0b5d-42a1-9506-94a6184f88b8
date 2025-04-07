import React from 'react';
import { Link } from 'react-router-dom';
import { useDownloadContext } from '@/context/DownloadContext';
import VideoCard from '@/components/VideoCard';
import { AiOutlineVideoCamera } from 'react-icons/ai';

const Library = () => {
  const { libraryList } = useDownloadContext();

  if (libraryList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <AiOutlineVideoCamera size={32} className="text-gray-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">Your library is empty</h2>
        <p className="text-gray-600 mb-4">
          Downloaded videos will appear here for easy access.
        </p>
        <Link to="/" className="btn btn-primary">
          Download Videos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {libraryList.map((video) => (
          <VideoCard key={video.videoId} video={video} inLibrary={true} />
        ))}
      </div>
    </div>
  );
};

export default Library;
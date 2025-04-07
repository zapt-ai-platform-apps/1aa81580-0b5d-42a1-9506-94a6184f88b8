import React from 'react';
import { Link } from 'react-router-dom';
import { useDownloadContext } from '@/context/DownloadContext';
import VideoCard from '@/components/VideoCard';
import { AiOutlineHome } from 'react-icons/ai';

const Downloads = () => {
  const { videoInfoList } = useDownloadContext();

  if (videoInfoList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <AiOutlineHome size={32} className="text-gray-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">No videos to download</h2>
        <p className="text-gray-600 mb-4">
          You haven't added any videos to download yet.
        </p>
        <Link to="/" className="btn btn-primary">
          Add Videos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Downloads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoInfoList.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Downloads;
import React, { useState } from 'react';
import { AiOutlineDownload, AiOutlineLoading, AiOutlineDelete } from 'react-icons/ai';
import { useDownloadContext } from '@/context/DownloadContext';
import { downloadVideo } from '@/services/api';
import toast from 'react-hot-toast';

const VideoCard = ({ video, inLibrary = false }) => {
  const { addToLibrary, removeFromInfo, removeFromLibrary } = useDownloadContext();
  const [selectedFormat, setSelectedFormat] = useState(video.formats[0]?.formatId || '');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!selectedFormat) {
      toast.error('Please select a format');
      return;
    }

    setIsDownloading(true);
    try {
      const downloadUrl = await downloadVideo(video.videoId, selectedFormat);
      
      // Trigger browser download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${video.title}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Add to library
      addToLibrary({
        ...video,
        format: video.formats.find(f => f.formatId === selectedFormat),
        downloadDate: new Date().toISOString()
      });
      
      // If not in library view, remove from info
      if (!inLibrary) {
        removeFromInfo(video.videoId);
      }
      
      toast.success('Download started!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error(error.message || 'Failed to download video');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = () => {
    if (inLibrary) {
      removeFromLibrary(video.videoId);
      toast.success('Removed from library');
    } else {
      removeFromInfo(video.videoId);
      toast.success('Removed from download queue');
    }
  };

  return (
    <div className="card">
      <img 
        src={video.thumbnail} 
        alt={video.title} 
        className="video-thumb"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{video.duration} • {video.uploader}</p>
        
        {!inLibrary && (
          <div className="mb-3">
            <label htmlFor={`format-${video.videoId}`} className="block text-sm font-medium mb-1">
              Select Format
            </label>
            <select
              id={`format-${video.videoId}`}
              className="input"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              disabled={isDownloading}
            >
              {video.formats.map((format) => (
                <option key={format.formatId} value={format.formatId}>
                  {format.quality} - {format.filesize}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="flex gap-2">
          {!inLibrary && (
            <button
              onClick={handleDownload}
              disabled={isDownloading || !selectedFormat}
              className="btn btn-primary flex-1"
            >
              {isDownloading ? (
                <>
                  <AiOutlineLoading className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <AiOutlineDownload />
                  Download
                </>
              )}
            </button>
          )}
          
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={isDownloading}
          >
            <AiOutlineDelete />
          </button>
        </div>
        
        {inLibrary && (
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-600">Downloaded: {new Date(video.downloadDate).toLocaleDateString()}</span>
            <span className="badge badge-green">{video.format.quality}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
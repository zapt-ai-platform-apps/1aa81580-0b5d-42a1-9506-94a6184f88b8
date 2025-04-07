import React, { useState } from 'react';
import { AiOutlineDownload, AiOutlineLoading } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDownloadContext } from '@/context/DownloadContext';
import { extractVideoInfo } from '@/services/api';

const DownloadForm = () => {
  const { addVideoInfo } = useDownloadContext();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      const videoInfo = await extractVideoInfo(url);
      addVideoInfo(videoInfo);
      setUrl('');
      toast.success('Video information retrieved successfully!');
    } catch (error) {
      console.error('Error extracting video info:', error);
      toast.error(error.message || 'Failed to get video information');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <label htmlFor="video-url" className="font-medium">
          Enter video URL
        </label>
        <input
          id="video-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <>
              <AiOutlineLoading className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <AiOutlineDownload />
              Get Video Info
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default DownloadForm;
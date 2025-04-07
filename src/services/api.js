import axios from 'axios';
import * as Sentry from '@sentry/browser';

export const extractVideoInfo = async (url) => {
  try {
    console.log('Extracting video info for:', url);
    const response = await axios.post('/api/videoInfo', { url });
    console.log('Received video info:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error extracting video info:', error);
    Sentry.captureException(error, {
      extra: { url }
    });
    throw new Error(error.response?.data?.error || 'Failed to extract video information');
  }
};

export const downloadVideo = async (videoId, formatId) => {
  try {
    console.log('Requesting download for video:', videoId, 'format:', formatId);
    const response = await axios.post('/api/download', { videoId, formatId });
    console.log('Received download URL:', response.data.downloadUrl);
    return response.data.downloadUrl;
  } catch (error) {
    console.error('Error downloading video:', error);
    Sentry.captureException(error, {
      extra: { videoId, formatId }
    });
    throw new Error(error.response?.data?.error || 'Failed to download video');
  }
};

export const getPlatforms = async () => {
  try {
    console.log('Fetching supported platforms');
    const response = await axios.get('/api/platforms');
    console.log('Received platforms:', response.data);
    return response.data.platforms;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    Sentry.captureException(error);
    throw new Error(error.response?.data?.error || 'Failed to get supported platforms');
  }
};
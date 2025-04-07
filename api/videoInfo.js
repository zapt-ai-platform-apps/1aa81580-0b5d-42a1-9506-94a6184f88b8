import { exec } from 'child_process';
import { promisify } from 'util';
import Sentry from './_sentry.js';

const execPromise = promisify(exec);

export default async function handler(req, res) {
  console.log('Received video info request');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log('Processing URL:', url);
    
    // Mock response for now (in production, this would call yt-dlp)
    // This simulates the response we'd get from yt-dlp
    const mockVideoInfo = {
      videoId: 'mock' + Date.now(),
      title: 'Sample Video Title',
      thumbnail: 'https://picsum.photos/640/360',
      duration: '10:30',
      uploader: 'Sample Channel',
      formats: [
        {
          formatId: 'mp4-720',
          quality: '720p',
          filesize: '120 MB',
          extension: 'mp4'
        },
        {
          formatId: 'mp4-480',
          quality: '480p',
          filesize: '80 MB',
          extension: 'mp4'
        },
        {
          formatId: 'mp4-360',
          quality: '360p',
          filesize: '50 MB',
          extension: 'mp4'
        }
      ]
    };
    
    console.log('Returning video info');
    return res.status(200).json(mockVideoInfo);
    
    /* In production, we would use yt-dlp like this:
    const ytDlpPath = process.env.YT_DLP_PATH || 'yt-dlp';
    const { stdout } = await execPromise(
      `${ytDlpPath} -J "${url}"`
    );
    
    const videoData = JSON.parse(stdout);
    
    const formattedResponse = {
      videoId: videoData.id,
      title: videoData.title,
      thumbnail: videoData.thumbnail,
      duration: formatDuration(videoData.duration),
      uploader: videoData.uploader || videoData.channel,
      formats: videoData.formats
        .filter(format => format.resolution !== 'audio only')
        .map(format => ({
          formatId: format.format_id,
          quality: format.resolution || 'unknown',
          filesize: formatFileSize(format.filesize),
          extension: format.ext
        }))
    };

    return res.status(200).json(formattedResponse);
    */
  } catch (error) {
    console.error('Error processing video info:', error);
    Sentry.captureException(error, {
      extra: { url }
    });
    return res.status(500).json({ error: 'Failed to process video' });
  }
}

function formatDuration(seconds) {
  if (!seconds) return 'Unknown';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes) {
  if (!bytes) return 'Unknown';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
}
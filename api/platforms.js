import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Received platforms request');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // List of commonly supported platforms by yt-dlp
    const supportedPlatforms = [
      'YouTube',
      'Vimeo',
      'Facebook',
      'Instagram',
      'Twitter',
      'TikTok',
      'Dailymotion',
      'Twitch',
      'SoundCloud',
      'PornHub',
      'Reddit',
      'Bilibili',
      'VK',
      'Vine',
      'Flickr',
      'Apple Podcasts',
      'Bandcamp',
      'Bitchute',
      'Mixcloud',
      'Odysee',
      'Peertube',
      'Rumble',
      'Streamable',
      'Tumblr',
      'Udemy',
      '9GAG',
      'Arte.tv',
      'Globo',
      'Hotstar',
      'Niconico',
    ];
    
    console.log('Returning supported platforms');
    return res.status(200).json({ platforms: supportedPlatforms });
  } catch (error) {
    console.error('Error fetching platforms:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch platforms' });
  }
}
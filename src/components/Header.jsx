import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=36&height=36" 
            alt="VidDownloader Logo" 
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-xl font-bold text-blue-600">VidDownloader</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
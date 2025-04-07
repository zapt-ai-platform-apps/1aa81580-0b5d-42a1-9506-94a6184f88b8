import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Downloads from '@/pages/Downloads';
import Library from '@/pages/Library';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import ZaptBadge from '@/components/ZaptBadge';
import { DownloadProvider } from '@/context/DownloadContext';

export default function App() {
  return (
    <div className="app-container">
      <DownloadProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="library" element={<Library />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </DownloadProvider>
      <ZaptBadge />
    </div>
  );
}
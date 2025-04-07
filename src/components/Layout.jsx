import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 mb-16">
        <Outlet />
      </main>
      <Navigation />
    </>
  );
};

export default Layout;
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl mb-6">Page not found</p>
      <Link to="/" className="btn btn-primary">
        <AiOutlineHome />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
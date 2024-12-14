import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm mt-auto py-4">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} FlareCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 
import React from 'react';
import { Dumbbell, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Dumbbell className="w-6 h-6 text-white" />
            <Leaf className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              FitCal <span className="text-purple-400">Pro</span>
            </h1>
            <p className="text-purple-200 text-sm mt-1">Por Rafael Silva - CRN 12345/SP</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
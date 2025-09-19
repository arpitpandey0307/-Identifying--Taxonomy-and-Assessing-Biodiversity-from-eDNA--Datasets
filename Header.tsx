import React from 'react';
import { Waves, Dna } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Waves className="h-6 w-6 sm:h-8 sm:w-8" />
              <Dna className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">DeepSea eDNA AI</h1>
              <p className="text-blue-200 text-xs sm:text-sm hidden sm:block">Advanced Biodiversity Analysis Pipeline</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-right text-xs sm:text-sm">
              <p className="font-medium hidden sm:block">Neural Classification Engine</p>
              <p className="text-blue-200">v2.1.0</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
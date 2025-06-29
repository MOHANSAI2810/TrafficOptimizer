import React from 'react';
import { Loader2, Route } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Route className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Finding Optimal Route</h3>
        <p className="text-gray-600 max-w-md">
          Our advanced algorithms are calculating the shortest path between your selected cities...
        </p>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Processing graph data</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
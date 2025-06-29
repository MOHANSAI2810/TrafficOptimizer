import React from 'react';
import { MapPin, ArrowRight, Award, Clock } from 'lucide-react';

interface PathResultProps {
  result: {
    path: string[];
    distance: number;
  };
  source: string;
  destination: string;
}

const PathResult: React.FC<PathResultProps> = ({ result, source, destination }) => {
  const { path, distance } = result;

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Award className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Shortest Path Found!</h3>
          <p className="text-gray-600">Optimized route from {source} to {destination}</p>
        </div>
      </div>

      {/* Distance Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">{distance}</div>
          <div className="text-sm text-gray-600">Total Distance</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
          <div className="text-2xl font-bold text-purple-600">{path.length}</div>
          <div className="text-sm text-gray-600">Total Cities</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
          <div className="text-2xl font-bold text-green-600">{path.length - 1}</div>
          <div className="text-sm text-gray-600">Connections</div>
        </div>
      </div>

      {/* Path Visualization */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Route Details
        </h4>
        
        <div className="space-y-3">
          {path.map((city, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 
                    ? 'bg-green-500' 
                    : index === path.length - 1 
                    ? 'bg-red-500' 
                    : 'bg-blue-400'
                }`} />
                {index < path.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                )}
              </div>
              
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{city}</span>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      START
                    </span>
                  )}
                  {index === path.length - 1 && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      END
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-500">
                  Stop {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-blue-800">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">
            This route has been optimized using Dijkstra's shortest path algorithm
          </span>
        </div>
      </div>
    </div>
  );
};

export default PathResult;
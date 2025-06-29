import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-800 mb-1">
            Unable to Find Path
          </h4>
          <p className="text-sm text-red-700">{message}</p>
        </div>
        
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
      
      <div className="mt-3 text-xs text-red-600">
        💡 Try selecting different cities or check if your Flask server is running on localhost:5000
      </div>
    </div>
  );
};

export default ErrorMessage;
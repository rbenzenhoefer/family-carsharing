import { Calendar, Settings } from 'lucide-react';

export default function Footer({ currentPage, onPageChange }) {
  return (
    <div className="bg-gray-100 p-2">
      <div className="flex gap-4">
        {/* Book Button */}
        <button 
          onClick={() => onPageChange('book')}
          className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
            currentPage === 'book'
              ? 'bg-white text-blue-500 shadow-md'
              : 'text-gray-500 active:text-gray-700'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-sm font-semibold">Book</span>
        </button>
        
        {/* Manage Button */}
        <button 
          onClick={() => onPageChange('manage')}
          className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
            currentPage === 'manage'
              ? 'bg-white text-blue-500 shadow-md'
              : 'text-gray-500 active:text-gray-700'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-semibold">Manage</span>
        </button>
      </div>
    </div>
  );
}

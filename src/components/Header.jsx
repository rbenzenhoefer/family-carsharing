import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Header({ weekOffset, onWeekChange }) {
  const handlePreviousWeek = () => {
    onWeekChange(weekOffset - 1);
  };

  const handleNextWeek = () => {
    onWeekChange(weekOffset + 1);
  };

  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const currentDay = today.getDay();
    
    // Montag als Start der Woche berechnen
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    monday.setDate(monday.getDate() + (offset * 7));
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return { day, month, year };
    };
    
    const start = formatDate(monday);
    const end = formatDate(sunday);
    
    return `${start.day}.${start.month}. - ${end.day}.${end.month}.${end.year}`;
  };

  return (
    <div className="relative">
      {/* Titel */}
      <h1 className="text-base font-semibold text-gray-800 text-center mb-3">
        Family Car Sharing
      </h1>
      
      {/* Datumswechsel */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button 
          onClick={handlePreviousWeek}
          className="p-2 active:bg-gray-100 rounded-full transition-colors"
          style={{ touchAction: 'manipulation' }}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <span className="text-sm text-gray-600">
          {getWeekDates(weekOffset)}
        </span>
        
        <button 
          onClick={handleNextWeek}
          className="p-2 active:bg-gray-100 rounded-full transition-colors"
          style={{ touchAction: 'manipulation' }}
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Profil-Button */}
      <button 
        className="absolute top-0 right-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold active:bg-blue-600 transition-colors"
        style={{ touchAction: 'manipulation' }}
      >
        R
      </button>
    </div>
  );
}

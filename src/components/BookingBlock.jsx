import { AlertTriangle } from 'lucide-react';

export default function BookingBlock({ booking, hasConflict, onEdit }) {
  const height = (booking.endTime - booking.startTime) * 40;
  const top = booking.startTime * 40;
  const margin = 8;
  
  return (
    <div
      className={`absolute rounded-xl shadow-md active:opacity-80 cursor-pointer ${booking.color}`}
      style={{
        height: `${height}px`,
        top: `${top}px`,
        left: `${margin}px`,
        width: `calc(100% - ${margin * 2}px)`,
        opacity: 0.85, // 85% Transparenz für Overlaps
        zIndex: 10,
        touchAction: 'manipulation'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(booking);
      }}
    >
      <div className="h-full flex items-center justify-center relative">
        {hasConflict && (
          <div className="absolute top-1 right-1">
            <div className="bg-white rounded-full p-1 shadow-md">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
          </div>
        )}
        
        {height > 25 && (
          <div className="text-white text-xs font-medium px-2 text-center leading-tight">
            {booking.userName}
          </div>
        )}
      </div>
    </div>
  );
}
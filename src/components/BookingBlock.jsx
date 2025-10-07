import { AlertTriangle } from 'lucide-react';

export default function BookingBlock({ booking, hasConflict, onEdit }) {
  const height = (booking.endTime - booking.startTime) * 40; // 40px pro Stunde
  const top = booking.startTime * 40;
  
  // Positionierung basierend auf Grid-Spalten (4-spaltiges Grid: Zeit + 3 Autos)
  // Zeit-Spalte: 60px fest, Auto-Spalten: 1fr (gleichmäßig verteilt)
  // Container ist max-w-md (448px) mit p-6 (24px padding) = 400px verfügbar
  const containerWidth = 400; // 448px - 48px padding
  const timeColumnWidth = 60; // px
  const remainingWidth = containerWidth - timeColumnWidth; // 340px
  const carColumnWidth = remainingWidth / 3; // 113.33px pro Auto-Spalte
  
  const leftPosition = timeColumnWidth + (booking.carIndex * carColumnWidth) + 2; // +2px für Abstand
  const width = carColumnWidth - 4; // -4px für Abstände links und rechts

  return (
    <div
      className={`absolute rounded-xl shadow-md active:opacity-80 cursor-pointer ${booking.color}`}
      style={{
        height: `${height}px`,
        top: `${top}px`,
        left: `${leftPosition}px`,
        width: `${width}px`,
        zIndex: 10,
        touchAction: 'manipulation' // Bessere Touch-Performance
      }}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(booking);
      }}
    >
      <div className="h-full flex items-center justify-center relative">
        {/* Konflikt-Icon */}
        {hasConflict && (
          <div className="absolute top-1 right-1">
            <div className="bg-white rounded-full p-1 shadow-md">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
          </div>
        )}
        
        {/* Buchungs-Info (immer sichtbar wenn genug Platz) */}
        {height > 25 && (
          <div className="text-white text-xs font-medium px-2 text-center leading-tight">
            {booking.userName}
          </div>
        )}
      </div>
    </div>
  );
}

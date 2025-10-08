import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function BookingBlock({ booking, hasConflict, onEdit, onDrag }) {
  const height = (booking.endTime - booking.startTime) * 40;
  const top = booking.startTime * 40;
  const margin = 8;
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, top: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ 
      x: touch.clientX, 
      y: touch.clientY,
      top: top
    });
    setDragOffset({ x: 0, y: 0 });
    
    // Verhindere Scrollen während Drag
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const offsetX = touch.clientX - dragStart.x;
    const offsetY = touch.clientY - dragStart.y;
    
    setDragOffset({ x: offsetX, y: offsetY });
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Berechne neue Position
    const hourHeight = 40; // Pixel pro Stunde
    
    // Neue Startzeit berechnen (in 1-Stunden-Schritten)
    const timeOffset = Math.round(dragOffset.y / hourHeight);
    const newStartTime = Math.max(0, Math.min(23, booking.startTime + timeOffset));
    
    // Neues Auto berechnen (bei horizontaler Bewegung > 80px)
    let newCarIndex = booking.carIndex;
    const threshold = 80; // Mindest-Pixel für Auto-Wechsel
    
    if (dragOffset.x > threshold && booking.carIndex < 2) {
      // Nach rechts zum nächsten Auto
      newCarIndex = booking.carIndex + 1;
    } else if (dragOffset.x < -threshold && booking.carIndex > 0) {
      // Nach links zum vorherigen Auto
      newCarIndex = booking.carIndex - 1;
    }
    
    // Callback nur wenn sich was geändert hat
    if (newStartTime !== booking.startTime || newCarIndex !== booking.carIndex) {
      const duration = booking.endTime - booking.startTime;
      const newEndTime = Math.min(24, newStartTime + duration);
      
      if (onDrag) {
        onDrag(booking, {
          carIndex: newCarIndex,
          startTime: newStartTime,
          endTime: newEndTime
        });
      }
    }
    
    // Reset drag offset
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className={`absolute rounded-xl shadow-md cursor-grab active:cursor-grabbing ${booking.color} ${
        isDragging ? 'opacity-70 z-50 scale-105' : 'opacity-85'
      }`}
      style={{
        height: `${height}px`,
        top: `${top + dragOffset.y}px`,
        left: `${margin + dragOffset.x}px`,
        width: `calc(100% - ${margin * 2}px)`,
        zIndex: isDragging ? 50 : 10,
        touchAction: 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        if (!isDragging && Math.abs(dragOffset.x) < 5 && Math.abs(dragOffset.y) < 5) {
          e.stopPropagation();
          onEdit(booking);
        }
      }}
    >
      <div className="h-full flex items-center justify-center relative px-2">
        {hasConflict && (
          <div className="absolute top-1 right-1">
            <div className="bg-white rounded-full p-1 shadow-md">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
          </div>
        )}
        
        {height > 25 && (
          <div className="text-white text-xs font-medium text-center leading-tight">
            {booking.userName}
          </div>
        )}
        
        {isDragging && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {String(booking.startTime + Math.round(dragOffset.y / 40)).padStart(2, '0')}:00
          </div>
        )}
      </div>
    </div>
  );
}
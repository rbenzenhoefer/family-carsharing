import BookingBlock from './BookingBlock';
import { detectConflicts } from '../utils/conflictUtils';

export default function CalendarGrid({ 
  bookings, 
  selectedDay, 
  onSlotClick, 
  onEditBooking,
  cars 
}) {
  // Zeit-Slots von 00:00 bis 24:00 (25 Zeilen)
  const timeSlots = Array.from({ length: 25 }, (_, i) => i);

  // Buchungen für den ausgewählten Tag filtern
  const dayBookings = bookings.filter(booking => booking.day === selectedDay);

  // Konflikte erkennen
  const conflicts = detectConflicts(dayBookings);

  // Klick auf Grid-Slot
  const handleSlotClick = (carIndex, timeSlot) => {
    onSlotClick(carIndex, timeSlot);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header mit Auto-Namen */}
      <div className="grid border-b border-gray-200" style={{ gridTemplateColumns: '60px 1fr 1fr 1fr' }}>
        {/* Zeit-Spalte Header */}
        <div className="bg-white"></div>
        
        {/* Auto-Spalten Header */}
        {cars.map((car, index) => (
          <div 
            key={car.index}
            className={`py-3 text-xs font-semibold text-center ${
              index === 1 ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            {car.name}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="relative">
        {/* Grid-Linien */}
        <div className="grid" style={{ gridTemplateColumns: '60px 1fr 1fr 1fr' }}>
          {/* Zeit-Spalte */}
          <div>
            {timeSlots.map(time => (
              <div 
                key={time}
                className="h-10 border-r border-b border-gray-200 flex items-center justify-end pr-2"
              >
                <span className="text-[10px] text-gray-400 font-medium">
                  {String(time).padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>

          {/* Auto-Spalten */}
          {cars.map((car, carIndex) => (
            <div 
              key={car.index}
              className={`${carIndex === 1 ? 'bg-blue-50/30' : 'bg-white'}`}
            >
              {timeSlots.map(time => (
                <div
                  key={`${car.index}-${time}`}
                  className="h-10 border-r border-b border-gray-200 cursor-pointer active:bg-gray-50 transition-colors"
                  onClick={() => handleSlotClick(car.index, time)}
                  style={{ touchAction: 'manipulation' }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Buchungsblöcke */}
        {dayBookings.map(booking => (
          <BookingBlock
            key={booking.id}
            booking={booking}
            hasConflict={conflicts.has(booking.id)}
            onEdit={onEditBooking}
          />
        ))}
      </div>
    </div>
  );
}

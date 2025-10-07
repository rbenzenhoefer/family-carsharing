import BookingBlock from './BookingBlock';
import { detectConflicts } from '../utils/conflictUtils';

export default function CalendarGrid({ 
  bookings, 
  selectedDay, 
  onSlotClick, 
  onEditBooking,
  cars 
}) {
  const timeSlots = Array.from({ length: 25 }, (_, i) => i);
  const dayBookings = bookings.filter(booking => booking.day === selectedDay);
  const conflicts = detectConflicts(dayBookings);

  return (
    <div className="bg-white overflow-hidden">
      {/* Header */}
      <div className="grid border-b border-gray-200" style={{ gridTemplateColumns: '60px 1fr 1fr 1fr' }}>
        <div></div>
        {cars.map((car, index) => (
          <div 
            key={car.index}
            className={`py-3 text-xs font-semibold text-center ${
              index === 1 ? 'bg-blue-50' : ''
            }`}
          >
            {car.name}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex">
        {/* Zeit-Spalte */}
        <div className="w-[60px] flex-shrink-0">
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

        {/* Auto-Spalten Container */}
        <div className="flex-1 flex">
          {cars.map((car, carIndex) => (
            <div 
              key={car.index}
              className={`flex-1 relative ${carIndex === 1 ? 'bg-blue-50/30' : ''}`}
              style={{ overflow: 'hidden' }}
            >
              {/* Grid-Zellen */}
              {timeSlots.map(time => (
                <div
                  key={`${car.index}-${time}`}
                  className="h-10 border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                  onClick={() => onSlotClick(car.index, time)}
                />
              ))}

              {/* Buchungen FÜR DIESE SPALTE */}
              {dayBookings
                .filter(b => b.carIndex === car.index)
                .map(booking => (
                  <BookingBlock
                    key={booking.id}
                    booking={booking}
                    hasConflict={conflicts.has(booking.id)}
                    onEdit={onEditBooking}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
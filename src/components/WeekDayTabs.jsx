export default function WeekDayTabs({ selectedDay, onDayChange }) {
  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <div className="bg-gray-100 p-1.5 mb-6">
      <div className="flex gap-1">
        {weekDays.map((day) => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
              selectedDay === day
                ? 'bg-white text-blue-500 shadow-sm'
                : 'text-gray-600 active:text-gray-800'
            }`}
            style={{ touchAction: 'manipulation' }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

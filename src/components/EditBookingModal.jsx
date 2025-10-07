import { X, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EditBookingModal({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete,
  booking,
  users, 
  cars 
}) {
  const [formData, setFormData] = useState({
    userId: 1,
    carIndex: 0,
    startTime: 9,
    endTime: 10,
    distance: '',
    note: ''
  });

  // Wichtig: Formular mit Buchungsdaten füllen
  useEffect(() => {
    if (booking) {
      setFormData({
        userId: booking.userId,
        carIndex: booking.carIndex,
        startTime: booking.startTime,
        endTime: booking.endTime,
        distance: booking.distance || '',
        note: booking.note || ''
      });
    }
  }, [booking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'userId' || name === 'carIndex' || name === 'startTime' || name === 'endTime' 
        ? parseInt(value) 
        : value
    }));
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Buchung bearbeiten</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Benutzer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benutzer
            </label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Auto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Auto
            </label>
            <select
              name="carIndex"
              value={formData.carIndex}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {cars.map(car => (
                <option key={car.index} value={car.index}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>

          {/* Startzeit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Startzeit
            </label>
            <select
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {String(i).padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>

          {/* Endzeit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endzeit
            </label>
            <select
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {String(i + 1).padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>

          {/* Strecke */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Strecke (km) - Optional
            </label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="z.B. 50"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notiz */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notiz - Optional
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="z.B. Einkaufen, Arzttermin..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-3 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Löschen
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
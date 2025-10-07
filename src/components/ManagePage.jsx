import { useState } from 'react';
import { Plus, Trash2, Car, User } from 'lucide-react';

export default function ManagePage({ 
  cars, 
  users, 
  onUpdateCars, 
  onUpdateUsers 
}) {
  const [newCar, setNewCar] = useState({ name: '' });
  const [newUser, setNewUser] = useState({ name: '', color: 'bg-blue-400' });
  const [editingCar, setEditingCar] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Farben für Benutzer
  const userColors = [
    'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-300', 
    'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-orange-400',
    'bg-teal-400', 'bg-cyan-400', 'bg-lime-400', 'bg-amber-400'
  ];

  // Auto hinzufügen
  const handleAddCar = () => {
    if (newCar.name.trim()) {
      const maxIndex = Math.max(...cars.map(c => c.index), -1);
      onUpdateCars([...cars, { index: maxIndex + 1, name: newCar.name.trim() }]);
      setNewCar({ name: '' });
    }
  };

  // Auto löschen
  const handleDeleteCar = (carIndex) => {
    if (window.confirm('Auto wirklich löschen?')) {
      onUpdateCars(cars.filter(c => c.index !== carIndex));
    }
  };

  // Auto bearbeiten
  const handleEditCar = (car) => {
    setEditingCar(car);
  };

  const handleSaveCarEdit = () => {
    if (editingCar.name.trim()) {
      onUpdateCars(cars.map(c => 
        c.index === editingCar.index 
          ? { ...c, name: editingCar.name.trim() }
          : c
      ));
      setEditingCar(null);
    }
  };

  // Benutzer hinzufügen
  const handleAddUser = () => {
    if (newUser.name.trim()) {
      const maxId = Math.max(...users.map(u => u.id), 0);
      onUpdateUsers([...users, { 
        id: maxId + 1, 
        name: newUser.name.trim(), 
        color: newUser.color 
      }]);
      setNewUser({ name: '', color: 'bg-blue-400' });
    }
  };

  // Benutzer löschen
  const handleDeleteUser = (userId) => {
    if (window.confirm('Benutzer wirklich löschen?')) {
      onUpdateUsers(users.filter(u => u.id !== userId));
    }
  };

  // Benutzer bearbeiten
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveUserEdit = () => {
    if (editingUser.name.trim()) {
      onUpdateUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, name: editingUser.name.trim(), color: editingUser.color }
          : u
      ));
      setEditingUser(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Autos verwalten */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Autos verwalten</h2>
        </div>

        {/* Neues Auto hinzufügen */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCar.name}
            onChange={(e) => setNewCar({ name: e.target.value })}
            placeholder="Auto-Name (z.B. BMW X3)"
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddCar}
            className="px-4 py-3 bg-blue-500 text-white rounded-xl active:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Auto-Liste */}
        <div className="space-y-2">
          {cars.map((car) => (
            <div key={car.index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              {editingCar?.index === car.index ? (
                <>
                  <input
                    type="text"
                    value={editingCar.name}
                    onChange={(e) => setEditingCar({ ...editingCar, name: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSaveCarEdit}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg active:bg-green-600 transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setEditingCar(null)}
                    className="px-3 py-2 bg-gray-500 text-white rounded-lg active:bg-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-gray-800 font-medium">{car.name}</span>
                  <button
                    onClick={() => handleEditCar(car)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg active:bg-blue-600 transition-colors"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car.index)}
                    className="p-2 bg-red-500 text-white rounded-lg active:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benutzer verwalten */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Benutzer verwalten</h2>
        </div>

        {/* Neuen Benutzer hinzufügen */}
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Benutzer-Name (z.B. Max Mustermann)"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="flex gap-2">
            <select
              value={newUser.color}
              onChange={(e) => setNewUser({ ...newUser, color: e.target.value })}
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {userColors.map(color => (
                <option key={color} value={color}>
                  {color.replace('bg-', '').replace('-', ' ').toUpperCase()}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleAddUser}
              className="px-4 py-3 bg-blue-500 text-white rounded-xl active:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Benutzer-Liste */}
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              {editingUser?.id === user.id ? (
                <>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={editingUser.color}
                    onChange={(e) => setEditingUser({ ...editingUser, color: e.target.value })}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {userColors.map(color => (
                      <option key={color} value={color}>
                        {color.replace('bg-', '').replace('-', ' ').toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleSaveUserEdit}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg active:bg-green-600 transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="px-3 py-2 bg-gray-500 text-white rounded-lg active:bg-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <div className={`w-4 h-4 rounded-full ${user.color}`}></div>
                  <span className="flex-1 text-gray-800 font-medium">{user.name}</span>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg active:bg-blue-600 transition-colors"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 bg-red-500 text-white rounded-lg active:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

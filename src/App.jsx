import { useState, useEffect } from 'react';
import Header from './components/Header';
import WeekDayTabs from './components/WeekDayTabs';
import CalendarGrid from './components/CalendarGrid';
import BookingModal from './components/BookingModal';
import EditBookingModal from './components/EditBookingModal';
import ManagePage from './components/ManagePage';
import Footer from './components/Footer';

// Test-Daten mit Wochen-Offset
const initialBookings = [
  {
    id: '1',
    carIndex: 0,
    day: 'Mo',
    startTime: 7,
    endTime: 15,
    userId: 1,
    userName: 'Max',
    color: 'bg-red-400',
    weekOffset: 0 // Aktuelle Woche
  },
  {
    id: '2',
    carIndex: 0,
    day: 'Mo',
    startTime: 13, // Konflikt mit Buchung 1!
    endTime: 18,
    userId: 5,
    userName: 'Sarah',
    color: 'bg-sky-300',
    weekOffset: 0
  },
  {
    id: '3',
    carIndex: 1,
    day: 'Mo',
    startTime: 9,
    endTime: 19,
    userId: 2,
    userName: 'Lisa',
    color: 'bg-purple-400',
    weekOffset: 0
  },
  {
    id: '4',
    carIndex: 2,
    day: 'Mo',
    startTime: 6,
    endTime: 10,
    userId: 3,
    userName: 'Anna',
    color: 'bg-yellow-300',
    weekOffset: 0
  },
  {
    id: '5',
    carIndex: 2,
    day: 'Mo',
    startTime: 15,
    endTime: 20,
    userId: 4,
    userName: 'Tom',
    color: 'bg-green-400',
    weekOffset: 0
  }
];

const initialUsers = [
  { id: 1, name: 'Max', color: 'bg-red-400' },
  { id: 2, name: 'Lisa', color: 'bg-purple-400' },
  { id: 3, name: 'Anna', color: 'bg-yellow-300' },
  { id: 4, name: 'Tom', color: 'bg-green-400' },
  { id: 5, name: 'Sarah', color: 'bg-sky-300' }
];

const initialCars = [
  { index: 0, name: 'A Klasse' },
  { index: 1, name: 'C Klasse' },
  { index: 2, name: 'E Auto' }
];

function App() {
  const [selectedDay, setSelectedDay] = useState('Mo');
  const [weekOffset, setWeekOffset] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState('book'); // 'book' oder 'manage'
  
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    carIndex: null,
    startTime: null
  });

  const [editModal, setEditModal] = useState({
    isOpen: false,
    booking: null
  });

  // localStorage Sync
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    const savedUsers = localStorage.getItem('users');
    const savedCars = localStorage.getItem('cars');
    
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings(initialBookings);
    }
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(initialUsers);
    }
    
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    } else {
      setCars(initialCars);
    }
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (cars.length > 0) {
      localStorage.setItem('cars', JSON.stringify(cars));
    }
  }, [cars]);

  // Wochentag ändern
  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  // Woche ändern
  const handleWeekChange = (offset) => {
    setWeekOffset(offset);
  };

  // Grid-Slot klicken
  const handleSlotClick = (carIndex, startTime) => {
    setBookingModal({
      isOpen: true,
      carIndex,
      startTime
    });
  };

  // Buchung speichern
  const handleSaveBooking = (formData) => {
    const user = users.find(u => u.id === formData.userId);
    
    const newBooking = {
      id: crypto.randomUUID(),
      carIndex: formData.carIndex,
      day: selectedDay,
      startTime: formData.startTime,
      endTime: formData.endTime,
      userId: formData.userId,
      userName: user.name,
      color: user.color,
      distance: formData.distance || null,
      note: formData.note || null,
      weekOffset: weekOffset // Speichere die aktuelle Woche
    };

    setBookings(prev => [...prev, newBooking]);
  };

  // Modal schließen
  const handleCloseModal = () => {
    setBookingModal({
      isOpen: false,
      carIndex: null,
      startTime: null
    });
  };

  // Buchung bearbeiten
  const handleEditBooking = (booking) => {
    setEditModal({
      isOpen: true,
      booking: booking
    });
  };

  // Buchung speichern (Bearbeitung)
  const handleSaveEditedBooking = (formData) => {
    const user = users.find(u => u.id === formData.userId);
    
    setBookings(prev => prev.map(booking => 
      booking.id === editModal.booking.id 
        ? {
            ...booking,
            userId: formData.userId,
            userName: user.name,
            color: user.color,
            carIndex: formData.carIndex,
            startTime: formData.startTime,
            endTime: formData.endTime,
            distance: formData.distance || null,
            note: formData.note || null
          }
        : booking
    ));
  };

  // Buchung löschen
  const handleDeleteBooking = () => {
    setBookings(prev => prev.filter(booking => booking.id !== editModal.booking.id));
  };

  // Edit Modal schließen
  const handleCloseEditModal = () => {
    setEditModal({
      isOpen: false,
      booking: null
    });
  };

  // Autos verwalten
  const handleUpdateCars = (newCars) => {
    setCars(newCars);
  };

  // Benutzer verwalten
  const handleUpdateUsers = (newUsers) => {
    setUsers(newUsers);
  };

  // Seite wechseln
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
        <div className="p-4">
          {/* Header - nur auf Book-Seite */}
          {currentPage === 'book' && (
            <Header 
              weekOffset={weekOffset} 
              onWeekChange={handleWeekChange} 
            />
          )}

          {/* Wochentags-Tabs - nur auf Book-Seite */}
          {currentPage === 'book' && (
            <WeekDayTabs 
              selectedDay={selectedDay} 
              onDayChange={handleDayChange} 
            />
          )}

          {/* Inhalt basierend auf aktueller Seite */}
          {currentPage === 'book' ? (
            /* Kalender-Grid */
            <CalendarGrid 
              bookings={bookings.filter(booking => booking.weekOffset === weekOffset)}
              selectedDay={selectedDay}
              onSlotClick={handleSlotClick}
              onEditBooking={handleEditBooking}
              cars={cars}
            />
          ) : (
            /* Manage-Seite */
            <ManagePage
              cars={cars}
              users={users}
              onUpdateCars={handleUpdateCars}
              onUpdateUsers={handleUpdateUsers}
            />
          )}
        </div>

        {/* Footer - Sticky */}
        <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
          <Footer 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Buchungs-Modal */}
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={handleCloseModal}
          onSubmit={handleSaveBooking}
          carIndex={bookingModal.carIndex}
          startTime={bookingModal.startTime}
          users={users}
          cars={cars}
        />

        <EditBookingModal
          isOpen={editModal.isOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEditedBooking}
          onDelete={handleDeleteBooking}
          booking={editModal.booking}
          users={users}
          cars={cars}
        />
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import Header from './components/Header';
import WeekDayTabs from './components/WeekDayTabs';
import CalendarGrid from './components/CalendarGrid';
import BookingModal from './components/BookingModal';
import EditBookingModal from './components/EditBookingModal';
import ManagePage from './components/ManagePage';
import Footer from './components/Footer';

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
    weekOffset: 0
  },
  {
    id: '2',
    carIndex: 0,
    day: 'Mo',
    startTime: 13,
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
  const [currentPage, setCurrentPage] = useState('book');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    carIndex: null,
    startTime: null
  });

  const [editModal, setEditModal] = useState({
    isOpen: false,
    booking: null
  });

  // Firebase: Bookings laden und in Echtzeit synchronisieren - FIXED
  useEffect(() => {
    const bookingsRef = ref(database, 'bookings');
    
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        // Firebase Objekt in Array umwandeln
        const bookingsArray = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        setBookings(bookingsArray);
        setIsInitialized(true); // Markiere als initialisiert
      } else {
        // Keine Daten vorhanden
        if (!isInitialized) {
          // NUR beim allerersten Mal Beispiel-Daten laden
          initialBookings.forEach(booking => {
            const bookingRef = push(ref(database, 'bookings'));
            set(bookingRef, booking);
          });
          setIsInitialized(true);
        } else {
          // Wenn bereits initialisiert, einfach leeres Array (alle wurden gelöscht)
          setBookings([]);
        }
      }
    });

    return () => unsubscribe();
  }, [isInitialized]);

  // Firebase: Users laden und in Echtzeit synchronisieren
  useEffect(() => {
    const usersRef = ref(database, 'users');
    
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        const usersArray = Object.values(data);
        setUsers(usersArray);
      } else if (!isInitialized) {
        // Initial Users setzen
        set(usersRef, initialUsers);
      }
    });

    return () => unsubscribe();
  }, [isInitialized]);

  // Firebase: Cars laden und in Echtzeit synchronisieren
  useEffect(() => {
    const carsRef = ref(database, 'cars');
    
    const unsubscribe = onValue(carsRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        const carsArray = Object.values(data);
        setCars(carsArray);
      } else {
        // Initial Cars setzen
        set(carsRef, initialCars);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleWeekChange = (offset) => {
    setWeekOffset(offset);
  };

  const handleSlotClick = (carIndex, startTime) => {
    setBookingModal({
      isOpen: true,
      carIndex,
      startTime
    });
  };

  // Firebase: Neue Buchung speichern
  const handleSaveBooking = (formData) => {
    const user = users.find(u => u.id === formData.userId);
    
    const newBooking = {
      carIndex: formData.carIndex,
      day: selectedDay,
      startTime: formData.startTime,
      endTime: formData.endTime,
      userId: formData.userId,
      userName: user.name,
      color: user.color,
      distance: formData.distance || null,
      note: formData.note || null,
      weekOffset: weekOffset
    };

    // Zu Firebase hinzufügen
    const bookingRef = push(ref(database, 'bookings'));
    set(bookingRef, newBooking);
  };

  const handleCloseModal = () => {
    setBookingModal({
      isOpen: false,
      carIndex: null,
      startTime: null
    });
  };

  const handleEditBooking = (booking) => {
    setEditModal({
      isOpen: true,
      booking: booking
    });
  };

  // Firebase: Buchung bearbeiten
  const handleSaveEditedBooking = (formData) => {
    const user = users.find(u => u.id === formData.userId);
    
    const updatedBooking = {
      ...editModal.booking,
      userId: formData.userId,
      userName: user.name,
      color: user.color,
      carIndex: formData.carIndex,
      startTime: formData.startTime,
      endTime: formData.endTime,
      distance: formData.distance || null,
      note: formData.note || null
    };

    // In Firebase aktualisieren
    const bookingRef = ref(database, `bookings/${editModal.booking.id}`);
    update(bookingRef, updatedBooking);
  };

  // Firebase: Buchung löschen
  const handleDeleteBooking = () => {
    const bookingRef = ref(database, `bookings/${editModal.booking.id}`);
    remove(bookingRef);
  };

  const handleCloseEditModal = () => {
    setEditModal({
      isOpen: false,
      booking: null
    });
  };

  // Firebase: Cars aktualisieren
  const handleUpdateCars = (newCars) => {
    const carsRef = ref(database, 'cars');
    set(carsRef, newCars);
  };

  // Firebase: Users aktualisieren
  const handleUpdateUsers = (newUsers) => {
    const usersRef = ref(database, 'users');
    set(usersRef, newUsers);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Content - scrollt unter Footer durch */}
      <div className="p-6 pt-8 pb-40">
        {currentPage === 'book' && (
          <Header 
            weekOffset={weekOffset} 
            onWeekChange={handleWeekChange} 
          />
        )}

        {currentPage === 'book' && (
          <WeekDayTabs 
            selectedDay={selectedDay} 
            onDayChange={handleDayChange} 
          />
        )}

        {currentPage === 'book' ? (
          <CalendarGrid 
            bookings={bookings.filter(booking => booking.weekOffset === weekOffset)}
            selectedDay={selectedDay}
            onSlotClick={handleSlotClick}
            onEditBooking={handleEditBooking}
            cars={cars}
          />
        ) : (
          <ManagePage
            cars={cars}
            users={users}
            onUpdateCars={handleUpdateCars}
            onUpdateUsers={handleUpdateUsers}
          />
        )}
      </div>

      {/* Sticky Footer - nur Buttons sichtbar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <Footer 
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modals */}
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
// Erkennt Konflikte zwischen Buchungen
export function detectConflicts(bookings) {
  const conflicts = new Set();
  
  for (let i = 0; i < bookings.length; i++) {
    for (let j = i + 1; j < bookings.length; j++) {
      const b1 = bookings[i];
      const b2 = bookings[j];
      
      // Gleicher Tag UND gleiches Auto UND Zeitüberschneidung
      if (
        b1.day === b2.day &&
        b1.carIndex === b2.carIndex &&
        b1.startTime < b2.endTime &&
        b1.endTime > b2.startTime
      ) {
        conflicts.add(b1.id);
        conflicts.add(b2.id);
      }
    }
  }
  
  return conflicts;
}

// Prüft ob eine Buchung einen Konflikt hat
export function hasConflict(bookingId, conflicts) {
  return conflicts.has(bookingId);
}

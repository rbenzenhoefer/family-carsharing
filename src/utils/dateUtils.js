// Berechnet das Datum einer Woche basierend auf dem Offset
export function getWeekDates(offset = 0) {
  const today = new Date();
  const currentDay = today.getDay();
  
  // Montag als Start der Woche berechnen
  const monday = new Date(today);
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
  monday.setDate(monday.getDate() + (offset * 7));
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return { day, month, year };
  };
  
  const start = formatDate(monday);
  const end = formatDate(sunday);
  
  return `${start.day}.${start.month}. - ${end.day}.${end.month}.${end.year}`;
}

// Wochentage für Tabs
export const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

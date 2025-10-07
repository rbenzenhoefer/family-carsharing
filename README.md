# Family Car Sharing App

Eine React-basierte App für das Familien-Car-Sharing mit exaktem Design wie im Screenshot.

## Features

✅ **Pixel-perfect Design** - Exakt wie im Screenshot
✅ **Wochentag-Tabs** - Wechsel zwischen Mo-So
✅ **Wochenwechsel** - Navigation mit Pfeilen
✅ **Buchungen erstellen** - Klick auf freie Slots
✅ **Buchungen anzeigen** - Farbige Blöcke im Grid
✅ **Konflikt-Erkennung** - Automatische Erkennung von Überschneidungen
✅ **Lokale Persistenz** - localStorage für Daten

## Installation

1. Dependencies installieren:
```bash
npm install
```

2. Entwicklungsserver starten:
```bash
npm run dev
```

3. App öffnen: http://localhost:5173

## Verwendung

### Buchung erstellen
1. Klicke auf einen freien Slot im Kalender-Grid
2. Wähle Benutzer, Auto, Start- und Endzeit
3. Optional: Strecke und Notiz hinzufügen
4. "Buchen" klicken

### Wochentag wechseln
- Klicke auf die Tabs (Mo, Di, Mi, Do, Fr, Sa, So)

### Woche wechseln
- Nutze die Pfeile im Header für Vor-/Zurück-Navigation

### Konflikte
- Überschneidende Buchungen werden automatisch erkannt
- Konflikt-Icon (Warnsymbol) wird angezeigt

## Technische Details

- **React 18** mit Hooks
- **Tailwind CSS** für Styling
- **Lucide React** für Icons
- **localStorage** für Datenpersistenz
- **Mobile-first** Design (max-width: 448px)

## Projektstruktur

```
src/
├── components/
│   ├── Header.jsx           # Titel + Datumsnavigation + Profil
│   ├── WeekDayTabs.jsx      # Mo-So Tabs
│   ├── CalendarGrid.jsx     # Haupt-Grid mit Buchungen
│   ├── BookingBlock.jsx     # Einzelne Buchung
│   ├── BookingModal.jsx     # Buchungsformular
│   └── Footer.jsx           # Book/Manage Navigation
├── utils/
│   ├── dateUtils.js         # Datumsberechnungen
│   └── conflictUtils.js     # Konflikt-Erkennung
├── App.jsx                  # Hauptkomponente
└── main.jsx                 # Entry Point
```

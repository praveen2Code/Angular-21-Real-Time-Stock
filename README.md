# Stock Dashboard - Angular Client

A simple real-time stock market dashboard built with Angular. Shows live stock prices and updates automatically.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the app:
```bash
npm start
```

3. Open http://localhost:4200 in your browser

## Folder Structure

```
client/
├── src/
│   ├── app/                          # Main application code
│   │   ├── app.ts                    # Root component
│   │   ├── app.html                  # Root template
│   │   ├── app.css                   # Root styles
│   │   ├── app.config.ts             # Angular setup
│   │   ├── app.spec.ts               # Root tests
│   │   │
│   │   ├── components/               # Reusable UI components
│   │   │   ├── stock-dashboard/
│   │   │   │   ├── stock-dashboard.ts
│   │   │   │   ├── stock-dashboard.html
│   │   │   │   ├── stock-dashboard.css
│   │   │   │   └── stock-dashboard.spec.ts
│   │   │   │
│   │   │   └── stock-card/
│   │   │       ├── stock-card.ts
│   │   │       ├── stock-card.html
│   │   │       ├── stock-card.css
│   │   │       └── stock-card.spec.ts
│   │   │
│   │   ├── services/                 # Business logic
│   │   │   ├── stock-service.ts      # Manages stock data
│   │   │   ├── stock-service.spec.ts
│   │   │   ├── websocket-service.ts  # WebSocket connection
│   │   │   └── websocket-service.spec.ts
│   │   │
│   │   └── models/                   # Data types
│   │       └── stock.model.ts        # Stock interface
│   │
│   ├── main.ts                       # App entry point
│   ├── index.html                    # HTML page
│   ├── styles.css                    # Global styles
│   │
├── angular.json                      # Angular configuration
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript config
├── README.md                         # This file
└── public/                           # Static files

```

## What Each Folder Does

| Folder | Purpose |
|--------|---------|
| `components/` | Reusable UI pieces (dashboard, stock card) |
| `services/` | Get data from WebSocket, manage app state |
| `models/` | Define data shapes (Stock type) |
| `public/` | Static files (images, icons, etc.) |

## Available Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Watch and rebuild
npm run watch
```

## How It Works

1. **App loads** → `main.ts` starts the app
2. **App component renders** → Shows the dashboard
3. **Dashboard connects** → WebSocket to server (ws://localhost:8080)
4. **Stock data arrives** → Updates shown on cards
5. **Real-time updates** → Cards update every 2 seconds

## Stock Symbols

The app displays these stocks:
- APPL (Apple)
- ALBHT
- MSFT (Microsoft)
- TSLA (Tesla)

## Stock Card Info

Each card shows:
- Stock symbol (e.g., APPL)
- Current price
- Today's high/low
- 52-week high/low
- Active/inactive toggle

## Important Files

| File | Does What |
|------|-----------|
| `app.ts` | Main component, loads dashboard |
| `stock-service.ts` | Stores & updates stock data |
| `websocket-service.ts` | Connects to WebSocket server |
| `stock-card.ts` | Shows 1 stock on screen |
| `stock-dashboard.ts` | Shows all stocks together |

## Setup for First Time

1. Make sure server is running: `cd server && npm start`
2. In another terminal: `npm start` (from client folder)
3. Browser opens to http://localhost:4200

## Troubleshooting

**App won't load?**
- Check if server is running on port 8080
- Try refreshing the page

**Data not updating?**
- Check browser console (F12)
- Make sure server is sending data

**npm install fails?**
- Delete `node_modules` folder
- Run `npm install` again

## Technologies Used

- **Angular 21** - UI framework
- **TypeScript** - Programming language
- **RxJS** - Handles data streams
- **WebSocket** - Real-time updates
- **Vitest** - Testing
<img width="1917" height="1075" alt="Screenshot 2026-04-05 224518" src="https://github.com/user-attachments/assets/b1eb56e4-8eba-4278-9f4f-bc60e41eabc9" />
<img width="1916" height="1079" alt="Screenshot 2026-04-05 224203" src="https://github.com/user-attachments/assets/4b324e0e-bfad-4b11-9ebd-617729f701c1" />
<img width="1916" height="1076" alt="Screenshot 2026-04-05 224141" src="https://github.com/user-attachments/assets/f97669cd-4c98-4a7a-a8b4-e7dbbc9afc1b" />

## Learn More

- Angular: https://angular.io
- WebSocket: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

# Stock Dashboard - Angular + WebSocket Server

A real-time stock dashboard built with Angular 21 and a Node.js WebSocket backend. The frontend displays live stock updates and the backend streams stock data to connected clients.

## Overview

- Frontend: Angular client application
- Backend: Node.js WebSocket server in `server/`
- Client connects to backend at `ws://localhost:8080`

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Finnhub API key (optional, only if using real market data via backend)

## Repository Layout

```
client - Copy/
├── angular.json                 # Angular CLI configuration
├── package.json                 # Angular client dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App TypeScript config
├── tsconfig.spec.json           # Test TypeScript config
├── public/                      # Static assets
├── src/                         # Angular application source
│   ├── index.html               # HTML entry point
│   ├── main.ts                  # Bootstrap file
│   ├── styles.css               # Global styles
│   └── app/                     # Main app folder
│       ├── app.ts               # Root component
│       ├── app.html             # Root template
│       ├── app.css              # Root styles
│       ├── app.config.ts        # App configuration
│       ├── app.spec.ts          # Root component tests
│       ├── components/          # UI components
│       │   ├── stock-card/
│       │   │   ├── stock-card.ts
│       │   │   ├── stock-card.html
│       │   │   ├── stock-card.css
│       │   │   └── stock-card.spec.ts
│       │   └── stock-dashboard/
│       │       ├── stock-dashboard.ts
│       │       ├── stock-dashboard.html
│       │       ├── stock-dashboard.css
│       │       └── stock-dashboard.spec.ts
│       ├── models/              # Data models
│       │   └── stock.model.ts
│       └── services/            # Business logic services
│           ├── stock-service.ts
│           ├── stock-service.spec.ts
│           ├── websocket-service.ts
│           └── websocket-service.spec.ts
├── README.md                    # This file
└── server/                      # Backend server code
    ├── index.js                 # WebSocket server entry point
    ├── package.json             # Server dependencies and scripts
    └── README.md                # Server README
```

## Setup

### 1. Install frontend dependencies

From the project root:

```bash
cd "g:\2026 Projects\client"
npm install
```

### 2. Install backend dependencies

From the project root:

```bash
cd server
npm install
```

### 3. Configure backend environment

Create a `.env` file inside `server/` if you want to use the Finnhub API:

```bash
cd server
copy NUL .env
```

Add the following line to `server/.env`:

```text
FINNHUB_KEY=your_finnhub_api_key_here
```

> If you do not provide `FINNHUB_KEY`, the backend should still start and use mock data.

## Running the Application

### Start the backend server first

From the `server/` folder:

```bash
cd server
npm start or node index.js
```

The backend server listens on `ws://localhost:8080`.

### Start the Angular frontend

Open a second terminal from the project root:

```bash
cd "g:\2026 Projects\client"
npm start or ng serve
```

Angular will start the development server on `http://localhost:4200`.

### Open the app

Visit:

```text
http://localhost:4200
```

The frontend will connect to the backend WebSocket server automatically.

## Running Tests

### Frontend tests

From the project root:

```bash
npm test
```

### Backend tests

The `server/package.json` does not include test scripts. Add tests if required.

## Notes

- The Angular client expects the backend WebSocket server at `ws://localhost:8080`.
- If the backend is not running, the app will not receive live stock updates.
- The frontend and backend each manage their own `node_modules` directories.

## Scripts

### Frontend scripts (`package.json`)

- `npm start` — runs `ng serve` for the Angular app
- `npm build` — builds the app for production
- `npm run watch` — builds in watch mode
- `npm test` — runs frontend unit tests

### Backend scripts (`server/package.json`)

- `npm start` — runs `node index.js`

## Backend server details

- WebSocket port: `8080`
- Connection URL: `ws://localhost:8080`
- Uses `dotenv`, `axios`, `finnhub`, and `ws`

## Frontend details

- Angular version: 21
- Uses standalone components and Angular signals
- Includes stock dashboard and stock card components
- Uses `WebSocketService` to receive live updates from the backend

- Component rendering and interactions
- Service logic and data management
- WebSocket communication handling

## Development Guidelines

### Code Style
- Uses Prettier for code formatting
- Follows Angular style guide conventions
- TypeScript strict mode enabled

### Component Development
- Use standalone components for better tree-shaking
- Leverage Angular signals for reactive state management
- Implement proper change detection strategies

### Service Development
- Use dependency injection for service management
- Implement proper error handling
- Use RxJS observables for async operations

## Deployment

### Production Build
```bash
npm run build
```

### Serving Static Files
The built application can be served by any static file server. For example, using nginx or Apache.

### Environment Variables
For production deployments, consider configuring:
- WebSocket server URL
- API endpoints (if applicable)

## Troubleshooting

### Common Issues

**Application won't load**
- Ensure Node.js and npm are installed
- Check that all dependencies are installed: `npm install`
- Verify the development server is running: `npm start`

**WebSocket connection fails**
- Ensure the backend server is running on port 8080
- Check browser console for connection errors
- Verify network connectivity

**Data not updating**
- Confirm WebSocket connection is established
- Check server logs for data transmission
- Verify data format matches expected interface

**Build fails**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Angular cache: `npx ng cache clean`
- Check TypeScript compilation errors

## Dependencies

### Core Dependencies
- `@angular/core`: Angular framework core
- `@angular/common`: Common Angular utilities
- `@angular/platform-browser`: Browser platform
- `rxjs`: Reactive programming library
- `ws`: WebSocket client library

### Development Dependencies
- `@angular/cli`: Angular CLI tools
- `@angular/compiler-cli`: Template compilation
- `typescript`: TypeScript compiler
- `vitest`: Testing framework
- `prettier`: Code formatter


## License

This project is licensed under the ISC License.

```

## What Each Folder Does

| Folder | Purpose |
|--------|---------|
| `components/` | Reusable UI pieces (dashboard, stock card) |
| `services/` | Get data from WebSocket, manage app state |
| `models/` | Define data shapes (Stock type) |
| `public/` | Static files (images, icons, etc.) |


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

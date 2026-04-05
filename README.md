# Stock Dashboard - Angular Client

A real-time stock market dashboard application built with Angular 21, providing live stock price updates through WebSocket connections. This application displays stock information including current prices, daily highs/lows, and 52-week ranges for multiple stock symbols.

## Features

- **Real-time Stock Updates**: Live price updates via WebSocket connection
- **Interactive Stock Cards**: Individual cards for each stock with detailed information
- **Stock Tracking Toggle**: Enable/disable tracking for specific stocks
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Angular Architecture**: Built with standalone components and signals
- **TypeScript Support**: Full type safety throughout the application

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Angular CLI (version 21 or higher)

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd "g:\2026 Projects\client - Copy"
   ```

2. Install Angular client dependencies:
   ```bash
   npm install
   ```

3. Navigate to the server directory and install server dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

   This will create `node_modules` directories in both the root folder (for Angular) and the `server` folder (for the Node.js server).

## Usage

### Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`. The development server includes hot reload for automatic updates during development.

### Building for Production

Build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run watch
```

## Project Structure

```
client - Copy/
├── angular.json                 # Angular CLI configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # Application-specific TypeScript config
├── tsconfig.spec.json           # Test-specific TypeScript config
├── public/                      # Static assets
├── src/
│   ├── index.html               # Main HTML template
│   ├── main.ts                  # Application bootstrap
│   ├── styles.css               # Global styles
│   └── app/                     # Main application code
│       ├── app.ts               # Root component
│       ├── app.html             # Root template
│       ├── app.css              # Root styles
│       ├── app.config.ts        # Angular configuration
│       ├── app.spec.ts          # Root component tests
│       ├── components/          # Reusable UI components
│       │   ├── stock-card/      # Individual stock card component
│       │   │   ├── stock-card.ts
│       │   │   ├── stock-card.html
│       │   │   ├── stock-card.css
│       │   │   └── stock-card.spec.ts
│       │   └── stock-dashboard/ # Main dashboard component
│       │       ├── stock-dashboard.ts
│       │       ├── stock-dashboard.html
│       │       ├── stock-dashboard.css
│       │       └── stock-dashboard.spec.ts
│       ├── models/              # TypeScript interfaces
│       │   └── stock.model.ts   # Stock data model
│       └── services/            # Business logic services
│           ├── stock-service.ts # Stock data management
│           ├── stock-service.spec.ts
│           ├── websocket-service.ts # WebSocket communication
│           └── websocket-service.spec.ts
└── README.md                    # This file
```

## Architecture

### Components

#### App Component (`app.ts`)
The root component that bootstraps the application and renders the stock dashboard.

#### StockDashboard Component
- **Purpose**: Main container component that displays all stock cards
- **Features**: Manages the layout and passes data to individual stock cards
- **Template**: `stock-dashboard.html`
- **Styles**: `stock-dashboard.css`

#### StockCard Component
- **Purpose**: Displays detailed information for a single stock
- **Features**:
  - Current price with change indicators
  - Daily high/low prices
  - 52-week high/low ranges
  - Toggle button to activate/deactivate tracking
- **Template**: `stock-card.html`
- **Styles**: `stock-card.css`

### Services

#### StockService
- **Purpose**: Manages stock data state using Angular signals
- **Features**:
  - Maintains an array of stock data
  - Handles real-time updates from WebSocket
  - Provides methods to toggle stock tracking
  - Calculates price changes and trends

#### WebSocketService
- **Purpose**: Handles WebSocket communication with the backend server
- **Features**:
  - Establishes connection to `ws://localhost:8080`
  - Streams stock data as observables
  - Manages connection lifecycle and error handling

### Data Models

#### Stock Interface
```typescript
interface Stock {
  symbol: string;      // Stock ticker symbol
  current: number;     // Current price
  high: number;        // Daily high
  low: number;         // Daily low
  high52: number;      // 52-week high
  low52: number;       // 52-week low
  previous?: number;   // Previous price for change calculation
  active: boolean;     // Whether stock is being tracked
}
```

## Data Flow

1. **Application Start**: `main.ts` bootstraps the Angular application
2. **Component Initialization**: App component loads StockDashboard
3. **Service Initialization**: StockService connects to WebSocketService
4. **WebSocket Connection**: Establishes connection to backend server
5. **Data Streaming**: Stock data flows from server → WebSocketService → StockService → Components
6. **UI Updates**: Components update automatically via Angular signals

## Configuration

### Angular Configuration (`app.config.ts`)
Contains application-wide configuration including:
- Component imports
- Provider setup
- Routing configuration (if applicable)

### Environment Setup
The application connects to a WebSocket server running on `ws://localhost:8080`. Ensure the backend server is running before starting the client.

## Testing

The application uses Vitest for unit testing. Test files are located alongside their corresponding source files with the `.spec.ts` extension.

### Running Tests
```bash
npm test
```

### Test Coverage
Tests cover:
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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues:
- Check the troubleshooting section above
- Review Angular documentation: https://angular.io
- Check WebSocket specification: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

## Future Enhancements

- Stock search and addition functionality
- Price chart visualization
- Price alert notifications
- Portfolio management features
- Historical data analysis
- Dark/light theme toggle
- Offline data caching
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

## Learn More

- Angular: https://angular.io
- WebSocket: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

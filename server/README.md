# Stock Data Server

A Node.js WebSocket server that provides real-time stock market data to client applications. The server connects to the Finnhub API for live market data and streams updates to connected WebSocket clients.

## Features

- **Real-time Data Streaming**: Live stock price updates via WebSocket
- **Finnhub API Integration**: Connects to professional market data API
- **Mock Data Fallback**: Generates test data when API is unavailable
- **Multiple Stock Support**: Tracks multiple stock symbols simultaneously
- **Environment Configuration**: Secure API key management via environment variables
- **Error Handling**: Robust connection and data handling

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Finnhub API key (obtain from https://finnhub.io/)

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

   This will create a `node_modules` directory in the server folder with all required Node.js packages.

3. Create environment configuration file:
   ```bash
   # Create .env file in server directory
   FINNHUB_KEY=your_finnhub_api_key_here
   ```

## Usage

### Starting the Server

```bash
npm start
```

The server will start on WebSocket port 8080 (`ws://localhost:8080`).

### Testing Connection

You can test the WebSocket connection using browser developer tools:

```javascript
// Open browser console and run:
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => console.log('Received:', JSON.parse(event.data));
```

## Project Structure

### Complete Project Structure

```
client - Copy/
├── angular.json                 # Angular CLI configuration
├── package.json                 # Angular project dependencies and scripts
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
├── server/                      # Node.js backend server
│   ├── index.js                 # Main server application
│   ├── package.json             # Server dependencies and scripts
│   ├── .env                     # Environment variables (not committed)
│   └── README.md                # Server documentation
└── README.md                    # Main project documentation
```

### Server Folder Structure

```
server/
├── index.js                 # Main server application
├── package.json             # Project dependencies and scripts
├── .env                     # Environment variables (not committed)
└── README.md                # This documentation
```

## Architecture

### Server Components

#### WebSocket Server
- **Library**: `ws` package
- **Port**: 8080
- **Protocol**: WebSocket (RFC 6455)

#### Finnhub Integration
- **API**: Finnhub WebSocket API
- **Purpose**: Real-time market data
- **Fallback**: Mock data generation

#### Data Processing
- **Input**: Raw market data from Finnhub
- **Output**: Structured JSON stock data
- **Format**: Array of stock objects

### Data Flow

1. **Server Startup**: `index.js` initializes WebSocket server
2. **Client Connection**: Accepts WebSocket connections on port 8080
3. **Data Generation**: Sends mock data immediately upon connection
4. **Periodic Updates**: Broadcasts mock data every 2 seconds
5. **Finnhub Connection**: Establishes connection to Finnhub WebSocket API
6. **Real Data Streaming**: Forwards live market data to connected clients

## API Reference

### WebSocket Connection

**URL**: `ws://localhost:8080`

**Protocol**: WebSocket

**Authentication**: None required

### Data Format

Stock data is sent as a JSON array:

```json
[
  {
    "symbol": "APPL",
    "current": "150.25",
    "high": "155.25",
    "low": "145.25",
    "high52": "200.25",
    "low52": "100.25"
  }
]
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `symbol` | string | Stock ticker symbol (e.g., "APPL", "MSFT") |
| `current` | string | Current stock price |
| `high` | string | Daily high price |
| `low` | string | Daily low price |
| `high52` | string | 52-week high price |
| `low52` | string | 52-week low price |

### Update Frequency

- **Mock Data**: Every 2 seconds
- **Real Data**: As available from Finnhub API (typically real-time)

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FINNHUB_KEY` | Yes | Finnhub API authentication key |

### Stock Symbols

Currently tracked symbols (configurable in `index.js`):
- APPL (Apple Inc.)
- ALBHT
- MSFT (Microsoft Corporation)
- TSLA (Tesla Inc.)

To modify tracked stocks, edit the `symbols` array in `index.js`.

## Dependencies

### Runtime Dependencies
- **ws**: WebSocket server implementation
- **finnhub**: Finnhub API client library
- **axios**: HTTP client for API requests
- **dotenv**: Environment variable loader

### Development Dependencies
- None

## Development

### Running in Development

```bash
npm start
```

### Code Structure

```javascript
// index.js structure
require('dotenv').config();           // Load environment variables
const WebSocket = require('ws');      // WebSocket server
const finnhub = require('finnhub');   // Finnhub client

// Server setup
const wss = new WebSocket.Server({ port: 8080 });

// Stock symbols configuration
const symbols = ['APPL', 'ALBHT', 'MSFT', 'TSLA'];

// Mock data generation function
function generateMock() { /* ... */ }

// WebSocket connection handling
wss.on('connection', (client) => { /* ... */ });

// Finnhub connection setup
const finnhubWs = new WebSocket(/* ... */);
```

## Testing

### Manual Testing

1. Start the server: `npm start`
2. Open browser developer console
3. Connect to WebSocket and monitor data:
   ```javascript
   const ws = new WebSocket('ws://localhost:8080');
   ws.onopen = () => console.log('Connected');
   ws.onmessage = (event) => console.log(JSON.parse(event.data));
   ```

### Testing Without API Key

The server can run without a Finnhub API key by using mock data generation. Simply omit the `.env` file or `FINNHUB_KEY` variable.

## Deployment

### Production Deployment

1. Set environment variables:
   ```bash
   export FINNHUB_KEY=your_production_api_key
   ```

2. Start the server:
   ```bash
   npm start
   ```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

## Monitoring

### Server Logs

The server outputs connection status and errors to console:
- Client connections/disconnections
- Finnhub API connection status
- Data transmission confirmations

### Health Checks

Basic health check can be implemented by connecting to the WebSocket and verifying data reception.

## Security Considerations

- **API Keys**: Store Finnhub API key securely in environment variables
- **Rate Limiting**: Finnhub API has rate limits; monitor usage
- **Data Validation**: Validate incoming data from external APIs
- **Connection Limits**: Consider implementing connection limits for production

## Troubleshooting

### Common Issues

**Server won't start**
- Check Node.js installation: `node --version`
- Verify dependencies: `npm install`
- Check port availability: `netstat -an | grep 8080`

**WebSocket connection fails**
- Ensure server is running on port 8080
- Check firewall settings
- Verify client connection code

**No data received**
- Check `.env` file exists with valid `FINNHUB_KEY`
- Verify Finnhub API key is active
- Check server console for connection errors

**Finnhub connection errors**
- Verify API key validity at https://finnhub.io/
- Check API rate limits
- Review Finnhub service status

### Debug Mode

Enable additional logging by modifying `index.js` to include debug statements.

## Performance

### Resource Usage
- **Memory**: Minimal (~50MB for basic operation)
- **CPU**: Low usage for mock data, moderate for real-time processing
- **Network**: WebSocket connections, Finnhub API calls

### Scalability
- Supports multiple concurrent WebSocket connections
- Can be scaled horizontally with load balancer
- Consider connection pooling for high-traffic scenarios

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper error handling
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

### Documentation Links
- **WebSocket Protocol**: https://tools.ietf.org/html/rfc6455
- **Finnhub API**: https://finnhub.io/docs/api
- **ws Package**: https://github.com/websockets/ws

### Getting Help
- Check server logs for error messages
- Verify network connectivity
- Test with mock data (without API key)
- Review Finnhub API documentation

## Future Enhancements

- Authentication and authorization
- Stock symbol configuration via API
- Historical data caching
- Rate limiting and throttling
- Monitoring and metrics
- Docker containerization
- Load balancing support
- Data persistence options
│   │   │   │   └── stock.model.ts
│   │   │   │
│   │   │   └── app.component.ts
│   │   │
│   │   └── styles.css
│   │
│   └── angular.json
│
└── README.md

```

## What It Does

The server:
1. Listens for connections on port 8080
2. Sends stock data every 2 seconds
3. Connects to Finnhub API for real market data
4. Sends data to the Angular dashboard

## Setup Steps

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Get Finnhub API Key

1. Visit: https://finnhub.io/
2. Sign up for free
3. Get your API key from dashboard

### Step 3: Create .env File

Create a `.env` file in the `server` folder:

```bash
FINNHUB_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Finnhub API key.

### Step 4: Start Server

```bash
npm start
```

You should see:
```
Server listening on port 8080
```

## How It Works

```
Finnhub API
    ↓
    ├→ Real market data
    │
WebSocket Server (port 8080)
    ↓
    └→ Stock Dashboard App
```

## Stock Data Format

Server sends data like this to connected clients:

```json
[
  {
    "symbol": "APPL",
    "current": "150.25",
    "high": "155.25",
    "low": "145.25",
    "high52": "200.25",
    "low52": "100.25"
  }
]
```

## Tracked Stocks

Currently tracking:
- APPL (Apple)
- ALBHT
- MSFT (Microsoft)
- TSLA (Tesla)

To change stocks, edit the `symbols` array in `index.js`

## Test Without API Key

The server works without Finnhub key! It generates fake data for testing.

Just run `npm start` (skip the .env file step)

## Data Update Frequency

- Sends data every **2 seconds**
- Real Finnhub data updates when available
- Mock data always available

## File Breakdown

| File | Purpose |
|------|---------|
| `index.js` | Main server code |
| `package.json` | List of dependencies |
| `.env` | Store API key (secret) |

## Main Dependencies

| Package | What It Does |
|---------|-------------|
| `ws` | WebSocket server |
| `finnhub` | Finnhub API client |
| `axios` | HTTP requests |
| `dotenv` | Read .env file |

## Troubleshooting

**"Cannot find module 'ws'"**
- Run: `npm install`

**"FINNHUB_KEY not found"**
- Create `.env` file with your API key
- Or just run without it (uses mock data)

**"Port 8080 already in use"**
- Change port in `index.js` line with `8080`
- Or close other apps using port 8080

**Server crashes?**
- Check console for error messages
- Make sure .env file is in correct format

## Testing Connection

Open browser console and run:

```javascript
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => console.log(JSON.parse(event.data));
```

Should see stock data in console.

## Run With Client

Terminal 1 - Start server:
```bash
cd server
npm start
```

Terminal 2 - Start Angular app:
```bash
cd ..
npm start
```

Then visit: http://localhost:4200

## Code Structure

```
index.js does:
├─ Load .env file
├─ Create WebSocket server on port 8080
├─ Wait for client connections
├─ Send stock data every 2 seconds
├─ Connect to Finnhub API
└─ Forward Finnhub data to clients
```

## Technologies

- **Node.js** - Runtime
- **ws** - WebSocket library
- **Finnhub** - Stock API
- **dotenv** - Environment variables

## Learn More

- WebSocket: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- Finnhub API: https://finnhub.io/docs/api
- ws package: https://github.com/websockets/ws

## Support

Issues? Check:
1. Is server running (`npm start`)?
2. Is port 8080 free?
3. Does .env have correct Finnhub key?
4. Check browser console for errors

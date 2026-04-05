# Stock Data Server

A simple WebSocket server that sends real-time stock price data to the dashboard app.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Finnhub API key:
```
FINNHUB_KEY=your_key_here
```

3. Start the server:
```bash
npm start
```

Server runs on: `ws://localhost:8080`

## Folder Structure

```
stock-realtime-app/
│
├── server/                      # Node.js backend
│   ├── index.js                # WebSocket server
│   ├── package.json            # Dependencies
│   └── .env                    # API key (not committed)
│
├── client/                      # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── stock-card/
│   │   │   │   │   ├── stock-card.component.ts
│   │   │   │   │   ├── stock-card.component.html
│   │   │   │   │   └── stock-card.component.css
│   │   │   │   │
│   │   │   │   ├── stock-dashboard/
│   │   │   │   │   └── stock-dashboard.component.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── websocket.service.ts
│   │   │   │   └── stock.service.ts
│   │   │   │
│   │   │   ├── models/
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

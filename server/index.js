require('dotenv').config();
const WebSocket = require('ws');

const FINNHUB_KEY = process.env.FINNHUB_KEY;

const wss = new WebSocket.Server({ port: 8080 });

const symbols = ['APPL', 'ALBHT', 'MSFT', 'TSLA'];

function generateMock() {
  return symbols.map(s => {
    const price = 100 + Math.random() * 200;
    return {
      symbol: s,
      current: price.toFixed(2),
      high: (price + 5).toFixed(2),
      low: (price - 5).toFixed(2),
      high52: (price + 50).toFixed(2),
      low52: (price - 50).toFixed(2)
    };
  });
}

wss.on('connection', (client) => {
  console.log('Client connected');


  client.send(JSON.stringify(generateMock()));


  const interval = setInterval(() => {
    client.send(JSON.stringify(generateMock()));
  }, 2000);

  // Finnhub connection
  const finnhub = new WebSocket(
    `wss://ws.finnhub.io?token=${FINNHUB_KEY}`
  );

  finnhub.on('open', () => {
    console.log('Finnhub connected');

    symbols.forEach(symbol => {
      finnhub.send(JSON.stringify({
        type: 'subscribe',
        symbol
      }));
    });
  });

  finnhub.on('message', (data) => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.type === 'trade' && parsed.data) {
        const stocks = parsed.data.map(trade => ({
          symbol: trade.s,
          current: trade.p,
          high: trade.p + Math.random() * 5,
          low: trade.p - Math.random() * 5,
          high52: trade.p + 50,
          low52: trade.p - 50
        }));

        client.send(JSON.stringify(stocks));
      }
    } catch (err) {
      console.error('Parse error:', err.message);
    }
  });

  client.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
    finnhub.close();
  });

  client.on('error', (err) => {
    console.error('Client error:', err.message);
  });
});

console.log('Server running on ws://localhost:8080');
























// require('dotenv').config();
// const WebSocket = require('ws');

// const FINNHUB_KEY = process.env.FINNHUB_KEY;
// const PORT = process.env.PORT || 8080;

// const wss = new WebSocket.Server({ port: PORT });
// const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];

// let finnhub = null;
// let finnhubConnected = false;
// const clients = new Set();
// let reconnectTimer = null;

// function connectFinnhub() {
//   if (!FINNHUB_KEY) {
//     console.error('Finnhub key not set. Set FINNHUB_KEY in .env.');
//     return;
//   }

//   if (finnhub) return;

//   console.log('Connecting to Finnhub...');
//   finnhub = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_KEY}`);

//   finnhub.on('open', () => {
//     finnhubConnected = true;
//     console.log('Finnhub connected. Subscribing to symbols.');
//     symbols.forEach(symbol => {
//       if (finnhub) {
//         finnhub.send(JSON.stringify({ type: 'subscribe', symbol }));
//       }
//     });
//   });

//   finnhub.on('message', (data) => {
//     let parsed;
//     try {
//       parsed = JSON.parse(data);
//     } catch (err) {
//       console.error('Failed to parse Finnhub message:', err.message);
//       return;
//     }

//     if (parsed.type !== 'trade' || !parsed.data) return;

//     const stocks = parsed.data.map(trade => ({
//       symbol: trade.s,
//       current: trade.p,
//       high: trade.p + Math.random() * 5,
//       low: trade.p - Math.random() * 5,
//       high52: trade.p + 50,
//       low52: trade.p - 50
//     }));

//     clients.forEach(client => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(stocks));
//       }
//     });
//   });

//   finnhub.on('close', () => {
//     console.warn('Finnhub connection closed');
//     finnhubConnected = false;
//     finnhub = null;

//     // Reconnect if clients are still connected
//     if (clients.size > 0 && !reconnectTimer) {
//       reconnectTimer = setTimeout(() => {
//         reconnectTimer = null;
//         connectFinnhub();
//       }, 10000); // Increased delay to avoid rate limiting
//     }
//   });

//   finnhub.on('error', (err) => {
//     console.error('Finnhub error:', err.message);
//     finnhub = null;
//   });
// }

// wss.on('connection', (client) => {
//   console.log('Client connected');
//   clients.add(client);

//   if (!finnhub) {
//     connectFinnhub();
//   }

//   client.on('close', () => {
//     clients.delete(client);
//     console.log('Client disconnected');

//     if (clients.size === 0 && finnhub) {
//       finnhub.close();
//       finnhub = null;
//       finnhubConnected = false;
//       if (reconnectTimer) {
//         clearTimeout(reconnectTimer);
//         reconnectTimer = null;
//       }
//     }
//   });

//   client.on('error', (err) => {
//     console.error('Client WS error:', err.message);
//   });
// });

// console.log(`🚀 Server running on ws://localhost:${PORT}`);
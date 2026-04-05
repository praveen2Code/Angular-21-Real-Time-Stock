import { Injectable, signal } from '@angular/core';
import { Stock } from '../models/stock.model';
import { WebsocketService } from './websocket-service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  stocks = signal<Stock[]>([]);

  constructor(private ws: WebsocketService) {
    this.init();
  }

  init() {
    this.ws.connect().subscribe((data: Stock[]) => {
      const updated = data.map(stock => {
        const prev = this.stocks().find(s => s.symbol === stock.symbol);

        // Only update price data if stock is active
        if (prev?.active === false) {
          // Keep old price data for inactive stocks
          return {
            ...prev,
            active: false
          };
        }

        // Update price data for active stocks
        return {
          ...stock,
          previous: prev?.current ?? stock.current,
          active: prev?.active ?? true
        };
      });

      this.stocks.set(updated);
    });
  }

  toggle(symbol: string) {
    this.stocks.update(stocks =>
      stocks.map(s =>
        s.symbol === symbol ? { ...s, active: !s.active } : s
      )
    );
  }
}

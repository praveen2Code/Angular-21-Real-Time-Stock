import { Component } from '@angular/core';
import { StockService } from '../../services/stock-service';
import { StockCard } from '../stock-card/stock-card';

@Component({
  selector: 'app-stock-dashboard',
  standalone: true,
  imports: [StockCard],
  templateUrl: './stock-dashboard.html',
  styleUrl: './stock-dashboard.css',
})
export class StockDashboard {
  constructor(public stockService: StockService) {
    console.log('🏗️ StockDashboard component created');
    console.log('📊 Stock service stocks:', this.stockService.stocks());
  }

  // toggle(symbol: string) {
  //   this.stockService.toggle(symbol);
  // }
}

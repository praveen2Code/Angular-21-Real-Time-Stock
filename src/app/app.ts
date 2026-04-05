import { Component, signal } from '@angular/core';
import { StockDashboard } from './components/stock-dashboard/stock-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StockDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}

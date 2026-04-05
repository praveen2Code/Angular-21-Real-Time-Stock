import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../../models/stock.model';
import {NgClass } from '@angular/common';

@Component({
  selector: 'app-stock-card',
  imports: [NgClass],
  standalone: true,
  templateUrl: './stock-card.html',
  styleUrl: './stock-card.css',
})
export class StockCard {
  @Input() stock!: Stock;
  @Output() toggle = new EventEmitter<string>();



  get statusClass() {
  if (!this.stock.active) return 'off';
  if (this.stock.current > (this.stock.previous ?? 0)) return 'up';
  if (this.stock.current < (this.stock.previous ?? 0)) return 'down';
  return '';
}
}

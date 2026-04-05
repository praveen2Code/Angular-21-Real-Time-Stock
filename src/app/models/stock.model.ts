export interface Stock {
  symbol: string;
  current: number;
  high: number;
  low: number;
  high52: number;
  low52: number;
  previous?: number;
  active?: boolean;
}
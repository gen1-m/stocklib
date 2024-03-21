export interface Trade {
  c: any, 
  s: string,
  p: number,
  t: number,
  v: number
}

export interface Stock {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
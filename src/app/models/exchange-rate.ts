export interface ExchangeRate {
  code: string;
  buyPrice: number;
  sellPrice: number;
  updatedAt: string;
}

export interface HistoricalExchangeRate {
  value: number;
  date: string;
}

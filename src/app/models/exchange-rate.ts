export interface ExchangeRate {
  code: string;
  buyPrice: number;
  sellPrice: number;
  updatedAt: string;
}

export interface HistoricalExchangeRate {
  buyPrice: number;
  sellPrice: number;
  date: string;
}

export interface ExchangePrice {
  buy: number;
  sell: number;
  updatedAt: string;
  refCurrencyId: string;
}

export interface HistoricalExchangePrice {
  buy: number;
  sell: number;
  date: string;
}

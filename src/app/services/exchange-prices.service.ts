import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExchangePrice, HistoricalExchangePrice } from '../models/exchange-price';
import { PriceChange } from '../models/price-change';

@Injectable({ providedIn: 'root' })
export class ExchangePricesService {

  constructor(private httpClient: HttpClient) {
  }

  get(currencyId: string): Observable<ExchangePrice> {
    return this.httpClient.get<ExchangePrice>(`${environment.apiUrl}/api/exchange-prices/${currencyId}`);
  }

  getHistorical(currencyId: string): Observable<HistoricalExchangePrice[]> {
    return this.httpClient.get<HistoricalExchangePrice[]>(
      `${environment.apiUrl}/api/exchange-prices/${currencyId}/historical`);
  }

  getChange(currencyId: string): Observable<PriceChange> {
    return this.httpClient.get<PriceChange>(`${environment.apiUrl}/api/exchange-prices/${currencyId}/changes`);
  }
}

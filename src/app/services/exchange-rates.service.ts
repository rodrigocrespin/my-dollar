import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExchangeRate, HistoricalExchangeRate } from 'src/app/models/exchange-rate';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {

  constructor(private httpClient: HttpClient) {
  }

  get(currencyId: string): Observable<ExchangeRate> {
    return this.httpClient.get<ExchangeRate>(`${environment.apiUrl}/api/exchange-rates/${currencyId}`);
  }

  getHistorical(currencyId: string): Observable<HistoricalExchangeRate[]> {
    return this.httpClient.get<HistoricalExchangeRate[]>(
      `${environment.apiUrl}/api/exchange-rates/${currencyId}/historical`);
  }

  isHealthy(): Observable<boolean> {
    return this.httpClient.get<any>(`${environment.apiUrl}/health/live`).pipe(
      mapTo(true),
      catchError((e: HttpErrorResponse) => of(e.status === 200))
    );
  }
}

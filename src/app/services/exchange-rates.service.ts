import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRate } from 'src/app/models/exchange-rate';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {

  constructor(private httpClient: HttpClient) {
  }

  get(currencyId: string): Observable<ExchangeRate> {
    return this.httpClient.get<ExchangeRate>(`${environment.apiUrl}/api/exchange-rates/${currencyId}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceChange } from 'src/app/models/price-change';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PriceChangesService {

  constructor(private httpClient: HttpClient) {
  }

  get(currencyId: string): Observable<PriceChange> {
    return this.httpClient.get<PriceChange>(`${environment.apiUrl}/api/price-changes/${currencyId}`);
  }
}

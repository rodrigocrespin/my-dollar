import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HealthCheckService {

  constructor(private httpClient: HttpClient) {
  }

  isHealthy(): Observable<boolean> {
    return this.httpClient.get<any>(`${environment.apiUrl}/api/health`).pipe(
      mapTo(true),
      catchError((e: HttpErrorResponse) => of(e.status === 200))
    );
  }
}

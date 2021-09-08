import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ExchangeRate } from '../models/exchange-rate';

@Injectable({ providedIn: 'root' })
export class ExchangeRatesService {

  constructor(private firestore: AngularFirestore) {
  }

  get(): Observable<ExchangeRate[]> {
    return this.firestore.collection<ExchangeRate>('ExchangeRates').get().pipe(
      map(snap => snap.docs.map(d => d.data()))
    );
  }
}

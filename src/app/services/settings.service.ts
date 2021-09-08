import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../models/settings';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  constructor(private firestore: AngularFirestore) {
  }

  get(): Observable<Settings> {
    return this.firestore.collection<Settings>('Settings').get().pipe(
      map(snap => snap.docs[0].data())
    );
  }
}

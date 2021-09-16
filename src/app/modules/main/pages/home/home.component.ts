import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { ExchangeRate } from 'src/app/models/exchange-rate';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { map, startWith } from 'rxjs/operators';

interface HomeModel {
  dollar: ExchangeRate;
  settings: Settings;
  loading: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  model$: Observable<HomeModel>;

  constructor(private settingsService: SettingsService, private exchangeRatesService: ExchangeRatesService) {
    const settings$ = this.settingsService.get();
    const dollar$ = this.exchangeRatesService.get('USD');

    this.model$ = combineLatest([settings$, dollar$]).pipe(
      map(([settings, dollar]) => ({ dollar, settings, loading: false })),
      startWith({ loading: true } as HomeModel)
    );
  }
}

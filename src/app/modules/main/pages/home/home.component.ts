import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { ExchangeRate } from 'src/app/models/exchange-rate';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { map, startWith } from 'rxjs/operators';

interface HomeModel {
  exchangeRates: ExchangeRate[];
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
    const exchangeRates$ = this.exchangeRatesService.get();

    this.model$ = combineLatest([exchangeRates$, settings$]).pipe(
      map(([exchangeRates, settings]) => ({ exchangeRates, settings, loading: false })),
      startWith({ loading: true } as HomeModel)
    );
  }
}

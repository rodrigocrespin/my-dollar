import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { map, startWith } from 'rxjs/operators';
import { PriceChangesService } from '../../../../services/price-changes.service';
import { PriceChange } from '../../../../models/price-change';

interface HomeModel {
  settings: Settings;
  loading: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  model$: Observable<HomeModel>;
  usdPriceChange$: Observable<{ loading: boolean, priceChange?: PriceChange }>;
  showHistory = false;

  constructor(private settingsService: SettingsService, private priceChangesService: PriceChangesService) {
    const settings$ = this.settingsService.get();
    this.usdPriceChange$ = this.priceChangesService.get('USD').pipe(
      map(priceChange => ({ priceChange, loading: false })),
      startWith({ loading: true })
    );

    this.model$ = combineLatest([settings$]).pipe(
      map(([settings]) => ({ settings, loading: false })),
      startWith({ loading: true } as HomeModel)
    );
  }
}

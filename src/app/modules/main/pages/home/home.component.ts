import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { map, startWith } from 'rxjs/operators';

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
  showHistory = false;

  constructor(private settingsService: SettingsService) {
    const settings$ = this.settingsService.get();

    this.model$ = combineLatest([settings$]).pipe(
      map(([settings]) => ({ settings, loading: false })),
      startWith({ loading: true } as HomeModel)
    );
  }
}

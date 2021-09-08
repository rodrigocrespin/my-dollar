import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';

interface Price {
  buy: number;
  sell: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  price: Price = { buy: 179, sell: 182 };
  settings$: Observable<Settings>;

  constructor(private settingsService: SettingsService) {
    this.settings$ = this.settingsService.get();
  }
}

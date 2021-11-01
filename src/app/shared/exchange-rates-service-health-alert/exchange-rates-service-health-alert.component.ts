import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-exchange-rates-service-health-alert',
  template: `
    <div *ngIf="(isHealthy$|async) === false" class="alert alert-danger" style="width: fit-content;">
      <i class="fa fa-warning"></i>&nbsp;
      <span translate>API seems to be unhealthy or cannot be reached. Please try again later</span>
    </div>
  `
})

export class ExchangeRatesServiceHealthAlertComponent {
  isHealthy$: Observable<boolean>;

  constructor(private exchangeRatesService: ExchangeRatesService) {
    this.isHealthy$ = this.exchangeRatesService.isHealthy();
  }
}

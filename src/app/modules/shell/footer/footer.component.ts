import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeRate } from 'src/app/models/exchange-rate';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

interface FooterModel {
  btc?: ExchangeRate;
  eth?: ExchangeRate;
  eur?: ExchangeRate;
  loading: boolean;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  test: Date = new Date();
  model$: Observable<FooterModel>;

  constructor(private router: Router, private exchangeRatesService: ExchangeRatesService) {
    const getExchangeRate = (id: string) => this.exchangeRatesService.get(id).pipe(
      catchError((_: HttpErrorResponse) => of(undefined))
    );

    const btc$ = getExchangeRate('BTC');
    const eth$ = getExchangeRate('ETH');
    const eur$ = getExchangeRate('EUR');

    this.model$ = combineLatest([btc$, eth$, eur$]).pipe(
      map(([btc, eth, eur]) => ({ btc, eur, eth, loading: false })),
      startWith({ loading: true })
    );
  }

  getPath(): string {
    return this.router.url;
  }
}

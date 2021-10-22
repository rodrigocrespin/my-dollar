import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeRate } from 'src/app/models/exchange-rate';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PriceChangesService } from 'src/app/services/price-changes.service';
import { PriceChange } from 'src/app/models/price-change';

interface CurrencyModel {
  exchangeRate?: ExchangeRate;
  priceChange?: PriceChange;
}

interface FooterModel {
  btc?: CurrencyModel;
  eth?: CurrencyModel;
  eur?: CurrencyModel;
  loading: boolean;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  test: Date = new Date();
  model$: Observable<FooterModel>;

  constructor(private router: Router,
              private exchangeRatesService: ExchangeRatesService,
              private priceChangesService: PriceChangesService) {
    const getExchangeRate = (id: string) => this.exchangeRatesService.get(id).pipe(
      catchError((_: HttpErrorResponse) => of(undefined))
    );
    const getPriceChange = (id: string) => this.priceChangesService.get(id).pipe(
      catchError((_: HttpErrorResponse) => of(undefined))
    );

    const getCurrencyModel = (id: string) => combineLatest([getExchangeRate(id), getPriceChange(id)]).pipe(
      map(([exchangeRate, priceChange]) => ({ exchangeRate, priceChange }))
    );

    const btc$ = getCurrencyModel('BTC');
    const eth$ = getCurrencyModel('ETH');
    const eur$ = getCurrencyModel('EUR');

    this.model$ = combineLatest([btc$, eth$, eur$]).pipe(
      map(([btc, eth, eur]) => ({ btc, eur, eth, loading: false })),
      startWith({ loading: true })
    );
  }

  getPath(): string {
    return this.router.url;
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExchangeRate } from 'src/app/models/exchange-rate';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PriceChangesService } from '../../../../services/price-changes.service';
import { PriceChange } from '../../../../models/price-change';

interface ExchangeRateCardModel {
  currencyId: string;
  exchangeRate: ExchangeRate;
  midPrice: number;
  priceChange: PriceChange;
  loading: boolean;
  error?: { status: number, message: string };
}

@Component({
  selector: 'app-exchange-rate-card',
  templateUrl: './exchange-rate-card.component.html',
  styleUrls: ['./exchange-rate-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExchangeRateCardComponent {
  model$: Observable<ExchangeRateCardModel>;

  @Input() set currencyId(val: string) {
    this.currencyIdSubject.next(val);
  }
  @Input() showMidPrice?: boolean;
  @Input() liftOnHover?: boolean;

  private currencyIdSubject = new BehaviorSubject<string|null>(null);

  constructor(private exchangeRatesService: ExchangeRatesService,
              private priceChangesService: PriceChangesService) {
    const calculateMidPrice = (exchangeRate: ExchangeRate): number => {
      return exchangeRate.buyPrice + ((exchangeRate.sellPrice - exchangeRate.buyPrice) / 2);
    };
    this.model$ = this.currencyIdSubject.pipe(
      filter(id => !!id),
      switchMap(currencyId => combineLatest([this.exchangeRatesService.get(currencyId!), this.priceChangesService.get(currencyId!)]).pipe(
        map(([exchangeRate, priceChange]) => ({
          currencyId: currencyId!,
          exchangeRate,
          priceChange,
          midPrice: calculateMidPrice(exchangeRate),
          loading: false
        })),
        catchError((res: HttpErrorResponse) => {
          const { status, title } = res.error || {};
          return of({ currencyId: currencyId!, error: { status, message: title }, loading: true } as ExchangeRateCardModel);
        })
      )),
      startWith({ loading: true } as ExchangeRateCardModel)
    );
  }
}

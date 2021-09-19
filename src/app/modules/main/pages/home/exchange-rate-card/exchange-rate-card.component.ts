import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExchangeRate } from 'src/app/models/exchange-rate';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

interface ExchangeRateCardModel {
  currencyId: string;
  exchangeRate: ExchangeRate;
  midPrice: number;
  loading: boolean;
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

  constructor(private exchangeRatesService: ExchangeRatesService) {
    const calculateMidPrice = (exchangeRate: ExchangeRate): number => {
      return exchangeRate.buyPrice + ((exchangeRate.sellPrice - exchangeRate.buyPrice) / 2);
    };
    this.model$ = this.currencyIdSubject.pipe(
      filter(id => !!id),
      switchMap(currencyId => this.exchangeRatesService.get(currencyId!).pipe(
        map(exchangeRate => ({
          currencyId: currencyId!,
          exchangeRate,
          midPrice: calculateMidPrice(exchangeRate),
          loading: false
        })),
      )),
      startWith({ loading: true } as ExchangeRateCardModel)
    );
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PriceChange } from '../../../../models/price-change';
import { ExchangePricesService } from '../../../../services/exchange-prices.service';
import { ExchangePrice } from '../../../../models/exchange-price';

interface ExchangePriceCardModel {
  currencyId: string;
  exchangePrice: ExchangePrice;
  midPrice: number;
  priceChange?: PriceChange;
  loading: boolean;
  error?: { status: number, message: string };
}

@Component({
  selector: 'app-exchange-price-card',
  templateUrl: './exchange-price-card.component.html',
  styleUrls: ['./exchange-price-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExchangePriceCardComponent {
  model$: Observable<ExchangePriceCardModel>;

  @Input() set currencyId(val: string) {
    this.currencyIdSubject.next(val);
  }
  @Input() showMidPrice?: boolean;
  @Input() liftOnHover?: boolean;
  @Input() label = '$';

  private currencyIdSubject = new BehaviorSubject<string|null>(null);

  constructor(private exchangePricesService: ExchangePricesService) {
    const calculateMidPrice = (price: ExchangePrice): number => {
      return price.buy + ((price.sell - price.buy) / 2);
    };

    const exchangePrice$ = (currencyId: string) => this.exchangePricesService.get(currencyId);
    const priceChange$ = (currencyId: string) => this.exchangePricesService.getChange(currencyId).pipe(
      catchError((_: HttpErrorResponse) => of(undefined))
    );

    this.model$ = this.currencyIdSubject.pipe(
      filter(id => !!id),
      switchMap(currencyId => combineLatest([exchangePrice$(currencyId!), priceChange$(currencyId!)]).pipe(
        map(([exchangePrice, priceChange]) => ({
          currencyId: currencyId!,
          exchangePrice,
          priceChange,
          midPrice: calculateMidPrice(exchangePrice),
          loading: false
        })),
        catchError((res: HttpErrorResponse) => {
          const { status, title } = res.error || {};
          return of({ currencyId: currencyId!, error: { status, message: title }, loading: true } as ExchangePriceCardModel);
        })
      )),
      startWith({ loading: true } as ExchangePriceCardModel)
    );
  }
}

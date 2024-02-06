import { Component, Input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart, ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { LanguageService } from '../../../../services/language.service';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { DateTime } from 'luxon';
import { ExchangePricesService } from '../../../../services/exchange-prices.service';
import { HistoricalExchangePrice } from '../../../../models/exchange-price';

interface ChartOptionsModel {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
}

interface HistoricalExchangePricesModel {
  chartOptions?: ChartOptionsModel;
  loading: boolean;
}

type RateKey = 'buy' | 'sell' | 'mid';
const DEFAULT_RATE_KEY: RateKey = 'mid';
const RATE_LABEL = {
  buy: 'Buy',
  mid: 'Mid',
  sell: 'Sell'
};

@Component({
  selector: 'app-historical-exchange-prices-card',
  templateUrl: './historical-exchange-prices-card.component.html',
  styleUrls: ['./historical-exchange-prices-card.component.scss'],
  providers: [TranslatePipe]
})
export class HistoricalExchangePricesCardComponent {
  model$: Observable<HistoricalExchangePricesModel>;
  dataFrom = DateTime.utc().diff(DateTime.utc().minus({ month: 3 }));

  @Input() set currencyId(val: string) {
    this.currencyIdSubject.next(val);
  }

  private currencyIdSubject = new BehaviorSubject<string|null>(null);
  private selectedRateSubject = new BehaviorSubject<RateKey>(DEFAULT_RATE_KEY);

  constructor(languageService: LanguageService,
              private exchangePricesService: ExchangePricesService,
              private translatePipe: TranslatePipe) {
    const lang$ = languageService.language$;
    const chartOptions$ = (items: (HistoricalExchangePrice & { mid: number })[]) => combineLatest([lang$, this.selectedRateSubject]).pipe(
      map(([lang, rateKey]) => {
        return {
          series: [
            {
              name: this.translatePipe.transform(RATE_LABEL[rateKey] || 'Price'),
              data: items.map(x => (x as any)[rateKey]),
              color: '#63eec9'
            }
          ] as ApexAxisChartSeries,
          chart: {
            fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
            height: '100%',
            type: "area",
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            foreColor: '#9ca3af',
            defaultLocale: lang || 'en',
            locales: [
              {
                name: 'en',
                options: {
                  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  toolbar: {
                    download: 'Download SVG',
                    selection: 'Selection',
                    selectionZoom: 'Selection Zoom',
                    zoomIn: 'Zoom In',
                    zoomOut: 'Zoom Out',
                    pan: 'Panning',
                    reset: 'Reset Zoom',
                  }
                }
              },
              {
                name: 'es',
                options: {
                  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                  days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                  shortDays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                }
              }
            ],
          } as ApexChart,
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          } as ApexStroke,
          fill: {
            type: 'gradient',
          },
          grid: {
            borderColor: '#6b7280',
            strokeDashArray: 1,
            show: false,
          } as ApexGrid,
          xaxis: {
            type: "datetime",
            lines: {
              show: false,
            },
            crosshairs: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            categories: items.map(x => DateTime.fromISO(x.date).toISODate()),
            labels: {
              format: 'd MMM',
              style: {
                colors: '#6B7280'
              },
              show: true,
            }
          } as ApexXAxis,
          yaxis: {
            labels: {
              show: false
            },
            lines: {
              show: false,
            }
          } as ApexYAxis,
          tooltip: {
            x: {
              format: "dd/MM/yyyy"
            },
            theme: 'dark'
          } as ApexTooltip
        };
      })
    );

    const calculateMidPrice = (price: HistoricalExchangePrice): number => {
      return price.buy + ((price.sell - price.buy) / 2);
    };

    this.model$ = this.currencyIdSubject.pipe(
      filter(id => !!id),
      switchMap(currencyId => this.exchangePricesService.getHistorical(currencyId!).pipe(
        map(items => items.map(x => ({ ...x, mid: calculateMidPrice(x) })))
      )),
      switchMap(items => chartOptions$(items)),
      map(chartOptions => ({ loading: false, chartOptions })),
      startWith({ loading: true })
    );
  }

  selectChange(obj: HTMLSelectElement) {
    this.selectedRateSubject.next((obj.value as RateKey) || DEFAULT_RATE_KEY);
  }
}


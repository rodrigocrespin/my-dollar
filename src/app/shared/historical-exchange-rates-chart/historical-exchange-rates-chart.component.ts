import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { HistoricalExchangeRate } from 'src/app/models/exchange-rate';
import { ChartType } from 'chart.js';
import { DatePipe } from '@angular/common';

interface HistoricalExchangeRatesModel {
  items: HistoricalExchangeRate[];
  loading: boolean;
  lineChartData: { data: number[], label: string, yAxisID?: string }[];
  lineChartLabels: any[];
}

@Component({
  selector: 'app-historical-exchange-rates-chart',
  templateUrl: './historical-exchange-rates-chart.component.html',
  styleUrls: ['./historical-exchange-rates-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})

export class HistoricalExchangeRatesChartComponent {
  model$: Observable<HistoricalExchangeRatesModel>;
  lineChartType: ChartType = 'line';
  lineChartOptions: any = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    }
  };
  lineChartColors: any[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  @Input() set currencyId(val: string) {
    this.currencyIdSubject.next(val);
  }

  private currencyIdSubject = new BehaviorSubject<string|null>(null);

  constructor(private exchangeRatesService: ExchangeRatesService, private datePipe: DatePipe) {
    // https://github.com/valor-software/ng2-charts
    // https://valor-software.com/ng2-charts/#/LineChart
    this.model$ = this.currencyIdSubject.pipe(
      filter(id => !!id),
      switchMap(currencyId => this.exchangeRatesService.getHistorical(currencyId!)),
      map(items => ({ loading: false, items })),
      map(model => ({
        ...model,
        lineChartData: [{ data: model.items.map(item => item.value), label: 'Price' }],
        lineChartLabels: model.items.map(item => this.datePipe.transform(item.date, 'MMMM yyyy'))
      })),
      startWith({ loading: true, items: [], lineChartData: [], lineChartLabels: [] })
    );
  }
}

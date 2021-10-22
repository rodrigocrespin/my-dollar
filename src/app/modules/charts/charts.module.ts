import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { HistoricalExchangeRatesChartComponent } from './historical-exchange-rates-chart/historical-exchange-rates-chart.component';

@NgModule({
  declarations: [
    HistoricalExchangeRatesChartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports: [
    HistoricalExchangeRatesChartComponent
  ]
})
export class ChartsModule { }

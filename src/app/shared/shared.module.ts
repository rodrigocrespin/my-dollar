import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalExchangeRatesChartComponent } from './historical-exchange-rates-chart/historical-exchange-rates-chart.component';
import { NgChartsModule } from 'ng2-charts';

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
export class SharedModule {}

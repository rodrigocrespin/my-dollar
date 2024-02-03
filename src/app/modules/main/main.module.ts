import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ExchangeRateCardComponent } from './components/exchange-rate-card/exchange-rate-card.component';
import { SharedModule } from '../../shared/shared.module';
import { HistoricalExchangeRatesChartComponent } from './components/historical-exchange-rates-chart/historical-exchange-rates-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    HomeComponent,
    ExchangeRateCardComponent,
    HistoricalExchangeRatesChartComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgApexchartsModule,
  ]
})
export class MainModule { }

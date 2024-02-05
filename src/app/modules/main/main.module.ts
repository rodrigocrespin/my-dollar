import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ExchangePriceCardComponent } from './components/exchange-price-card/exchange-price-card.component';
import { SharedModule } from '../../shared/shared.module';
import { HistoricalExchangePricesCardComponent } from './components/historical-exchange-prices-card/historical-exchange-prices-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    HomeComponent,
    ExchangePriceCardComponent,
    HistoricalExchangePricesCardComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgApexchartsModule,
  ]
})
export class MainModule { }

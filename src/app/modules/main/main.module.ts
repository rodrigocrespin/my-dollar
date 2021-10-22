import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeRateCardComponent } from './pages/home/exchange-rate-card/exchange-rate-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SmallExchangeRateCardComponent } from './pages/home/small-exchange-rate-card/small-exchange-rate-card.component';
import { ChartsModule } from '../charts/charts.module';

@NgModule({
  declarations: [
    HomeComponent,
    ExchangeRateCardComponent,
    SmallExchangeRateCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgbModule,
    SharedModule,
    ChartsModule
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeRateCardComponent } from './pages/home/exchange-rate-card/exchange-rate-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    ExchangeRateCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgbModule
  ]
})
export class MainModule { }

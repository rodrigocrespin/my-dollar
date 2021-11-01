import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePipe } from './language.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';
import { AbsoluteNumberPipe } from './absolute-number.pipe';
import { ExchangeRatesServiceHealthAlertComponent } from './exchange-rates-service-health-alert/exchange-rates-service-health-alert.component';

@NgModule({
  declarations: [
    LanguagePipe,
    AbsoluteNumberPipe,
    ExchangeRatesServiceHealthAlertComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MomentModule
  ],
  exports: [
    LanguagePipe,
    TranslateModule,
    MomentModule,
    AbsoluteNumberPipe,
    ExchangeRatesServiceHealthAlertComponent
  ]
})
export class SharedModule {}

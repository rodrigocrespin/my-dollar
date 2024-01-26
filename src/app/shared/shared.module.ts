import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePipe } from './language.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { LuxonModule } from 'luxon-angular';
import { AbsoluteNumberPipe } from './absolute-number.pipe';
import { ExchangeRatesServiceHealthAlertComponent } from './exchange-rates-service-health-alert/exchange-rates-service-health-alert.component';
import { ToLocaleDecimalPipe } from './to-locale-decimal.pipe';

@NgModule({
  declarations: [
    LanguagePipe,
    AbsoluteNumberPipe,
    ExchangeRatesServiceHealthAlertComponent,
    ToLocaleDecimalPipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LuxonModule,
  ],
  exports: [
    LanguagePipe,
    TranslateModule,
    LuxonModule,
    AbsoluteNumberPipe,
    ExchangeRatesServiceHealthAlertComponent,
    ToLocaleDecimalPipe
  ]
})
export class SharedModule {}

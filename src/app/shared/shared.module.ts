import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalExchangeRatesChartComponent } from './historical-exchange-rates-chart/historical-exchange-rates-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { LanguagePipe } from './language.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    HistoricalExchangeRatesChartComponent,
    LanguagePipe
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    TranslateModule,
    MomentModule
  ],
  exports: [
    HistoricalExchangeRatesChartComponent,
    LanguagePipe,
    TranslateModule,
    MomentModule
  ]
})
export class SharedModule {}

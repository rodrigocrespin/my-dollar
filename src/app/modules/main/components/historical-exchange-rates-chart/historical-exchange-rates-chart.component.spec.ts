import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalExchangeRatesChartComponent } from './historical-exchange-rates-chart.component';

describe('HistoricalExchangeRatesChartComponent', () => {
  let component: HistoricalExchangeRatesChartComponent;
  let fixture: ComponentFixture<HistoricalExchangeRatesChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalExchangeRatesChartComponent]
    });
    fixture = TestBed.createComponent(HistoricalExchangeRatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

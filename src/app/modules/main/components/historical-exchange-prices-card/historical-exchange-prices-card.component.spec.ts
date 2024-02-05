import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalExchangePricesCardComponent } from './historical-exchange-prices-card.component';

describe('HistoricalExchangePricesCardComponent', () => {
  let component: HistoricalExchangePricesCardComponent;
  let fixture: ComponentFixture<HistoricalExchangePricesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalExchangePricesCardComponent]
    });
    fixture = TestBed.createComponent(HistoricalExchangePricesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

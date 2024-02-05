import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangePriceCardComponent } from './exchange-price-card.component';

describe('ExchangePriceCardComponent', () => {
  let component: ExchangePriceCardComponent;
  let fixture: ComponentFixture<ExchangePriceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangePriceCardComponent]
    });
    fixture = TestBed.createComponent(ExchangePriceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-exchange-rate-card',
  templateUrl: './small-exchange-rate-card.component.html',
  styleUrls: ['./small-exchange-rate-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmallExchangeRateCardComponent {
  @Input() title = '';
  @Input() value?: string;
  @Input() variation = 0;
  @Input() variationDate?: string;
}

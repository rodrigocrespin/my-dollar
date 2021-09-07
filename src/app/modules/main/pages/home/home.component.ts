import { Component } from '@angular/core';

interface Price {
  buy: number;
  sell: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  price: Price = { buy: 179, sell: 182 };

  constructor() { }
}

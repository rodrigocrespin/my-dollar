import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  model = {
    left: true,
    middle: false,
    right: false
  };

  constructor() { }
}
